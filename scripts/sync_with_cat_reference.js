#!/usr/bin/env node
/**
 * scripts/sync_with_cat_reference.js
 * ====================================
 * يمسح ملفات Markdown في reference_repo/ (المستودع المرجعي لـ CATReloaded)
 * ويتحقق من التزامن مع ما هو موجود في cat_roadmaps_import.json.
 *
 * الاستخدام:
 *   node scripts/sync_with_cat_reference.js [--report-only]
 *
 * الإخراج:
 *   scripts/output/sync_report.json  — تقرير التزامن
 *   scripts/output/sync_diff.md      — ملخص الفروقات بصيغة Markdown
 *
 * آمن تماماً للتشغيل المتكرر — لا يعدل أي ملف SQL أو JSON موجود بدون --apply.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT    = path.resolve(__dirname, '..');
const REF_DIR = path.join(ROOT, 'reference_repo');
const OUT_DIR = path.join(__dirname, 'output');
const IMPORT_JSON = path.join(OUT_DIR, 'cat_roadmaps_import.json');

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── 1. قراءة ملف الاستيراد الحالي ──────────────────────────────
let importedTracks = [];
let importMeta = null;
if (fs.existsSync(IMPORT_JSON)) {
  try {
    const raw = JSON.parse(fs.readFileSync(IMPORT_JSON, 'utf8'));
    // الشكل الفعلي: { generatedAt, sourceRepo, requiresManualHandling, tracks: [...] }
    if (Array.isArray(raw)) {
      importedTracks = raw;            // توافق مع أي نسخة قديمة كانت array مباشرة
    } else if (raw && Array.isArray(raw.tracks)) {
      importedTracks = raw.tracks;
      importMeta = raw;
    }
  } catch (e) {
    console.error('[sync] خطأ في قراءة cat_roadmaps_import.json:', e.message);
  }
}
const importedIds = new Set(importedTracks.map(t => t.id));

// ── 2. قراءة مجلدات المستودع المرجعي ───────────────────────────
const NOTION_ONLY = ['English', 'UI', 'Media'];   // لا يوجد Markdown فعلي
const SUBMODULE   = ['Cloud Computing & DevOps'];  // Git submodule فارغ

function findReadme(dir) {
  for (const name of ['README.md', 'Readme.md', 'readme.md']) {
    const p = path.join(dir, name);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

function countLinks(md) {
  return (md.match(/\bhttps?:\/\/[^\s)>\]"']+/g) || []).length;
}
function countYouTube(md) {
  return (md.match(/youtube\.com|youtu\.be/gi) || []).length;
}

const refCircles = [];

if (!fs.existsSync(REF_DIR)) {
  console.error('[sync] مجلد reference_repo غير موجود على المسار:', REF_DIR);
  process.exit(1);
}

for (const entry of fs.readdirSync(REF_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const circleDir = path.join(REF_DIR, entry.name);

  if (NOTION_ONLY.includes(entry.name)) {
    refCircles.push({ name: entry.name, status: 'notion_only', readme: null, links: 0, youtube: 0, subDirs: [] });
    continue;
  }
  if (SUBMODULE.includes(entry.name)) {
    refCircles.push({ name: entry.name, status: 'submodule_empty', readme: null, links: 0, youtube: 0, subDirs: [] });
    continue;
  }

  const readme = findReadme(circleDir);
  const subDirs = fs.readdirSync(circleDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  if (!readme && subDirs.length === 0) {
    refCircles.push({ name: entry.name, status: 'empty', readme: null, links: 0, youtube: 0, subDirs });
    continue;
  }

  // إذا فيه sub-directories (مثل BackEnd له NodeJS/Laravel/DotNet/Spring)
  if (subDirs.length > 0 && entry.name === 'BackEnd') {
    for (const sub of subDirs) {
      const subReadme = findReadme(path.join(circleDir, sub));
      const content   = subReadme ? fs.readFileSync(subReadme, 'utf8') : '';
      refCircles.push({
        name: `BackEnd/${sub}`, status: 'ok', readme: subReadme,
        links: countLinks(content), youtube: countYouTube(content), subDirs: []
      });
    }
    continue;
  }

  const content = readme ? fs.readFileSync(readme, 'utf8') : '';
  // تحقق من وجود ملفات roadmap-*.md إضافية (Frontend)
  const extraMd = fs.readdirSync(circleDir).filter(f => f.endsWith('.md') && f !== path.basename(readme || ''));

  refCircles.push({
    name: entry.name,
    status: 'ok',
    readme: readme,
    extraFiles: extraMd,
    links: countLinks(content),
    youtube: countYouTube(content),
    subDirs
  });
}

// ── 3. المقارنة مع الاستيراد الحالي ─────────────────────────────
const CIRCLE_TO_TRACK_ID = {
  'Android':          'cat-android',
  'BackEnd/NodeJS':   'cat-backend-nodejs',
  'BackEnd/Laravel':  'cat-backend-laravel',
  'BackEnd/DotNet':   'cat-backend-dotnet',
  'BackEnd/Spring':   'cat-backend-spring',
  'Computer Science': 'cat-computer-science',
  'CyberSecurity':    'cat-cybersecurity',
  'Data Science':     'cat-data-science',
  'Embedded Systems': 'cat-embedded-systems',
  'Flutter':          'cat-flutter',
  'Front End':        'cat-frontend',
  'Game Development': 'cat-gamedev',
  'IOS':              'cat-ios',
};

const report = {
  generated_at: new Date().toISOString(),
  ref_circles_total: refCircles.length,
  imported_tracks_total: importedTracks.length,
  circles: [],
  summary: { ok: 0, missing: 0, notion_only: 0, submodule_empty: 0, needs_manual: 0 },
  requires_manual_handling: (importMeta && importMeta.requiresManualHandling) || []
};

for (const circle of refCircles) {
  const trackId    = CIRCLE_TO_TRACK_ID[circle.name];
  const isImported = trackId ? importedIds.has(trackId) : false;

  let circleStatus = circle.status;
  if (circle.status === 'ok') {
    circleStatus = isImported ? 'imported' : 'missing_from_import';
  }

  const importedTrack = trackId ? importedTracks.find(t => t.id === trackId) : null;
  const entry = {
    circle: circle.name,
    track_id: trackId || null,
    ref_status: circle.status,
    import_status: circleStatus,
    ref_youtube_count: circle.youtube,
    imported_steps: importedTrack ? importedTrack.courses.reduce((s, c) => s + c.lessons.length, 0) : null,
    imported_resources: importedTrack
      ? importedTrack.courses.reduce((s, c) => s + c.lessons.reduce((s2, l) => s2 + ((l.allResources || []).length || (l.videoUrl ? 1 : 0)), 0), 0)
      : null,
    note: null
  };

  if (circle.status === 'notion_only')    { entry.note = 'محتوى Notion فقط — يتطلب تدخلاً يدوياً'; report.summary.notion_only++; }
  if (circle.status === 'submodule_empty'){ entry.note = 'Git submodule فارغ — شغّل git submodule update'; report.summary.submodule_empty++; }
  if (circleStatus === 'imported')         report.summary.ok++;
  if (circleStatus === 'missing_from_import') { entry.note = 'موجود في ref لكن غير مستورد — شغّل import_cat_roadmaps.js'; report.summary.missing++; }

  report.circles.push(entry);
}

// ── 4. كتابة التقرير ─────────────────────────────────────────────
const reportPath = path.join(OUT_DIR, 'sync_report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
console.log('[sync] تقرير JSON مكتوب:', reportPath);

// ── 5. ملف Markdown موجز ─────────────────────────────────────────
const lines = [
  '# تقرير تزامن المستودع المرجعي — sync_with_cat_reference.js',
  '',
  `**تاريخ التشغيل:** ${report.generated_at}`,
  '',
  '## الملخص',
  '',
  `| الحالة | العدد |`,
  `|---|---|`,
  `| ✅ مستورد ومتزامن | ${report.summary.ok} |`,
  `| ❌ موجود في المرجع لكن غير مستورد | ${report.summary.missing} |`,
  `| 📄 Notion فقط (يدوي) | ${report.summary.notion_only} |`,
  `| 📦 Git Submodule فارغ | ${report.summary.submodule_empty} |`,
  '',
  '## التفاصيل',
  '',
  '| الدائرة | Track ID | الحالة | ملاحظة |',
  '|---|---|---|---|',
  ...report.circles.map(c => `| ${c.circle} | ${c.track_id || '—'} | ${c.import_status} | ${c.note || '—'} |`),
  '',
  '## مسارات تحتاج تدخلاً يدوياً (من تقرير الاستيراد الأصلي)',
  '',
  report.requires_manual_handling.length === 0
    ? '✅ لا يوجد.'
    : [
        '| الدائرة | السبب |',
        '|---|---|',
        ...report.requires_manual_handling.map(m => `| ${m.circle} | ${m.reason} |`)
      ].join('\n'),
  '',
  '## كيفية تحديث بعد تغيير في المستودع المرجعي',
  '',
  '```bash',
  '# 1) تحديث reference_repo من GitHub',
  'cd reference_repo && git pull origin main && cd ..',
  '',
  '# 2) إعادة استيراد المسارات (يكتب scripts/output/cat_roadmaps_import.json)',
  'node scripts/import_cat_roadmaps.js',
  '',
  '# 3) إعادة توليد seed SQL الأصلي (إن وُجدت مسارات جديدة كلياً)',
  'node scripts/generate_roadmap_seed.js',
  '',
  '# 4) توحيد الموارد (يوتيوب → embed، تصنيف الأنواع الستة، كشف الدروس الفارغة)',
  'node scripts/normalize_resources.js',
  '',
  '# 5) توليد SQL تصحيح الموارد الموجودة (UPDATE idempotent)',
  'node scripts/generate_resource_fix_migration.js',
  '',
  '# 6) تطبيق الـ migrations الجديدة على Supabase بالترتيب',
  '# supabase/migrations/001_learning_paths.sql',
  '# supabase/migrations/002_progress_tracking.sql   (يضيف enum value \'practice\')',
  '# supabase/migrations/003_resource_normalization_fix.sql',
  '# (seed المسارات الجديدة كلياً، إن وُجدت، يكون في ملف منفصل من الخطوة 3)',
  '',
  '# 7) التحقق من التزامن',
  'node scripts/sync_with_cat_reference.js',
  '```',
];

const diffPath = path.join(OUT_DIR, 'sync_diff.md');
fs.writeFileSync(diffPath, lines.join('\n'));
console.log('[sync] تقرير Markdown مكتوب:', diffPath);

// ── 6. طباعة ملخص في الـ console ─────────────────────────────────
console.log('\n─────────────────────────────────────────');
console.log('📊 ملخص التزامن:');
console.log(`  ✅ مستورد ومتزامن:        ${report.summary.ok}`);
console.log(`  ❌ غير مستورد من المرجع:  ${report.summary.missing}`);
console.log(`  📄 Notion فقط (يدوي):     ${report.summary.notion_only}`);
console.log(`  📦 Submodule فارغ:        ${report.summary.submodule_empty}`);
console.log('─────────────────────────────────────────\n');

if (report.summary.missing > 0) {
  console.log('⚠️  يوجد مسارات في المرجع غير مستوردة — شغّل: node scripts/import_cat_roadmaps.js');
}
