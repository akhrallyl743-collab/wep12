/**
 * generate_roadmap_seed.js
 * -----------------------------------------------------------------------
 * يقرأ المحتوى الحقيقي من js/data.js (CAREERS_DATA) ويحوّله إلى ملف SQL
 * (supabase_migrations/002_roadmaps_seed.sql) يملأ الجداول الجديدة:
 * roadmaps, roadmap_sections, roadmap_steps, roadmap_resources.
 *
 * لا يُضيف أي درس أو رابط غير موجود فعلياً في data.js — فقط إعادة تنظيم.
 * آمن لإعادة التشغيل: كل INSERT يحتوي ON CONFLICT DO NOTHING.
 *
 * تشغيل: node scripts/generate_roadmap_seed.js
 * -----------------------------------------------------------------------
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

// ── تحميل data.js كموديول Node عبر sandbox مؤقت ──────────────────────
let src = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
src += '\nmodule.exports = { getAllTracks };';
const tmpFile = '/tmp/_data_runtime_gen.js';
fs.writeFileSync(tmpFile, src);
const { getAllTracks } = require(tmpFile);

const tracks = getAllTracks();
const trackById = id => tracks.find(t => t.id === id);

// ── أدوات SQL ─────────────────────────────────────────────────────────
function esc(v) {
  if (v === null || v === undefined || v === '') return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function stepTypeOf(lesson) {
  if (lesson.type === 'فيديو') return 'video';
  if (lesson.type === 'مشروع') return 'project';
  if (lesson.type === 'تدريب') return lesson.quizData ? 'quiz' : 'exercise';
  return 'reading';
}

const out = [];
out.push('-- ============================================================');
out.push('-- START LINE — Roadmaps Seed Data (Migration 002)');
out.push('-- تم توليده آلياً من js/data.js — لا يحتوي بيانات وهمية');
out.push('-- آمن لإعادة التشغيل (ON CONFLICT DO NOTHING)');
out.push('-- ============================================================\n');

function insertRoadmap(slug, careerId, title, subtitle, longDesc, level, duration, icon, color, cover, order) {
  out.push(
`INSERT INTO public.roadmaps (slug, career_id, title, subtitle, long_desc, level, duration_label, icon, color, cover_image, order_index)
VALUES (${esc(slug)}, ${esc(careerId)}, ${esc(title)}, ${esc(subtitle)}, ${esc(longDesc)}, ${esc(level)}, ${esc(duration)}, ${esc(icon)}, ${esc(color)}, ${esc(cover)}, ${order})
ON CONFLICT (slug) DO NOTHING;\n`);
}

function insertSection(roadmapSlug, slug, title, description, stageType, difficulty, duration, icon, order) {
  out.push(
`INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, ${esc(slug)}, ${esc(title)}, ${esc(description)}, ${esc(stageType)}::roadmap_stage_type, ${esc(difficulty)}, ${esc(duration)}, ${esc(icon)}, ${order}
FROM public.roadmaps WHERE slug = ${esc(roadmapSlug)}
ON CONFLICT (roadmap_id, slug) DO NOTHING;\n`);
}

function insertStep(roadmapSlug, sectionSlug, legacyId, title, stepType, duration, order) {
  out.push(
`INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, ${esc(legacyId)}, ${esc(title)}, ${esc(stepType)}::roadmap_step_type, ${esc(duration)}, ${order}
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = ${esc(roadmapSlug)} AND s.slug = ${esc(sectionSlug)}
AND NOT EXISTS (SELECT 1 FROM public.roadmap_steps WHERE section_id = s.id AND legacy_lesson_id = ${esc(legacyId)});`);
}

function insertResource(roadmapSlug, legacyId, scope, kind, title, url, order) {
  out.push(
`INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, ${esc(scope)}::resource_scope, ${esc(kind)}::resource_kind, ${esc(title)}, ${esc(url)}, ${order}
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = ${esc(roadmapSlug)} AND st.legacy_lesson_id = ${esc(legacyId)}
AND NOT EXISTS (SELECT 1 FROM public.roadmap_resources WHERE step_id = st.id AND title = ${esc(title)});`);
}

function addStepAndResource(roadmapSlug, sectionSlug, lesson, order) {
  insertStep(roadmapSlug, sectionSlug, lesson.id, lesson.title, stepTypeOf(lesson), lesson.duration, order);
  if (lesson.videoUrl && lesson.videoUrl.trim()) {
    insertResource(roadmapSlug, lesson.id, 'external', 'youtube', 'فيديو: ' + lesson.title, lesson.videoUrl.trim(), 1);
  }
}

/* =====================================================================
   C) المسارات المستوردة تلقائياً من CATReloaded-Circles-Roadmaps
   (عبر scripts/import_cat_roadmaps.js → scripts/output/cat_roadmaps_import.json)
   تُكتب في ملف SQL منفصل (007) للحفاظ على عزل كامل عن seed الأصلي (002)
   الخاص بالمسارات الأربعة اليدوية الأصلية — لا تعديل ولا كسر للتوافق.
   كل lesson قد تحمل عدة موارد إضافية (allResources: فيديو/GitHub/خارجي)
   تُضاف جميعها كصفوف roadmap_resources منفصلة (لا فقد لأي رابط من المصدر).
   ===================================================================== */
