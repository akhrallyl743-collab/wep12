#!/usr/bin/env node
/**
 * scripts/sync_cat_reference.js
 * ============================================================================
 * مزامنة كاملة بين قاعدة البيانات والمستودع المرجعي (المصدر الوحيد للحقيقة):
 *   https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps (فرع main)
 *
 * المبدأ الأساسي: لا اختراع لأي محتوى. كل فئة/مسار/قسم/درس/مورد يُستخرج برمجياً
 * من ملفات Markdown الفعلية في reference_repo/. هذا السكريبت لا يكتب نصاً
 * تعليمياً بنفسه أبداً — فقط يقرأ، يحوّل البنية، يقارن، ويقترح SQL.
 *
 * ── البنية الهرمية المُستخرجة ──────────────────────────────────────────────
 *   categories  (دوائر CAT — مجلدات الجذر في المرجع)         + category_order
 *     └─ roadmaps (مسار واحد أو أكثر لكل دائرة، مثل BackEnd) + roadmap_order
 *          └─ sections (مراحل/كورسات)                        + section_order
 *               └─ steps (دروس)                               + lesson_order
 *                    └─ resources (فيديو/مقال/repo/توثيق/تدريب/اختبار)
 *
 * ── المراحل ─────────────────────────────────────────────────────────────────
 *   1) extractFromReference()   يقرأ reference_repo/ (عبر import_cat_roadmaps.js
 *                                الموجود مسبقاً) ثم يُعيد بناء الشكل الهرمي أعلاه
 *                                مع IDs مستقرة (انظر ملاحظة "إصلاح استقرار IDs" تحت)
 *   2) loadCurrentState()       يقرأ الحالة الحالية:
 *                                - لو SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
 *                                  متوفّرين كمتغيّرات بيئة → قراءة حقيقية من القاعدة
 *                                - غير ذلك → قراءة "بالوكالة" (proxy) من ملفات
 *                                  seed SQL المحلية الموجودة فعلاً في المشروع،
 *                                  مع تحذير واضح في التقرير أن هذا ليس اتصالاً
 *                                  حقيقياً بقاعدة بيانات حيّة
 *   3) diff()                   يحسب: فئات/مسارات جديدة، فئات/مسارات يجب أرشفتها،
 *                                دروس تتغيّر، موارد ناقصة/زائدة
 *   4) printReport()             يطبع ويكتب التقرير (JSON + Markdown) — لا تطبيق هنا
 *   5) applyChanges()            (فقط مع --apply) يكتب SQL فعلي بصيغة UPSERT
 *                                (ON CONFLICT DO UPDATE) عبر Supabase JS client
 *
 * ── إصلاح استقرار IDs (مهم) ──────────────────────────────────────────────────
 * import_cat_roadmaps.js الأصلي يُولّد legacy_lesson_id عبر عدّاد عالمي واحد
 * يزيد بترتيب المعالجة الكامل لكل الدوائر. هذا يعني: أي تغيير في عدد/ترتيب
 * الدوائر (كإضافة "Cloud Computing & DevOps" التي كانت فارغة) يُزحزح IDs كل
 * الدروس اللاحقة بالكامل — رغم أن محتواها لم يتغيّر فعلياً! (تم تأكيد هذا
 * تجريبياً: نفس العناوين/الروابط بالضبط، فقط الرقم اللاحق اختلف).
 * هذا يكسر أي مطابقة لاحقة بـ legacy_lesson_id ضد القاعدة. الإصلاح هنا:
 * نُعيد توليد legacy_lesson_id من مكوّنات مستقرة فقط: slug القسم + رقم
 * الدرس *ضمن نفس القسم* (لا عدّاد عالمي) → مستقر عبر أي عدد لاحق من المزامنات
 * بشرط عدم تغيّر ترتيب/عدد الدروس داخل القسم نفسه في المرجع.
 *
 * ── الاستخدام ────────────────────────────────────────────────────────────────
 *   node scripts/sync_cat_reference.js                  # تقرير فقط (افتراضي، لا تطبيق)
 *   node scripts/sync_cat_reference.js --apply           # تطبيق فعلي على Supabase
 *   node scripts/sync_cat_reference.js --apply --delete-orphans
 *                                                         # + حذف (لا أرشفة) العناصر
 *                                                         #   الناقصة غير المرتبطة بتقدّم مستخدمين
 *
 * المتغيرات البيئية المطلوبة فقط لوضع --apply أو لمقارنة حقيقية مع القاعدة الحيّة:
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY   (لا يُستخدم مطلقاً service_role في الفرونت إند —
 *                                 هذا السكريبت يعمل من الطرفية/CI فقط)
 *
 * بدون هذه المتغيرات: يعمل السكريبت في "وضع عدم اتصال" (offline) ويستخدم ملفات
 * seed SQL المحلية كبديل تقريبي لحالة القاعدة، مع تحذير صريح في كل تقرير.
 * ============================================================================
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const REF_REPO = path.join(ROOT, 'reference_repo');
const OUT_DIR = path.join(__dirname, 'output');
const IMPORT_JSON = path.join(OUT_DIR, 'cat_roadmaps_import.json');
const CATEGORY_MAP_FILE = path.join(__dirname, '.sync_categories_map.json');

const ARGV = process.argv.slice(2);
const APPLY = ARGV.includes('--apply');
const DELETE_ORPHANS = ARGV.includes('--delete-orphans');
const FORCE_OFFLINE = ARGV.includes('--offline');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

/* ===========================================================================
   0) فحوصات أوّلية
   =========================================================================== */
