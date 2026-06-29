/**
 * analyze_missing_roadmaps.js
 * -----------------------------------------------------------------------
 * يقارن المسارات (Roadmaps) الموجودة فعلياً داخل المشروع الحالي (js/data.js)
 * بالمسارات الموجودة في مستودع المرجع:
 *   https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps (فرع main)
 *
 * المستودع المرجعي يجب أن يكون متوفراً محلياً تحت:
 *   scripts/../reference_repo/   (أي: <ROOT>/reference_repo)
 * (تم تحميله واستخراجه مسبقاً عبر codeload.github.com لأن GitHub API
 *  محدود بالطلبات؛ هذا السكريبت لا يقوم بأي طلب شبكة، فقط يقرأ الملفات محلياً)
 *
 * المخرجات:
 *   1) طباعة تقرير مفصّل في الـ console (بالعربية)
 *   2) كتابة تقرير JSON كامل إلى: scripts/output/missing_roadmaps_report.json
 *
 * لا يضيف أي بيانات وهمية — فقط يقرأ ويحلل وينتج تقريراً وصفياً.
 * تشغيل: node scripts/analyze_missing_roadmaps.js
 * -----------------------------------------------------------------------
 */
'use strict';
const fs   = require('fs');
const path = require('path');

const ROOT          = path.join(__dirname, '..');
const REF_REPO       = path.join(ROOT, 'reference_repo');
const OUTPUT_DIR     = path.join(__dirname, 'output');
const REPORT_JSON    = path.join(OUTPUT_DIR, 'missing_roadmaps_report.json');

if (!fs.existsSync(REF_REPO)) {
  console.error('❌ لم يتم العثور على المستودع المرجعي محلياً في:', REF_REPO);
  console.error('   قم بتحميل واستخراج https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps');
  console.error('   (فرع main) إلى هذا المسار قبل تشغيل هذا السكريبت.');
  process.exit(1);
}

/* =====================================================================
   1) قراءة كل المسارات (الملفات) الموجودة في المستودع المرجعي
   ===================================================================== */
function walk(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const e of entries) {
    if (e.name === '.git' || e.name === 'node_modules') continue;
    const rel  = path.join(base, e.name);
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files = files.concat(walk(full, rel));
    } else {
      files.push(rel);
    }
  }
  return files;
}

const allRefFiles = walk(REF_REPO);
const refMarkdownFiles = allRefFiles.filter(f => /\.md$/i.test(f));
const refImageFiles    = allRefFiles.filter(f => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f));
const refOtherFiles    = allRefFiles.filter(f => !/\.md$/i.test(f) && !/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f));

/* تجميع الملفات حسب "الدائرة" (Circle) = أول مجلد في المسار */
function topCircleOf(relPath) {
  const parts = relPath.split(path.sep);
  return parts[0];
}

const circles = {};
refMarkdownFiles.forEach(f => {
  const circle = topCircleOf(f);
  circles[circle] = circles[circle] || [];
  circles[circle].push(f);
});

/* اكتشاف "مسارات فرعية فاضية" (submodules لم تُحمَّل، أو مجلدات بلا أي .md) */
const emptyOrSubmoduleDirs = [];
function findEmptyDirs(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (!e.isDirectory() || e.name === '.git') continue;
    const rel  = path.join(base, e.name);
    const full = path.join(dir, e.name);
    const inner = fs.readdirSync(full);
    const hasMd = walk(full).some(f => /\.md$/i.test(f));
    if (!hasMd) emptyOrSubmoduleDirs.push(rel);
    findEmptyDirs(full, rel);
  }
}
findEmptyDirs(REF_REPO);

/* =====================================================================
   2) استخراج كل الروابط (YouTube / GitHub / خارجية) من كل ملف Markdown
   ===================================================================== */
