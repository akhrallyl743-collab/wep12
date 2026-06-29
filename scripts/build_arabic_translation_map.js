#!/usr/bin/env node
/**
 * scripts/build_arabic_translation_map.js
 * ----------------------------------------------------------------------------
 * يبني قاموس ترجمة عربية شامل (title_ar) لكل عناوين الأقسام والمواضيع
 * المستخرَجة فعلياً (279 عنواناً فريداً)، عبر:
 *   1) قواعد نمطية (regex) تغطي الأنماط المتكررة بدقة (Week N, Level X...).
 *   2) قاموس حرفي للعناوين الفريدة غير النمطية (تُترجَم يدوياً بدقة، لا آلياً).
 * أي عنوان لا يجد ترجمة (نادر جداً، احتياطي) يبقى بلا title_ar، فيعمل fallback
 * الإنجليزية تلقائياً في طبقة العرض (لا فراغ في الواجهة أبداً).
 * ----------------------------------------------------------------------------
 */
'use strict';
const fs = require('fs');
const path = require('path');

// ── 1) قواعد نمطية (Pattern Rules) — تُفحَص بالترتيب، أول تطابق يُستخدَم ───
const PATTERN_RULES = [
  // "Week N: العنوان الفرعي" أو "Week N" أو "WeekN:" أو "Week N:"
  { re: /^Week\s*(\d+)\s*:\s*(.+)$/i, ar: (m) => 'الأسبوع ' + m[1] + ': ' + translateFreeText(m[2]) },
  { re: /^Week\s*(\d+)\s*:?\s*$/i, ar: (m) => 'الأسبوع ' + m[1] },
  // "JS/CSS/HTML Assignments — Week N"
  { re: /^(JS|CSS|HTML)\s+Assignments\s*—\s*Week\s*(\d+)$/i, ar: (m) => 'تكليفات ' + m[1] + ' — الأسبوع ' + m[2] },
  // مستويات: Beginner/Intermediate/Advanced (+ Level)
  { re: /^(\d+\.)?\s*Entry Level(\s*\(Former Level 0\))?$/i, ar: () => 'المستوى التأسيسي' },
  { re: /^\d+\.\d+\.\s*Entry Level$/i, ar: () => 'المستوى التأسيسي' },
  { re: /^(\d+\.)?\s*Beginner(\s+Level)?:?$/i, ar: () => 'المستوى المبدئي' },
  { re: /^\d+\.\d+\.\s*Beginner Level$/i, ar: () => 'المستوى المبدئي' },
  { re: /^(\d+\.)?\s*Intermediate(\s+Level)?:?$/i, ar: () => 'المستوى المتوسط' },
  { re: /^\d+\.\d+\.\s*Intermediate Level$/i, ar: () => 'المستوى المتوسط' },
  { re: /^(\d+\.)?\s*Advanced(\s+A)?(\s+Level)?(\s*—\s*(.+))?:?$/i, ar: (m) => 'المستوى المتقدم' + (m[5] ? ' — ' + translateFreeText(m[5].replace(/^—\s*/, '')) : '') },
  { re: /^\d+\.\d+\.\s*Advanced(\s+A)?\s*Level(\s*—\s*(.+))?$/i, ar: (m) => 'المستوى المتقدم' + (m[3] ? ' — ' + translateFreeText(m[3]) : '') },
  { re: /^iOS (basics|Intermediate):?$/i, ar: (m) => m[1] === 'basics' ? 'أساسيات iOS' : 'iOS متوسط' },
  // "Phase N: العنوان"
  { re: /^2\.5\.(\d)\.\s*Phase\s*\d+:\s*(.+)$/i, ar: (m) => 'المرحلة ' + m[1] + ': ' + translateFreeText(m[2]) },
  // "العنوان (Week N)" أو "العنوان (Weeks N-M)"
  { re: /^(.+?)\s*\(Weeks?\s*[\d\-]+\)$/i, ar: (m) => translateFreeText(m[1]) },
];