const importedOut = [];
importedOut.push('-- ============================================================');
importedOut.push('-- START LINE — CAT Reloaded Imported Roadmaps Seed (Migration 007)');
importedOut.push('-- تم توليده آلياً عبر scripts/import_cat_roadmaps.js من المستودع المرجعي:');
importedOut.push('-- https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps (main)');
importedOut.push('-- لا يحتوي بيانات وهمية — مستخرج 100% من ملفات Markdown الأصلية.');
importedOut.push('-- آمن لإعادة التشغيل (ON CONFLICT DO NOTHING). يُشغَّل بعد 001..006.');
importedOut.push('-- ============================================================\n');

function pushTo(buf, line) { buf.push(line); }

function insertRoadmapTo(buf, slug, careerId, title, subtitle, longDesc, level, duration, icon, color, cover, order) {
  buf.push(
`INSERT INTO public.roadmaps (slug, career_id, title, subtitle, long_desc, level, duration_label, icon, color, cover_image, order_index)
VALUES (${esc(slug)}, ${esc(careerId)}, ${esc(title)}, ${esc(subtitle)}, ${esc(longDesc)}, ${esc(level)}, ${esc(duration)}, ${esc(icon)}, ${esc(color)}, ${esc(cover)}, ${order})
ON CONFLICT (slug) DO NOTHING;\n`);
}

function insertSectionTo(buf, roadmapSlug, slug, title, description, stageType, difficulty, duration, icon, order) {
  buf.push(
`INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, ${esc(slug)}, ${esc(title)}, ${esc(description)}, ${esc(stageType)}::roadmap_stage_type, ${esc(difficulty)}, ${esc(duration)}, ${esc(icon)}, ${order}
FROM public.roadmaps WHERE slug = ${esc(roadmapSlug)}
ON CONFLICT (roadmap_id, slug) DO NOTHING;\n`);
}

function insertStepTo(buf, roadmapSlug, sectionSlug, legacyId, title, stepType, duration, order) {
  buf.push(
`INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, ${esc(legacyId)}, ${esc(title)}, ${esc(stepType)}::roadmap_step_type, ${esc(duration)}, ${order}
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = ${esc(roadmapSlug)} AND s.slug = ${esc(sectionSlug)}
AND NOT EXISTS (SELECT 1 FROM public.roadmap_steps WHERE section_id = s.id AND legacy_lesson_id = ${esc(legacyId)});`);
}

function insertResourceTo(buf, roadmapSlug, legacyId, scope, kind, title, url, order) {
  buf.push(
`INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, ${esc(scope)}::resource_scope, ${esc(kind)}::resource_kind, ${esc(title)}, ${esc(url)}, ${order}
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = ${esc(roadmapSlug)} AND st.legacy_lesson_id = ${esc(legacyId)}
AND NOT EXISTS (SELECT 1 FROM public.roadmap_resources WHERE step_id = st.id AND title = ${esc(title)});`);
}