const URL_RE        = /https?:\/\/[^\s)"'<>\]]+/g;
const YT_RE          = /(youtube\.com|youtu\.be)/i;
const GITHUB_RE      = /github\.com/i;
const NOTION_RE      = /notion\.(so|site)/i;

function extractLinks(content) {
  const all = content.match(URL_RE) || [];
  const cleaned = all.map(u => u.replace(/[.,;:)\]]+$/, ''));
  return {
    youtube: cleaned.filter(u => YT_RE.test(u)),
    github:  cleaned.filter(u => GITHUB_RE.test(u)),
    notion:  cleaned.filter(u => NOTION_RE.test(u)),
    other:   cleaned.filter(u => !YT_RE.test(u) && !GITHUB_RE.test(u) && !NOTION_RE.test(u)),
    total:   cleaned,
  };
}

/* استخراج العناوين (## Week X / # Phase ...) لتقدير عدد "الأسابيع/المراحل" داخل كل ملف */
function extractHeadings(content) {
  const lines = content.split(/\r?\n/);
  return lines
    .filter(l => /^#{1,3}\s+/.test(l.trim()))
    .map(l => l.replace(/^#{1,3}\s+/, '').replace(/[*_`]/g, '').trim());
}

/* تقدير عدد "الأسابيع" بالاعتماد على عدة أنماط شائعة في المستودع */
function countWeeks(content, fileName) {
  // النمط 1: ملفات week_XX.md منفصلة (تُحسب لاحقاً على مستوى المجلد)
  // النمط 2: عناوين Week N / **Week N** داخل نفس الملف
  const weekHeadingMatches = content.match(/(?:^|\n)\s*#{0,4}\s*\*{0,2}week\s*\d+/gi) || [];
  // النمط 3: صفوف جدول HTML/Markdown فيها <th>Week N</th> أو | Week N |
  const weekTableRows = content.match(/<th>\s*week\s*\d+\s*<\/th>|\|\s*week\s*\d+\s*\|/gi) || [];
  const set = new Set([...weekHeadingMatches, ...weekTableRows].map(s => s.toLowerCase().replace(/\s+/g, ' ').trim()));
  return set.size;
}

const refAnalysis = {};
refMarkdownFiles.forEach(relFile => {
  const full = path.join(REF_REPO, relFile);
  const content = fs.readFileSync(full, 'utf8');
  const links = extractLinks(content);
  refAnalysis[relFile] = {
    path: relFile,
    circle: topCircleOf(relFile),
    sizeBytes: Buffer.byteLength(content, 'utf8'),
    lineCount: content.split(/\r?\n/).length,
    headings: extractHeadings(content),
    weeksDetected: countWeeks(content, relFile),
    links,
    linkCounts: {
      youtube: links.youtube.length,
      github: links.github.length,
      notion: links.notion.length,
      other: links.other.length,
      total: links.total.length,
    },
  };
});

/* تجميع عدد "أسابيع الملفات المنفصلة" (week_01.md ... ) لكل مسار فرعي */
const weekFileGroups = {}; // e.g. "Flutter/1 - Beginner" -> [week_01.md, week_02.md, ...]
refMarkdownFiles.forEach(f => {
  const base = path.basename(f);
  if (/^week_\d+\.md$/i.test(base)) {
    const dir = path.dirname(f);
    weekFileGroups[dir] = weekFileGroups[dir] || [];
    weekFileGroups[dir].push(f);
  }
});

/* =====================================================================
   3) قراءة المسارات الموجودة فعلياً داخل المشروع الحالي (js/data.js)
   ===================================================================== */
let dataSrc = fs.readFileSync(path.join(ROOT, 'js/data.js'), 'utf8');
dataSrc += '\nmodule.exports = { getAllTracks, CAREERS_DATA };';
const tmpFile = '/tmp/_data_analyze_runtime.js';
fs.writeFileSync(tmpFile, dataSrc);
const { getAllTracks, CAREERS_DATA } = require(tmpFile);

const existingTracks = getAllTracks();
const existingTrackSummaries = existingTracks.map(t => {
  const totalLessons = t.courses.reduce((s, c) => s + c.lessons.length, 0);
  const totalVideos = t.courses.reduce(
    (s, c) => s + c.lessons.filter(l => l.videoUrl && l.videoUrl.trim()).length, 0
  );
  return {
    id: t.id,
    title: t.title,
    courses: t.courses.length,
    lessons: totalLessons,
    videos: totalVideos,
    courseTitles: t.courses.map(c => c.title),
  };
});

const careersWithoutTrack = CAREERS_DATA
  .filter(c => !c.tracks || c.tracks.length === 0)
  .map(c => ({ id: c.id, name: c.name, cat: c.cat }));

/* =====================================================================
   4) خريطة المطابقة (Mapping) بين "دوائر" المستودع المرجعي
      و"المسارات/المهن" الموجودة حالياً في المشروع — تستخدم فقط للمقارنة
      النصية، ولا تُسقط أي بيانات؛ أي دائرة غير مذكورة هنا تُعتبر تلقائياً
      "غير موجودة بالكامل" في تقرير الفجوات.
   ===================================================================== */
const CIRCLE_TO_EXISTING_TRACK = {
  'Front End':  'frontend-track',
  'UI':         'ui-ux-track',
  // الأسماء التالية ليس لها أي مقابل حالي بالمشروع (career موجودة بلا track،
  // أو غير موجودة كـ career من الأساس) — ستظهر كفجوة كاملة في التقرير:
  'Android':              null,
  'BackEnd':              null,
  'Computer Science':     null,
  'CyberSecurity':        'cybersecurity', // career موجودة لكن بلا track
  'Data Science':         'data',          // career موجودة لكن بلا track
  'Embedded Systems':     null,
  'English':              'english-prof',  // career موجودة لكن بلا track
  'Flutter':              'mobile',        // career موجودة لكن بلا track
  'Game Development':     'gamedev',       // career موجودة لكن بلا track
  'IOS':                  'mobile',        // career موجودة لكن بلا track (مشترك مع Flutter)
  'Media':                null,
  'Cloud Computing & DevOps': 'devops',     // career موجودة لكن بلا track
};

/* =====================================================================
   5) بناء تقرير الفجوات
   ===================================================================== */
const report = {
  generatedAt: new Date().toISOString(),
  source: {
    referenceRepo: 'https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps/tree/main',
    localCopyPath: path.relative(ROOT, REF_REPO),
  },
  summary: {},
  referenceRepo: {
    totalFiles: allRefFiles.length,
    markdownFiles: refMarkdownFiles.length,
    imageFiles: refImageFiles.length,
    otherFiles: refOtherFiles.length,
    circles: Object.keys(circles).sort(),
    emptyOrSubmoduleDirs,
  },
  currentProject: {
    totalCareers: CAREERS_DATA.length,
    careersWithTrack: existingTrackSummaries.length,
    careersWithoutTrack: careersWithoutTrack.length,
    existingTracks: existingTrackSummaries,
    careersWithoutTrackList: careersWithoutTrack,
  },
  gaps: {
    circlesMissingEntirely: [],
    circlesPartiallyMapped: [],
    weeksOrPhasesMissing: [],
    resourcesSummaryByCircle: [],
  },
};

/* 5.1 — دوائر مفقودة بالكامل (لا يوجد أي track مقابل بالمشروع) */
Object.keys(circles).sort().forEach(circle => {
  const mappedTrackId = CIRCLE_TO_EXISTING_TRACK[circle];
  const filesInCircle = circles[circle];
  const linkTotals = filesInCircle.reduce((acc, f) => {
    const a = refAnalysis[f];
    acc.youtube += a.linkCounts.youtube;
    acc.github  += a.linkCounts.github;
    acc.notion  += a.linkCounts.notion;
    acc.other   += a.linkCounts.other;
    return acc;
  }, { youtube: 0, github: 0, notion: 0, other: 0 });

  const weekFilesInCircle = Object.keys(weekFileGroups).filter(d => d.startsWith(circle));
  const totalWeekFiles = weekFilesInCircle.reduce((s, d) => s + weekFileGroups[d].length, 0);
  const totalWeeksInline = filesInCircle.reduce((s, f) => s + refAnalysis[f].weeksDetected, 0);

  const entry = {
    circle,
    mdFileCount: filesInCircle.length,
    weekFilesCount: totalWeekFiles,
    inlineWeeksDetected: totalWeeksInline,
    estimatedTotalWeeks: totalWeekFiles + totalWeeksInline,
    links: linkTotals,
    mappedExistingTrackId: mappedTrackId || null,
    status: !mappedTrackId
      ? 'missing_entirely' // لا يوجد أي track بهذا الاسم في المشروع
      : (existingTracks.find(t => t.id === mappedTrackId) ? 'has_track' : 'career_exists_no_track'),
  };

  if (entry.status === 'missing_entirely') {
    report.gaps.circlesMissingEntirely.push(entry);
  } else if (entry.status === 'career_exists_no_track') {
    report.gaps.circlesPartiallyMapped.push(entry);
  }
  report.gaps.resourcesSummaryByCircle.push(entry);
});

/* 5.2 — أسابيع/مراحل مفقودة تفصيلياً (لكل ملف week_XX.md ومجموعات المجلدات) */
Object.keys(weekFileGroups).sort().forEach(dir => {
  const files = weekFileGroups[dir].sort();
  files.forEach(f => {
    const a = refAnalysis[f];
    report.gaps.weeksOrPhasesMissing.push({
      circle: topCircleOf(f),
      level: dir,
      file: f,
      title: a.headings[0] || path.basename(f),
      youtubeLinks: a.linkCounts.youtube,
      otherLinks: a.linkCounts.other + a.linkCounts.github,
    });
  });
});

/* 5.3 — الموارد/الفيديوهات الناقصة إجمالاً (كل رابط YouTube/GitHub في المرجع
         غير موجود حالياً داخل js/data.js كـ videoUrl) */
function collectExistingVideoUrls() {
  const set = new Set();
  existingTracks.forEach(t => t.courses.forEach(c => c.lessons.forEach(l => {
    if (l.videoUrl) set.add(l.videoUrl.trim());
  })));
  return set;
}
const existingVideoUrls = collectExistingVideoUrls();

let totalRefYoutubeLinks = 0;
let missingYoutubeLinks = 0;
refMarkdownFiles.forEach(f => {
  refAnalysis[f].links.youtube.forEach(u => {
    totalRefYoutubeLinks++;
    if (!existingVideoUrls.has(u)) missingYoutubeLinks++;
  });
});

/* =====================================================================
   6) الملخص النهائي
   ===================================================================== */
report.summary = {
  referenceMarkdownFiles: refMarkdownFiles.length,
  referenceCircles: Object.keys(circles).length,
  circlesMissingEntirely: report.gaps.circlesMissingEntirely.length,
  circlesPartiallyMapped: report.gaps.circlesPartiallyMapped.length,
  circlesWithExistingTrack: Object.keys(circles).length
    - report.gaps.circlesMissingEntirely.length
    - report.gaps.circlesPartiallyMapped.length,
  totalWeekFilesInReference: Object.values(weekFileGroups).reduce((s, a) => s + a.length, 0),
  totalReferenceYoutubeLinks: totalRefYoutubeLinks,
  missingYoutubeLinksVsCurrentProject: missingYoutubeLinks,
  currentProjectTracksCount: existingTracks.length,
  currentProjectCareersWithoutAnyTrack: careersWithoutTrack.length,
};

/* =====================================================================
   7) كتابة الملف وطباعة التقرير في الـ console
   ===================================================================== */
fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(REPORT_JSON, JSON.stringify(report, null, 2), 'utf8');

console.log('═══════════════════════════════════════════════════════════');
console.log(' تقرير الفجوات: المشروع الحالي vs CATReloaded-Circles-Roadmaps');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('📦 المستودع المرجعي:');
console.log(`   - عدد ملفات Markdown: ${refMarkdownFiles.length}`);
console.log(`   - عدد "الدوائر" (Circles) المكتشفة: ${Object.keys(circles).length}`);
console.log(`   - عدد ملفات week_XX.md: ${report.summary.totalWeekFilesInReference}`);
console.log(`   - إجمالي روابط YouTube في المرجع: ${totalRefYoutubeLinks}`);
if (emptyOrSubmoduleDirs.length) {
  console.log(`   - مجلدات فرعية فاضية/submodules لم تُحمَّل: ${emptyOrSubmoduleDirs.join(', ')}`);
}

console.log('\n📂 المشروع الحالي (js/data.js):');
console.log(`   - إجمالي المهن (careers): ${CAREERS_DATA.length}`);
console.log(`   - مهن لديها track حقيقي: ${existingTrackSummaries.length}`);
existingTrackSummaries.forEach(t => {
  console.log(`       • ${t.id} — ${t.courses} كورسات / ${t.lessons} درس / ${t.videos} فيديو`);
});
console.log(`   - مهن بلا أي track (لا دروس فعلية): ${careersWithoutTrack.length}`);

console.log('\n🚨 دوائر (Circles) مفقودة بالكامل من المشروع الحالي:');
report.gaps.circlesMissingEntirely
  .sort((a, b) => b.estimatedTotalWeeks - a.estimatedTotalWeeks)
  .forEach(e => {
    console.log(`   ❌ ${e.circle} — ${e.mdFileCount} ملف md، ~${e.estimatedTotalWeeks} أسبوع/مرحلة مكتشفة، ${e.links.youtube} رابط يوتيوب`);
  });

console.log('\n⚠️  دوائر موجودة كـ "career" بدون track حقيقي (تحتاج استيراد):');
report.gaps.circlesPartiallyMapped
  .sort((a, b) => b.estimatedTotalWeeks - a.estimatedTotalWeeks)
  .forEach(e => {
    console.log(`   🟡 ${e.circle} → career: ${e.mappedExistingTrackId} — ${e.mdFileCount} ملف md، ~${e.estimatedTotalWeeks} أسبوع/مرحلة، ${e.links.youtube} رابط يوتيوب`);
  });

console.log('\n📋 تفاصيل الأسابيع/المراحل المنفصلة (ملفات week_XX.md):');
const byLevel = {};
report.gaps.weeksOrPhasesMissing.forEach(w => {
  byLevel[w.level] = byLevel[w.level] || [];
  byLevel[w.level].push(w);
});
Object.keys(byLevel).sort().forEach(level => {
  console.log(`   📁 ${level} (${byLevel[level].length} أسبوع):`);
  byLevel[level].forEach(w => console.log(`        - ${w.file} :: ${w.title} (يوتيوب: ${w.youtubeLinks}, روابط أخرى: ${w.otherLinks})`));
});

console.log('\n🎥 الموارد/الفيديوهات:');
console.log(`   - إجمالي روابط يوتيوب في المرجع: ${totalRefYoutubeLinks}`);
console.log(`   - روابط يوتيوب غير موجودة حالياً في data.js: ${missingYoutubeLinks}`);
console.log(`   - نسبة التغطية الحالية: ${((1 - missingYoutubeLinks / Math.max(totalRefYoutubeLinks,1)) * 100).toFixed(1)}%`);

console.log('\n📄 تم حفظ التقرير الكامل في:', path.relative(ROOT, REPORT_JSON));
console.log('═══════════════════════════════════════════════════════════');