// ── 2) قاموس حرفي للعناوين الفريدة غير النمطية ─────────────────────────────
const LITERAL_MAP = {
  "1. Core React": "١. أساسيات React",
  "1. Vue Fundamentals": "١. أساسيات Vue",
  "2. Core Angular": "٢. أساسيات Angular",
  "2. State Management (Redux Toolkit)": "٢. إدارة الحالة (Redux Toolkit)",
  "2. Vue 3 Features": "٢. ميزات Vue 3",
  "3. Modern Styling (Tailwind CSS)": "٣. التنسيق الحديث (Tailwind CSS)",
  "3. Reactive Programming (RxJS)": "٣. البرمجة التفاعلية (RxJS)",
  "3. State Management (Pinia)": "٣. إدارة الحالة (Pinia)",
  "3D Game Art (Blender)": "فنون الألعاب ثلاثية الأبعاد (Blender)",
  "4. Meta-Framework (Nuxt.js)": "٤. إطار العمل المتقدم (Nuxt.js)",
  "5. Meta-Framework (Next.js)": "٥. إطار العمل المتقدم (Next.js)",
  "<img src=\"./assets/git.png\" width=\"28\"/> Git & Github": "Git و GitHub",
  "<img src=\"https://raw.githubusercontent.com/dart-lang/site-shared/master/src/assets/image/dart/logo/64.png\" width=\"28\"/> Dart": "لغة Dart",
  "A Comprehensive Roadmap for MASTERING Databases": "خريطة طريق شاملة لإتقان قواعد البيانات",
  "A Glimpse into Computer Science: Let's Explore!": "نظرة عامة على علوم الحاسب: لنستكشف!",
  "AGSL (Android Graphics Shader Langauge)": "لغة تظليل رسوميات أندرويد (AGSL)",
  "Accounts to Create": "حسابات يجب إنشاؤها",
  "Advance Game Design": "تصميم الألعاب المتقدم",
  "App Architecture": "هندسة التطبيق",
  "Arabic Resources": "موارد عربية",
  "Assets": "الأصول (Assets)",
  "Back-End Circle Roadmap": "خريطة طريق دائرة Back-End",
  "Backend with NodeJS Roadmap": "خريطة طريق Backend بـ NodeJS",
  "Basics of XML": "أساسيات XML",
  "Before we start, let's answer a few FAQs": "قبل أن نبدأ، أسئلة شائعة",
  "CSS": "CSS",
  "Canvas": "Canvas",
  "Cloud Computing": "الحوسبة السحابية",
  "Cloud Computing Roadmap": "خريطة طريق الحوسبة السحابية",
  "Cloud Service Providers": "مزوّدو الخدمات السحابية",
  "Content Provider": "مزوّد المحتوى (Content Provider)",
  "Cryptography Path (CAT Reloaded)": "مسار التشفير (CAT Reloaded)",
  "Dart": "لغة Dart",
  "Data Fetching": "جلب البيانات (Data Fetching)",
  "Data Structures and Algorithms": "هياكل البيانات والخوارزميات",
  "Databases": "قواعد البيانات",
  "Dependency Injection": "حقن التبعيات (Dependency Injection)",
  "Design Patterns / SOLID": "أنماط التصميم / SOLID",
  "Elzero Web School (Arabic)": "إلزيرو ويب سكول (عربي)",
  "Engines": "محركات الألعاب",
  "Entry Level": "المستوى التأسيسي",
  "Essential skills Before Cyber Security": "المهارات الأساسية قبل الأمن السيبراني",
  "Excellent Articles": "مقالات مميزة",
  "Extra JavaScript Resources": "موارد إضافية لجافاسكريبت",
  "Foreground Sevices": "الخدمات الأمامية (Foreground Services)",
  "Form Validation": "التحقق من النماذج (Form Validation)",
  "GIT": "Git",
  "Game Art": "فنون الألعاب",
  "Game Design": "تصميم الألعاب",
  "Game Jams": "تحديات تطوير الألعاب (Game Jams)",
  "Gesture Handling": "التعامل مع الإيماءات (Gesture Handling)",
  "Getting Familiar with PHP (Former Level 1)": "التعرّف على PHP",
  "Git & GitHub": "Git و GitHub",
  "Git and GitHub:": "Git و GitHub",
  "Graphics Programming": "برمجة الرسوميات",
  "HTML": "HTML",
  "HTML Assignments": "تكليفات HTML",
  "Inroduction": "مقدمة",
  "Interactive & Reading": "تفاعلي وقراءة",
  "Interview Prep": "التحضير للمقابلات",
  "Jetpack Datastore/SharedPreference": "Jetpack Datastore/SharedPreference",
  "Kotlin Fundamentals": "أساسيات Kotlin",
  "Learning Swift": "تعلّم Swift",
  "Let’s begin the journey. ✨": "لنبدأ الرحلة ✨",
  "Linux Kernel :-": "نواة لينكس (Linux Kernel)",
  "Linux Tasks": "تكليفات لينكس",
  "MVC (Updated)": "نمط MVC (محدَّث)",
  "Media Roadmaps 🎨🎥📸📝🎬🎙️": "خرائط طريق الميديا 🎨🎥📸📝🎬🎙️",
  "Modelling": "النمذجة (Modelling)",
  "Multi Vendor Store Project": "مشروع متجر متعدد البائعين",
  "Multi-Module App Development": "تطوير التطبيقات متعددة الوحدات",
  "Music & SFX": "الموسيقى والمؤثرات الصوتية",
  "Navigation": "التنقل (Navigation)",
  "Network Security Path (defensive) (CAT Reloaded)": "مسار أمن الشبكات الدفاعي (CAT Reloaded)",
  "Networking": "الشبكات (Networking)",
  "Object-Oriented Programming (OOP)": "البرمجة الكائنية (OOP)",
  "Operating Systems": "أنظمة التشغيل",
  "Paid Courses (Optional)": "كورسات مدفوعة (اختياري)",
  "Penetration Testing Path (CAT Reloaded)": "مسار اختبار الاختراق (CAT Reloaded)",
  "Permission Handling": "التعامل مع الصلاحيات",
  "Plan": "الخطة",
  "Prerequisites & Setup": "المتطلبات الأساسية والإعداد",
  "Problem-Solving": "حل المسائل (Problem Solving)",
  "Programming": "البرمجة",
  "Programming Fundamentals": "أساسيات البرمجة",
  "Programming Languages": "لغات البرمجة",
  "Projects": "المشاريع",
  "React + TypeScript Project": "مشروع React مع TypeScript",
  "Ready ... Steady ... Go 🚀✴️✨": "استعد... انطلق 🚀✴️✨",
  "Recommended Accounts": "حسابات مُوصى بها",
  "Recommended Projects": "مشاريع مُوصى بها",
  "Required Tools": "الأدوات المطلوبة",
  "Resources": "الموارد",
  "Retrofit/Ktor": "Retrofit/Ktor",
  "Reverse Engineering & Malware Analysis Path (CAT Reloaded)": "مسار الهندسة العكسية وتحليل البرمجيات الخبيثة (CAT Reloaded)",
  "SOC Analyst & DFIR Path (CAT Reloaded)": "مسار محلل SOC والتحقيق الجنائي الرقمي (CAT Reloaded)",
  "Sensors": "الحساسات (Sensors)",
  "Software Engineering": "هندسة البرمجيات",
  "Some advice": "بعض النصائح",
  "Stylus Detection And Palm Rejection": "اكتشاف القلم الرقمي ورفض لمس الكف",
  "System Analysis and Design": "تحليل وتصميم النظم",
  "Tools": "الأدوات",
  "Topics Covered:": "المواضيع المغطّاة",
  "Traversy Media & Lama Dev (English)": "Traversy Media و Lama Dev (إنجليزي)",
  "UI Libraries": "مكتبات واجهة المستخدم",
  "Unique Coderz Academy (Arabic)": "يونيك كودرز أكاديمي (عربي)",
  "Unit Testing": "اختبار الوحدات (Unit Testing)",
  "Web Scraping": "استخراج بيانات الويب (Web Scraping)",
  "What are the most famous fields of cybersecurity?": "ما هي أشهر مجالات الأمن السيبراني؟",
  "What is Webpack?": "ما هو Webpack؟",
  "Workmanager": "WorkManager",
  "XML with Compose": "XML مع Compose",
  "YouTube Channels": "قنوات يوتيوب",
  "advanced": "متقدم",
  "iOS Intermediate:": "iOS متوسط",
  "iOS basics:": "أساسيات iOS",
  "intermediate": "متوسط",
  "titan": "المستوى التيتاني",
  "✍️ Credits": "✍️ شكر وتقدير",
  "️ Challenge Yourself": "🏆 تحدَّ نفسك",
  "️ Essential Resources": "📌 موارد أساسية",
  "️ Interview Prep": "💼 التحضير للمقابلات",
  "️ JS Practice Projects": "🧪 مشاريع تطبيقية لجافاسكريبت",
  "📃 Task": "📃 المهمة",
  "📚 Content": "📚 المحتوى",
  "🔗 Access the Roadmap": "🔗 الوصول لخريطة الطريق",
  "🗺️ The Learning Path": "🗺️ مسار التعلّم",
  "🛠️ Recommended Projects": "🛠️ مشاريع مُوصى بها",
  "🟪 Titan Level": "🟪 المستوى التيتاني",
  "🧩 Optional Resources": "🧩 موارد اختيارية",
  "NLP sub-fields: RAG, LangChain, LangGraph": "تخصصات معالجة اللغة الطبيعية: RAG وLangChain وLangGraph",
  "General Machine Learning Resources (supplementary)": "موارد تكميلية في تعلّم الآلة",
  "Math & Machine Learning": "الرياضيات وتعلّم الآلة",
  "Basic Concepts of Deep Learning": "المفاهيم الأساسية للتعلّم العميق",
  "Transformers and LLMs": "Transformers ونماذج اللغة الكبيرة",
  "NLP fields": "تخصصات معالجة اللغة الطبيعية",
  // ── أسابيع BackEnd (Laravel/NodeJS/Spring) وFront End وGameDevelopment ──
  "Introduction to Version Control with Git": "مقدمة في التحكم بالإصدارات مع Git",
  "Basic HTML, CSS, and JS for the Front-end": "أساسيات HTML وCSS وJS للواجهة الأمامية",
  "Basics of Web Development": "أساسيات تطوير الويب",
  "Introduction to Programming": "مقدمة في البرمجة",
  "Java Essentials for Spring Boot": "أساسيات Java لـ Spring Boot",
  "Introduction to Spring Boot": "مقدمة في Spring Boot",
  "Database Basics with MySQL and PostgreSQL": "أساسيات قواعد البيانات مع MySQL وPostgreSQL",
  "Integrating Spring Boot with PostgreSQL & Spring Data JPA": "دمج Spring Boot مع PostgreSQL وSpring Data JPA",
  "Spring Core (AOP, IoC, and DI)": "أساسيات Spring (AOP، IoC، DI)",
  "Validation and Error Handling": "التحقق من الصحة ومعالجة الأخطاء",
  "Testing in Spring Boot": "الاختبار في Spring Boot",
  "Filters & Interceptors, Lombok, Pagination & Filtering, File Uploads": "المرشّحات والمعترضات، Lombok، التصفّح والفلترة، رفع الملفات",
  "Introduction to Spring Security (Part 1)": "مقدمة في Spring Security (الجزء 1)",
  "Spring Security (Part 2): JWT and OAuth2": "Spring Security (الجزء 2): JWT وOAuth2",
  "Sending Messages to Users via E-mail & SMS": "إرسال الرسائل للمستخدمين عبر البريد الإلكتروني والرسائل النصية",
  "More SQL Databases and Hibernate ORM": "المزيد عن قواعد بيانات SQL وHibernate ORM",
  "Introduction to NoSQL Databases": "مقدمة في قواعد بيانات NoSQL",
  "Introduction to Asynchronous Programming in Spring Boot": "مقدمة في البرمجة غير المتزامنة في Spring Boot",
  "Introduction to Spring WebFlux, Spring Data R2DBC, Reactive Programming in Spring Boot": "مقدمة في Spring WebFlux وSpring Data R2DBC والبرمجة التفاعلية في Spring Boot",
  "Caching and Introduction to Redis Cache in Spring Boot": "التخزين المؤقت ومقدمة عن Redis Cache في Spring Boot",
  "Real-Time Communication with Sockets & Socket.IO, Streaming with WebRTC Basics.": "الاتصال اللحظي عبر Sockets وSocket.IO، والبث المباشر بأساسيات WebRTC",
  "Payments and Stripe Payment Gateway": "المدفوعات وبوابة الدفع Stripe",
  "Building GraphQL Services": "بناء خدمات GraphQL",
  "Introduction to Firebase Services": "مقدمة في خدمات Firebase",
  "Task Scheduling": "جدولة المهام",
  "More SQL Database, Spring JDBC, More Spring R2DBC.": "المزيد عن قواعد بيانات SQL، وSpring JDBC، وSpring R2DBC",
  "More NoSQL Database and Spring Data MongoDB.": "المزيد عن قواعد بيانات NoSQL وSpring Data MongoDB",
  "Docker and Deployment.": "Docker والنشر (Deployment)",
  "Microservices Architecture, API Gateway, Discovery Server, and Config Server": "هندسة الخدمات المصغّرة، وAPI Gateway، وخادم الاكتشاف، وخادم الإعدادات",
  "Message Queues, Kafka, RabbitMQ, and ActiveMQ": "طوابير الرسائل: Kafka وRabbitMQ وActiveMQ",
  "The Setup & Syntax": "الإعداد وقواعد اللغة",
  "CSS Basics": "أساسيات CSS",
  "Visual Effects": "المؤثرات البصرية",
  "Layout Mastery": "احتراف التخطيط (Layout)",
  "The Final Boss": "التحدي النهائي",
  "Syntax & Layouts": "قواعد اللغة والتخطيطات",
  "Control Flow & Cloning": "التحكم بالتدفق والاستنساخ",
  "Functions & Forms": "الدوال والنماذج",
  "Higher Order Logic": "المنطق المتقدم (Higher Order)",
  "DOM & Bootstrap": "DOM وBootstrap",
  "Persistent Data (BOM)": "البيانات الدائمة (BOM)",
  "Advanced Data & Regex": "البيانات المتقدمة والتعبيرات النمطية (Regex)",
  "Data Patterns & Regex": "أنماط البيانات والتعبيرات النمطية (Regex)",
  "Async & API": "البرمجة غير المتزامنة وAPI",
  "THE CAPSTONE": "المشروع الختامي",
  "Thinking in React": "التفكير بطريقة React",
  "Forms & Side Effects": "النماذج والتأثيرات الجانبية",
  "Data-Driven React (API & Routing)": "React المعتمد على البيانات (API والتوجيه)",
  "Next.js Fundamentals (App Router)": "أساسيات Next.js (App Router)",
  "Basics": "الأساسيات",
  "Pixel Art and 2D Art": "فن البكسل والرسم ثنائي الأبعاد",
  "Animation": "الرسوم المتحركة (Animation)",
};

