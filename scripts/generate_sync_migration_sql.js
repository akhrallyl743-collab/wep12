#!/usr/bin/env node
/**
 * scripts/generate_sync_migration_sql.js
 * ----------------------------------------------------------------------------
 * يحوّل scripts/output/cat_roadmaps_import.json (مُستخرَج فعلياً من المرجع)
 * إلى ملف SQL خام واحد يحتوي كل بيانات المزامنة (categories + roadmaps +
 * sections + steps + resources) بصيغة INSERT ... ON CONFLICT DO UPDATE.
 *
 * هذا السكربت أداة توليد محلية فقط (build-time) — مخرجه ملف .sql ثابت
 * يُراجَع ثم يُلصَق داخل ملف الميجريشن النهائي. لا يتصل بأي قاعدة بيانات.
 *
 * تشغيل: node scripts/generate_sync_migration_sql.js > /tmp/data_section.sql
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMPORT_JSON = path.join(ROOT, 'scripts/output/cat_roadmaps_import.json');
const CATEGORY_MAP = JSON.parse(fs.readFileSync(path.join(__dirname, '.sync_categories_map.json'), 'utf8'));

const raw = JSON.parse(fs.readFileSync(IMPORT_JSON, 'utf8'));
const tracks = Array.isArray(raw) ? raw : (raw.tracks || []);

function esc(v) {
  if (v === null || v === undefined || v === '') return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
}
function escArr(strs) {
  // ARRAY[...]::text[] بصيغة SQL آمنة
  return 'ARRAY[' + strs.map(esc).join(',') + ']::text[]';
}
function slugify(s) {
  return String(s).toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
function mapStepType(legacyType) {
  if (legacyType === 'فيديو') return 'video';
  if (legacyType === 'مشروع') return 'project';
  if (legacyType === 'تدريب') return 'exercise';
  return 'reading';
}
// نفس منطق استخراج video_id/playlist_id المستخدَم حرفياً في js/roadmap-ui.js
// (extractYouTubeId و extractYouTubePlaylistId) — لازم لضمان أن أي مورد
// نُصنّفه 'youtube' فعلاً قابل للتضمين كـ iframe في الواجهة، وليس مجرد رابط
// قناة/مستخدم سيظهر كعنصر فاضٍ بلا محتوى (الواجهة تمنع صريحاً أي رابط خارجي
// بديل لموارد kind='youtube' — راجع البند 4 من ضمانات التنفيذ، تأكيد 2026-06-21).
function extractYouTubeVideoId(url) {
  const m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/(?!videoseries)|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}
function extractYouTubePlaylistId(url) {
  const m = String(url).match(/list=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}
function classifyResourceKind(url) {
  if (!url) return 'article';
  if (/youtube\.com|youtu\.be/i.test(url)) {
    const hasVideoId = extractYouTubeVideoId(url);
    const hasPlaylistId = !hasVideoId && extractYouTubePlaylistId(url);
    // رابط قناة/مستخدم (مثل /@handle أو /channel/ID أو /user/name) بلا فيديو
    // أو قائمة تشغيل محدَّدة — لا يمكن تضمينه كـ iframe، فيُصنَّف كرابط مقال
    // خارجي عادي بدل 'youtube' حتى لا يظهر كعنصر فاضٍ في الواجهة.
    return (hasVideoId || hasPlaylistId) ? 'youtube' : 'external_article';
  }
  if (/github\.com/i.test(url)) return 'github_repo';
  if (/docs\.|developer\.|documentation/i.test(url)) return 'official_docs';
  return 'external_article';
}
function stableLessonId(sectionSlug, idxInSection) {
  return `${sectionSlug}__s${String(idxInSection).padStart(3, '0')}`;
}

// ── فهرسة الفئات بترتيبها الأبجدي ──────────────────────────────────────────
const categoryOrderList = CATEGORY_MAP.categoryOrder;
const circleToCategory = CATEGORY_MAP.circleToCategory;
const roadmapOrderWithin = CATEGORY_MAP.roadmapOrderWithinCategory || {};

const tracksByCircle = new Map();
tracks.forEach(t => tracksByCircle.set(t.sourceCircle || t.id, t));

// نحتاج خريطة sourceCircle -> track (موجودة فعلاً كحقل اسمه غالباً غير مضمّن صراحة)
// نعتمد بديلاً: استخراج circle من CIRCLE_META العكسي عبر مطابقة id الموجود في الملف.
const idToCircle = {
  'cat-android': 'Android',
  'cat-backend-dotnet': 'BackEnd/DotNet',
  'cat-backend-laravel': 'BackEnd/Laravel',
  'cat-backend-nodejs': 'BackEnd/NodeJS',
  'cat-backend-spring': 'BackEnd/Spring',
  'cat-cloud-devops': 'Cloud Computing & DevOps',
  'cat-computer-science': 'Computer Science',
  'cat-cybersecurity': 'CyberSecurity',
  'cat-data-science': 'Data Science',
  'cat-embedded-systems': 'Embedded Systems',
  'cat-flutter': 'Flutter',
  'cat-frontend': 'Front End',
  'cat-gamedev': 'Game Development',
  'cat-ios': 'IOS',
};

const categories = new Map(); // title -> { slug, title, order, roadmaps: [] }
categoryOrderList.forEach((catName, idx) => {
  categories.set(catName, { slug: slugify(catName), title: catName, order: idx + 1, roadmaps: [] });
});

tracks.forEach(t => {
  const circle = idToCircle[t.id];
  if (!circle) return; // غير معروف — تجاهل دفاعي
  const topCircle = circle.split('/')[0];
  const catName = circleToCategory[topCircle];
  if (!catName) return;
  categories.get(catName).roadmaps.push({ ...t, sourceCircle: circle });
});

// ترتيب المسارات الفرعية ضمن كل فئة
categories.forEach((cat, catName) => {
  const explicitOrder = roadmapOrderWithin[catName];
  if (explicitOrder) {
    cat.roadmaps.sort((a, b) => explicitOrder.indexOf(a.sourceCircle) - explicitOrder.indexOf(b.sourceCircle));
  } else {
    cat.roadmaps.sort((a, b) => a.sourceCircle.localeCompare(b.sourceCircle));
  }
});

// ── توليد SQL ────────────────────────────────────────────────────────────
const out = [];

out.push('-- ════════════════════════════════════════════════════════════════');
out.push('-- DATA SECTION — مولَّد آلياً من scripts/output/cat_roadmaps_import.json');
out.push('-- لا تُعدَّل يدوياً — أعد التشغيل: node scripts/generate_sync_migration_sql.js');
out.push('-- ════════════════════════════════════════════════════════════════');
out.push('');

// إعادة حساب category_order فقط على الفئات التي ستُدرَج فعلياً (بمسار واحد
// على الأقل) — يبقى الترتيب أبجدياً ومتسلسلاً بلا فجوات (1..N) بعد استثناء
// English/Media/UI، بدل ترك أرقام مفقودة (8/13/14) في العمود.
const populatedCategories = Array.from(categories.values()).filter(c => c.roadmaps.length > 0);
populatedCategories.forEach((cat, idx) => { cat.order = idx + 1; });

// 1) categories — تُنشأ فقط الفئات التي تحتوي مساراً واحداً فعلياً على الأقل
//    (English/Media/UI مستثناة عمداً: لا محتوى Markdown قابل للاستخراج،
//    والتقرير المعتمد ينص صريحاً "لا تُنشأ فئة" لها — راجع قسم 1).
out.push('-- ── 1) الفئات (categories) — ترتيب أبجدي صريح، فقط الفئات بمحتوى فعلي ──');
populatedCategories.forEach(cat => {
  out.push(
    `INSERT INTO public.categories (slug, title, category_order, source, archived)\n` +
    `VALUES (${esc(cat.slug)}, ${esc(cat.title)}, ${cat.order}, 'cat_reloaded', FALSE)\n` +
    `ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, category_order = EXCLUDED.category_order, updated_at = now();`
  );
});
out.push('');

// 2) roadmaps + sections + steps + resources لكل مسار
categories.forEach(cat => {
  cat.roadmaps.forEach((r, rIdx) => {
    const roadmapOrder = rIdx + 1;
    out.push(`-- ── مسار: ${r.id} (${cat.title}) ──────────────────────────────────`);
    out.push(
      `INSERT INTO public.roadmaps (slug, title, subtitle, long_desc, level, duration_label, category_id, roadmap_order, order_index, source, archived, is_published)\n` +
      `SELECT ${esc(r.id)}, ${esc(r.title)}, NULL, NULL, NULL, NULL, c.id, ${roadmapOrder}, ${roadmapOrder}, 'cat_reloaded', FALSE, TRUE\n` +
      `FROM public.categories c WHERE c.slug = ${esc(cat.slug)}\n` +
      `ON CONFLICT (slug) DO UPDATE SET\n` +
      `  title = EXCLUDED.title, category_id = EXCLUDED.category_id,\n` +
      `  roadmap_order = EXCLUDED.roadmap_order, order_index = EXCLUDED.order_index,\n` +
      `  archived = FALSE, is_published = TRUE, updated_at = now();`
    );

    (r.courses || []).forEach((course, sIdx) => {
      const sectionOrder = sIdx + 1;
      out.push(
        `INSERT INTO public.roadmap_sections (roadmap_id, slug, title, stage_type, section_order, order_index, archived)\n` +
        `SELECT rm.id, ${esc(course.id)}, ${esc(course.title)}, 'core_skills', ${sectionOrder}, ${sectionOrder}, FALSE\n` +
        `FROM public.roadmaps rm WHERE rm.slug = ${esc(r.id)}\n` +
        `ON CONFLICT (roadmap_id, slug) DO UPDATE SET\n` +
        `  title = EXCLUDED.title, section_order = EXCLUDED.section_order,\n` +
        `  order_index = EXCLUDED.order_index, archived = FALSE;`
      );

      (course.lessons || []).forEach((lesson, lIdx) => {
        const lessonOrder = lIdx + 1;
        const legacyId = stableLessonId(course.id, lessonOrder);
        const stepType = mapStepType(lesson.type);
        out.push(
          `INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, lesson_order, order_index, archived)\n` +
          `SELECT sec.id, ${esc(legacyId)}, ${esc(lesson.title)}, ${esc(stepType)}::roadmap_step_type, ${esc(lesson.duration || '—')}, ${lessonOrder}, ${lessonOrder}, FALSE\n` +
          `FROM public.roadmap_sections sec JOIN public.roadmaps rm ON rm.id = sec.roadmap_id\n` +
          `WHERE rm.slug = ${esc(r.id)} AND sec.slug = ${esc(course.id)}\n` +
          `ON CONFLICT (section_id, legacy_lesson_id) DO UPDATE SET\n` +
          `  title = EXCLUDED.title, step_type = EXCLUDED.step_type,\n` +
          `  lesson_order = EXCLUDED.lesson_order, order_index = EXCLUDED.order_index, archived = FALSE;`
        );

        const resources = lesson.allResources || [];
        resources.forEach((res, resIdx) => {
          const resOrder = resIdx + 1;
          const kind = classifyResourceKind(res.url);
          out.push(
            `INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index, archived)\n` +
            `SELECT st.id, 'external', ${esc(kind)}::resource_kind, ${esc(res.title || lesson.title)}, ${esc(res.url)}, ${resOrder}, FALSE\n` +
            `FROM public.roadmap_steps st\n` +
            `JOIN public.roadmap_sections sec ON sec.id = st.section_id\n` +
            `JOIN public.roadmaps rm ON rm.id = sec.roadmap_id\n` +
            `WHERE rm.slug = ${esc(r.id)} AND sec.slug = ${esc(course.id)} AND st.legacy_lesson_id = ${esc(legacyId)}\n` +
            `ON CONFLICT (step_id, order_index) DO UPDATE SET\n` +
            `  kind = EXCLUDED.kind, title = EXCLUDED.title, external_url = EXCLUDED.external_url, archived = FALSE;`
          );
        });
      });
    });
    out.push('');
  });
});

console.log(out.join('\n'));
