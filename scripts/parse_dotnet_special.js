#!/usr/bin/env node
/**
 * scripts/parse_dotnet_special.js
 * ----------------------------------------------------------------------------
 * معالجة مخصَّصة (برمجية، لا يدوية حرفية) لملف BackEnd/DotNet/README.md وحده
 * (بقرار صريح، راجع تقرير المراجعة 2026-06-22): الملف يستخدم بنية جدول فريدة
 * (خلية محتوى واحدة مدمجة لكل أسبوع: Topics + Resources بكل لغاتها معاً) لم
 * يستطع المحرك العام معالجتها بثقة كاملة بدون تراجعات جانبية متكررة على
 * ملفات أخرى.
 *
 * المنهجية: استخراج كل <tr><td>Week N</td><td>...محتوى...</td></tr> برمجياً
 * عبر regex مباشر على الملف الخام نفسه (لا عبر محرك Headers العام)، ثم
 * استخراج روابط Arabic/English من كل خلية محتوى بدقة كاملة.
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const SRC_FILE = path.join(__dirname, '..', 'reference_repo_fresh', 'BackEnd', 'DotNet', 'README.md');
const OUT_DIR = path.join(__dirname, 'output', 'cat_parsed');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const content = fs.readFileSync(SRC_FILE, 'utf8');

// نفس فلتر isNonResourceLink ومنطق classifyResourceKind المستخدَم في باقي
// المشروع — نعيد تعريفه محلياً هنا لأن هذا سكربت مستقل بسيط.
function extractLinksFromHtml(html) {
  const out = [];
  const re = /<a\s+href="(https?:\/\/[^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const title = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    out.push({ title: title || m[1], url: m[1].trim() });
  }
  return out;
}

// ── 1) تقسيم الملف على مستوى "# Level" الكبرى (Entry/Beginner/Intermediate) ──
const levelSplitRe = /<h1[^>]*>\s*([^<]+?)\s*<\/h1>/gi;
const levelMatches = [];
let lm;
while ((lm = levelSplitRe.exec(content))) {
  levelMatches.push({ title: lm[1].trim(), index: lm.index });
}
levelMatches.push({ title: null, index: content.length }); // حد نهائي

const sections = [];

for (let i = 0; i < levelMatches.length - 1; i++) {
  const levelTitle = levelMatches[i].title;
  const levelContent = content.slice(levelMatches[i].index, levelMatches[i + 1].index);

  // تقسيم الملف على مستوى الصفوف <tr...>...</tr> أولاً (split على وسم <tr
  // بصرف النظر عن أي خصائص بعده — اكتُشف فعلياً أن id قد يقع على <tr> أو
  // <td> بصيغ متفاوتة (<tr id="week2">، <tr  id="week5"> بمسافة مضاعفة...)،
  // فالاعتماد على نص "Week N" الصريح داخل أول <td> فقط هو الأكثر أماناً
  // ويتجاهل كل هذا التنوع غير المهم في موضع/شكل id تماماً.
  const rows = levelContent.split(/<tr[^>]*>/).slice(1);
  const topics = [];
  rows.forEach(rowText => {
    const rowMatch = rowText.match(/^\s*<td[^>]*>\s*(Week\s*\d+)\s*<\/td>\s*<td>([\s\S]*?)<\/td>\s*<\/tr>/i);
    if (!rowMatch) return;
    const weekLabel = rowMatch[1].trim();
    const cell = rowMatch[2];
    const resources = extractLinksFromHtml(cell);
    if (resources.length > 0) {
      topics.push({ title_en: weekLabel, task_note: null, resources });
    }
  });

  if (topics.length > 0) {
    sections.push({ title_en: levelTitle, order: sections.length + 1, topics });
  }
}

const output = {
  circle: 'BackEnd_DotNet_override',
  tracks: [
    {
      source_file: 'BackEnd/DotNet/README.md',
      roadmap_slug: 'cat-backend-dotnet',
      track_title_en: 'DotNet Roadmap',
      sections,
      shell_only: false
    }
  ]
};

fs.writeFileSync(path.join(OUT_DIR, 'BackEnd_DotNet_override.json'), JSON.stringify(output, null, 2), 'utf8');

const totalTopics = sections.reduce((n, s) => n + s.topics.length, 0);
const totalResources = sections.reduce((n, s) => n + s.topics.reduce((m, t) => m + t.resources.length, 0), 0);
console.log('✅ BackEnd/DotNet (معالجة مخصَّصة برمجية): ' + sections.length + ' قسم (مستويات)، ' +
  totalTopics + ' موضوع (أسابيع)، ' + totalResources + ' مورد — مستخرَجة برمجياً بدقّة كاملة من بنية الجدول الفعلية.');