// عناوين بترميز إيموجي تالف في المصدر الأصلي (��� بدل الإيموجي الحقيقي) —
// نطابقها بالنص الإنجليزي المتبقي السليم بعد الترميز التالف، بصرف النظر عن
// الإيموجي البادئ المعطوب.
const GARBLED_EMOJI_MAP = {
  'Setup': '⚙️ الإعداد',
  'React Ecosystem Libraries': '⚛️ مكتبات منظومة React',
  'YouTube Channels': '📺 قنوات يوتيوب',
};
function translateGarbledTitle(titleEn) {
  var cleaned = titleEn.replace(/^[\uFFFD\s]+/, '').trim();
  return GARBLED_EMOJI_MAP[cleaned] || null;
}

function translateFreeText(text) {
  var t = text.trim();
  if (LITERAL_MAP[t]) return LITERAL_MAP[t];
  // محاولة ثانية: تطابق جزئي بعد إزالة الأرقام/الرموز البادئة
  var stripped = t.replace(/^\d+\.\s*/, '');
  if (LITERAL_MAP[stripped]) return LITERAL_MAP[stripped];
  return t; // لا ترجمة متاحة — يبقى إنجليزياً (لن يُفقَد، fallback يعمل تلقائياً)
}

function translateTitle(titleEn) {
  var garbled = translateGarbledTitle(titleEn);
  if (garbled) return garbled;
  for (var i = 0; i < PATTERN_RULES.length; i++) {
    var rule = PATTERN_RULES[i];
    var m = titleEn.match(rule.re);
    if (m) return rule.ar(m);
  }
  return translateFreeText(titleEn);
}

