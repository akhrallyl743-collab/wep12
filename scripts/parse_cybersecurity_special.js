#!/usr/bin/env node
/**
 * scripts/parse_cybersecurity_special.js
 * ----------------------------------------------------------------------------
 * معالجة مخصَّصة لحالة CyberSecurity الاستثنائية وحدها (بقرار صريح، راجع
 * تقرير المراجعة 2026-06-22): الملف يحوي roadmap رئيسي واحد بمقدمة حقيقية
 * (FAQ + مهارات أساسية + رابطا فيديو توضيحي حقيقيان)، يتبعه 5 مسارات فرعية
 * (Penetration Testing, Reverse Engineering & Malware Analysis,
 * Network Security, SOC Analyst & DFIR, Cryptography) كل واحد منها Shell
 * بالكامل (روابط Notion/Drive فقط بلا تفصيل داخلي).
 *
 * هذا الملف الوحيد بين الـ14 الذي يحتاج معالجة يدوية مخصَّصة بدل المحرك
 * العام parse_cat_reloaded.js، لأنه الحالة الوحيدة المختلطة (Tier A جزئي
 * + Tier B جزئي ضمن نفس ملف README واحد).
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'output', 'cat_parsed');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

// ── 1) الـ Roadmap الرئيسي: مقدمة CyberSecurity (محتوى حقيقي) ──────────────
const mainRoadmap = {
  circle: 'CyberSecurity',
  tracks: [
    {
      source_file: 'CyberSecurity/README.md (مقدمة)',
      roadmap_slug: 'cat-cybersecurity',
      title_en: 'CAT Reloaded Cyber Security Road Map',
      sections: [
        {
          title_en: 'Before we start, let\'s answer a few FAQs',
          order: 1,
          topics: [
            {
              title_en: 'What are the most famous fields of cybersecurity?',
              task_note: null,
              resources: [
                { title: 'So you wanna do security?', url: 'https://youtu.be/i8rizLc4hc0' },
                { title: 'يوم في حياة محلل أمن سيبراني', url: 'https://www.youtube.com/watch?v=ompZWkWsn9A&list=PLv7cogHXoVhXIg4R6-eyws4isM2-sh2St' }
              ]
            },
            {
              title_en: 'Essential skills Before Cyber Security',
              task_note: 'security essential skills: Network basics, Linux OS awareness, Programming, Cryptography fundamentals',
              resources: [
                { title: 'Here is the content to study through this phase (Entry Level Roadmap)', url: 'https://www.notion.so/eljooker/Entry-Level-Roadmap-12f3f791038f807b9b84cf7d875a6e5d' }
              ]
            }
          ]
        }
      ],
      shell_only: false
    }
  ]
};

// ── 2) خمسة Roadmap Shell منفصلة للمسارات الفرعية ──────────────────────────
const subRoadmaps = [
  {
    slug_suffix: 'pentest',
    title_en: 'Penetration Testing Path (CAT Reloaded)',
    resources: [
      { title: 'Web App Penetration Testing — New Roadmap', url: 'https://third-open-099.notion.site/Penetration-testing-13bb1f518de7804f9220c035f65bdb87?pvs=4' },
      { title: 'Web App Penetration Testing — Main Roadmap by Muhammad Gamal', url: 'https://drive.google.com/file/d/1YlYBgkith2ycK8aqP2bv_a-S9YD6LANi/view?usp=sharing' },
      { title: 'Network Penetration Testing — New Roadmap', url: 'https://third-open-099.notion.site/Roadmap-for-Network-Pentest-Level-2-12eb1f518de78021b90ef331f8d9d2e4?pvs=4' },
      { title: 'Network Penetration Testing — Main Roadmap', url: 'https://drive.google.com/file/d/1OGCm2PHs0qX1NqmkeZFv9q-lo10fPbht/view?usp=sharing' }
    ],
    note_ar_source: 'يضم Web/Network Pentesting. مسار Mobile Pentesting قيد الإنشاء في المرجع الرسمي (Under Construction) ولا يحتوي رابطاً فعلياً حتى الآن.'
  },
  {
    slug_suffix: 're-malware',
    title_en: 'Reverse Engineering & Malware Analysis Path (CAT Reloaded)',
    resources: [
      { title: 'New Roadmap', url: 'https://www.notion.so/eljooker/RE-MA-Road-Map-13b3f791038f8063a2bfee5884ee1543?pvs=25' },
      { title: 'Main Roadmap', url: 'https://drive.google.com/file/d/13nDt8I-LoUq350HgeVq0UVhoF9qyhQVh/view?usp=sharing' }
    ]
  },
  {
    slug_suffix: 'network-security',
    title_en: 'Network Security Path (defensive) (CAT Reloaded)',
    resources: [
      { title: 'Network Security Roadmap', url: 'https://grove-tuck-ba3.notion.site/Network-security-138e4937b36e80b28e2ac0b8d8731b86?pvs=4' }
    ]
  },
  {
    slug_suffix: 'soc-dfir',
    title_en: 'SOC Analyst & DFIR Path (CAT Reloaded)',
    resources: [
      { title: 'New Roadmap', url: 'https://www.notion.so/SOC-DFIR-RoadMap-Courses-Path-13d75215856d80609ed2f5453ea43272?pvs=4' },
      { title: 'Main SOC & DFIR Roadmap', url: 'https://drive.google.com/file/d/14kQBiI_U17_rzwXpJpSEYnWtblfVYwn1/view?usp=sharing' }
    ]
  },
  {
    slug_suffix: 'cryptography',
    title_en: 'Cryptography Path (CAT Reloaded)',
    resources: [
      { title: 'Cryptography Roadmap', url: 'https://butter-tortellini-830.notion.site/CAT-Reloaded-Cryptography-roadmap-14ab155a2c68804bbbf0ca53260e92f1' }
    ]
  }
];

function buildShellTrack(sub) {
  return {
    source_file: 'CyberSecurity/README.md (مسار فرعي: ' + sub.title_en + ')',
    roadmap_slug: 'cat-cybersecurity-' + sub.slug_suffix,
    title_en: sub.title_en,
    shell_section_title_en: 'المحتوى الرسمي',
    shell_step_title_en: sub.title_en, // عنوان الـStep الثابت = عنوان المسار نفسه من المرجع، لا اختراع عنوان تقني
    resources: sub.resources,
    note_ar_source: sub.note_ar_source || null,
    shell_only: true
  };
}

const shellTracks = subRoadmaps.map(buildShellTrack);

const output = {
  main_roadmap: mainRoadmap,
  shell_sub_roadmaps: shellTracks
};

fs.writeFileSync(path.join(OUT_DIR, 'CyberSecurity.json'), JSON.stringify(output, null, 2), 'utf8');

console.log('✅ CyberSecurity (معالجة مخصَّصة): 1 roadmap رئيسي (1 قسم، 2 موضوع، 3 موارد) + 5 roadmap Shell فرعية (' +
  shellTracks.reduce((n, s) => n + s.resources.length, 0) + ' مورد رسمي إجمالاً)');