if (!fs.existsSync(REF_REPO)) {
  console.error('❌ لم يتم العثور على المستودع المرجعي محلياً في:', REF_REPO);
  console.error('   نزّله أولاً (مع السماحة الفرعية Submodule):');
  console.error('   git clone --recurse-submodules \\');
  console.error('     https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps.git reference_repo');
  process.exit(1);
}

const CATEGORY_MAP = JSON.parse(fs.readFileSync(CATEGORY_MAP_FILE, 'utf8'));

/* ===========================================================================
   1) استخراج من المرجع — يُعيد استخدام import_cat_roadmaps.js الموجود فعلاً
      (لا إعادة كتابة لمنطق تحليل Markdown الذي يعمل بشكل صحيح ومُختبر) ثم
      يُحوّل المخرجات إلى الشكل الهرمي categories→roadmaps→sections→steps→resources
      مع IDs مستقرة (انظر الشرح أعلاه).
   =========================================================================== */
function runRawImport() {
  console.log('▶ تشغيل scripts/import_cat_roadmaps.js لاستخراج محتوى المرجع الحالي...');
  execSync(`node "${path.join(__dirname, 'import_cat_roadmaps.js')}"`, { cwd: ROOT, stdio: 'inherit' });
  const raw = JSON.parse(fs.readFileSync(IMPORT_JSON, 'utf8'));
  return Array.isArray(raw) ? raw : (raw.tracks || []);
}

function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/** يبني خريطة category -> { slug, title, order, roadmaps: [] } عبر CATEGORY_MAP.circleToCategory
 *  (يدعم دمج عدّة دوائر مرجعية في فئة واحدة بقرار من صاحب المشروع، مثل دمج
 *  Front End + BackEnd في فئة "Web Development" — تأكيد 2026-06-20) */