/** يحوّل نوع الرابط (video/github/external) إلى resource_kind المتاح فعلياً
 *  في schema الحالي (001_roadmaps_schema.sql + 003/004 الإضافات) */
function resourceKindOf(linkKind) {
  if (linkKind === 'video') return 'youtube';
  if (linkKind === 'github') return 'github_repo';
  return 'external_article';
}

function stepTypeOfImportedLesson(lesson) {
  if (lesson.videoUrl) return 'video';
  if (lesson.type === 'تدريب') return 'exercise';
  return 'reading';
}

function migrateImportedTrack(track, orderIndex) {
  insertRoadmapTo(
    importedOut, track.id, null, track.title, track.subtitle, track.longDesc,
    track.level, track.duration, track.icon, track.color, track.coverImage, orderIndex
  );

  let totalSteps = 0;
  let totalResources = 0;

  track.courses.forEach((course, ci) => {
    insertSectionTo(importedOut, track.id, course.id, course.title, null, 'core_skills', null, course.duration, null, ci + 1);

    course.lessons.forEach((lesson, li) => {
      insertStepTo(
        importedOut, track.id, course.id, lesson.id, lesson.title,
        stepTypeOfImportedLesson(lesson), lesson.duration, li + 1
      );
      totalSteps++;

      // كل الموارد المرفقة بالدرس (فيديو رئيسي + أي روابط إضافية GitHub/خارجية)
      const resources = lesson.allResources && lesson.allResources.length
        ? lesson.allResources
        : (lesson.videoUrl ? [{ url: lesson.videoUrl, kind: 'video', title: lesson.title }] : []);

      resources.forEach((res, ri) => {
        if (!res.url) return;
        insertResourceTo(
          importedOut, track.id, lesson.id, 'external',
          resourceKindOf(res.kind), (res.title || lesson.title).slice(0, 250), res.url, ri + 1
        );
        totalResources++;
      });
    });
  });

  console.log(`✅ [imported] ${track.id}: ${track.courses.length} sections, ${totalSteps} steps, ${totalResources} resources`);
  return { steps: totalSteps, resources: totalResources };
}

function runImportedRoadmapsSeed() {
  const importJsonPath = path.join(ROOT, 'scripts/output/cat_roadmaps_import.json');
  if (!fs.existsSync(importJsonPath)) {
    console.log('\nℹ️  لم يتم العثور على scripts/output/cat_roadmaps_import.json — تخطّي توليد seed المسارات المستوردة.');
    console.log('   (شغّل أولاً: node scripts/import_cat_roadmaps.js)');
    return;
  }
  const importData = JSON.parse(fs.readFileSync(importJsonPath, 'utf8'));
  const importedTracks = importData.tracks || [];

  let grandSteps = 0, grandResources = 0;
  importedTracks.forEach((track, idx) => {
    const r = migrateImportedTrack(track, 100 + idx); // order_index بعد المسارات الأصلية (1-4)
    grandSteps += r.steps;
    grandResources += r.resources;
  });

  const outPath = path.join(ROOT, 'supabase_migrations/007_cat_roadmaps_seed.sql');
  fs.writeFileSync(outPath, importedOut.join('\n\n'));

  const totalCourses = importedTracks.reduce((s, t) => s + t.courses.length, 0);
  console.log('\n───────────────────────────────────────────────────────────');
  console.log(`📦 [imported] ${importedTracks.length} مسار، ${totalCourses} كورس، ${grandSteps} درس، ${grandResources} مورد`);
  console.log('📄 SQL (imported) written to:', outPath, `(${importedOut.length} statements)`);
  if (importData.requiresManualHandling && importData.requiresManualHandling.length) {
    console.log(`🟡 ${importData.requiresManualHandling.length} دائرة تتطلب معالجة يدوية (انظر تقرير الاستيراد) ولم تُضمَّن في هذا الـ seed.`);
  }
  console.log('───────────────────────────────────────────────────────────');
}

