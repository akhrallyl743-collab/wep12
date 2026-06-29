#!/usr/bin/env node
/**
 * scripts/generate_final_seed_sql.js
 * ----------------------------------------------------------------------------
 * يجمع كل مصادر المحتوى المستخرَجة فعلياً (scripts/output/cat_parsed/*.json +
 * المعالجات المخصَّصة) في ملف SQL واحد لإدراج/تحديث كامل المحتوى، بصيغة
 * INSERT ... ON CONFLICT DO UPDATE (idempotent بالكامل).
 *
 * يغطي:
 *   - 10 دوائر Tier A عامة (Android, BackEnd[Laravel/NodeJS/Spring],
 *     Cloud/DevOps, Computer Science, Embedded Systems, Flutter, Front End,
 *     Game Development, iOS) — من المحرك العام.
 *   - BackEnd/DotNet (معالجة مخصَّصة برمجية، Week-by-Week دقيق).
 *   - Data Science (معالجة مخصَّصة يدوية).
 *   - CyberSecurity: roadmap رئيسي حقيقي + 5 Shell roadmaps مستقلة.
 *   - English / Media / UI_UX: Shell roadmaps (Section "المحتوى الرسمي" +
 *     Step واحد بعنوان حرفي من المرجع).
 *
 * ترتيب الموارد: كل مورد يحصل على display_order_in_topic (1=فيديو، 2=توثيق
 * رسمي، 3=تطبيق عملي، 4=مشروع، 5=تحدي) بحسب تصنيفه الآلي.
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const PARSED_DIR = path.join(__dirname, 'output', 'cat_parsed');
const CATEGORY_MAP = JSON.parse(fs.readFileSync(path.join(__dirname, '.sync_categories_map.json'), 'utf8'));
const AR_TITLES = JSON.parse(fs.readFileSync(path.join(__dirname, 'output', 'arabic_translation_map.json'), 'utf8'));
function arTitle(titleEn) { return AR_TITLES[titleEn] || null; }

function esc(v) {
  if (v === null || v === undefined || v === '') return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'item';
}

// ── تصنيف المورد (نفس منطق parse_cat_reloaded.js، مُعاد هنا للاستقلالية) ──
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
  if (/notion\.so|notion\.site/i.test(url)) return 'external_article';
  if (/leetcode\.com|hackerrank\.com|frontendmentor\.io|codewars\.com|exercism\.org/i.test(url)) return 'challenge';
  if (/forms\.gle|docs\.google\.com\/forms/i.test(url) || /\b(exam|quiz|test)\b/i.test(title || '')) return 'external_exam';
  if (/docs\.|developer\.|documentation|readthedocs|official/i.test(url) || /\bdocs?\b/i.test(title || '')) return 'official_docs';
  if (/drive\.google\.com/i.test(url) && /task|notebook|assignment/i.test(title || '')) return 'practice';
  return 'external_article';
}
// ترتيب العرض الخماسي الثابت المطلوب: 1=فيديو، 2=توثيق رسمي، 3=تطبيق عملي، 4=مشروع، 5=تحدي
const KIND_TO_DISPLAY_ORDER = {
  youtube: 1, video: 1,
  official_docs: 2, github_repo: 2,
  practice: 3,
  external_exam: 4, // مشروع/تكليف تطبيقي تابع غالباً لمسار "Tasks" — يلي التطبيق العملي
  challenge: 5,
  external_article: 2, pdf: 2, article: 2, cheatsheet: 2, notes: 2, doc_summary: 2, tutorial: 2
};

function resourceOrderKey(kind) {
  return KIND_TO_DISPLAY_ORDER[kind] || 2;
}

// ── عناوين عربية للمسارات نفسها (roadmaps) ─────────────────────────────────
const ROADMAP_TITLES_AR = {
  'cat-android': 'مسار Android (CAT Reloaded)',
  'cat-backend-laravel': 'مسار Backend — Laravel (CAT Reloaded)',
  'cat-backend-nodejs': 'مسار Backend — NodeJS (CAT Reloaded)',
  'cat-backend-spring': 'مسار Backend — Spring (CAT Reloaded)',
  'cat-backend-dotnet': 'مسار Backend — DotNet (CAT Reloaded)',
  'cat-cloud-devops': 'مسار الحوسبة السحابية وDevOps (CAT Reloaded)',
  'cat-computer-science': 'مسار علوم الحاسب (CAT Reloaded)',
  'cat-cybersecurity': 'مسار الأمن السيبراني (CAT Reloaded)',
  'cat-cybersecurity-pentest': 'مسار اختبار الاختراق (CAT Reloaded)',
  'cat-cybersecurity-re-malware': 'مسار الهندسة العكسية وتحليل البرمجيات الخبيثة (CAT Reloaded)',
  'cat-cybersecurity-network-security': 'مسار أمن الشبكات (CAT Reloaded)',
  'cat-cybersecurity-soc-dfir': 'مسار محلل SOC والتحقيق الجنائي الرقمي (CAT Reloaded)',
  'cat-cybersecurity-cryptography': 'مسار التشفير (CAT Reloaded)',
  'cat-data-science': 'مسار علوم البيانات (CAT Reloaded)',
  'cat-embedded-systems': 'مسار الأنظمة المدمجة (CAT Reloaded)',
  'cat-flutter': 'مسار Flutter (CAT Reloaded)',
  'cat-frontend': 'مسار Front End (CAT Reloaded)',
  'cat-frontend-core': 'مسار Front End — الأساسيات المتقدمة (CAT Reloaded)',
  'cat-frontend-angular': 'مسار Front End — تخصص Angular (CAT Reloaded)',
  'cat-frontend-react': 'مسار Front End — تخصص React (CAT Reloaded)',
  'cat-frontend-vue': 'مسار Front End — تخصص Vue (CAT Reloaded)',
  'cat-gamedev': 'مسار تطوير الألعاب (CAT Reloaded)',
  'cat-ios': 'مسار iOS (CAT Reloaded)',
  'cat-english': 'مسار اللغة الإنجليزية (CAT Reloaded)',
  'cat-media': 'مسار الميديا (CAT Reloaded)',
  'cat-ui-ux': 'مسار UI/UX (CAT Reloaded)',
};
function roadmapTitleAr(slug) { return ROADMAP_TITLES_AR[slug] || null; }

const ROADMAP_DESC_AR = {
  'cat-cybersecurity': 'مقدمة شاملة عن مجالات الأمن السيبراني الرئيسية والمهارات الأساسية المطلوبة قبل التخصص.',
  'cat-cybersecurity-pentest': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي (Notion/Drive) ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-cybersecurity-re-malware': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي (Notion/Drive) ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-cybersecurity-network-security': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي (Notion) ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-cybersecurity-soc-dfir': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي (Notion/Drive) ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-cybersecurity-cryptography': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي (Notion) ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-english': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-media': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-ui-ux': 'هذا المسار مُستضاف بالكامل على المصدر الرسمي الخارجي (Notion) ضمن مرجع CAT Reloaded. اضغط على الرابط أدناه للوصول إلى خريطة الطريق الكاملة.',
  'cat-cloud-devops': 'مسار شامل للحوسبة السحابية وDevOps يغطي أساسيات Linux والشبكات ومزوّدي الخدمات السحابية.',
  'cat-data-science': 'مسار علوم البيانات الكامل من الأساسيات (إحصاء وبايثون) وصولاً للتعلّم العميق ونماذج اللغة الكبيرة.',
};
function roadmapDescAr(slug) { return ROADMAP_DESC_AR[slug] || null; }

const out = [];
function emit(line) { out.push(line); }

// ── تحميل خريطة الفئات (نفس الخريطة المعتمدة سابقاً في هذه المحادثة) ───────
const circleToCategory = CATEGORY_MAP.circleToCategory;
const categoryOrderList = CATEGORY_MAP.categoryOrder;

const idToCircleTop = {
  'cat-android': 'Android',
  'cat-backend-dotnet': 'BackEnd',
  'cat-backend-laravel': 'BackEnd',
  'cat-backend-nodejs': 'BackEnd',
  'cat-backend-spring': 'BackEnd',
  'cat-cloud-devops': 'Cloud Computing & DevOps',
  'cat-computer-science': 'Computer Science',
  'cat-cybersecurity': 'CyberSecurity',
  'cat-cybersecurity-pentest': 'CyberSecurity',
  'cat-cybersecurity-re-malware': 'CyberSecurity',
  'cat-cybersecurity-network-security': 'CyberSecurity',
  'cat-cybersecurity-soc-dfir': 'CyberSecurity',
  'cat-cybersecurity-cryptography': 'CyberSecurity',
  'cat-data-science': 'Data Science',
  'cat-embedded-systems': 'Embedded Systems',
  'cat-flutter': 'Flutter',
  'cat-frontend': 'Front End',
  'cat-gamedev': 'Game Development',
  'cat-ios': 'IOS',
  'cat-english': 'English',
  'cat-media': 'Media',
  'cat-ui-ux': 'UI',
};

// ── جمع كل المسارات (roadmap) من كل المصادر في بنية موحَّدة واحدة ──────────
// كل عنصر: { slug, title, circle, sections: [{title, topics:[{title, resources:[{title,url}]}]}] }
const allRoadmaps = [];

function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(PARSED_DIR, name), 'utf8'));
}

// خريطة: اسم دائرة (folder المرجع) -> slug المسار الرئيسي (1:1 معروفة من الجلسات السابقة)
const idToCircleData = {
  'Android': 'cat-android',
  'Computer Science': 'cat-computer-science',
  'Embedded Systems': 'cat-embedded-systems',
  'Cloud Computing & DevOps': 'cat-cloud-devops',
  'Game Development': 'cat-gamedev',
  'IOS': 'cat-ios',
  'Front End': 'cat-frontend',
};

// ── 1) المحرك العام: 9 دوائر (Android..iOS باستثناء BackEnd/CyberSecurity/DataScience الخاصة) ──
const GENERAL_FILES = {
  'Android.json': { slug: 'cat-android', title: 'Android Roadmap (CAT Reloaded)', circle: 'Android' },
  'ComputerScience.json': { slug: 'cat-computer-science', title: 'Computer Science Roadmap (CAT Reloaded)', circle: 'Computer Science' },
  'CloudComputing_DevOps.json': { slug: 'cat-cloud-devops', title: 'Cloud Computing & DevOps Roadmap (CAT Reloaded)', circle: 'Cloud Computing & DevOps' },
  'EmbeddedSystems.json': { slug: 'cat-embedded-systems', title: 'Embedded Systems Roadmap (CAT Reloaded)', circle: 'Embedded Systems' },
  'Flutter.json': { slug: 'cat-flutter', title: 'Flutter Roadmap (CAT Reloaded)', circle: 'Flutter' },
  'GameDevelopment.json': { slug: 'cat-gamedev', title: 'Game Development Roadmap (CAT Reloaded)', circle: 'Game Development' },
  'iOS.json': { slug: 'cat-ios', title: 'iOS Roadmap (CAT Reloaded)', circle: 'IOS' },
};

Object.entries(GENERAL_FILES).forEach(([file, meta]) => {
  const data = readJson(file);
  const sections = [];
  data.tracks.forEach(t => {
    t.sections.forEach(s => sections.push(s));
  });
  allRoadmaps.push({ slug: meta.slug, title_en: meta.title, circle: meta.circle, cat_source_path: meta.circle, track_group: null, sections });
});

// ── 2) Front End: عدة tracks (foundation/core مشتركة + 3 تخصصات) — track_group مشترك ──
{
  const data = readJson('FrontEnd.json');
  data.tracks.forEach(t => {
    const isSpecialization = /angular|react|vue/i.test(t.source_file);
    let slug = 'cat-frontend';
    let title = 'Front End Roadmap (CAT Reloaded)';
    if (isSpecialization) {
      const m = t.source_file.match(/roadmap-03-(\w+)/i);
      const spec = m ? m[1] : 'specialization';
      slug = 'cat-frontend-' + spec;
      title = 'Front End — ' + spec.charAt(0).toUpperCase() + spec.slice(1) + ' Specialization (CAT Reloaded)';
    } else if (/foundation/i.test(t.source_file)) {
      slug = 'cat-frontend'; title = 'Front End Roadmap — Foundation (CAT Reloaded)';
    } else if (/core/i.test(t.source_file)) {
      slug = 'cat-frontend-core'; title = 'Front End Roadmap — Core (CAT Reloaded)';
    } else if (/readme/i.test(t.source_file)) {
      slug = 'cat-frontend'; title = 'Front End Roadmap (CAT Reloaded)';
    }
    const existing = allRoadmaps.find(r => r.slug === slug);
    if (existing) {
      existing.sections.push(...t.sections);
    } else {
      allRoadmaps.push({ slug, title_en: title, circle: 'Front End', cat_source_path: t.source_file, track_group: 'cat-frontend-group', sections: [...t.sections] });
    }
  });
}

// ── 3) BackEnd: 3 لغات عامة (Laravel/NodeJS/Spring) من المحرك العام + DotNet المخصَّص ──
{
  const data = readJson('BackEnd.json');
  const byLang = {};
  data.tracks.forEach(t => {
    const m = t.source_file.match(/BackEnd\/(\w+)\//);
    const lang = m ? m[1] : 'Other';
    if (!byLang[lang]) byLang[lang] = [];
    byLang[lang].push(...t.sections);
  });
  Object.entries(byLang).forEach(([lang, sections]) => {
    const slug = 'cat-backend-' + lang.toLowerCase();
    allRoadmaps.push({ slug, title_en: 'BackEnd — ' + lang + ' Roadmap (CAT Reloaded)', circle: 'BackEnd', cat_source_path: 'BackEnd/' + lang, track_group: 'cat-backend-group', sections });
  });

  const dotnet = readJson('BackEnd_DotNet_override.json');
  allRoadmaps.push({
    slug: 'cat-backend-dotnet', title_en: 'BackEnd — DotNet Roadmap (CAT Reloaded)', circle: 'BackEnd',
    cat_source_path: 'BackEnd/DotNet/README.md', track_group: 'cat-backend-group',
    sections: dotnet.tracks[0].sections
  });
}

// ── 4) Data Science (معالجة مخصَّصة) ────────────────────────────────────────
{
  const data = readJson('DataScience.json');
  allRoadmaps.push({ slug: 'cat-data-science', title_en: 'Data Science Roadmap 2025 (CAT Reloaded)', circle: 'Data Science', cat_source_path: 'Data Science/README.md', track_group: null, sections: data.tracks[0].sections });
}

// ── 5) CyberSecurity: روادماب رئيسي + 5 Shell ──────────────────────────────
{
  const data = readJson('CyberSecurity.json');
  const main = data.main_roadmap.tracks[0];
  allRoadmaps.push({ slug: main.roadmap_slug, title_en: main.title_en, circle: 'CyberSecurity', cat_source_path: 'CyberSecurity/README.md', track_group: null, sections: main.sections });

  data.shell_sub_roadmaps.forEach(sub => {
    allRoadmaps.push({
      slug: sub.roadmap_slug, title_en: sub.title_en, circle: 'CyberSecurity',
      cat_source_path: 'CyberSecurity/README.md', track_group: 'cat-cybersecurity-group',
      is_shell: true,
      shell_section_title_en: sub.shell_section_title_en,
      shell_step_title_en: sub.shell_step_title_en,
      shell_resources: sub.resources
    });
  });
}

// ── 6) English / Media / UI_UX: Shell roadmaps فردية ────────────────────────
const SHELL_SINGLE_FILES = {
  'English.json': { slug: 'cat-english', title: 'English Circle Roadmap (CAT Reloaded)', circle: 'English' },
  'Media.json': { slug: 'cat-media', title: 'Media Circle Roadmap (CAT Reloaded)', circle: 'Media' },
  'UI_UX.json': { slug: 'cat-ui-ux', title: 'UI/UX Circle Roadmap (CAT Reloaded)', circle: 'UI' },
};
Object.entries(SHELL_SINGLE_FILES).forEach(([file, meta]) => {
  const data = readJson(file);
  const allLinks = [];
  data.tracks.forEach(t => t.sections.forEach(s => s.topics.forEach(tp => allLinks.push(...tp.resources))));
  const firstTopicTitle = data.tracks[0]?.sections[0]?.topics[0]?.title_en || meta.title;
  allRoadmaps.push({
    slug: meta.slug, title_en: meta.title, circle: meta.circle, cat_source_path: meta.circle, track_group: null,
    is_shell: true, shell_section_title_en: 'المحتوى الرسمي', shell_step_title_en: firstTopicTitle, shell_resources: allLinks
  });
});

// ════════════════════════════════════════════════════════════════════════════
// توليد SQL
// ════════════════════════════════════════════════════════════════════════════

// ── الفئات (categories) — نفس الـ11 المعتمدة سابقاً + Cloud/DevOps منشورة فعلياً ضمنها (كانت أصلاً Tier A) ──
const populatedCircles = new Set();
allRoadmaps.forEach(r => populatedCircles.add(r.circle));
// تطبيع: IOS<->iOS قد يختلف الإملاء بين خريطة الفئات والبيانات؛ نطابق case-insensitive
function findCategoryForCircle(circle) {
  const direct = circleToCategory[circle];
  if (direct) return direct;
  const key = Object.keys(circleToCategory).find(k => k.toLowerCase() === String(circle).toLowerCase());
  return key ? circleToCategory[key] : circle;
}

const categoriesUsed = new Map(); // title -> order
categoryOrderList.forEach((c, idx) => categoriesUsed.set(c, idx + 1));
// إضافة English/Media/UI كفئات حقيقية الآن (لها محتوى Shell فعلي بقرار هذه الجلسة)
['English', 'Media', 'UI'].forEach(c => { if (!categoriesUsed.has(c)) categoriesUsed.set(c, categoriesUsed.size + 1); });

emit('-- ════════════════════════════════════════════════════════════════');
emit('-- DATA SECTION — مولَّد آلياً من scripts/generate_final_seed_sql.js');
emit('-- لا تُعدَّل يدوياً — أعد التشغيل لتحديثه من المصدر');
emit('-- ════════════════════════════════════════════════════════════════');
emit('');
const CATEGORY_TITLES_AR = {
  'Android': 'تطوير Android',
  'BackEnd': 'تطوير الواجهة الخلفية (Backend)',
  'Cloud Computing & DevOps': 'الحوسبة السحابية وDevOps',
  'Computer Science': 'علوم الحاسب',
  'CyberSecurity': 'الأمن السيبراني',
  'Data Science': 'علوم البيانات',
  'Embedded Systems': 'الأنظمة المدمجة',
  'Flutter': 'تطوير Flutter',
  'Front End': 'تطوير الواجهة الأمامية (Front End)',
  'Game Development': 'تطوير الألعاب',
  'IOS': 'تطوير iOS',
  'English': 'اللغة الإنجليزية',
  'Media': 'الميديا',
  'UI': 'تصميم UI/UX',
};

emit('-- ── 1) الفئات ──────────────────────────────────────────────────────');
let catOrder = 0;
Array.from(categoriesUsed.keys()).forEach(catTitle => {
  catOrder++;
  const catSlug = slugify(catTitle);
  const catTitleAr = CATEGORY_TITLES_AR[catTitle] || null;
  emit(`INSERT INTO public.categories (slug, title, title_ar, category_order, source, archived)\n` +
    `VALUES (${esc(catSlug)}, ${esc(catTitle)}, ${esc(catTitleAr)}, ${catOrder}, 'cat_reloaded', FALSE)\n` +
    `ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, title_ar = EXCLUDED.title_ar, category_order = EXCLUDED.category_order, updated_at = now();`);
});
emit('');

let roadmapOrder = 0;
allRoadmaps.forEach(r => {
  roadmapOrder++;
  const catTitle = findCategoryForCircle(r.circle);
  const catSlug = slugify(catTitle);

  emit(`-- ── مسار: ${r.slug} ──────────────────────────────────`);
  emit(`INSERT INTO public.roadmaps (slug, title, title_ar, description_ar, category_id, roadmap_order, order_index, source, archived, is_published, cat_source_path, track_group)\n` +
    `SELECT ${esc(r.slug)}, ${esc(r.title_en)}, ${esc(roadmapTitleAr(r.slug))}, ${esc(roadmapDescAr(r.slug))}, c.id, ${roadmapOrder}, ${roadmapOrder}, 'cat_reloaded', FALSE, TRUE, ${esc(r.cat_source_path)}, ${esc(r.track_group)}\n` +
    `FROM public.categories c WHERE c.slug = ${esc(catSlug)}\n` +
    `ON CONFLICT (slug) DO UPDATE SET\n` +
    `  title = EXCLUDED.title, title_ar = EXCLUDED.title_ar, description_ar = EXCLUDED.description_ar, category_id = EXCLUDED.category_id,\n` +
    `  roadmap_order = EXCLUDED.roadmap_order, order_index = EXCLUDED.order_index,\n` +
    `  cat_source_path = EXCLUDED.cat_source_path, track_group = EXCLUDED.track_group,\n` +
    `  archived = FALSE, is_published = TRUE, updated_at = now();`);

  if (r.is_shell) {
    // ── Roadmap Shell: Section واحدة ثابتة "المحتوى الرسمي" + Step واحد فقط ──
    const sectionSlug = 'official-content';
    emit(`INSERT INTO public.roadmap_sections (roadmap_id, slug, title, title_ar, stage_type, section_order, order_index, archived)\n` +
      `SELECT rm.id, ${esc(sectionSlug)}, ${esc(r.shell_section_title_en || 'Official Content')}, 'المحتوى الرسمي', 'core_skills', 1, 1, FALSE\n` +
      `FROM public.roadmaps rm WHERE rm.slug = ${esc(r.slug)}\n` +
      `ON CONFLICT (roadmap_id, slug) DO UPDATE SET title = EXCLUDED.title, title_ar = EXCLUDED.title_ar, archived = FALSE;`);

    const legacyId = 'official-content__s001';
    emit(`INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, lesson_order, order_index, archived)\n` +
      `SELECT sec.id, ${esc(legacyId)}, ${esc(r.shell_step_title_en)}, 'reading'::roadmap_step_type, 1, 1, FALSE\n` +
      `FROM public.roadmap_sections sec JOIN public.roadmaps rm ON rm.id = sec.roadmap_id\n` +
      `WHERE rm.slug = ${esc(r.slug)} AND sec.slug = ${esc(sectionSlug)}\n` +
      `ON CONFLICT (section_id, legacy_lesson_id) DO UPDATE SET title = EXCLUDED.title, archived = FALSE;`);

    (r.shell_resources || []).forEach((res, idx) => {
      const kind = classifyResourceKind(res.url, res.title);
      const dispOrder = resourceOrderKey(kind);
      emit(`INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index, display_order_in_topic, archived)\n` +
        `SELECT st.id, 'external', ${esc(kind)}::resource_kind, ${esc(res.title)}, ${esc(res.url)}, ${idx + 1}, ${dispOrder}, FALSE\n` +
        `FROM public.roadmap_steps st\n` +
        `JOIN public.roadmap_sections sec ON sec.id = st.section_id\n` +
        `JOIN public.roadmaps rm ON rm.id = sec.roadmap_id\n` +
        `WHERE rm.slug = ${esc(r.slug)} AND sec.slug = ${esc(sectionSlug)} AND st.legacy_lesson_id = ${esc(legacyId)}\n` +
        `ON CONFLICT (step_id, order_index) DO UPDATE SET kind = EXCLUDED.kind, title = EXCLUDED.title, external_url = EXCLUDED.external_url, archived = FALSE;`);
    });
  } else {
    // ── مسار Tier A كامل: sections -> topics(steps) -> resources ──────────
    r.sections.forEach((section, sIdx) => {
      const sectionOrder = sIdx + 1;
      const sectionSlug = slugify(section.title_en) + '-' + sectionOrder;
      emit(`INSERT INTO public.roadmap_sections (roadmap_id, slug, title, title_ar, stage_type, section_order, order_index, archived)\n` +
        `SELECT rm.id, ${esc(sectionSlug)}, ${esc(section.title_en)}, ${esc(arTitle(section.title_en))}, 'core_skills', ${sectionOrder}, ${sectionOrder}, FALSE\n` +
        `FROM public.roadmaps rm WHERE rm.slug = ${esc(r.slug)}\n` +
        `ON CONFLICT (roadmap_id, slug) DO UPDATE SET title = EXCLUDED.title, title_ar = EXCLUDED.title_ar, section_order = EXCLUDED.section_order, order_index = EXCLUDED.order_index, archived = FALSE;`);

      section.topics.forEach((topic, tIdx) => {
        const lessonOrder = tIdx + 1;
        const legacyId = sectionSlug + '__s' + String(lessonOrder).padStart(3, '0');
        emit(`INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, title_ar, step_type, lesson_order, order_index, archived)\n` +
          `SELECT sec.id, ${esc(legacyId)}, ${esc(topic.title_en)}, ${esc(arTitle(topic.title_en))}, 'reading'::roadmap_step_type, ${lessonOrder}, ${lessonOrder}, FALSE\n` +
          `FROM public.roadmap_sections sec JOIN public.roadmaps rm ON rm.id = sec.roadmap_id\n` +
          `WHERE rm.slug = ${esc(r.slug)} AND sec.slug = ${esc(sectionSlug)}\n` +
          `ON CONFLICT (section_id, legacy_lesson_id) DO UPDATE SET title = EXCLUDED.title, title_ar = EXCLUDED.title_ar, lesson_order = EXCLUDED.lesson_order, order_index = EXCLUDED.order_index, archived = FALSE;`);

        (topic.resources || []).forEach((res, rIdx) => {
          const kind = classifyResourceKind(res.url, res.title);
          const dispOrder = resourceOrderKey(kind);
          emit(`INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index, display_order_in_topic, archived)\n` +
            `SELECT st.id, 'external', ${esc(kind)}::resource_kind, ${esc(res.title)}, ${esc(res.url)}, ${rIdx + 1}, ${dispOrder}, FALSE\n` +
            `FROM public.roadmap_steps st\n` +
            `JOIN public.roadmap_sections sec ON sec.id = st.section_id\n` +
            `JOIN public.roadmaps rm ON rm.id = sec.roadmap_id\n` +
            `WHERE rm.slug = ${esc(r.slug)} AND sec.slug = ${esc(sectionSlug)} AND st.legacy_lesson_id = ${esc(legacyId)}\n` +
            `ON CONFLICT (step_id, order_index) DO UPDATE SET kind = EXCLUDED.kind, title = EXCLUDED.title, external_url = EXCLUDED.external_url, archived = FALSE;`);
        });
      });
    });
  }
  emit('');
});

fs.writeFileSync(path.join(__dirname, 'output', 'final_seed_data.sql'), out.join('\n'), 'utf8');
console.log('✅ ملف SQL النهائي مكتوب: scripts/output/final_seed_data.sql');
console.log('   عدد المسارات:', allRoadmaps.length, '| منها Shell:', allRoadmaps.filter(r => r.is_shell).length);