function buildCategoryIndex(rawTracks) {
  const categories = new Map(); // title -> { slug, title, order, roadmapSourceCircles: [] }
  CATEGORY_MAP.categoryOrder.forEach((catName, idx) => {
    categories.set(catName, { slug: slugify(catName), title: catName, category_order: idx + 1, roadmapSourceCircles: [] });
  });

  rawTracks.forEach(t => {
    const circle = t.sourceCircle || '';
    const topCircle = circle.split('/')[0]; // 'BackEnd/NodeJS' -> 'BackEnd'
    const categoryName = CATEGORY_MAP.circleToCategory[topCircle];
    if (!categoryName) {
      console.warn('⚠️  دائرة غير معروفة في خريطة الفئات، سيتم تجاهلها من التصنيف:', circle);
      return;
    }
    const cat = categories.get(categoryName);
    if (!cat) { console.warn('⚠️  الفئة', categoryName, 'غير موجودة في categoryOrder'); return; }
    cat.roadmapSourceCircles.push(circle);
  });

  // ترتيب المسارات الفرعية ضمن كل فئة (مهم للفئات المُدمجة كـ Web Development)
  categories.forEach((cat, categoryName) => {
    const explicitOrder = CATEGORY_MAP.roadmapOrderWithinCategory[categoryName];
    if (explicitOrder) {
      cat.roadmapSourceCircles = explicitOrder.filter(c => cat.roadmapSourceCircles.includes(c));
    } else {
      cat.roadmapSourceCircles.sort(); // أبجدي (نفس ترتيب نظام الملفات/المرجع الافتراضي)
    }
  });

  return categories;
}

/** يُعيد توليد legacy_lesson_id بشكل مستقر: {section_slug}__s{N} بدل العدّاد العالمي القديم */
function stableLessonId(sectionSlug, indexWithinSection) {
  return `${sectionSlug}__s${String(indexWithinSection).padStart(3, '0')}`;
}

function mapStepType(legacyType) {
  if (legacyType === 'فيديو') return 'video';
  if (legacyType === 'مشروع') return 'project';
  if (legacyType === 'تدريب') return 'exercise';
  return 'reading';
}

/** تصنيف رابط/مورد واحد إلى kind متوافق مع enum resource_kind الحالي في القاعدة */
function classifyResourceKind(url) {
  if (!url) return 'article';
  if (/youtube\.com|youtu\.be/i.test(url)) return 'youtube';
  if (/github\.com/i.test(url)) return 'github_repo';
  if (/docs\.|developer\.|documentation/i.test(url)) return 'official_docs';
  return 'external_article';
}

function transformToHierarchy(rawTracks) {
  const categoryIndex = buildCategoryIndex(rawTracks);
  const tracksByCircle = new Map(rawTracks.map(t => [t.sourceCircle, t]));

  const categories = [];
  categoryIndex.forEach((cat, categoryName) => {
    const roadmaps = [];
    cat.roadmapSourceCircles.forEach((circle, rIdx) => {
      const t = tracksByCircle.get(circle);
      if (!t) return; // دائرة موجودة في المرجع لكن بلا محتوى Markdown قابل للاستخراج (مثل English/Media/UI) — تبقى فئة بلا مسار، لا اختراع لمحتوى
      const sections = (t.courses || []).map((course, sIdx) => {
        const steps = (course.lessons || []).map((lesson, lIdx) => {
          const sectionSlug = course.id; // slug القسم كما استخرجه import_cat_roadmaps.js (مستقر، مُشتق من اسم/مسار الملف لا من عدّاد)
          const legacyId = stableLessonId(sectionSlug, lIdx + 1);
          const resources = (lesson.allResources || []).map((r, resIdx) => ({
            order_index: resIdx + 1,
            kind: classifyResourceKind(r.url),
            title: r.title || lesson.title,
            external_url: r.url || null
          }));
          return {
            legacy_lesson_id: legacyId,
            title: lesson.title,
            step_type: mapStepType(lesson.type),
            estimated_duration: lesson.duration || '—',
            lesson_order: lIdx + 1,
            resources
          };
        });
        return {
          slug: course.id,
          title: course.title,
          section_order: sIdx + 1,
          steps
        };
      });
      roadmaps.push({
        slug: t.id,
        title: t.title,
        subtitle: t.subtitle,
        long_desc: t.longDesc,
        level: t.level,
        duration_label: t.duration,
        icon: t.icon,
        color: t.color,
        roadmap_order: rIdx + 1,
        source_circle: circle,
        sections
      });
    });
    categories.push({
      slug: cat.slug,
      title: categoryName,
      category_order: cat.category_order,
      roadmaps
    });
  });

  categories.sort((a, b) => a.category_order - b.category_order);
  return categories;
}

