/**
 * import_cat_roadmaps.js
 * -----------------------------------------------------------------------
 * أداة استيراد تلقائية: تقرأ ملفات Markdown من المستودع المرجعي
 *   https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps (فرع main)
 * (نسخة محلية تحت reference_repo/ — انظر ملاحظة الشبكة في رأس
 *  analyze_missing_roadmaps.js) وتحوّلها تلقائياً إلى نفس بنية
 * track → courses → lessons المستخدمة في js/data.js، ثم تكتب ملفاً موحداً
 * بصيغة JSON يمكن تغذيته مباشرة لـ generate_roadmap_seed.js.
 *
 * لا يُضاف أي محتوى يدوي: كل track/course/lesson في المخرجات مُستخرج
 * برمجياً من نص الملفات نفسها (العناوين، الجداول، الروابط).
 *
 * الأنماط المدعومة داخل ملفات المستودع:
 *   1) README.md / Readme.md عادي بعناوين Markdown (#, ##, ###) وقوائم متداخلة
 *   2) week_XX.md منفصلة لكل أسبوع (مثل Flutter/1 - Beginner/week_01.md)
 *   3) جداول HTML مدمجة داخل Markdown (<table><tr><th>Week N</th><td>...)
 *   4) جداول Markdown عادية (| Week | ... |)
 *   5) روابط YouTube (youtube.com / youtu.be) → نوع "فيديو"
 *   6) روابط GitHub (github.com)              → نوع "مرجع/كود"
 *   7) روابط خارجية أخرى (Notion, MDN, درايف, مواقع تعليمية...) → "قراءة"
 *
 * تشغيل: node scripts/import_cat_roadmaps.js
 * المخرج: scripts/output/cat_roadmaps_import.json
 * -----------------------------------------------------------------------
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT       = path.join(__dirname, '..');
const REF_REPO   = path.join(ROOT, 'reference_repo');
const OUTPUT_DIR = path.join(__dirname, 'output');
const OUTPUT_JSON = path.join(OUTPUT_DIR, 'cat_roadmaps_import.json');

if (!fs.existsSync(REF_REPO)) {
  console.error('❌ لم يتم العثور على المستودع المرجعي محلياً في:', REF_REPO);
  console.error('   حمّل واستخرج https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps (main) هناك أولاً.');
  process.exit(1);
}

/* =====================================================================
   أدوات عامة
   ===================================================================== */
function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const rel  = path.join(base, e.name);
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files = files.concat(walk(full, rel));
    else files.push(rel);
  }
  return files;
}

function slugify(str) {
  return String(str)
    .toLowerCase()
    .replace(/[^\u0600-\u06FFa-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'item';
}

let lessonIdCounter = 0;
function nextLessonId(prefix) {
  lessonIdCounter += 1;
  return `${prefix}-${String(lessonIdCounter).padStart(4, '0')}`;
}

const URL_RE   = /https?:\/\/[^\s)"'<>\]]+/g;
const YT_RE    = /(youtube\.com|youtu\.be)/i;
const GITHUB_RE = /github\.com/i;

function cleanUrl(u) {
  return u.replace(/[.,;:)\]]+$/, '');
}

/** يستثني روابط الشارات الزخرفية (شارات README مثل shields.io) وروابط
 *  الصور الثابتة (png/jpg/svg/webp/gif) من اعتبارها "مورداً تعليمياً" —
 *  هذه زخرفة بصرية في الملف الأصلي، ليست محتوى يُدرَّس. */
