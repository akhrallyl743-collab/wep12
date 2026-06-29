#!/usr/bin/env node
/**
 * scripts/normalize_resources.js
 * ================================
 * يوحّد الموارد في cat_roadmaps_import.json:
 *   • يحوّل كل روابط YouTube إلى صيغة embed
 *   • يصنّف كل مورد إلى: video | article | repository | documentation | practice | exam
 *   • يكشف الدروس الفارغة (بدون موارد)
 *   • يُنتج تقريراً بالإحصائيات
 *
 * الاستخدام:
 *   node scripts/normalize_resources.js [--dry-run]
 *
 * الإخراج:
 *   scripts/output/cat_roadmaps_normalized.json  — البيانات بعد التوحيد
 *   scripts/output/normalize_report.md           — تقرير التوحيد
 *
 * ملاحظة: الـ embed URL الصحيحة: https://www.youtube.com/embed/VIDEO_ID
 * ممنوع فتح يوتيوب كرابط خارجي — يجب العرض داخل iframe.
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const OUT_DIR     = path.join(__dirname, 'output');
const IMPORT_JSON = path.join(OUT_DIR, 'cat_roadmaps_import.json');
const OUT_JSON    = path.join(OUT_DIR, 'cat_roadmaps_normalized.json');
const REPORT_MD   = path.join(OUT_DIR, 'normalize_report.md');

const DRY_RUN = process.argv.includes('--dry-run');

if (!fs.existsSync(IMPORT_JSON)) {
  console.error('[normalize] cat_roadmaps_import.json غير موجود. شغّل import_cat_roadmaps.js أولاً.');
  process.exit(1);
}

const rawImport = JSON.parse(fs.readFileSync(IMPORT_JSON, 'utf8'));
// الشكل الفعلي: { generatedAt, sourceRepo, requiresManualHandling, tracks: [...] }
const tracks = Array.isArray(rawImport) ? rawImport : (rawImport.tracks || []);
const importMeta = Array.isArray(rawImport) ? null : rawImport;

// ── أنواع الموارد المقبولة (تُطابق resource_kind في schema) ──────
// video         → YouTube embed أو ملف فيديو مباشر
// article       → مقال/مدونة/كورس فيديو خارجي عام (الافتراضي عند عدم تطابق نوع أدق)
// repository    → GitHub/GitLab أو متاجر أصول قابلة للتنزيل (تُعامَل معاملة المستودع لأنها مصدر ملفات لا قراءة)
// documentation → توثيق رسمي لمنصة/لغة/إطار عمل
// practice      → منصات تدريب عملي وتحديات برمجية وأصول تصميم تفاعلية
// exam          → نماذج/اختبارات/تكليفات (Google Forms وما شابه)

const RESOURCE_KIND_MAP = [
  { pattern: /youtube\.com|youtu\.be/i, kind: 'video' },

  // ── repository: أكواد مصدرية + متاجر أصول قابلة للتنزيل (نموذج "استنسخ/نزّل" وليس "اقرأ") ──
  { pattern: /github\.com|gitlab\.com|bitbucket\.org/i, kind: 'repository' },
  { pattern: /assetstore\.unity\.com|turbosquid\.com|cgtrader\.com|sketchfab\.com|opengameart\.org|kenney\.nl|texturehaven\.com|tf3dm\.com|shop\.bitgem3d\.com|freesound\.org|downloads\.khinsider\.com|sounddogs\.com|incompetech\.com|pexels\.com|shutterstock\.com|istockphoto\.com|nasa3d\.arc\.nasa\.gov|creativecrash\.com/i, kind: 'repository' },

  // ── exam: نماذج/اختبارات/تكليفات رسمية ──
  { pattern: /docs\.google\.com\/forms|forms\.gle|typeform\.com/i, kind: 'exam' },
  { pattern: /elzero\.org\/.*(assignment|quiz|exam)/i, kind: 'exam' },

  // ── practice: منصات تدريب عملي وتحديات وتمارين تفاعلية ──
  { pattern: /leetcode\.com|hackerrank\.com|codewars\.com|exercism\.org|frontendmentor\.io|codewell\.cc|cssbattle\.dev|jschallenger\.com|neetcode\.io|frontendpractice\.com|devchallenges\.io|interviewbit\.com|sqlzoo\.net|kaggle\.com|colab\.research\.google\.com|dartpad\.dev/i, kind: 'practice' },

  // ── documentation: توثيق رسمي للغات/أطر العمل/المنصات ──
  { pattern: /developer\.mozilla\.org|developers\.google\.com|developer\.android\.com|docs\.python\.org|getbootstrap\.com|docs\.djangoproject\.com|laravel\.com\/docs|reactjs\.org|react\.dev|vuejs\.org|pinia\.vuejs\.org|nuxt\.com|angular\.io|kotlinlang\.org|dart\.dev|api\.flutter\.dev|docs\.flutter\.dev|flutter\.dev|docs\.spring\.io|spring\.io|learn\.microsoft\.com|docs\.microsoft\.com|aws\.amazon\.com|docs\.docker\.com|docs\.unity3d\.com|docs\.unrealengine\.com|unrealengine\.com\/.*docs|docs\.swift\.org|docs\.gl|directxtutorial\.com|nodejs\.org|sequelize\.org|socket\.io|docs\.fastlane\.tools|docs\.paymob\.com|opensource\.guide|web\.dev|javascript\.info|learnjavascript\.online|learnrxjs\.io|redux\.js\.org|reactrouter\.com|learncpp\.com|fluentcpp\.com|git-scm\.com|bloclibrary\.dev|pub\.dev|firebase\.google\.com|mozilla\.org/i, kind: 'documentation' },

  // ما تبقى (مقالات، مدونات، كورسات فيديو خارجية، Notion، روابط عامة) → article تلقائياً
];


// ── استخراج YouTube Video ID من رابط فيديو مفرد (watch / youtu.be / embed / shorts) ──
// ملاحظة: روابط playlist تُعالَج بدالة منفصلة لأن معرّف القائمة ليس video ID.
function extractYtId(url) {
  if (!url) return null;
  const m = String(url).match(
    /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/(?!videoseries)|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

// ── استخراج YouTube Playlist ID (من رابط playlist?list=... أو watch?...&list=...) ──
function extractYtPlaylistId(url) {
  if (!url) return null;
  const m = String(url).match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return m ? m[1] : null;
}

// ── هل الرابط playlist بدون فيديو مفرد محدد؟ ──
function isPlaylistOnlyUrl(url) {
  if (!url) return false;
  return /youtube\.com\/playlist\?/i.test(url) && !extractYtId(url);
}

// ── تحويل رابط YouTube إلى embed ─────────────────────────────────
// فيديو مفرد → https://www.youtube.com/embed/VIDEO_ID
// قائمة تشغيل (playlist) بدون فيديو محدد → https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID
//   (صيغة يوتيوب الرسمية الوحيدة لتضمين قائمة كاملة داخل iframe — لا يوجد VIDEO_ID مفرد لقائمة)
function toEmbedUrl(url) {
  const id = extractYtId(url);
  if (id) return `https://www.youtube.com/embed/${id}`;

  const listId = extractYtPlaylistId(url);
  if (listId) return `https://www.youtube.com/embed/videoseries?list=${listId}`;

  return url;                                   // مش يوتيوب — ارجع كما هو
}

// ── تصنيف رابط ──────────────────────────────────────────────────
function classifyUrl(url) {
  if (!url) return 'article';
  for (const rule of RESOURCE_KIND_MAP) {
    if (rule.pattern.test(url)) return rule.kind;
  }
  return 'article';
}

// ── إحصائيات ─────────────────────────────────────────────────────
const stats = {
  tracks: 0, sections: 0, steps: 0,
  resources_before: 0, resources_after: 0,
  videos_converted: 0,
  playlist_videos: 0,      // فيديوهات هي فعلياً playlists كاملة (embed/videoseries)
  channel_links: 0,        // روابط قناة يوتيوب (لا فيديو ولا playlist) — أُعيد تصنيفها كـ article
  kind_counts: {},
  empty_steps: [],        // [{ track, section, step }]
  invalid_yt_urls: [],    // روابط يوتيوب لم ينجح استخراج ID أو playlist ID منها
};

// ── المعالجة ─────────────────────────────────────────────────────
for (const track of tracks) {
  stats.tracks++;
  for (const course of (track.courses || [])) {
    stats.sections++;
    for (const lesson of (course.lessons || [])) {
      stats.steps++;

      // نسخة الموارد الموحّدة — المصدر الفعلي هو lesson.allResources[]
      // (كل عنصر: { title, url, kind }) — مع videoUrl كاحتياط لو كان allResources فارغاً
      const normalizedResources = [];
      const sourceResources = (lesson.allResources && lesson.allResources.length)
        ? lesson.allResources
        : (lesson.videoUrl ? [{ title: lesson.title, url: lesson.videoUrl, kind: 'video' }] : []);

      sourceResources.forEach(function (res, i) {
        const url = (res.url || '').trim();
        if (!url) return;

        // رابط قناة يوتيوب (channel/@handle/user) — ليس فيديو ولا playlist، لا يصلح للتضمين كـ iframe.
        // يُعاد تصنيفه كمقال/رابط خارجي بدل اعتباره فيديو معطوباً.
        const isChannelLink = /youtube\.com\/(c\/|channel\/|user\/|@)/i.test(url) && !extractYtId(url) && !extractYtPlaylistId(url);

        // التصنيف يعتمد حصرياً على نمط الرابط نفسه ضمن الأنواع الستة المطلوبة
        // (video/article/repository/documentation/practice/exam) — لا نأخذ بعين الاعتبار
        // الوسم الخام القادم من المصدر (video/external/github) لأنه أعم من المطلوب.
        let kind = isChannelLink ? 'article' : classifyUrl(url);
        const embed    = (kind === 'video') ? toEmbedUrl(url) : url;
        const ytId     = (kind === 'video') ? extractYtId(url) : null;
        const isYt     = /youtube\.com|youtu\.be/i.test(url);
        const playlist = (kind === 'video') ? extractYtPlaylistId(url) : null;
        const isPlaylistOnly = (kind === 'video') && !ytId && !!playlist;

        // رابط يوتيوب فشل استخراج video ID أو playlist ID منه وليس رابط قناة معروف → يحتاج مراجعة يدوية
        if (kind === 'video' && isYt && !ytId && !playlist) {
          stats.invalid_yt_urls.push({ track: track.id, step: lesson.id, url });
        }
        if (kind === 'video' && (ytId || playlist)) stats.videos_converted++;
        if (isPlaylistOnly) stats.playlist_videos++;
        if (isChannelLink) stats.channel_links++;

        stats.kind_counts[kind] = (stats.kind_counts[kind] || 0) + 1;
        stats.resources_before++;

        normalizedResources.push({
          id:          `nr-${lesson.id}-${i}`,
          kind,
          title:       res.title || lesson.title,
          external_url: embed,
          embed_url:   (kind === 'video') ? embed : null,
          is_playlist: isPlaylistOnly,   // true = هذا "فيديو" فعلياً قائمة تشغيل كاملة (embed/videoseries)
          order_index: i + 1
        });
      });

      stats.resources_after += normalizedResources.length;

      // تسجيل الدروس الفارغة
      if (normalizedResources.length === 0) {
        stats.empty_steps.push({
          track:   track.id,
          section: course.id,
          step:    lesson.id,
          title:   lesson.title
        });
      }

      // كتابة الموارد الموحّدة على الـ lesson
      lesson.normalized_resources = normalizedResources;
    }
  }
}

// ── كتابة الملف الموحّد ──────────────────────────────────────────
if (!DRY_RUN) {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(OUT_JSON, JSON.stringify(tracks, null, 2));
  console.log('[normalize] ملف موحّد مكتوب:', OUT_JSON);
} else {
  console.log('[normalize --dry-run] لم يكتب أي ملف — فقط إحصائيات.');
}

// ── تقرير Markdown ───────────────────────────────────────────────
const kindRows = Object.entries(stats.kind_counts)
  .sort((a, b) => b[1] - a[1])
  .map(([k, v]) => `| ${k} | ${v} |`);

const emptyRows = stats.empty_steps.slice(0, 30).map(
  s => `| ${s.track} | ${s.section} | ${s.step} | ${s.title} |`
);
const emptyMore = stats.empty_steps.length > 30
  ? `\n> + ${stats.empty_steps.length - 30} درساً آخر فارغاً — راجع normalize_report.json للقائمة الكاملة.`
  : '';

const report = [
  '# تقرير توحيد الموارد — normalize_resources.js',
  '',
  `**تاريخ التشغيل:** ${new Date().toISOString()}`,
  `**وضع التشغيل:** ${DRY_RUN ? 'Dry Run (لا تعديل)' : 'Full Run'}`,
  '',
  '## إحصائيات عامة',
  '',
  `| المؤشر | العدد |`,
  `|---|---|`,
  `| المسارات | ${stats.tracks} |`,
  `| الأقسام (Sections) | ${stats.sections} |`,
  `| الخطوات (Steps) | ${stats.steps} |`,
  `| الموارد قبل التوحيد | ${stats.resources_before} |`,
  `| الموارد بعد التوحيد | ${stats.resources_after} |`,
  `| فيديوهات حُوّلت لـ embed (إجمالي) | ${stats.videos_converted} |`,
  `| — منها: فيديو مفرد (embed/VIDEO_ID) | ${stats.videos_converted - stats.playlist_videos} |`,
  `| — منها: قائمة تشغيل كاملة (embed/videoseries) | ${stats.playlist_videos} |`,
  `| دروس فارغة (بلا موارد) | ${stats.empty_steps.length} |`,
  `| روابط يوتيوب لم ينجح استخراج ID أو Playlist ID منها | ${stats.invalid_yt_urls.length} |`,
  `| روابط قناة يوتيوب (أُعيد تصنيفها كمقال خارجي) | ${stats.channel_links} |`,
  '',
  '## توزيع أنواع الموارد',
  '',
  '| النوع | العدد |',
  '|---|---|',
  ...kindRows,
  '',
  '## ملاحظة: YouTube Embed',
  '',
  '> كل رابط YouTube يُعرض داخل `<iframe>` بصيغة embed — بدون فتحه كرابط خارجي أبداً:',
  '> ```',
  '> فيديو مفرد:        https://www.youtube.com/embed/VIDEO_ID',
  '> قائمة تشغيل كاملة:  https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID',
  '> ```',
  '> roadmap-ui.js يستخدم `embed_url` مباشرة في iframe.',
  '>',
  `> ⚠️ **انحراف موثّق عن الصيغة المطلوبة حرفياً:** ${stats.playlist_videos} مورد من أصل ${stats.videos_converted} `,
  '> (المسجَّلة كنوع "video") هي روابط **قائمة تشغيل** (`youtube.com/playlist?list=...`) وليست فيديو واحداً، ',
  '> لذلك لا يوجد لها `VIDEO_ID` مفرد لتوليد `embed/VIDEO_ID`. تم استخدام صيغة `embed/videoseries?list=ID` ',
  '> بدلاً منها — وهي الصيغة الرسمية الوحيدة من يوتيوب لتضمين قائمة كاملة داخل iframe. كل مورد من هذا ',
  '> النوع موسوم بـ `is_playlist: true` في `cat_roadmaps_normalized.json` ليسهل تتبّعه أو معالجته يدوياً لاحقاً ',
  '> (مثلاً: استبداله بفيديو مفرد واحد إذا رغب فريق المحتوى بذلك).',
  '>',
  `> 📺 **${stats.channel_links} رابط** من نوع "رابط قناة يوتيوب" (`,
  '> `/c/الاسم`, `/@handle`, `/user/الاسم`, `/channel/UCxxxx` بدون فيديو أو قائمة محددة) ',
  '> لا يمكن تضمينه كفيديو لعدم وجود معرّف فيديو/قائمة فعلي — تم تصنيفه تلقائياً كمورد من نوع `article` ',
  '> (رابط خارجي عادي بزر "فتح ↗") بدلاً من تركه فيديو معطوباً.',
  '',
  `## الدروس الفارغة (${stats.empty_steps.length} درس)`,
  '',
  stats.empty_steps.length === 0
    ? '✅ لا يوجد دروس فارغة.'
    : [
        '| Track | Section | Step ID | العنوان |',
        '|---|---|---|---|',
        ...emptyRows,
        emptyMore
      ].join('\n'),
  '',
  '## القاعدة لعرض الدرس الفارغ',
  '',
  '```html',
  '<!-- roadmap-ui.js يعرض هذا تلقائياً لو resources = [] -->',
  '<div class="rm-internal-viewer rm-empty-note">',
  '  لا توجد موارد متاحة لهذه الخطوة حالياً.',
  '</div>',
  '```',
].join('\n');

fs.writeFileSync(REPORT_MD, report);
console.log('[normalize] تقرير Markdown مكتوب:', REPORT_MD);

// ── طباعة ملخص ──────────────────────────────────────────────────
console.log('\n─────────────────────────────────────────────');
console.log('📦 نتيجة توحيد الموارد:');
console.log(`  📽  فيديوهات → embed:     ${stats.videos_converted} (منها ${stats.playlist_videos} playlist)`);
console.log(`  📺 روابط قناة (أُعيدت لـ article): ${stats.channel_links}`);
console.log(`  📭 دروس فارغة:             ${stats.empty_steps.length}`);
console.log(`  ⚠️  روابط YT بدون ID:      ${stats.invalid_yt_urls.length}`);
console.log(`  📊 إجمالي الموارد:          ${stats.resources_after}`);
console.log('─────────────────────────────────────────────\n');

if (stats.invalid_yt_urls.length > 0) {
  console.log('⚠️  روابط يوتيوب فشل استخراج ID منها (قد تكون playlists أو روابط قصيرة غير مدعومة):');
  stats.invalid_yt_urls.slice(0, 5).forEach(r => console.log('   ', r.url));
  if (stats.invalid_yt_urls.length > 5) console.log(`   ... و${stats.invalid_yt_urls.length - 5} رابطاً آخر.`);
}