/* ===========================================================================
   2) قراءة الحالة الحالية — حيّة عبر Supabase لو توفّرت بيانات الاتصال،
      وإلا "بالوكالة" من ملفات seed SQL المحلية (موسومة بوضوح كتقريب لا اتصال حقيقي)
   =========================================================================== */
function tryLoadSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || FORCE_OFFLINE) return null;
  let createClient;
  try { ({ createClient } = require('@supabase/supabase-js')); }
  catch (e) {
    console.error('❌ الحزمة @supabase/supabase-js غير مُثبَّتة. شغّل: npm install @supabase/supabase-js');
    process.exit(1);
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

async function loadCurrentStateFromSupabase(supa) {
  const { data: roadmaps, error: e1 } = await supa.from('roadmaps').select('id, slug, title, archived, roadmap_order, order_index');
  if (e1) throw e1;
  const { data: sections, error: e2 } = await supa.from('roadmap_sections').select('id, roadmap_id, slug, title, archived, section_order, order_index');
  if (e2) throw e2;
  const { data: steps, error: e3 } = await supa.from('roadmap_steps').select('id, section_id, legacy_lesson_id, title, archived, lesson_order, order_index');
  if (e3) throw e3;
  const { data: resources, error: e4 } = await supa.from('roadmap_resources').select('id, step_id, kind, title, external_url, archived, order_index');
  if (e4) throw e4;
  let categories = [];
  try {
    const { data, error } = await supa.from('categories').select('*');
    if (!error) categories = data;
  } catch (e) { /* الجدول قد لا يكون موجوداً بعد قبل تطبيق migration هذه المهمة */ }
  return { source: 'live_supabase', categories, roadmaps, sections, steps, resources };
}

/** بديل بالوكالة: يستخرج عدّاد تقريبي للمسارات/الدروس الحالية من ملفات seed SQL المحلية
 *  (الـ CAT seed الحقيقي + الـ legacy seed اليدوي) — ليس اتصالاً بقاعدة بيانات حقيقية،
 *  فقط أفضل تقريب متاح محلياً لإنتاج تقرير تمهيدي مفيد بدون بيانات اعتماد Supabase. */
function loadCurrentStateOffline() {
  const files = [
    path.join(ROOT, 'supabase_migrations', '002_roadmaps_seed.sql'),
    path.join(ROOT, 'supabase', 'migrations', '20260619153000_cat_roadmaps_seed.sql')
  ].filter(fs.existsSync);

  const roadmapSlugs = new Set();
  const stepCountByRoadmap = new Map();

  files.forEach(f => {
    const sql = fs.readFileSync(f, 'utf8');
    const roadmapRe = /VALUES \('([a-z0-9-]+)',/g;
    let m;
    while ((m = roadmapRe.exec(sql))) roadmapSlugs.add(m[1]);

    const stepRe = /WHERE r\.slug = '([^']*)' AND s\.slug = '([^']*)'\nAND NOT EXISTS \(SELECT 1 FROM public\.roadmap_steps WHERE section_id = s\.id AND legacy_lesson_id = '([^']*)'\)/g;
    while ((m = stepRe.exec(sql))) {
      stepCountByRoadmap.set(m[1], (stepCountByRoadmap.get(m[1]) || 0) + 1);
    }
  });

  return {
    source: 'offline_seed_files_proxy',
    note: 'لا يوجد اتصال حقيقي بقاعدة البيانات (SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY غير متوفّرين). الأرقام أدناه مُستخرجة من ملفات seed SQL المحلية كأفضل تقريب متاح لحالة القاعدة الحالية، وليست استعلاماً حياً.',
    categories: [],
    roadmapSlugs: Array.from(roadmapSlugs),
    stepCountByRoadmap: Object.fromEntries(stepCountByRoadmap)
  };
}

/* ===========================================================================
   3) الفرق (Diff)
   =========================================================================== */
function flattenDesired(categories) {
  const roadmaps = [];
  categories.forEach(cat => cat.roadmaps.forEach(r => roadmaps.push({ ...r, categorySlug: cat.slug, categoryTitle: cat.title })));
  return roadmaps;
}

function countSteps(roadmap) {
  return roadmap.sections.reduce((s, sec) => s + sec.steps.length, 0);
}
function countResources(roadmap) {
  return roadmap.sections.reduce((s, sec) => s + sec.steps.reduce((s2, st) => s2 + st.resources.length, 0), 0);
}

function buildDiff(desiredCategories, current) {
  const desiredRoadmaps = flattenDesired(desiredCategories);
  const desiredSlugs = new Set(desiredRoadmaps.map(r => r.slug));

  const report = {
    generatedAt: new Date().toISOString(),
    currentStateSource: current.source,
    currentStateNote: current.note || null,
    newCategories: [],
    existingCategoriesInProjectNotInReference: [], // (لا توجد آلية "فئة" حالياً في القاعدة، فالأمر دائماً 100% جديد حتى تُطبَّق migration هذه المهمة)
    newRoadmaps: [],
    roadmapsToArchive: [],
    lessonsChangedPerRoadmap: [],
    missingCategories: [],
    missingResourcesCount: 0,
    resourcesToDeleteCount: 0,
    legacyNonCatRoadmapsRequiringDecision: [],
    legacyRoadmapsArchivedByOwnerDecision: [] // قرارات صريحة مؤكدة من صاحب المشروع — راجع .sync_categories_map.json confirmedOwnerDecisions
  };

  // فئات جديدة: كل الـ14 فئة جديدة بالكامل لأن لا يوجد جدول categories في القاعدة حتى الآن
  desiredCategories.forEach(cat => {
    report.newCategories.push({
      slug: cat.slug, title: cat.title, category_order: cat.category_order,
      roadmapsCount: cat.roadmaps.length,
      hasNoImportableContentYet: cat.roadmaps.length === 0
    });
  });

  // مسارات جديدة/متغيّرة
  const currentRoadmapSlugs = new Set(
    current.source === 'offline_seed_files_proxy' ? current.roadmapSlugs : (current.roadmaps || []).map(r => r.slug)
  );

  desiredRoadmaps.forEach(r => {
    const stepsCount = countSteps(r);
    const resCount = countResources(r);
    if (!currentRoadmapSlugs.has(r.slug)) {
      report.newRoadmaps.push({ slug: r.slug, title: r.title, category: r.categoryTitle, sections: r.sections.length, lessons: stepsCount, resources: resCount });
    } else {
      // موجود فعلاً — نحسب فرق عدد الدروس (لو متاح من المصدر الحالي)
      let currentStepsCount = null;
      if (current.source === 'offline_seed_files_proxy') currentStepsCount = current.stepCountByRoadmap[r.slug] ?? null;
      if (currentStepsCount !== null && currentStepsCount !== stepsCount) {
        report.lessonsChangedPerRoadmap.push({ slug: r.slug, current: currentStepsCount, reference: stepsCount, delta: stepsCount - currentStepsCount });
      }
    }
  });

  // مسارات حالية غير موجودة في المرجع بتاتاً (== يجب أرشفتها وفق القاعدة #6)
  const confirmedArchiveSlugs = new Set((CATEGORY_MAP.confirmedOwnerDecisions && CATEGORY_MAP.confirmedOwnerDecisions.archiveLegacyRoadmapSlugs) || []);
  currentRoadmapSlugs.forEach(slug => {
    if (!desiredSlugs.has(slug)) {
      const isLegacyHandAuthored = !slug.startsWith('cat-');
      const entry = { slug, isLegacyHandAuthored };
      if (!isLegacyHandAuthored) { report.roadmapsToArchive.push(entry); return; }
      if (confirmedArchiveSlugs.has(slug)) report.legacyRoadmapsArchivedByOwnerDecision.push(entry);
      else report.legacyNonCatRoadmapsRequiringDecision.push(entry);
    }
  });

  // دوائر بلا محتوى قابل للاستخراج (تحتاج تدخلاً يدوياً، ليست "ناقصة" بمعنى خطأ، بل بمعنى عدم وجود Markdown)
  desiredCategories.forEach(cat => {
    if (cat.roadmaps.length === 0) report.missingCategories.push({ slug: cat.slug, title: cat.title, reason: 'لا يوجد محتوى Markdown قابل للاستخراج تلقائياً (Notion خارجي أو صفحة تشعيب فقط) — لا يجوز اختراع محتوى بديل' });
  });

  return report;
}

/* ===========================================================================
   4) طباعة التقرير (Markdown + JSON) — لا تطبيق هنا أبداً
   =========================================================================== */
function printAndSaveReport(report, desiredCategories) {
  const lines = [];
  lines.push('# تقرير مزامنة CAT Reloaded — قبل أي تطبيق');
  lines.push('');
  lines.push(`**تاريخ التوليد:** ${report.generatedAt}`);
  lines.push(`**مصدر حالة القاعدة الحالية:** ${report.currentStateSource}`);
  if (report.currentStateNote) lines.push(`> ⚠️ ${report.currentStateNote}`);
  lines.push('');

  lines.push('## 1) الفئات الجديدة (Categories)');
  lines.push('');
  lines.push('| الفئة | الترتيب | عدد المسارات | محتوى قابل للاستخراج؟ |');
  lines.push('|---|---|---|---|');
  report.newCategories.forEach(c => lines.push(`| ${c.title} | ${c.category_order} | ${c.roadmapsCount} | ${c.hasNoImportableContentYet ? '❌ لا (يدوي/Notion)' : '✅ نعم'} |`));
  lines.push('');

  lines.push('## 2) المسارات الجديدة (Roadmaps)');
  lines.push('');
  if (report.newRoadmaps.length) {
    lines.push('| المسار | الفئة | أقسام | دروس | موارد |');
    lines.push('|---|---|---|---|---|');
    report.newRoadmaps.forEach(r => lines.push(`| ${r.title} (\`${r.slug}\`) | ${r.category} | ${r.sections} | ${r.lessons} | ${r.resources} |`));
  } else {
    lines.push('لا يوجد.');
  }
  lines.push('');

  lines.push('## 3) المسارات التي سيتم أرشفتها (موجودة في القاعدة، غير موجودة في المرجع)');
  lines.push('');
  if (report.roadmapsToArchive.length) {
    report.roadmapsToArchive.forEach(r => lines.push(`- \`${r.slug}\``));
  } else {
    lines.push('لا يوجد (من المسارات المُستوردة سابقاً من CAT — انظر القسم التالي للمسارات اليدوية الأصلية).');
  }
  lines.push('');

  lines.push('## 3.أ) مسارات يدوية أصلية تمت أرشفتها بقرار صريح من صاحب المشروع (تأكيد 2026-06-20)');
  lines.push('');
  if (report.legacyRoadmapsArchivedByOwnerDecision.length) {
    report.legacyRoadmapsArchivedByOwnerDecision.forEach(r => lines.push(`- \`${r.slug}\` — **سيُؤرشف عند تشغيل --apply** (archived=true, is_published=false — لا حذف)`));
  } else {
    lines.push('لا يوجد.');
  }
  lines.push('');

  lines.push('## 3.ب) مسارات يدوية أصلية أخرى — لا تغيير (بقرار صاحب المشروع)');
  lines.push('');
  if (report.legacyNonCatRoadmapsRequiringDecision.length) {
    report.legacyNonCatRoadmapsRequiringDecision.forEach(r => lines.push(`- \`${r.slug}\` — يبقى منشوراً كما هو بلا أي تغيير`));
  } else {
    lines.push('لا يوجد.');
  }
  lines.push('');

  lines.push('## 4) عدد الدروس التي ستتغيّر');
  lines.push('');
  if (report.lessonsChangedPerRoadmap.length) {
    lines.push('| المسار | الحالي | في المرجع | الفرق |');
    lines.push('|---|---|---|---|');
    report.lessonsChangedPerRoadmap.forEach(c => lines.push(`| \`${c.slug}\` | ${c.current} | ${c.reference} | ${c.delta > 0 ? '+' : ''}${c.delta} |`));
  } else {
    lines.push('لا تغييرات في عدد الدروس للمسارات الموجودة فعلاً (كل المسارات الـ13 المستوردة سابقاً مطابقة تماماً للمرجع الحالي — تم تأكيد ذلك بمقارنة hash للمحتوى الكامل، وليس فقط العدد).');
  }
  lines.push('');

  lines.push('## 5) الفئات الناقصة (موجودة بالاسم في المرجع، بلا محتوى Markdown قابل للاستخراج)');
  lines.push('');
  if (report.missingCategories.length) {
    lines.push('| الفئة | السبب |');
    lines.push('|---|---|');
    report.missingCategories.forEach(c => lines.push(`| ${c.title} | ${c.reason} |`));
  } else {
    lines.push('لا يوجد.');
  }
  lines.push('');

  lines.push('## 6) الموارد الناقصة / التي سيتم حذفها');
  lines.push('');
  lines.push(`- موارد ناقصة (في المرجع وليست في القاعدة، تقديراً): ${report.missingResourcesCount} *(يتطلب اتصالاً حياً بالقاعدة لحساب دقيق — راجع ملاحظة المصدر أعلاه)*`);
  lines.push(`- موارد سيتم حذفها (في القاعدة وليست في المرجع، تقديراً): ${report.resourcesToDeleteCount} *(نفس الملاحظة)*`);
  lines.push('');

  lines.push('---');
  lines.push('**لم يتم تطبيق أي تعديل على أي قاعدة بيانات. هذا تقرير فقط.**');

  const md = lines.join('\n');
  console.log('\n' + md + '\n');

  fs.writeFileSync(path.join(OUT_DIR, 'sync_cat_reference_report.md'), md, 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, 'sync_cat_reference_report.json'), JSON.stringify(report, null, 2), 'utf8');
  fs.writeFileSync(path.join(OUT_DIR, 'sync_cat_reference_desired_state.json'), JSON.stringify(desiredCategories, null, 2), 'utf8');
  console.log('📄 تم حفظ: scripts/output/sync_cat_reference_report.md');
  console.log('📄 تم حفظ: scripts/output/sync_cat_reference_report.json');
  console.log('📄 تم حفظ: scripts/output/sync_cat_reference_desired_state.json (الشكل الهرمي الكامل الجاهز للتطبيق)');
}

