#!/usr/bin/env node
/**
 * scripts/generate_resource_fix_migration.js
 * ============================================================
 * يولّد ملف SQL إضافي (003_resource_normalization_fix.sql) يُصحّح صفوف
 * roadmap_resources الموجودة فعلياً (التي أنشأها generate_roadmap_seed.js
 * سابقاً) لتطابق متطلبات normalize_resources.js:
 *
 *   • تحويل كل رابط يوتيوب إلى صيغة embed
 *     (embed/VIDEO_ID أو embed/videoseries?list=ID للقوائم)
 *   • إعادة تصنيف kind إلى المفردات الستة المطلوبة:
 *     video / article / repository / documentation / practice / exam
 *
 * لماذا migration منفصلة بدل تعديل generate_roadmap_seed.js مباشرة؟
 *   - generate_roadmap_seed.js يُنتج ملف seed أصلي (INSERT فقط) — لا يجوز
 *     تعديله بأثر رجعي لأنه قد يكون نُفّذ بالفعل على قاعدة بيانات حقيقية.
 *   - هذه migration تستخدم UPDATE idempotent (تُحدّث فقط لو القيمة الحالية
 *     مختلفة عن المطلوبة) — آمنة للتشغيل المتكرر بدون أثر جانبي إضافي.
 *
 * المصدر: scripts/output/cat_roadmaps_normalized.json (ناتج normalize_resources.js)
 * الإخراج: supabase/migrations/003_resource_normalization_fix.sql
 *
 * الاستخدام:
 *   node scripts/normalize_resources.js              # أولاً: يولّد JSON الموحّد
 *   node scripts/generate_resource_fix_migration.js   # ثانياً: يولّد SQL التصحيح
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT       = path.resolve(__dirname, '..');
const NORM_JSON  = path.join(__dirname, 'output', 'cat_roadmaps_normalized.json');
const OUT_SQL    = path.join(ROOT, 'supabase', 'migrations', '003_resource_normalization_fix.sql');

if (!fs.existsSync(NORM_JSON)) {
  console.error('[gen-fix] cat_roadmaps_normalized.json غير موجود. شغّل أولاً: node scripts/normalize_resources.js');
  process.exit(1);
}

const tracks = JSON.parse(fs.readFileSync(NORM_JSON, 'utf8'));

function esc(v) {
  if (v === null || v === undefined || v === '') return 'NULL';
  return "'" + String(v).replace(/'/g, "''") + "'";
}

/* ── تحويل المفردات الستة المطلوبة (مستخدمة في normalize_resources.js وفي
   JSON الموحّد وفي roadmap-ui.js) إلى القيم الفعلية الموجودة في enum
   resource_kind بقاعدة البيانات. الـ enum يحوي بالفعل مكافئات لأربعة من
   الستة (video/article/github_repo/official_docs/external_exam) من
   migrations سابقة — نُعيد استخدامها بدل تكرارها بقيم جديدة شبه مطابقة.
   'practice' هي القيمة الوحيدة الجديدة فعلياً (تُضاف في migration 002). ── */
const KIND_TO_DB_ENUM = {
  video:         'video',
  article:       'external_article',
  repository:    'github_repo',
  documentation: 'official_docs',
  practice:      'practice',
  exam:          'external_exam',
};
function dbKindOf(specKind) {
  return KIND_TO_DB_ENUM[specKind] || 'external_article';
}

const lines = [];
lines.push('-- ============================================================');
lines.push('-- Migration 003: Resource Normalization Fix');
lines.push('-- ============================================================');
lines.push('-- تم توليده آلياً عبر scripts/generate_resource_fix_migration.js');
lines.push('-- من scripts/output/cat_roadmaps_normalized.json (ناتج normalize_resources.js)');
lines.push('--');
lines.push('-- يُصحّح صفوف roadmap_resources الموجودة فعلياً (من migration seed السابقة):');
lines.push('--   • روابط يوتيوب → صيغة embed (embed/VIDEO_ID أو embed/videoseries?list=ID)');
lines.push('--   • kind → المفردات الستة المطلوبة (video/article/repository/documentation/practice/exam)');
lines.push('--     مُخزَّنة عبر القيم المكافئة الموجودة في enum الحالي — راجع KIND_TO_DB_ENUM');
lines.push('--     أعلى هذا الملف المُولِّد (generate_resource_fix_migration.js) للتفاصيل:');
lines.push('--       video→video, article→external_article, repository→github_repo,');
lines.push('--       documentation→official_docs, practice→practice, exam→external_exam');
lines.push('--');
lines.push('-- UPDATE idempotent بالكامل: لا تأثير إضافي عند إعادة التشغيل لأن WHERE');
lines.push('-- يستثني الصفوف التي تحمل بالفعل القيمة الصحيحة.');
lines.push('-- ============================================================\n');

let updateCount = 0;

for (const track of tracks) {
  for (const course of (track.courses || [])) {
    for (const lesson of (course.lessons || [])) {
      const resources = lesson.normalized_resources || [];
      resources.forEach((res) => {
        // نفس قاعدة المطابقة المستخدمة عند الإدراج الأصلي: (step_id via legacy_lesson_id, title)
        // والعنوان كان يُقصّ لـ 250 حرفاً — نُكرر نفس القص هنا لضمان تطابق الصف.
        const matchTitle = (res.title || lesson.title || '').slice(0, 250);

        const dbKind = dbKindOf(res.kind);

        lines.push(
`UPDATE public.roadmap_resources r
SET kind = ${esc(dbKind)}::resource_kind,
    external_url = ${esc(res.external_url)}
FROM public.roadmap_steps st
JOIN public.roadmap_sections s ON s.id = st.section_id
JOIN public.roadmaps rm ON rm.id = s.roadmap_id
WHERE r.step_id = st.id
  AND rm.slug = ${esc(track.id)}
  AND st.legacy_lesson_id = ${esc(lesson.id)}
  AND r.title = ${esc(matchTitle)}
  AND (r.kind IS DISTINCT FROM ${esc(dbKind)}::resource_kind
       OR r.external_url IS DISTINCT FROM ${esc(res.external_url)});`
        );
        updateCount++;
      });
    }
  }
}

lines.push('\n-- ============================================================');
lines.push(`-- نهاية الملف — ${updateCount} عبارة UPDATE idempotent`);
lines.push('-- ============================================================');

fs.mkdirSync(path.dirname(OUT_SQL), { recursive: true });
fs.writeFileSync(OUT_SQL, lines.join('\n'));

console.log(`[gen-fix] تم توليد ${updateCount} عبارة UPDATE`);
console.log('[gen-fix] الملف:', OUT_SQL);