/* =====================================================================
   A) المسارات العامة (Graphic / UI-UX / Marketing)
   تحويل 1:1 — كل Course الحالي يصبح Section، وكل Lesson يصبح Step.
   تصنيف stage_type بقاعدة بسيطة وواضحة (heuristic) — تحتاج مراجعة بشرية
   لاحقاً لو رغبت بتدقيق أدق، لكنها لا تُغيّر أي محتوى حقيقي.
   ===================================================================== */
function inferStageType(course, ci, total) {
  const idLower = (course.id || '').toLowerCase();
  if (idLower.includes('career') || idLower.includes('freelance')) return 'career_path';
  const projectLessons = course.lessons.filter(l => l.type === 'مشروع').length;
  if (projectLessons / course.lessons.length > 0.5) return 'projects';
  if (ci === 0) return 'fundamentals';
  if (ci === total - 1) return 'advanced_topics';
  return 'core_skills';
}

function migrateGenericTrack(trackId, careerId) {
  const t = trackById(trackId);
  if (!t) { console.warn('⚠️ track not found:', trackId); return; }

  insertRoadmap(t.id, careerId, t.title, t.subtitle, t.longDesc, t.level, t.duration, t.icon, t.color, t.coverImage, 1);

  t.courses.forEach((course, ci) => {
    const stage = inferStageType(course, ci, t.courses.length);
    insertSection(t.id, course.id, course.title, null, stage, null, course.duration, null, ci + 1);
    course.lessons.forEach((lesson, li) => addStepAndResource(t.id, course.id, lesson, li + 1));
  });

  const totalLessons = t.courses.reduce((s, c) => s + c.lessons.length, 0);
  console.log(`✅ ${t.id}: ${t.courses.length} sections, ${totalLessons} steps (generic mapping)`);
}

/* =====================================================================
   B) مسار Frontend — إعادة تنظيم كاملة إلى 11 مرحلة (مطلوب المستخدم)
   كل الدروس مسحوبة فعلياً من frontend-track الحالي — بدون أي اختراع.
   "أساسيات الإنترنت" هي المرحلة الوحيدة بلا محتوى حقيقي حالياً (فجوة
   حقيقية في المحتوى — سيتم الإبقاء عليها فاضية مع وصف واضح بدل تلفيق بيانات)
   ===================================================================== */