function isNoiseUrl(url) {
  if (/shields\.io|img\.shields|badge\//i.test(url)) return true;
  if (/\.(png|jpe?g|svg|webp|gif)(\?|$)/i.test(url)) return true;
  return false;
}

/** يستخرج كل الروابط الموجودة في سطر/نص نصي معيّن مع تصنيفها */
function extractLinksFromText(text) {
  const matches = (text.match(URL_RE) || []).map(cleanUrl).filter(u => !isNoiseUrl(u));
  return matches.map(url => ({
    url,
    kind: YT_RE.test(url) ? 'video' : (GITHUB_RE.test(url) ? 'github' : 'external'),
  }));
}

/** يحوّل [نص](رابط) Markdown إلى نص نظيف + رابط مستخرج بشكل دقيق */
const MD_LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;
function extractMarkdownLinks(line) {
  const out = [];
  let m;
  const re = new RegExp(MD_LINK_RE);
  while ((m = re.exec(line))) {
    const url = cleanUrl(m[2]);
    if (isNoiseUrl(url)) continue;
    out.push({ text: m[1].trim(), url });
  }
  return out;
}

/** يزيل بايتات UTF-8 surrogate غير صحيحة الناتجة عن حفظ خاطئ لبعض الإيموجي
 *  في الملفات الأصلية على GitHub (مثل \uD83E\uDE80 محفوظة كـ surrogate
 *  منفرد)، والتي تتحول عند القراءة كـ UTF-8 إلى رمز الاستبدال U+FFFD.
 *  لا يغيّر أي محتوى نصي حقيقي — فقط يحذف محارف غير صالحة/غير قابلة للعرض. */
function stripBrokenSurrogates(str) {
  return String(str)
    .replace(/[\uD800-\uDFFF]/g, '')
    .replace(/\uFFFD/g, '');
}

/** ينظف نص العنوان من رموز Markdown/HTML والإيموجي الزائدة.
 *  يُرجع '' لقيم null/undefined بدل تحويلها لنص "null" حرفي. */
function cleanTitle(str) {
  if (str === null || str === undefined) return '';
  return stripBrokenSurrogates(String(str))
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function durationGuess(kind) {
  if (kind === 'video') return '—';
  return '—';
}

/* =====================================================================
   PARSER 1: جدول HTML مضمّن داخل Markdown
   يلتقط: <table>...<tr><th>Week N</th><td> ... محتوى HTML غني ... </td></tr>...</table>
   يُستخدم في: BackEnd/NodeJS, BackEnd/Laravel, BackEnd/DotNet, BackEnd/Spring,
              Data Science
   يُرجع أيضاً أقرب عنوان Markdown (###/##/#) يسبق كل جدول مباشرة (مثل
   "Level 0" أو "Week 1 Phase") لاستخدامه كاسم كورس وصفي بدل "Table N".
   ===================================================================== */
function nearestPrecedingHeading(content, matchIndex) {
  const before = content.slice(0, matchIndex);
  const headingMatches = [...before.matchAll(/^#{1,4}\s+(.*)$/gm)];
  if (!headingMatches.length) return null;
  return cleanTitle(headingMatches[headingMatches.length - 1][1]);
}

function parseHtmlTables(content) {
  const tables = [];
  const tableRe = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tm;
  while ((tm = tableRe.exec(content))) {
    const precedingHeading = nearestPrecedingHeading(content, tm.index);
    const tableHtml = tm[1];
    const rowRe = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    const rows = [];
    let rm;
    while ((rm = rowRe.exec(tableHtml))) {
      const rowHtml = rm[1];
      // أول خلية (th أو td) = عنوان الصف (مثل "Week 1")، الباقي = المحتوى
      const cellRe = /<(th|td)[^>]*>([\s\S]*?)<\/\1>/gi;
      const cells = [];
      let cm;
      while ((cm = cellRe.exec(rowHtml))) cells.push(cm[2]);
      if (cells.length) rows.push(cells);
    }
    if (rows.length) tables.push({ rows, heading: precedingHeading });
  }
  return tables;
}

/** يحوّل خلية HTML غنية (تحتوي <ul><li><a>) إلى قائمة موارد + عنوان فرعي تقريبي */
function extractResourcesFromHtmlCell(html) {
  const resources = [];
  // عناوين فرعية h3-h6 داخل الخلية (مثل "Arabic" / "English" / "Task")
  const subHeadings = (html.match(/<h[3-6][^>]*>([\s\S]*?)<\/h[3-6]>/gi) || [])
    .map(h => cleanTitle(h));
  // كل <a href="...">نص</a> داخل الخلية
  const linkRe = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let lm;
  while ((lm = linkRe.exec(html))) {
    const url = cleanUrl(lm[1]);
    if (isNoiseUrl(url)) continue;
    const text = cleanTitle(lm[2]);
    resources.push({
      title: text || url,
      url,
      kind: YT_RE.test(url) ? 'video' : (GITHUB_RE.test(url) ? 'github' : 'external'),
    });
  }
  return { subHeadings, resources };
}

/* =====================================================================
   PARSER 2: ملف week_XX.md منفصل
   يُستخدم في: Flutter/1 - Beginner/week_01.md ... إلخ
   ===================================================================== */
function parseWeekFile(relPath, content) {
  const lines = content.split(/\r?\n/);
  const firstHeading = (lines.find(l => /^#\s+/.test(l.trim())) || '').replace(/^#\s+/, '');
  const title = cleanTitle(firstHeading) || path.basename(relPath, '.md');

  const resources = [];
  lines.forEach(line => {
    extractMarkdownLinks(line).forEach(({ text, url }) => {
      resources.push({
        title: cleanTitle(text) || url,
        url,
        kind: YT_RE.test(url) ? 'video' : (GITHUB_RE.test(url) ? 'github' : 'external'),
      });
    });
  });

  return { title, resources, raw: content };
}

/* =====================================================================
   PARSER 3: Markdown هرمي عام (عناوين # ## ### + قوائم متداخلة + روابط)
   يُستخدم لكل الملفات التي ليست جدول HTML أو week_XX.md
   يبني شجرة: H1/H2 → "كورس" (Course)، كل تجميعة نص+روابط أسفل عنوان فرعي
   (H3/H4 أو سطر bullet أب) → "درس" (Lesson) واحد أو أكثر.
   ===================================================================== */
function parseGenericMarkdown(content) {
  const lines = content.split(/\r?\n/);
  const sections = []; // { level, title, lessons: [{title, resources}] }
  let current = null;
  let pendingLabel = null; // آخر سطر bullet نصي بلا رابط (يُستخدم كعنوان للدرس التالي)

  function ensureSection(level, rawTitle) {
    const title = cleanTitle(rawTitle);
    if (!title) return;
    current = { level, title, lessons: [] };
    sections.push(current);
    pendingLabel = null;
  }

  function pushLesson(title, resources) {
    if (!current) ensureSection(2, 'محتوى عام');
    if (!resources.length && !title) return;
    const cleaned = cleanTitle(title);
    const fallback = (resources[0] && resources[0].title) || 'درس';
    current.lessons.push({ title: cleaned || fallback, resources });
  }

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    const hMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (hMatch) {
      const level = hMatch[1].length;
      ensureSection(level, hMatch[2]);
      return;
    }

    // <h3>..<h6> HTML inline headings (تستخدم في بعض الملفات مثل Data Science)
    const htmlHMatch = trimmed.match(/^<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>$/i);
    if (htmlHMatch) {
      ensureSection(3, htmlHMatch[1]);
      return;
    }

    const mdLinks = extractMarkdownLinks(trimmed);
    const bareLinks = extractLinksFromText(trimmed).filter(
      l => !mdLinks.some(ml => ml.url === l.url)
    );

    if (mdLinks.length || bareLinks.length) {
      const resources = [
        ...mdLinks.map(l => ({
          title: cleanTitle(l.text) || l.url,
          url: l.url,
          kind: YT_RE.test(l.url) ? 'video' : (GITHUB_RE.test(l.url) ? 'github' : 'external'),
        })),
        ...bareLinks.map(l => ({ title: l.url, url: l.url, kind: l.kind })),
      ];
      // النص قبل أول رابط Markdown يُستخدم كعنوان الدرس إن وُجد
      const textBeforeLink = trimmed
        .replace(/^[-*]\s*/, '')
        .split('[')[0]
        .replace(/^\*+|\*+$/g, '')
        .trim();
      const label = textBeforeLink || pendingLabel;
      pushLesson(label, resources);
      pendingLabel = null;
    } else {
      // سطر bullet نصي بلا رابط: غالباً عنوان لمجموعة روابط ستأتي بالأسطر التالية
      const bulletMatch = trimmed.match(/^[-*]\s+\*{0,2}([^*].*?)\*{0,2}:?$/);
      if (bulletMatch) pendingLabel = cleanTitle(bulletMatch[1]);
    }
  });

  return sections.filter(s => s.lessons.length > 0);
}

/* =====================================================================
   تجميع الدوائر (Circles) من المستودع المرجعي حسب أول مجلد
   ===================================================================== */
const allFiles = walk(REF_REPO);
const mdFiles = allFiles
  .filter(f => /\.md$/i.test(f))
  // استثناء Readme.md الجذري للمستودع: صفحة تعريفية عن CAT Reloaded
  // (روابط سوشيال ميديا، نظرة عامة على الفروع السنوية...) ولا تمثل أي
  // مسار تعليمي فعلي قابل للتحويل إلى track من courses/lessons.
  .filter(f => f !== 'Readme.md' && f !== 'README.md')
  // استثناء صريح: Embedded Systems/Scheduled Roadmap.md يصرّح حرفياً في
  // محتواه أنه "نفس roadmap الـ General، لكن مقسّم لأسابيع فقط" — تكرار
  // مؤكد بنص المرجع نفسه (راجع قرار إزالة الازدواجية المؤكدة، تأكيد
  // 2026-06-21). الاستثناء محصور بهذا الملف بالضبط ولا يمتد لأي ملف آخر
  // في أي دائرة أخرى (مثل Game Development التي لا تصريح مماثل فيها).
  .filter(f => f !== path.join('Embedded Systems', 'Scheduled Roadmap.md'));

function topCircleOf(relPath) {
  return relPath.split(path.sep)[0];
}

/* بعض الدوائر تحتوي مسارات فرعية مستقلة تماماً عن بعضها (لغات/تخصصات
   منفصلة بالكامل، كل واحدة بـ README.md مستقل) — هذه يجب أن تُعامَل
   كـ track مستقل لكل مسار فرعي بدل دمجها في track واحد ضخم غير متجانس.
   هذا استخراج بنيوي بحت (تقسيم حسب مجلدات موجودة فعلياً في المستودع)
   وليس إضافة محتوى. */
const SUBCIRCLE_SPLIT = {
  'BackEnd': true, // NodeJS / Laravel / DotNet / Spring — مناهج مستقلة بالكامل
};

function subCircleOf(relPath, circle) {
  if (!SUBCIRCLE_SPLIT[circle]) return null;
  const parts = relPath.split(path.sep);
  // مثال: BackEnd/NodeJS/README.md -> parts[1] = 'NodeJS'
  // أما BackEnd/README.md (الجذر) فلا subCircle له (parts.length === 2)
  return parts.length > 2 ? parts[1] : null;
}

const circleFiles = {};
mdFiles.forEach(f => {
  const c = topCircleOf(f);
  const sub = subCircleOf(f, c);
  const key = sub ? `${c}/${sub}` : c;
  circleFiles[key] = circleFiles[key] || [];
  circleFiles[key].push(f);
});

/* تعريب/تنسيق أسماء الدوائر إلى عنوان track + معرّف مناسب لقاعدة البيانات.
   هذا تنسيق أسماء فقط (لا اختراع محتوى) — المعرف العربي يبقى نفس اسم
   الدائرة كما هو في المستودع المرجعي، فقط مُنسَّق كـ slug إنجليزي. */
const CIRCLE_META = {
  'Android':                 { id: 'cat-android',         title: 'Android Development Roadmap (CAT Reloaded)' },
  'BackEnd/NodeJS':          { id: 'cat-backend-nodejs',   title: 'Back-End Development with Node.js Roadmap (CAT Reloaded)' },
  'BackEnd/Laravel':         { id: 'cat-backend-laravel',  title: 'Back-End Development with Laravel Roadmap (CAT Reloaded)' },
  'BackEnd/DotNet':          { id: 'cat-backend-dotnet',   title: 'Back-End Development with .NET Roadmap (CAT Reloaded)' },
  'BackEnd/Spring':          { id: 'cat-backend-spring',   title: 'Back-End Development with Spring Roadmap (CAT Reloaded)' },
  'Cloud Computing & DevOps':{ id: 'cat-cloud-devops',     title: 'Cloud Computing & DevOps Roadmap (CAT Reloaded)' },
  'Computer Science':        { id: 'cat-computer-science', title: 'Computer Science Fundamentals Roadmap (CAT Reloaded)' },
  'CyberSecurity':           { id: 'cat-cybersecurity',    title: 'Cyber Security Roadmap (CAT Reloaded)' },
  'Data Science':            { id: 'cat-data-science',     title: 'Data Science Roadmap (CAT Reloaded)' },
  'Embedded Systems':        { id: 'cat-embedded-systems', title: 'Embedded Systems Roadmap (CAT Reloaded)' },
  'English':                 { id: 'cat-english',          title: 'English Learning Roadmap (CAT Reloaded)' },
  'Flutter':                 { id: 'cat-flutter',          title: 'Flutter Developer Roadmap (CAT Reloaded)' },
  'Front End':                { id: 'cat-frontend',         title: 'Frontend Circle Roadmap 2026 (CAT Reloaded)' },
  'Game Development':        { id: 'cat-gamedev',          title: 'Game Development Roadmap (CAT Reloaded)' },
  'IOS':                     { id: 'cat-ios',              title: 'iOS Developer Roadmap (CAT Reloaded)' },
  'Media':                   { id: 'cat-media',            title: 'Media Roadmaps (CAT Reloaded)' },
  'UI':                      { id: 'cat-ui-ux',            title: 'UI/UX Roadmap 2026 (CAT Reloaded)' },
};

/* =====================================================================
   بناء track واحد لكل دائرة (circle) عبر دمج كل ملفاتها الفرعية
   ===================================================================== */
function buildTrackForCircle(circle, files) {
  const meta = CIRCLE_META[circle] || { id: slugify('cat-' + circle), title: `${circle} Roadmap (CAT Reloaded)` };
  const courses = [];

  // 1) تجميع ملفات week_XX.md حسب مجلدها (= مستوى/level) لإنشاء كورس واحد لكل مستوى
  const weekGroups = {};
  files.forEach(f => {
    if (/^week_\d+\.md$/i.test(path.basename(f))) {
      const dir = path.dirname(f);
      weekGroups[dir] = weekGroups[dir] || [];
      weekGroups[dir].push(f);
    }
  });

  Object.keys(weekGroups).sort().forEach(dir => {
    const weekFiles = weekGroups[dir].sort();
    const levelName = cleanTitle(path.basename(dir));
    const courseId = slugify(`${meta.id}-${levelName}`);
    const lessons = [];
    weekFiles.forEach(wf => {
      const content = fs.readFileSync(path.join(REF_REPO, wf), 'utf8');
      const { title, resources } = parseWeekFile(wf, content);
      const videoRes = resources.find(r => r.kind === 'video');
      const lesson = {
        id: nextLessonId(courseId),
        title,
        duration: '—',
        videoUrl: videoRes ? videoRes.url : '',
        type: videoRes ? 'فيديو' : (resources.length ? 'تدريب' : 'قراءة'),
        sourceFile: wf,
        allResources: resources,
      };
      lessons.push(lesson);
    });
    if (lessons.length) {
      courses.push({ id: courseId, title: levelName, duration: '—', lessons, sourceFiles: weekFiles });
    }
  });

  // 2) باقي الملفات (README/Readme/roadmap-XX.md وما شابه) التي لم تُعالَج كـ week files
  const remainingFiles = files.filter(f => !/^week_\d+\.md$/i.test(path.basename(f)));

  remainingFiles.forEach(relFile => {
    const content = fs.readFileSync(path.join(REF_REPO, relFile), 'utf8');
    const fileBase = cleanTitle(path.basename(relFile, '.md'));

    const htmlTables = parseHtmlTables(content);
    if (htmlTables.length) {
      // كل جدول HTML → كورس واحد، كل صف (Week N | محتوى) → درس واحد على الأقل
      htmlTables.forEach((table, tIdx) => {
        const { rows, heading } = table;
        const courseTitle = heading || `${fileBase} — Table ${tIdx + 1}`;
        const courseId = slugify(`${meta.id}-${fileBase}-${heading || ('table-' + (tIdx + 1))}`);
        const lessons = [];
        rows.forEach((cells, rIdx) => {
          if (cells.length < 2) return; // صف رأس الجدول (Phase/Content) بلا محتوى فعلي
          const rowLabel = cleanTitle(cells[0]);
          const contentCell = cells[cells.length - 1];
          const { subHeadings, resources } = extractResourcesFromHtmlCell(contentCell);
          if (!resources.length) return;
          // كل لينك مستقل أصبح "موردًا" تابعًا لدرس واحد يمثل الصف (week) بأكمله،
          // مع الاحتفاظ بأول فيديو يوتيوب كـ videoUrl الأساسي للدرس (متوافق مع بنية lesson)
          const videoRes = resources.find(r => r.kind === 'video');
          lessons.push({
            id: nextLessonId(courseId),
            title: rowLabel || `Row ${rIdx + 1}`,
            duration: '—',
            videoUrl: videoRes ? videoRes.url : '',
            type: videoRes ? 'فيديو' : 'تدريب',
            sourceFile: relFile,
            subHeadings,
            allResources: resources,
          });
        });
        if (lessons.length) {
          courses.push({ id: courseId, title: courseTitle, duration: '—', lessons, sourceFiles: [relFile] });
        }
      });
    }

    // أيضاً نشغّل الـ parser الهرمي العام على كل ملف (يلتقط محتوى خارج الجداول،
    // مثل README الرئيسي لـ Android أو Computer Science أو Embedded Systems،
    // أو الأقسام النصية المحيطة بالجداول في BackEnd/Data Science).
    const genericSections = parseGenericMarkdown(content);
    genericSections.forEach((sec, sIdx) => {
      const courseId = slugify(`${meta.id}-${fileBase}-${sec.title}-${sIdx}`);
      const lessons = sec.lessons.map(l => {
        const videoRes = l.resources.find(r => r.kind === 'video');
        return {
          id: nextLessonId(courseId),
          title: l.title,
          duration: '—',
          videoUrl: videoRes ? videoRes.url : '',
          type: videoRes ? 'فيديو' : (l.resources.length ? 'تدريب' : 'قراءة'),
          sourceFile: relFile,
          allResources: l.resources,
        };
      }).filter(l => l.allResources.length > 0);
      if (lessons.length) {
        courses.push({ id: courseId, title: sec.title, duration: '—', lessons, sourceFiles: [relFile] });
      }
    });
  });

  // إزالة الكورسات المكررة تماماً في العنوان (نفس الملف قد يولّد قسماً
  // بعنوان مطابق لاسم الجدول)، وإزالة الكورسات بلا أي درس
  const seenTitles = new Set();
  const dedupedCourses = [];
  courses.forEach(c => {
    if (!c.lessons.length) return;
    const key = c.id;
    if (seenTitles.has(key)) return;
    seenTitles.add(key);
    dedupedCourses.push(c);
  });

  const totalLessons = dedupedCourses.reduce((s, c) => s + c.lessons.length, 0);
  if (!totalLessons) return null;

  /* فحص جودة المحتوى: بعض الدوائر (English, UI, Media) محتواها الفعلي
     مستضاف بالكامل على Notion خارجياً، والملف داخل المستودع المرجعي ليس
     سوى صفحة تشعيب (رابط Notion واحد + صورة غلاف + اعتمادات/لينكدإن).
     هذا لا يمثل "روادماب" قابلاً للاستيراد فعلياً، فنميّزه كحالة تتطلب
     معالجة يدوية بدل إدخاله كـ track شبه فاضٍ.
     كذلك بعض الملفات الجذرية (مثل BackEnd/README.md) ليست سوى صفحة
     تشعيب لروابط GitHub لمسارات أخرى + قسم اعتمادات/لينكدإن، بلا أي
     فيديو تعليمي حقيقي خاص بها — تُستبعد بنفس المنطق. */
  const allResourceUrls = dedupedCourses.flatMap(c =>
    c.lessons.flatMap(l => (l.allResources || []).map(r => r.url))
  );
  const notionUrls = allResourceUrls.filter(u => /notion\.(so|site)/i.test(u));
  const linkedinUrls = allResourceUrls.filter(u => /linkedin\.com/i.test(u));
  const realVideoUrls = allResourceUrls.filter(u => YT_RE.test(u));
  const isNotionOnlyStub = allResourceUrls.length > 0
    && notionUrls.length > 0
    && realVideoUrls.length === 0
    && totalLessons <= 5;
  const isLinkHubStub = allResourceUrls.length > 0
    && realVideoUrls.length === 0
    && linkedinUrls.length / allResourceUrls.length >= 0.5; // أغلبها روابط أعضاء/شكر

  if (isNotionOnlyStub || isLinkHubStub) {
    return {
      requiresManualHandling: true,
      reason: isNotionOnlyStub
        ? 'المحتوى الفعلي مستضاف بالكامل على Notion خارج المستودع — لا يوجد محتوى Markdown قابل للاستخراج التلقائي'
        : 'الملف صفحة تشعيب لمسارات أخرى + قسم اعتمادات (لينكدإن)، بلا محتوى تعليمي مباشر خاص به',
      circle,
      notionUrls,
      attemptedLessons: totalLessons,
    };
  }

  return {
    id: meta.id,
    title: meta.title,
    subtitle: `مستورد تلقائياً من ${circle} — CATReloaded-Circles-Roadmaps`,
    longDesc: `مسار "${circle}" كما هو موجود في مستودع CAT Reloaded المرجعي (الفرع main). تم استخراج كل المحتوى تلقائياً من ملفات Markdown الأصلية دون أي إضافة يدوية.`,
    level: 'مستورد',
    duration: '—',
    totalLessons,
    icon: '📦',
    color: '#888888',
    coverImage: '',
    sourceCircle: circle,
    sourceRepo: 'https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps/tree/main',
    courses: dedupedCourses,
  };
}

/* =====================================================================
   التشغيل: بناء كل المسارات (tracks) من كل الدوائر المكتشفة
   ===================================================================== */
const importedTracks = [];
const manualHandlingRequired = [];

Object.keys(circleFiles).sort().forEach(circle => {
  const result = buildTrackForCircle(circle, circleFiles[circle]);
  if (!result) {
    console.log(`⚠️  ${circle}: لم يُستخرج أي محتوى قابل للتحويل`);
    manualHandlingRequired.push({
      circle,
      reason: 'لا يوجد أي رابط أو محتوى قابل للاستخراج في ملفات Markdown لهذه الدائرة',
    });
    return;
  }
  if (result.requiresManualHandling) {
    console.log(`🟡 ${circle}: يتطلب معالجة يدوية — ${result.reason}`);
    manualHandlingRequired.push(result);
    return;
  }
  const track = result;
  importedTracks.push(track);
  const totalVideos = track.courses.reduce(
    (s, c) => s + c.lessons.filter(l => l.videoUrl).length, 0
  );
  console.log(`✅ ${circle} → ${track.id}: ${track.courses.length} كورس، ${track.totalLessons} درس، ${totalVideos} فيديو`);
});

/* دوائر/مجلدات لا تحتوي حتى على ملفات .md قابلة للقراءة أصلاً (مثل
   Cloud Computing & DevOps التي هي Git submodule لم يُحمَّل محتواه عبر
   تحميل zip للمستودع) — تُكتشف بفحص شجرة الملفات الكاملة (وليس فقط mdFiles) */
function listTopLevelDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(e => e.isDirectory() && e.name !== '.git')
    .map(e => e.name);
}
const topLevelDirs = listTopLevelDirs(REF_REPO).filter(d => d !== 'img');
topLevelDirs.forEach(dirName => {
  const hasAnyMdAlready = Object.keys(circleFiles).some(k => k === dirName || k.startsWith(dirName + '/'));
  if (hasAnyMdAlready) return;
  const fullPath = path.join(REF_REPO, dirName);
  const innerFiles = walk(fullPath);
  const hasMd = innerFiles.some(f => /\.md$/i.test(f));
  if (!hasMd) {
    manualHandlingRequired.push({
      circle: dirName,
      reason: innerFiles.length === 0
        ? 'مجلد فاضٍ — على الأغلب Git submodule لم يتم تحميل محتواه عند سحب أرشيف المستودع (zip)، يتطلب "git submodule update --init" أو سحب يدوي من رابط المستودع الفرعي'
        : 'لا يحتوي على أي ملف Markdown قابل للتحويل',
      innerFileCount: innerFiles.length,
    });
    console.log(`🟡 ${dirName}: يتطلب معالجة يدوية — مجلد فرعي بلا أي محتوى Markdown (submodule محتمل)`);
  }
});

/* =====================================================================
   بناء الملف الموحد النهائي بصيغة متوافقة مع generate_roadmap_seed.js
   (نفس شكل { id, title, ..., courses:[{id,title,duration,lessons:[...]}]} )
   مع إبقاء حقول إضافية (sourceFile, allResources, subHeadings) كمعلومات
   مرجعية لا تكسر السكريبت الحالي (يقرأ فقط الحقول التي يحتاجها).
   ===================================================================== */
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const unifiedOutput = {
  generatedAt: new Date().toISOString(),
  sourceRepo: 'https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps/tree/main',
  note: 'تم توليد هذا الملف بالكامل تلقائياً عبر import_cat_roadmaps.js — بدون أي بيانات مضافة يدوياً.',
  tracks: importedTracks,
  requiresManualHandling: manualHandlingRequired,
};

fs.writeFileSync(OUTPUT_JSON, JSON.stringify(unifiedOutput, null, 2), 'utf8');

/* =====================================================================
   تقرير ختامي
   ===================================================================== */
const totalCourses = importedTracks.reduce((s, t) => s + t.courses.length, 0);
const totalLessonsCount = importedTracks.reduce((s, t) => s + t.totalLessons, 0);
const totalVideos  = importedTracks.reduce(
  (s, t) => s + t.courses.reduce((s2, c) => s2 + c.lessons.filter(l => l.videoUrl).length, 0), 0
);
const totalResources = importedTracks.reduce(
  (s, t) => s + t.courses.reduce(
    (s2, c) => s2 + c.lessons.reduce((s3, l) => s3 + (l.allResources ? l.allResources.length : 0), 0), 0
  ), 0
);

console.log('\n═══════════════════════════════════════════════════════════');
console.log(' ملخص الاستيراد التلقائي');
console.log('═══════════════════════════════════════════════════════════');
console.log(`📦 عدد المسارات (tracks) المستوردة بنجاح: ${importedTracks.length}`);
console.log(`📚 عدد الكورسات (courses): ${totalCourses}`);
console.log(`📖 عدد الدروس (lessons): ${totalLessonsCount}`);
console.log(`🎥 عدد دروس بها فيديو يوتيوب مباشر: ${totalVideos}`);
console.log(`🔗 عدد الموارد الكلي (فيديو + GitHub + خارجية): ${totalResources}`);
console.log(`🟡 عدد الدوائر التي تتطلب معالجة يدوية: ${manualHandlingRequired.length}`);
manualHandlingRequired.forEach(m => console.log(`     - ${m.circle}: ${m.reason}`));
console.log(`\n📄 الملف الموحد JSON: ${path.relative(ROOT, OUTPUT_JSON)}`);
console.log('   (متوافق للاستخدام المباشر مع generate_roadmap_seed.js بعد ربطه كمصدر بيانات)');
console.log('═══════════════════════════════════════════════════════════');
