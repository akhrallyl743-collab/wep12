#!/usr/bin/env node
/**
 * scripts/build_clean_cat_raw_input.js
 * ----------------------------------------------------------------------------
 * يبني ملفات .txt الموحَّدة لكل دائرة CAT مباشرة من نسخة حيّة نظيفة مستنسَخة
 * الآن من المرجع الرسمي (commit d80fb293d83d51123071ead8a8151bc0e5d9686b)،
 * بدلاً من files__11_.zip الذي اكتُشف فعلياً أنه يحوي تكراراً داخلياً معطوباً
 * في ملف واحد على الأقل (Embedded Systems/General Roadmap.md) — راجع تقرير
 * المراجعة 2026-06-22. هذا يضمن مصدراً نظيفاً 100% لكل الـ14 دائرة دفعة واحدة.
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const REF_DIR = path.join(__dirname, '..', 'reference_repo_fresh');
const OUT_DIR = path.join(__dirname, '..', 'cat_raw_input');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// خريطة: اسم الدائرة في المرجع (مجلد) -> اسم ملف .txt الموحَّد (مطابق لأسماء
// files__11_.zip السابقة، لإبقاء بقية السكربتات بلا أي تعديل إضافي).
const CIRCLES = {
  'Android': 'Android.txt',
  'BackEnd': 'BackEnd.txt',
  'Cloud Computing & DevOps': 'CloudComputing_DevOps.txt',
  'Computer Science': 'ComputerScience.txt',
  'CyberSecurity': 'CyberSecurity.txt',
  'Data Science': 'DataScience.txt',
  'Embedded Systems': 'EmbeddedSystems.txt',
  'English': 'English.txt',
  'Flutter': 'Flutter.txt',
  'Front End': 'FrontEnd.txt',
  'Game Development': 'GameDevelopment.txt',
  'IOS': 'iOS.txt',
  'Media': 'Media.txt',
  'UI': 'UI_UX.txt'
};

function walkMdFiles(dir, base) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'img') continue;
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMdFiles(full, rel));
    } else if (/\.md$/i.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}

let totalLines = 0;
Object.entries(CIRCLES).forEach(([circleDir, outFileName]) => {
  const fullCircleDir = path.join(REF_DIR, circleDir);
  if (!fs.existsSync(fullCircleDir)) {
    console.error('❌ مجلد غير موجود:', fullCircleDir);
    return;
  }
  const mdFiles = walkMdFiles(fullCircleDir, circleDir).sort();

  const out = [];
  out.push('='.repeat(80));
  out.push('CAT Reloaded - ' + circleDir + ' Circle Roadmap (إعادة استخراج نظيفة 2026-06-22)');
  out.push('Source: https://github.com/CATReloaded/CATReloaded-Circles-Roadmaps/tree/main');
  out.push('Commit: d80fb293d83d51123071ead8a8151bc0e5d9686b (2026-02-24)');
  out.push('='.repeat(80));
  out.push('');

  mdFiles.forEach(relPath => {
    const content = fs.readFileSync(path.join(REF_DIR, relPath), 'utf8');
    out.push('-'.repeat(80));
    out.push('FILE: ' + relPath);
    out.push('-'.repeat(80));
    out.push(content);
    out.push('');
  });

  const finalText = out.join('\n');
  fs.writeFileSync(path.join(OUT_DIR, outFileName), finalText, 'utf8');
  const lineCount = finalText.split('\n').length;
  totalLines += lineCount;
  console.log('✅ ' + outFileName + ': ' + mdFiles.length + ' ملف .md، ' + lineCount + ' سطر');
});

console.log('\nإجمالي الأسطر عبر كل الدوائر:', totalLines);