function migrateFrontendTrack() {
  const t = trackById('frontend-track');
  if (!t) { console.warn('⚠️ frontend-track not found'); return; }

  // فهرسة كل الدروس بالـ id بدون اعتماد على الكورس الأصلي
  const lessonMap = {};
  t.courses.forEach(c => c.lessons.forEach(l => { lessonMap[l.id] = l; }));
  const get = id => {
    const l = lessonMap[id];
    if (!l) console.warn('   ⚠️ lesson id not found (skipped):', id);
    return l;
  };

  insertRoadmap(t.id, 'frontend', t.title, t.subtitle, t.longDesc, t.level, t.duration, t.icon, t.color, t.coverImage, 4);

  const range = (prefix, from, to, pad) => {
    const ids = [];
    for (let i = from; i <= to; i++) ids.push(prefix + String(i).padStart(pad, '0'));
    return ids;
  };

  const phases = [
    {
      slug: 'internet-basics', order: 1, stage: 'introduction',
      title: 'أساسيات الإنترنت', dur: '—',
      desc: '🚧 لا يوجد محتوى حقيقي لهذه المرحلة في data.js حالياً (كيف يعمل الويب، HTTP، DNS، المتصفحات). تم إنشاء البنية فقط بانتظار إضافة دروس فعلية — لا توجد دروس وهمية هنا.',
      ids: [],
    },
    {
      slug: 'html', order: 2, stage: 'fundamentals', title: 'HTML', dur: '3 أسابيع', desc: null,
      ids: range('html-', 0, 27, 2),
    },
    {
      slug: 'css', order: 3, stage: 'fundamentals', title: 'CSS', dur: '6 أسابيع', desc: null,
      ids: [...range('css-ar-', 1, 47, 2),
            'tailwind-intro', 'tailwind-components', 'sass-basics', 'css-variables', 'css-dark-mode', 'css-animations-adv', 'css-project'],
    },
    {
      slug: 'javascript', order: 4, stage: 'core_skills', title: 'JavaScript', dur: '8 أسابيع', desc: null,
      ids: range('js-', 1, 80, 2),
    },
    {
      slug: 'git-github', order: 5, stage: 'core_skills', title: 'Git & GitHub', dur: '1 أسبوع', desc: null,
      ids: ['git-basics', 'git-branching', 'npm-packages', 'vscode-tips', 'browser-devtools'],
    },
    {
      slug: 'responsive-design', order: 6, stage: 'core_skills', title: 'Responsive Design', dur: '1 أسبوع', desc: null,
      ids: ['css-ar-48', 'css-ar-49', 'css-ar-50', 'css-ar-51', 'css-ar-52'],
    },
    {
      slug: 'modern-frontend', order: 7, stage: 'advanced_topics', title: 'Modern Frontend (React)', dur: '10 أسابيع', desc: null,
      ids: [...range('react-tarmeez-', 1, 130, 3),
            'redux-intro', 'redux-toolkit', 'react-query', 'react-typescript', 'nextjs-intro', 'final-project'],
    },
    {
      slug: 'performance', order: 8, stage: 'advanced_topics', title: 'Performance', dur: '—', desc: null,
      ids: ['css-performance', 'react-perf'],
    },
    {
      slug: 'testing', order: 9, stage: 'advanced_topics', title: 'Testing', dur: '—', desc: null,
      ids: ['react-testing', 'quiz-html-01', 'quiz-html-02', 'quiz-html-03',
            'quiz-css-01', 'quiz-css-02', 'quiz-css-03', 'quiz-css-04',
            'quiz-js-01', 'quiz-js-02', 'quiz-js-03'],
    },
    {
      slug: 'portfolio-freelancing', order: 10, stage: 'career_path', title: 'Portfolio & Freelancing', dur: '1 أسبوع', desc: null,
      ids: ['tools-project', 'deploy-netlify', 'cf-resume', 'cf-freelance', 'fe-capstone', 'cf-roadmap-next'],
    },
    {
      slug: 'interview-prep', order: 11, stage: 'interview_prep', title: 'Interview Preparation', dur: '1 أسبوع', desc: null,
      ids: ['cf-interview-tech', 'cf-github-profile', 'cf-salary'],
    },
  ];

  let totalSteps = 0;
  phases.forEach(ph => {
    insertSection(t.id, ph.slug, ph.title, ph.desc, ph.stage, null, ph.dur, null, ph.order);
    ph.ids.forEach((id, i) => {
      const lesson = get(id);
      if (lesson) { addStepAndResource(t.id, ph.slug, lesson, i + 1); totalSteps++; }
    });
  });

  console.log(`✅ frontend-track: ${phases.length} sections (11 مرحلة), ${totalSteps} steps (custom mapping)`);

  // تحقق: هل كل دروس frontend-track الأصلية تمت تغطيتها؟
  const allOriginalIds = Object.keys(lessonMap);
  const usedIds = new Set(phases.flatMap(p => p.ids));
  const missing = allOriginalIds.filter(id => !usedIds.has(id));
  if (missing.length) console.warn('⚠️ دروس أصلية لم تُصنّف في أي مرحلة:', missing);
  else console.log('✅ كل دروس frontend-track الأصلية (', allOriginalIds.length, ') مغطاة في المراحل الجديدة — صفر فقد.');
}

/* =====================================================================
   التشغيل
   ===================================================================== */
migrateGenericTrack('graphic-design-track', 'graphic');
migrateGenericTrack('ui-ux-track', 'ui-ux');
migrateGenericTrack('digital-marketing-track', 'marketing');
migrateFrontendTrack();

const outPath = path.join(ROOT, 'supabase_migrations/002_roadmaps_seed.sql');
fs.writeFileSync(outPath, out.join('\n\n'));
console.log('\n📄 SQL written to:', outPath, `(${out.length} statements)`);

runImportedRoadmapsSeed();