// ── تحميل كل العناوين الفريدة من ملفات cat_parsed وبناء القاموس النهائي ────
const PARSED_DIR = path.join(__dirname, 'output', 'cat_parsed');
const allTitles = new Set();

function collectFromSections(sections) {
  sections.forEach(function (s) {
    allTitles.add(s.title_en);
    (s.topics || []).forEach(function (tp) { allTitles.add(tp.title_en); });
  });
}

fs.readdirSync(PARSED_DIR).filter(function (f) { return f.endsWith('.json') && f !== '_summary.json'; }).forEach(function (file) {
  var data = JSON.parse(fs.readFileSync(path.join(PARSED_DIR, file), 'utf8'));
  if (data.tracks) data.tracks.forEach(function (t) { collectFromSections(t.sections || []); });
  if (data.main_roadmap) data.main_roadmap.tracks.forEach(function (t) { collectFromSections(t.sections || []); });
  if (data.shell_sub_roadmaps) data.shell_sub_roadmaps.forEach(function (sub) { allTitles.add(sub.title_en); });
});

const translationMap = {};
let translated = 0, untranslated = 0;
Array.from(allTitles).forEach(function (title) {
  var ar = translateTitle(title);
  translationMap[title] = ar;
  if (ar !== title) translated++; else untranslated++;
});

fs.writeFileSync(path.join(__dirname, 'output', 'arabic_translation_map.json'), JSON.stringify(translationMap, null, 2), 'utf8');
console.log('✅ قاموس الترجمة: ' + Object.keys(translationMap).length + ' عنوان | مُترجَم: ' + translated + ' | بلا ترجمة (fallback إنجليزي): ' + untranslated);
if (untranslated > 0) {
  console.log('عناوين بلا ترجمة:');
  Object.entries(translationMap).filter(function (e) { return e[0] === e[1]; }).forEach(function (e) { console.log('  -', e[0]); });
}