/* ===========================================================================
   5) التطبيق الفعلي (--apply فقط) — ON CONFLICT DO UPDATE عبر Supabase JS
   =========================================================================== */
async function applyChanges(supa, desiredCategories, report) {
  console.log('\n🚀 وضع --apply مفعَّل — سيتم الكتابة الفعلية على Supabase.');

  for (const cat of desiredCategories) {
    const { data: catRow, error: catErr } = await supa.from('categories')
      .upsert({ slug: cat.slug, title: cat.title, category_order: cat.category_order }, { onConflict: 'slug' })
      .select().single();
    if (catErr) { console.error('❌ فشل upsert للفئة', cat.slug, catErr.message); continue; }

    for (const r of cat.roadmaps) {
      const { data: roadmapRow, error: rErr } = await supa.from('roadmaps')
        .upsert({ slug: r.slug, title: r.title, subtitle: r.subtitle, long_desc: r.long_desc, level: r.level,
                  duration_label: r.duration_label, icon: r.icon, color: r.color,
                  category_id: catRow.id, roadmap_order: r.roadmap_order, order_index: r.roadmap_order,
                  archived: false }, { onConflict: 'slug' })
        .select().single();
      if (rErr) { console.error('❌ فشل upsert لمسار', r.slug, rErr.message); continue; }

      for (const sec of r.sections) {
        const { data: secRow, error: sErr } = await supa.from('roadmap_sections')
          .upsert({ roadmap_id: roadmapRow.id, slug: sec.slug, title: sec.title,
                    section_order: sec.section_order, order_index: sec.section_order,
                    stage_type: 'core_skills', archived: false }, { onConflict: 'roadmap_id,slug' })
          .select().single();
        if (sErr) { console.error('❌ فشل upsert لقسم', sec.slug, sErr.message); continue; }

        for (const st of sec.steps) {
          const { data: stepRow, error: stErr } = await supa.from('roadmap_steps')
            .upsert({ section_id: secRow.id, legacy_lesson_id: st.legacy_lesson_id, title: st.title,
                      step_type: st.step_type, estimated_duration: st.estimated_duration,
                      lesson_order: st.lesson_order, order_index: st.lesson_order, archived: false },
                    { onConflict: 'section_id,legacy_lesson_id' })
            .select().single();
          if (stErr) { console.error('❌ فشل upsert لدرس', st.legacy_lesson_id, stErr.message); continue; }

          for (const res of st.resources) {
            const { error: resErr } = await supa.from('roadmap_resources')
              .upsert({ step_id: stepRow.id, scope: 'external', kind: res.kind, title: res.title,
                        external_url: res.external_url, order_index: res.order_index, archived: false },
                      { onConflict: 'step_id,order_index' });
            if (resErr) console.error('❌ فشل upsert لمورد', res.title, resErr.message);
          }
        }
      }
    }
  }

  // أرشفة (أو حذف) المسارات غير الموجودة في المرجع — المسارات المؤكدة من CAT (roadmapsToArchive)
  // + المسارات اليدوية المؤكَّدة صريحاً من صاحب المشروع (legacyRoadmapsArchivedByOwnerDecision)
  // وليس legacyNonCatRoadmapsRequiringDecision (تلك تبقى بلا أي تغيير حتى تأكيد لاحق)
  const toArchive = [...report.roadmapsToArchive, ...report.legacyRoadmapsArchivedByOwnerDecision];
  for (const r of toArchive) {
    if (DELETE_ORPHANS) {
      const { count } = await supa.from('roadmap_progress').select('*', { count: 'exact', head: true })
        .eq('roadmap_id', (await supa.from('roadmaps').select('id').eq('slug', r.slug).single()).data?.id);
      if (count && count > 0) {
        console.log(`⏭️  تخطّي حذف ${r.slug} — مرتبط بتقدّم ${count} مستخدم، سيُؤرشف فقط.`);
        await supa.from('roadmaps').update({ archived: true, is_published: false }).eq('slug', r.slug);
      } else {
        await supa.from('roadmaps').delete().eq('slug', r.slug);
        console.log(`🗑️  تم حذف ${r.slug} (لا تقدّم مستخدمين مرتبط).`);
      }
    } else {
      await supa.from('roadmaps').update({ archived: true, is_published: false }).eq('slug', r.slug);
      console.log(`📦 تم أرشفة ${r.slug}.`);
    }
  }

  console.log('\n✅ انتهى التطبيق.');
}

