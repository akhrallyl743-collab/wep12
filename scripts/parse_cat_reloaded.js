#!/usr/bin/env node
/**
 * scripts/parse_cat_reloaded.js
 * ----------------------------------------------------------------------------
 * محرك تحليل عام لملفات تفريغ CAT Reloaded الخام (.txt، كل واحد يمثّل دائرة
 * كاملة بصيغة "FILE: <path>" كفاصل لكل ملف .md فرعي داخلها).
 *
 * المنهجية (بلا أي قواعد خاصة مكتوبة يدوياً لكل دائرة):
 *   1) يقسّم كل ملف dump إلى ملفاته الفرعية عبر فاصل "FILE: ...".
 *   2) لكل ملف فرعي: يبني شجرة Headers (# / ## / ### ...) بعمق تعسفي.
 *   3) أي Header يحمل تحته روابط مباشرة (قوائم Markdown "- [title](url)"
 *      أو جدول HTML <table><tr><td><a href=...>) يُعتبر "Topic" (= ورقة شجرة
 *      فعلية تحمل موارد). أي Header له أبناء Headers فقط (بلا روابط مباشرة
 *      تحته) يُعتبر "Section".
 *   4) لو الملف الفرعي بأكمله لا يحوي أي رابط فعلي تحت أي Header (نص تعريفي
 *      + رابط Notion/Drive وحيد فقط) → يُعلَّم الـRoadmap بالكامل
 *      source_completeness = "shell_only"، ويُستخرَج الرابط الوحيد (أو
 *      الروابط القليلة) كموارد رسمية لـSection/Topic ثابتين (راجع البناء
 *      أدناه) دون اختراع أي تفصيل غير موجود.
 *
 * المخرج: ملف JSON واحد لكل دائرة في scripts/output/cat_parsed/<circle>.json
 * هذا المخرج طبقة مراجعة بشرية فقط — لا يُرفَع لأي قاعدة بيانات مباشرة.
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '..', 'cat_raw_input'); // يوضع فيه نسخ files__11_.zip المُفرَّغة
const OUT_DIR = path.join(__dirname, 'output', 'cat_parsed');
const SNAPSHOT_DIR = path.join(__dirname, '..', 'reference_repo_snapshot'); // للمحتوى الحي (Cloud/DevOps)

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── أدوات مساعدة عامة ────────────────────────────────────────────────────
function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[#*✨🌟🚧✅📌📜🅰️⚛️💚⚙️🗺️🛠️️]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'section';
}

/** يستخرج كل روابط Markdown "[title](url)" من نص سطر/فقرة واحدة، باستثناء
 *  صيغة الصور "![alt](url)" (لا تُعامَل كمورد تعليمي إطلاقاً). */
function extractMarkdownLinks(text) {
  const out = [];
  // نستثني الحالة التي يسبق فيها "[" علامة "!" مباشرة (صورة Markdown)
  const re = /(?<!!)\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let m;
  while ((m = re.exec(text))) out.push({ title: m[1].trim(), url: m[2].trim(), _preceding: text.slice(0, m.index) });
  return out;
}

/** يستخرج كل روابط HTML "<a href="url">title</a>" من نص/جدول خام */
function extractHtmlLinks(text) {
  const out = [];
  const re = /<a\s+href="(https?:\/\/[^"]+)"[^>]*>([^<]*)<\/a>/g;
  let m;
  while ((m = re.exec(text))) out.push({ title: (m[2] || '').trim() || m[1].trim(), url: m[1].trim() });
  return out;
}

/** فلتر صريح: روابط ليست موارد تعليمية إطلاقاً (صور مستضافة على الريبو نفسه،
 *  حسابات شخصية LinkedIn/GitHub لمؤلف أو قائد الدائرة) — تُستبعد دوماً من
 *  الموارد، لا تُحسَب أصلاً ضمن أي عدّ Shell/Full. هذا فلتر بنيوي عام لا يخص
 *  دائرة بعينها. يأخذ سياق النص المحيط بالرابط (precedingText) لتمييز رابط
 *  GitHub لمؤلف ("maintained by [X](github.com/x)") عن رابط GitHub مورد
 *  تعليمي فعلي (repo تمرين/مشروع) — الأول يُستبعد، الثاني لا. */