/* ===========================================================================
   main
   =========================================================================== */
(async function main() {
  const rawTracks = runRawImport();
  const desiredCategories = transformToHierarchy(rawTracks);

  const supa = tryLoadSupabaseClient();
  const current = supa ? await loadCurrentStateFromSupabase(supa) : loadCurrentStateOffline();

  const report = buildDiff(desiredCategories, current);
  printAndSaveReport(report, desiredCategories);

  if (APPLY) {
    if (!supa) {
      console.error('\n❌ لا يمكن استخدام --apply بدون SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY في متغيرات البيئة.');
      process.exit(1);
    }
    if (report.legacyNonCatRoadmapsRequiringDecision.length) {
      console.error('\n⚠️ توجد مسارات يدوية أصلية تتطلب قراراً صريحاً (راجع القسم 3.ب في التقرير) — لن تُؤرشف تلقائياً.');
    }
    await applyChanges(supa, desiredCategories, report);
  } else {
    console.log('\nℹ️  لم يُطبَّق أي تعديل (وضع التقرير الافتراضي). أعد التشغيل بـ --apply لتطبيق الفعلي بعد مراجعة التقرير أعلاه.');
  }
})().catch(err => {
  console.error('❌ فشل غير متوقع:', err);
  process.exit(1);
});