function isNonResourceLink(url, precedingText) {
  if (/raw\.githubusercontent\.com\/.*\/img\//i.test(url)) return true;
  if (/\.(png|jpe?g|gif|webp|svg)(\?|$)/i.test(url)) return true;
  if (/linkedin\.com\/in\//i.test(url)) return true;
  if (precedingText && /\b(maintained|created|written|authored|by)\s+(?:by\s+)?\[?$/i.test(precedingText.slice(-40)) &&
      /github\.com\/[^\/]+\/?$/i.test(url)) {
    // رابط GitHub لصفحة مستخدم (لا repo محدَّد: github.com/username فقط، بلا
    // مسار إضافي) يسبقه سياق "maintained/created/written by" — صفحة مؤلف لا
    // مورد تعليمي.
    return true;
  }
  return false;
}

/** يستخرج روابط نصية خام بلا أي صيغة Markdown/HTML تغليف — حالة نادرة لكن
 *  موجودة فعلياً في بعض الملفات (مثل "Meet your new friend: https://...").
 *  يُستثنى أي رابط سبق استخراجه أصلاً ضمن صيغة Markdown/HTML (لمنع ازدواج). */
function extractRawUrls(text, alreadyExtractedUrls) {
  const out = [];
  const re = /(?<!\]\()(?<!["'])https?:\/\/[^\s)\]"'<>|]+/g;
  let m;
  while ((m = re.exec(text))) {
    const url = m[0].replace(/[.,;:]+$/, '');
    if (!alreadyExtractedUrls.has(url)) out.push({ title: url, url });
  }
  return out;
}

function extractAllLinks(text) {
  const formatted = extractMarkdownLinks(text).concat(extractHtmlLinks(text)).filter(l => !isNonResourceLink(l.url, l._preceding));
  const formattedUrls = new Set(formatted.map(l => l.url));
  const raw = extractRawUrls(text, formattedUrls).filter(l => !isNonResourceLink(l.url));
  return formatted.concat(raw).map(l => ({ title: l.title, url: l.url })); // إزالة الحقل المؤقت _preceding من المخرج النهائي
}

/** يكتشف نوع المورد من رابطه (نفس منطق classifyResourceKind المستخدَم سابقاً
 *  في generate_sync_migration_sql.js — يحافظ على تطابق التصنيف بين كل
 *  مراحل المشروع). تطابق مباشر مع resource_kind enum الفعلي في القاعدة. */
function extractYouTubeVideoId(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/(?!videoseries)|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
function extractYouTubePlaylistId(url) {
  const m = String(url).match(/list=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
function classifyResourceKind(url, title) {
  if (!url) return 'external_article';
  if (/youtube\.com|youtu\.be/i.test(url)) {
    const hasVideoId = extractYouTubeVideoId(url);
    const hasPlaylistId = !hasVideoId && extractYouTubePlaylistId(url);
    return (hasVideoId || hasPlaylistId) ? 'youtube' : 'external_article';
  }
  if (/github\.com/i.test(url)) return 'github_repo';
  if (/\.pdf(\?|$)/i.test(url)) return 'pdf';
  if (/notion\.so|notion\.site/i.test(url)) return 'external_article'; // بطاقة Shell الرسمية تُصنَّف article خارجي
  if (/leetcode\.com|hackerrank\.com|frontendmentor\.io|codewars\.com|exercism\.org/i.test(url)) return 'challenge';
  if (/docs\.|developer\.|documentation|readthedocs|official/i.test(url) || /\bdocs?\b/i.test(title || '')) return 'official_docs';
  if (/forms\.gle|docs\.google\.com\/forms|quiz|exam/i.test(url) || /\b(exam|quiz|test)\b/i.test(title || '')) return 'external_exam';
  return 'external_article';
}

// ── المرحلة 1: تقسيم dump واحد إلى ملفاته الفرعية ──────────────────────────
function splitIntoSubFiles(rawText) {
  const parts = rawText.split(/^FILE:\s*(.+?)\s*\n-+\n/m);
  // parts[0] = ترويسة عامة (نتجاهلها) — بعد ذلك: [path1, content1, path2, content2, ...]
  const files = [];
  for (let i = 1; i < parts.length; i += 2) {
    files.push({ filePath: parts[i].trim(), content: parts[i + 1] || '' });
  }
  return files;
}

/** يطبِّع جداول HTML بنمط "صف لكل أسبوع" (شائع في بعض ملفات CAT مثل
 *  DataScience): <tr><th>Week N</th><td>عنوان الموضوع</td><td>الموارد...</td></tr>
 *  يتحوّل كل صف إلى Header مستوى ### بعنوان الموضوع الفعلي (لا "Week N" نفسها
 *  التي مجرد رقم تسلسلي بلا معنى)، تحته كل روابط خلية الموارد كنص body عادي.
 *  بدون هذا التطبيع، عنوان كل Topic كان سيُستخرَج خطأً من "Base/Alternative
 *  resources" (مكرَّر لعشرات المواضيع المختلفة، يفقد التمييز بينها). */
function normalizeWeekRowTables(text) {
  // المحاولة الأولى: الصيغة الصحيحة المُغلَقة بـ</tr> (الحالة الشائعة)
  let result = text.replace(/<tr>\s*<th>\s*Week\s*\d+\s*<\/th>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)<\/td>(?:\s*<td>[\s\S]*?<\/td>)?\s*<\/tr>/gi,
    (full, topicCell, resourcesCell) => buildWeekHeaderReplacement(full, topicCell, resourcesCell));

  // محاولة ثانية: صفوف معطوبة في المرجع نفسه (خطأ HTML فعلي مكتشَف في بعض
  // الملفات — مثل DataScience.txt) حيث الصف الأخير في الجدول لا يُغلَق
  // بـ</td></tr> إطلاقاً، بل ينتقل مباشرة لـ</tbody>/</table>. نتسامح مع هذا
  // بقبول إغلاق الجدول نفسه فقط كنهاية بديلة — وليس أي <h> عشوائي، لأن ذلك
  // قد يبتلع خطأً محتوى قسم تالٍ كامل (خلل مكتشَف ومُصحَّح: lookahead سابق
  // كان يتوقف عند أقرب <h3> تابع لصف لاحق ضمن الجدول التالي، لا عند حدود
  // الجدول الحالي فعلاً).
  result = result.replace(/<tr>\s*<th>\s*Week\s*\d+\s*<\/th>\s*<td>([\s\S]*?)<\/td>\s*<td>([\s\S]*?)(?=\s*<\/tbody>\s*<\/table>)/gi,
    (full, topicCell, resourcesCell) => buildWeekHeaderReplacement(full, topicCell, resourcesCell));

  return result;
}

function buildWeekHeaderReplacement(full, topicCell, resourcesCell) {
  // عنوان الموضوع: أول <li>...</li> إن وُجد، وإلا النص الخام للخلية كاملاً
  const liMatch = topicCell.match(/<li>([\s\S]*?)<\/li>/i);
  const topicTitle = (liMatch ? liMatch[1] : topicCell).replace(/<[^>]+>/g, '').trim();
  if (!topicTitle) return full; // دفاعي: لو فشل الاستخراج، اترك النص كما هو بلا تغيير
  return '\n### ' + topicTitle + '\n' + resourcesCell + '\n';
}

/** يُطبِّع وسوم HTML <h1>...<h6> إلى صيغة Markdown headers (# ## ### ...) قبل
 *  بناء الشجرة — نمط منتشر وكثيف فعلياً في بعض الملفات (BackEnd: 258 وسم،
 *  DataScience: 55 وسم) ولم يكن يُعامَل كـheaders إطلاقاً قبل هذا الإصلاح،
 *  فكانت كل العناوين الفرعية تحته (وروابطها) تُحسَب خطأً ضمن نص الأب فقط. */
/** يطبِّع جداول HTML بنمط "صف لكل أسبوع بخلية محتوى واحدة مدمجة" (مكتشَف في
 *  BackEnd/DotNet/README.md): <tr><td>Week N</td><td>كل المحتوى: Topics +
 *  Resources (Arabic/English) مدموجة معاً</td></tr>. بخلاف نمط DataScience
 *  (خليتان منفصلتان: موضوع | موارد)، هنا خلية واحدة فقط بكل شيء. يتحوّل كل
 *  صف إلى Header مستوى ## بعنوان "Week N" نفسها (موجود صريحاً في الخلية
 *  الأولى، بخلاف DataScience التي تطلَّبت استخراج عنوان من نص). بدون هذا
 *  التطبيع، "Week N" تضيع كخلية جدول لا Header، فتُعامَل "🗂️ Resources"
 *  المتكررة لكل أسبوع كقسم/Topic مستقل خطأً 35 مرة بعنوان مكرَّر مضلِّل. */
function normalizeWeekCellTables(text) {
  return text.replace(/<tr>\s*<td(?:\s+id="[^"]*")?>\s*(Week\s*\d+)\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/gi,
    (full, weekLabel, contentCell) => {
      return '\n## ' + weekLabel.trim() + '\n' + contentCell + '\n';
    });
}

function normalizeHtmlHeadings(text) {
  const withWeekCells = normalizeWeekCellTables(text);
  const withWeekRows = normalizeWeekRowTables(withWeekCells);
  return withWeekRows.replace(/<h([1-6])(?:\s+[^>]*)?>([\s\S]*?)<\/h\1>/gi, (full, level, inner) => {
    const cleanText = inner.replace(/<[^>]+>/g, '').trim();
    // استثناء: "Base/Alternative/More resources" هي تصنيف نصي للموارد ضمن
    // نفس الـTopic (مكرَّرة لعشرات المواضيع المختلفة بنفس النص الحرفي)، لا
    // Topic مستقل بذاته — تبقى نص body عادي بدل تحويلها لـHeader، وإلا
    // ستُصبح كل واحدة Topic منفصلاً بعنوان مكرَّر يفقد ربطها بموضوعها الأصلي.
    // إزالة أي رموز/إيموجي بادئة بشكل عام (بدل إدراج كل إيموجي محتمل يدوياً
    // — اكتُشف فعلياً أن 🗂️ وغيرها لم تكن مُدرَجة، فلم تُستثنَ "Resources"
    // المرتبطة بها خطأً). \p{Extended_Pictographic} يغطي كل الإيموجي الشائع.
    const textNoEmoji = cleanText.replace(/^[\p{Extended_Pictographic}\u{FE0F}\s]+/u, '').trim();
    if (/^(?:base|alternative|more|additional|required)?\s*(?:resources?|projects?)\s*$/i.test(textNoEmoji) ||
        /^(?:arabic|english)\s*$/i.test(textNoEmoji)) {
      return '\n**' + cleanText + ':**\n';
    }
    return '\n' + '#'.repeat(Number(level)) + ' ' + cleanText + '\n';
  });
}

// ── المرحلة 2: بناء شجرة Headers من نص ملف فرعي واحد ───────────────────────
function buildHeaderTree(rawContent) {
  // تطبيع نهايات الأسطر: ملفات بصيغة Windows (CRLF) تترك \r متبقياً في نهاية
  // كل سطر بعد split('\n')، وهذا يكسر تطابق regex العناوين (^#{1,6}...$)
  // تماماً (خلل مكتشَف فعلياً عند إعادة الاستخراج من المرجع الحي — بعض ملفات
  // المرجع الرسمي نفسها بصيغة CRLF، بخلاف الاستخراج اليدوي السابق الذي كان
  // قد طبَّع هذا ضمنياً). يُطبَّع هنا أولاً قبل أي معالجة أخرى.
  const normalizedLineEndings = rawContent.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const content = normalizeHtmlHeadings(normalizedLineEndings);
  const lines = content.split('\n');
  const root = { level: 0, title: null, children: [], bodyLines: [], headerLinks: [] };
  const stack = [root];

  for (const line of lines) {
    const m = line.match(/^(#{1,6})\s+(.+)$/);
    if (m) {
      const level = m[1].length;
      const rawTitleLine = m[2];
      // رابط مضمَّن داخل نص الـheader نفسه (حالة شائعة: "## [نص](رابط)")
      // — يُستخرَج هنا صريحاً لأنه لن يظهر في bodyLines إطلاقاً.
      const headerLinks = extractAllLinks(rawTitleLine);
      // العنوان المعروض: إزالة صيغة [نص](رابط) واستبدالها بالنص الداخلي فقط،
      // وإزالة رموز التنسيق المتبقية (** __ #).
      const cleanTitle = rawTitleLine
        .replace(/\[([^\]]+)\]\(https?:\/\/[^)]+\)/g, '$1')
        .replace(/[*_`]/g, '')
        .trim();
      const node = { level, title: cleanTitle, children: [], bodyLines: [], headerLinks };
      while (stack.length && stack[stack.length - 1].level >= level) stack.pop();
      (stack[stack.length - 1] || root).children.push(node);
      stack.push(node);
    } else {
      stack[stack.length - 1].bodyLines.push(line);
    }
  }
  return root;
}

/** يجمع كل الروابط المباشرة لعقدة معيّنة: من نص الـheader نفسه (headerLinks)
 *  بالإضافة إلى bodyLines الخاصة بها فقط (لا أبناؤها). */
function collectDirectLinks(node) {
  return (node.headerLinks || []).concat(extractAllLinks(node.bodyLines.join('\n')));
}

// ── المرحلة 3: تحويل شجرة Headers إلى sections/topics ─────────────────────
/**
 * Topic = أي عقدة تحمل روابط مباشرة تحتها (بصرف النظر عن وجود أبناء أم لا،
 * المهم وجود رابط واحد على الأقل في bodyLines الخاصة بها فقط، لا أبنائها).
 * Section = أي عقدة من المستوى الأعلى مباشرة تحت جذر الملف (أول مستوى header
 * فعلي مستخدَم في الملف) التي تحوي عقدة Topic واحدة على الأقل بين أحفادها.
 */
function flattenTopics(node, topics) {
  if (node._mergeChildrenIntoSingleTopic) {
    // دمج كل روابط الأبناء (Overview/Resources/Textbook...) في Topic واحد
    // بعنوان العقدة الأب نفسها — لا معالجة كل ابن كموضوع مستقل.
    const mergedLinks = [];
    function collectAllLinksRecursive(n) {
      mergedLinks.push(...collectDirectLinks(n));
      n.children.forEach(collectAllLinksRecursive);
    }
    node.children.forEach(collectAllLinksRecursive);
    if (mergedLinks.length > 0 && node.title) {
      topics.push({ title_en: node.title, task_note: null, resources: mergedLinks });
    }
    return; // لا ننزل لأبناء هذه العقدة بشكل منفصل، تم استيعابهم بالكامل أعلاه
  }

  const directLinks = collectDirectLinks(node);
  const taskMatch = node.bodyLines.join('\n').match(/^(?:Task|التكليف|المهمة)[:\-]\s*(.+)$/im);

  if (directLinks.length > 0 && node.title) {
    topics.push({
      title_en: node.title,
      task_note: taskMatch ? taskMatch[1].trim() : null,
      resources: directLinks
    });
  }
  node.children.forEach(child => flattenTopics(child, topics));
}

function buildSectionsFromSubFile(subFileTitle, root) {
  let firstLevelNodes = root.children;
  if (firstLevelNodes.length === 0) return { trackTitle: null, sections: [] };

  let trackTitle = null;
  // عنوان الملف الحقيقي يُستثنى من قائمة الأقسام إذا لم يكن يحمل أي رابط
  // مباشر بنفسه (مجرد عنوان نصي) — سواء كان معه عقد أخرى top-level (حالة
  // iOS/Android) أو كان هو العقدة الوحيدة top-level بينما كل المحتوى الفعلي
  // أبناؤه (حالة DataScience: "# Data Science Roadmap 2025" يحوي كل شيء
  // تحته مباشرة). في كل الحالات: لو له أبناء، نستبدله بأبنائه كنقطة انطلاق؛
  // لو ليس له أبناء ولا روابط (نص صرف فقط)، يُحذف بلا أي تعويض.
  const first = firstLevelNodes[0];
  const firstHasDirectLinks = collectDirectLinks(first).length > 0;
  if (firstLevelNodes.length === 1 && !firstHasDirectLinks && first.children.length > 0) {
    trackTitle = first.title;
    firstLevelNodes = first.children;
  } else if (firstLevelNodes.length > 1 && !firstHasDirectLinks && first.children.length === 0) {
    trackTitle = first.title;
    firstLevelNodes = firstLevelNodes.slice(1);
  }

  /**
   * لكل فرع top-level مستقل: "القسم" هو إما (أ) العقدة نفسها لو تحمل روابط
   * مباشرة أو لا أبناء لها إطلاقاً (ورقة)، أو (ب) أول مستوى من أبنائها الذي
   * يحوي فيه أي عقدة واحدة على الأقل تحمل روابط مباشرة (نزول تكراري مستقل
   * بالعمق المناسب لهذا الفرع بعينه، بصرف النظر عن عمق الفروع الأخرى). هذا
   * يحل حالة الأعماق المختلطة ضمن نفس الملف (مثل Cloud/DevOps: "Linux
   * Kernel" بعمق H2 مباشرة، بجانب "Cloud Computing" H1 التي تحوي أبناءها
   * الفعليين بعمق H2 لكن تحتاج خطوة نزول واحدة بينما غيرها قد يحتاج أكثر).
   */
  function nodeHasAnyDirectLinksInSubtree(node) {
    if (collectDirectLinks(node).length > 0) return true;
    return node.children.some(nodeHasAnyDirectLinksInSubtree);
  }

  // عناوين فرعية معروفة ومتكررة across أقسام مختلفة (وليست خاصة بموضوع
  // بعينه) — وجودها يعني أن العقدة الأب نفسها هي الوحدة المنطقية الحقيقية،
  // وكل هذه الأبناء يجب دمجها في Topic واحد بعنوان الأب (لا تتفكك لأقسام
  // أو حتى Topics مستقلة). مثال: "## Networking" تحوي "### Overview" +
  // "### What the Course Includes" + "### Resources" + "### Textbook" —
  // كلها تخص نفس موضوع "Networking" الواحد، بخلاف "Beginner Level" التي
  // تحوي "Kotlin Fundamentals"/"Basics of XML" (مواضيع منفصلة فعلياً).
  const KNOWN_GENERIC_SUBHEADINGS = /^(overview|what the course includes\s*\??|resources?|textbook:?|additional notes|prerequisites?|note s?|tasks?|objectives?|after completing.*|topics?|content)$/i;
  function isGenericSubheadingTitle(title) {
    const cleaned = String(title).replace(/[*_:]/g, '').replace(/^[\p{Extended_Pictographic}\u{FE0F}\s]+/u, '').trim();
    return KNOWN_GENERIC_SUBHEADINGS.test(cleaned);
  }

  function resolveSectionNodes(node) {
    // ورقة (بلا أبناء) أو تحمل روابط مباشرة بالفعل → هي نفسها القسم
    if (node.children.length === 0 || collectDirectLinks(node).length > 0) {
      return [node];
    }
    // عقدة بلا روابط مباشرة، لها أبناء: نفحص طبيعة الأبناء.
    const allChildrenAreGenericSubheadings = node.children.length > 1 &&
      node.children.every(c => isGenericSubheadingTitle(c.title));
    if (allChildrenAreGenericSubheadings) {
      // نُعلِّم العقدة لتُدمَج لاحقاً في flattenTopics كـTopic واحد فقط
      node._mergeChildrenIntoSingleTopic = true;
      return [node];
    }

    const allChildrenAreLeavesWithLinks = node.children.length > 0 &&
      node.children.every(c => c.children.length === 0 && collectDirectLinks(c).length > 0);

    if (allChildrenAreLeavesWithLinks) {
      // حالة "Beginner Level" تحوي "Kotlin Fundamentals"/"Basics of XML" (كل
      // الأبناء أوراق فعلية تحمل روابط) — العقدة الوسيطة نفسها Section واحدة
      // جامعة تضمّ كل أبنائها كـTopics، لا تتفكك كل ابن كقسم مستقل.
      return [node];
    }
    // أبناء مختلطون (بعضهم عقد وسيطة أعمق بدورها بلا روابط مباشرة) أو لا
    // أبناء يحملون روابط في مستوى مباشر — ننزل تكرارياً فرعاً بفرع.
    const anyChildHasLinks = node.children.some(nodeHasAnyDirectLinksInSubtree);
    if (anyChildHasLinks) {
      return node.children.flatMap(resolveSectionNodes);
    }
    return [];
  }

  const sectionLevelNodes = firstLevelNodes.flatMap(resolveSectionNodes);

  const sections = [];
  sectionLevelNodes.forEach((secNode, idx) => {
    const topics = [];
    flattenTopics(secNode, topics);
    if (topics.length === 0) return; // قسم بلا أي رابط فعلي تحته — لا يُنشأ (لا اختراع محتوى)
    // إصلاح إضافي: لو القسم نفسه هو الورقة الوحيدة (Topic الوحيد تحته يحمل
    // نفس عنوانه حرفياً، أي لا يوجد أي تفرّع فرعي حقيقي تحته) — هذا طبيعي
    // ومقصود فعلاً (قسم بسيط بلا تفريع داخلي، مثل "Learning Swift" في iOS)؛
    // لا نُكرِّر العنوان في الواجهة لاحقاً (تُعالَج بصرياً في طبقة العرض)
    // لكن نُبقي البيانات كما هي لأنها تعكس بنية المرجع بأمانة بلا اختراع.
    sections.push({
      title_en: secNode.title,
      order: idx + 1,
      topics: topics,
      flat_section: topics.length === 1 && topics[0].title_en === secNode.title
    });
  });
  return { trackTitle, sections };
}

// ── المرحلة 4: كشف "Shell-only" (لا تفصيل، فقط رابط/فقرة تعريفية) ─────────
function isShellOnly(sections) {
  if (sections.length === 0) return true;
  const allLinks = [];
  sections.forEach(s => s.topics.forEach(t => allLinks.push(...t.resources)));
  if (allLinks.length === 0) return true;
  // Shell-only فعلي: كل الروابط الفعلية المتبقية (بعد استثناء الصور/LinkedIn
  // أعلى الملف) هي روابط Notion/Drive خارجية بلا أي رابط تعليمي مباشر آخر
  // (يوتيوب/مقال/GitHub/توثيق...) — أي لا تفصيل حقيقي داخل الملف نفسه.
  return allLinks.every(r => /notion\.(so|site)|drive\.google\.com/i.test(r.url));
}

// ── بناء roadmap كامل من dump واحد (قد يحوي عدة ملفات فرعية = عدة tracks) ──
function buildCircleFromDump(circleName, rawText) {
  const subFiles = splitIntoSubFiles(rawText)
    // استثناء صريح: Embedded Systems/Scheduled Roadmap.md يصرّح حرفياً في
    // محتواه أنه "نفس roadmap الـ General، لكن مقسّم لأسابيع فقط" — تكرار
    // مؤكد بنص المرجع نفسه (قرار معتمد منذ بداية هذه المحادثة، طُبِّق سابقاً
    // في import_cat_roadmaps.js القديم وأُعيد تطبيقه هنا بعد اكتشاف نسيانه
    // عند كتابة هذا المحرك الجديد).
    .filter(sf => sf.filePath !== 'Embedded Systems/Scheduled Roadmap.md')
    // استثناء BackEnd/DotNet/README.md: بنية جدول فريدة (خلية محتوى واحدة
    // مدمجة لكل أسبوع) تحتاج معالجة مخصَّصة برمجية عبر
    // scripts/parse_dotnet_special.js (راجع تقرير المراجعة 2026-06-22).
    .filter(sf => sf.filePath !== 'BackEnd/DotNet/README.md');
  const tracks = [];

  subFiles.forEach(sf => {
    // الملف الجذري (README.md/Readme.md في المجلد الرئيسي مباشرة، بلا "/" فرعي
    // عميق) يُعامَل كمقدمة للدائرة لا كـtrack مستقل، إلا لو كان الملف الوحيد
    const root = buildHeaderTree(sf.content);
    const { trackTitle, sections } = buildSectionsFromSubFile(sf.filePath, root);
    tracks.push({
      source_file: sf.filePath,
      track_title_en: trackTitle,
      sections,
      shell_only: isShellOnly(sections)
    });
  });

  return { circle: circleName, tracks };
}

// ── نقطة الدخول ────────────────────────────────────────────────────────────
function main() {
  if (!fs.existsSync(RAW_DIR)) {
    console.error('❌ لم يتم العثور على ملفات CAT الخام في:', RAW_DIR);
    console.error('   ضع نسخة files__11_.zip المُفرَّغة هناك أولاً.');
    process.exit(1);
  }

  const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.txt') && f !== 'CyberSecurity.txt' && f !== 'DataScience.txt');
  // ملاحظة: CyberSecurity.txt و DataScience.txt مستثنيان عمداً من المحرك
  // العام — كلاهما يحوي حالات استثنائية (مزيج Tier A/B، أو جداول HTML
  // معطوبة بطرق متعددة في المرجع نفسه) تحتاج معالجة مخصَّصة عبر
  // scripts/parse_cybersecurity_special.js و scripts/parse_datascience_special.js
  // (راجع تقرير المراجعة 2026-06-22). شغِّل كل سكربت بشكل منفصل.
  const summary = [];

  files.forEach(fileName => {
    const circleName = fileName.replace(/\.txt$/, '');
    const rawText = fs.readFileSync(path.join(RAW_DIR, fileName), 'utf8');
    const result = buildCircleFromDump(circleName, rawText);

    const outPath = path.join(OUT_DIR, circleName + '.json');
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), 'utf8');

    const totalSections = result.tracks.reduce((n, t) => n + t.sections.length, 0);
    const totalTopics = result.tracks.reduce((n, t) => n + t.sections.reduce((m, s) => m + s.topics.length, 0), 0);
    const totalResources = result.tracks.reduce((n, t) => n + t.sections.reduce((m, s) => m + s.topics.reduce((k, tp) => k + tp.resources.length, 0), 0), 0);
    const allShell = result.tracks.every(t => t.shell_only);

    summary.push({ circle: circleName, sub_files: result.tracks.length, sections: totalSections, topics: totalTopics, resources: totalResources, tier: allShell ? 'B (shell_only)' : 'A (full)' });
    console.log(`✅ ${circleName}: ${result.tracks.length} ملف فرعي، ${totalSections} قسم، ${totalTopics} موضوع، ${totalResources} مورد [Tier ${allShell ? 'B' : 'A'}]`);
  });

  fs.writeFileSync(path.join(OUT_DIR, '_summary.json'), JSON.stringify(summary, null, 2), 'utf8');
  console.log('\n📄 الملخص الكامل: scripts/output/cat_parsed/_summary.json');
}

if (require.main === module) {
  main();
} else {
  module.exports = { normalizeHtmlHeadings, normalizeWeekRowTables, buildHeaderTree, splitIntoSubFiles, collectDirectLinks, buildSectionsFromSubFile };
}
