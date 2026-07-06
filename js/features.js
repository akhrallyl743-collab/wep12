'use strict';

/* =============================================
   الترحيب الذكي — Smart Greeting System
   يعرض رسالة مخصصة حسب الوقت واليوم والحالة
   ============================================= */

/** الحصول على تحية ذكية بناءً على الوقت والسياق */
function getSmartGreeting(userName) {
  const hour = new Date().getHours();
  const day  = new Date().getDay(); // 0=أحد

  // تحية الوقت
  let timeGreet;
  if (hour >= 5  && hour < 12) timeGreet = 'صباح النور';
  else if (hour >= 12 && hour < 17) timeGreet = 'مساء الخير';
  else if (hour >= 17 && hour < 21) timeGreet = 'مساء النور';
  else timeGreet = 'ليلة طيبة';

  const name = userName ? ` ${userName.split(' ')[0]}` : '';
  return `${timeGreet}${name} 👋`;
}

/** الحصول على رسالة تحفيزية يومية متغيرة */
function getDailyMotivation() {
  const msgs = [
    '🚀 كل يوم خطوة إلى الأمام — حتى الصغيرة تحسب.',
    '💡 المهارة التي تتعلمها اليوم هي رزقك غداً.',
    '🌱 لا تقارن بدايتك ببداية غيرك — ركز على رحلتك.',
    '⚡ التميز ليس موهبة — هو عادة يومية.',
    '🎯 حدد هدفاً واحداً اليوم وأنجزه — الباقي يأتي.',
    '🔥 أصعب لحظة هي البداية — بعدها الأمور تسهل.',
    '🌟 أنت أكثر قدرة مما تظن — جرّب ثم احكم.',
    '💪 الفشل ليس نهاية — هو ملاحظة للمسار الصح.',
    '🧠 تعلم شيئاً صغيراً كل يوم — بعد سنة ستندهش.',
    '✨ الفرص تُصنع، لا تُنتظر.',
  ];
  const idx = Math.floor((Date.now() / 86400000)) % msgs.length;
  return msgs[idx];
}

/** نصيحة الأسبوع */
function getWeeklyTip() {
  const tips = [
    { icon: '📝', title: 'بناء الـ CV', body: 'استخدم نموذج Harvard أو Canva — وركّز على الإنجازات لا المسميات.' },
    { icon: '🤝', title: 'التواصل المهني', body: 'LinkedIn ليس فقط للوظائف — استخدمه لبناء علاقات حقيقية مع الخبراء.' },
    { icon: '💻', title: 'المشاريع الشخصية', body: 'المشروع الواحد الحقيقي يساوي عشرات الشهادات في نظر المُوظِّف.' },
    { icon: '🎤', title: 'المقابلات', body: 'استعد بأسلوب STAR: الموقف، المهمة، الإجراء، النتيجة.' },
    { icon: '📚', title: 'التعلم المستمر', body: 'خصص 30 دقيقة يومياً للتعلم — هذا أكثر من 180 ساعة سنوياً!' },
    { icon: '🌍', title: 'اللغات', body: 'الإنجليزية المهنية تضاعف فرصك الوظيفية 3-5 مرات في السوق العربي.' },
    { icon: '💰', title: 'التفاوض', body: 'لا تقبل أول عرض راتب — دائماً اطلب 15% فوق ما تريد.' },
  ];
  const week = Math.floor(Date.now() / (86400000 * 7)) % tips.length;
  return tips[week];
}

/** عرض بانر الترحيب الذكي في الداشبورد */
function renderSmartWelcome() {
  const el = $('smart-welcome');
  if (!el) return;

  const user   = STATE.user || _ls('noor_user', null);
  const streak = STATE.streak || 0;
  const tip    = getWeeklyTip();

  let streakMsg = '';
  if (streak >= 7)  streakMsg = `<span class="sw-streak">🔥 ${streak} أيام متواصلة — أنت لا تُوقف!</span>`;
  else if (streak >= 3) streakMsg = `<span class="sw-streak">⚡ ${streak} أيام متواصلة — استمر!</span>`;

  el.innerHTML = `
    <div class="sw-greeting">${getSmartGreeting(user?.name)}</div>
    <div class="sw-motivation">${getDailyMotivation()}</div>
    ${streakMsg}
    <div class="sw-tip">
      <span class="sw-tip-icon">${tip.icon}</span>
      <div><strong>نصيحة الأسبوع — ${sanitizeHTML(tip.title)}:</strong>
      ${sanitizeHTML(tip.body)}</div>
    </div>`;
}

/* =============================================
   FAQ الذكي — Collapsible FAQ
   ============================================= */
const FAQ_DATA = [
  { q: 'كيف أبدأ على المنصة؟', qEn: 'How Do I Start on the Platform?',
    a: 'اضغط على "ابدأ رحلتك" في الصفحة الرئيسية، وأكمل الاختبار المهني — سيستغرق 3 دقائق فقط ويعطيك توصيات دقيقة.',
    aEn: 'Click "Start Your Journey" on the homepage and complete the career quiz — it takes only 3 minutes and gives you accurate recommendations.' },
  { q: 'هل المنصة مجانية بالكامل؟', qEn: 'Is the Platform Completely Free?',
    a: 'نعم، جميع ميزات START LINE مجانية — الاختبار، المسارات، الخطط، والمجتمع. جلسات المدربين قد تكون مدفوعة حسب المدرب.',
    aEn: 'Yes, all START LINE features are free — the quiz, paths, plans, and community. Mentor sessions may be paid depending on the mentor.' },
  { q: 'ما الفرق بين الخطة 7 أيام و30 يوم؟', qEn: 'What is the Difference Between the 7-Day and 30-Day Plans?',
    a: 'خطة 7 أيام للبدء السريع وبناء العادات الأساسية. خطة 30 يوم للتعمق وبناء مهارات حقيقية قابلة للتطبيق.',
    aEn: 'The 7-day plan is for a quick start and building core habits. The 30-day plan is for deeper learning and building real applicable skills.' },
  { q: 'كيف يعمل نظام النقاط والمستويات؟', qEn: 'How Does the Points and Levels System Work?',
    a: 'تكسب نقاطاً بإكمال التحديات اليومية، إنهاء المسارات، والمشاركة في المجتمع. النقاط ترفعك لمستويات أعلى وتفتح شارات جديدة.',
    aEn: 'You earn points by completing daily challenges, finishing paths, and participating in the community. Points level you up and unlock new badges.' },
  { q: 'هل يمكنني تغيير مساري المهني بعد الاختبار؟', qEn: 'Can I Change My Career Path After the Quiz?',
    a: 'بالتأكيد — الاختبار توصية وليس قيد. يمكنك إضافة أي مسار من مكتبة المسارات في أي وقت.',
    aEn: 'Absolutely — the quiz is a recommendation, not a restriction. You can add any path from the career library at any time.' },
  { q: 'ماذا يحدث لبياناتي إذا مسحت الكاش؟', qEn: 'What Happens to My Data If I Clear the Cache?',
    a: 'إذا سجلت حسابك، بياناتك محفوظة على الخادم ولن تضيع. المستخدمون الضيوف يحفظ بياناتهم محلياً فقط.',
    aEn: 'If you have an account, your data is saved on the server and will not be lost. Guest users save their data locally only.' },
  { q: 'كيف أحصل على تحليل الذكاء الاصطناعي؟', qEn: 'How Do I Get the AI Analysis?',
    a: 'أكمل اختبار الميول أولاً، ثم ستظهر زر "تحليلي بالذكاء الاصطناعي" في صفحة النتائج. يتطلب اتصالاً بالإنترنت.',
    aEn: 'Complete the aptitude quiz first, then the "My AI Analysis" button will appear on the results page. Requires an internet connection.' },
];

function renderFAQ() {
  const el = $('faq-list');
  if (!el) return;

  const lang = (typeof STATE !== 'undefined' && STATE.lang) || 'ar';
  el.innerHTML = FAQ_DATA.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" data-action="toggleFAQ" data-faq-index="${i}" aria-expanded="false" aria-controls="faq-ans-${i}">
        <span>${sanitizeHTML(lang === 'en' && item.qEn ? item.qEn : item.q)}</span>
        <span class="faq-arrow">▾</span>
      </button>
      <div class="faq-a" id="faq-ans-${i}" style="display:none">${sanitizeHTML(lang === 'en' && item.aEn ? item.aEn : item.a)}</div>
    </div>`).join('');
}

function toggleFAQ(i) {
  const btn = document.querySelector(`#faq-${i} .faq-q`);
  const ans = $(`faq-ans-${i}`);
  if (!btn || !ans) return;

  const isOpen = ans.style.display !== 'none';
  // أغلق كل الأسئلة المفتوحة أولاً
  FAQ_DATA.forEach((_, j) => {
    const b = document.querySelector(`#faq-${j} .faq-q`);
    const a = $(`faq-ans-${j}`);
    if (b && a) { a.style.display = 'none'; b.setAttribute('aria-expanded','false'); b.querySelector('.faq-arrow').textContent = '▾'; }
  });

  // افتح هذا السؤال إذا كان مغلقاً
  if (!isOpen) {
    ans.style.display = 'block';
    btn.setAttribute('aria-expanded','true');
    btn.querySelector('.faq-arrow').textContent = '▴';
  }
}

/* =============================================
   نظام الإنجازات المرئي — Achievement Popup
   ============================================= */
function showAchievementPopup(icon, title, desc) {
  // تحقق إذا كان البوب-أب موجوداً
  let popup = $('achievement-popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.id = 'achievement-popup';
    popup.style.cssText = `
      position:fixed;top:80px;left:50%;transform:translateX(-50%) translateY(-20px);
      background:linear-gradient(135deg,var(--p600),var(--t500));
      color:#fff;padding:16px 24px;border-radius:18px;z-index:9999;
      display:flex;align-items:center;gap:14px;
      box-shadow:0 20px 60px rgba(79,53,232,.5);
      opacity:0;transition:all .4s cubic-bezier(.22,1,.36,1);
      max-width:320px;width:calc(100vw - 40px);pointer-events:none;`;
    document.body.appendChild(popup);
  }

  popup.innerHTML = `
    <div style="font-size:36px;flex-shrink:0;">${icon}</div>
    <div>
      <div style="font-size:11px;opacity:.8;font-weight:700;letter-spacing:.5px;margin-bottom:3px;">🏆 إنجاز جديد!</div>
      <div style="font-size:16px;font-weight:900;">${sanitizeHTML(title)}</div>
      <div style="font-size:12px;opacity:.85;margin-top:3px;">${sanitizeHTML(desc)}</div>
    </div>`;

  // تحريك الدخول
  requestAnimationFrame(() => {
    popup.style.opacity = '1';
    popup.style.transform = 'translateX(-50%) translateY(0)';
  });

  // إخفاء بعد 4 ثوانٍ
  clearTimeout(popup._timer);
  popup._timer = setTimeout(() => {
    popup.style.opacity = '0';
    popup.style.transform = 'translateX(-50%) translateY(-20px)';
  }, 4200);
}

/* =============================================
   Psychology
   ============================================= */
function renderPsychology() {
  setHTML('psych-cats', PSYCH_DATA.map((p, i) => `
    <div class="psych-card" data-action="showPsych" data-psych-index="${i}" role="button" tabindex="0" aria-label="${sanitizeHTML(p.title)}">
      <span class="psych-emoji">${p.emoji}</span>
      <h3>${sanitizeHTML(p.title)}</h3>
      <p>${sanitizeHTML(p.desc)}</p>
    </div>`).join(''));
  setHTML('psych-detail-box', '');
}

function showPsych(i) {
  const p = PSYCH_DATA[i];
  if (!p) return;
  setHTML('psych-detail-box', `
    <div class="psych-detail">
      <h3>${p.emoji} ${sanitizeHTML(p.title)}</h3>
      <div class="scenario">${sanitizeHTML(p.scenario)}</div>
      <h4 style="font-size:16px;font-weight:800;margin-bottom:14px;">💪 تمارين عملية</h4>
      ${p.exercises.map((e, j) => `
        <div class="exercise-item">
          <div class="ex-num">${j + 1}</div>
          <div class="ex-text"><h4>${sanitizeHTML(e.t)}</h4><p>${sanitizeHTML(e.d)}</p></div>
        </div>`).join('')}
      <div class="daily-challenge-box">
        <h4>⚡ تحدي اليوم</h4>
        <p>${sanitizeHTML(p.daily)}</p>
        <button class="complete-btn" data-action="completePsychChallenge">✅ أتممت التحدي — +25 نقطة</button>
      </div>
    </div>`);
  const box = $('psych-detail-box');
  if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function completePsychChallenge(btn) {
  if (btn.disabled) return;
  btn.textContent = '🎉 رائع! تم احتساب نقاطك';
  btn.classList.add('done');
  btn.disabled = true;
  addPoints(25, 'تحدي نفسي مكتمل');
}

/* =============================================
   Mentors
   ============================================= */
const MENTOR_MODE_LABEL = { online: '🌐 أونلاين', offline: '🏠 حضوري', both: '🌐 أونلاين + 🏠 حضوري' };
const MENTOR_AVATAR_COLORS = ['#5040e8', '#0e8a5f', '#e8a81a', '#e8502a', '#3d8ef5', '#c07a08'];

async function renderMentors() {
  const grid = $('mentor-grid');
  if (!grid) return;

  // حالة تحميل بسيطة
  grid.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px 0;grid-column:1/-1;">جاري تحميل قائمة المدربين...</p>`;

  let mentors = [];
  try {
    mentors = (typeof MentorService !== 'undefined') ? await MentorService.loadApproved() : [];
  } catch (e) {
    mentors = [];
  }

  // fallback: نسخة محلية فاضية في حالة تعطل الاتصال (لا مدربين وهميين)
  if (!mentors.length && MENTORS_DATA.length) mentors = MENTORS_DATA;

  STATE.mentorsCache = mentors;

  if (!mentors.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:32px 16px;background:var(--surface);border:1px dashed var(--border);border-radius:16px;">
        <div style="font-size:36px;margin-bottom:8px;">🧑‍🏫</div>
        <p style="color:var(--muted);font-size:14px;margin-bottom:14px;">لسه معندناش مدربين مسجّلين — كن أول مدرّب في START LINE!</p>
        <button class="btn btn-primary btn-sm" data-action="openTrainerModal">🤝 سجّل كمدرّب</button>
      </div>`;
    return;
  }

  setHTML('mentor-grid', mentors.map((m, i) => {
    const name  = m.full_name || m.name || 'مدرّب';
    const color = m.color || MENTOR_AVATAR_COLORS[i % MENTOR_AVATAR_COLORS.length];
    const skills = Array.isArray(m.skills) ? m.skills : (m.skills ? String(m.skills).split(',') : []);
    const modeLabel = MENTOR_MODE_LABEL[m.mode] || '';
    const availNow = m.avail_now !== false; // افتراضي متاح لو غير محدد
    return `
    <div class="mentor-card">
      <div class="mentor-header">
        <div class="mentor-avatar" style="background:${color};">${sanitizeHTML(name[0] || 'م')}</div>
        <div class="mentor-info"><h3>${sanitizeHTML(name)}</h3><p>${sanitizeHTML(m.profession || m.role || '')}</p></div>
      </div>
      ${skills.length ? `<div class="mentor-skills">${skills.map(s => `<span class="skill-badge">${sanitizeHTML(s.trim())}</span>`).join('')}</div>` : ''}
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;">
        ${modeLabel ? `<span class="skill-badge" style="background:var(--p50);color:var(--p600);">${modeLabel}</span>` : ''}
      </div>
      <div style="margin-bottom:8px;">
        <span class="mentor-avail">${availNow ? '🟢 متاح الآن' : '⚪ غير متاح حالياً'}</span>
        ${m.availability ? `<div style="color:var(--muted);font-size:12.5px;margin-top:4px;">🕒 ${sanitizeHTML(m.availability)}</div>` : ''}
      </div>
      <button class="request-btn ${STATE.sentRequests.has(i) ? 'sent' : ''}" data-action="requestMentor" data-mentor-index="${i}" ${STATE.sentRequests.has(i) ? 'disabled' : ''}>
        ${STATE.sentRequests.has(i) ? '✓ تم إرسال الطلب' : 'طلب جلسة 🤝'}
      </button>
    </div>`;
  }).join(''));
}

function requestMentor(i, btn) {
  if (!STATE.user) { openModal('login'); return; }
  STATE.currentMentorRequest = i;
  const formArea = $('coach-form-area');
  const successArea = $('coach-success');
  if (formArea) formArea.style.display = 'block';
  if (successArea) successArea.style.display = 'none';

  const u = STATE.user;
  if (u && $('cr-name')) $('cr-name').value = u.name || '';

  const modal = $('coach-modal');
  if (modal) modal.classList.add('open');
}

function closeCoachModal() {
  const modal = $('coach-modal');
  if (modal) modal.classList.remove('open');
}

function submitCoachRequest() {
  const name  = ($('cr-name')?.value || '').trim();
  const age   = ($('cr-age')?.value || '').trim();
  const curr  = ($('cr-current-skill')?.value || '').trim();
  const tgt   = ($('cr-target-skill')?.value || '').trim();
  const phone = ($('cr-phone')?.value || '').trim();
  const nameParts = name.split(/\s+/).filter(Boolean);

  if (nameParts.length < 4) { toast('⚠️ أدخل اسمك الرباعي (أربعة أجزاء)'); return; }
  if (!age || !curr || !tgt) { toast('⚠️ أكمل جميع الحقول'); return; }
  if (!phone) { toast('⚠️ أدخل رقم التواصل'); return; }

  const WHATSAPP_NUMBER = '201003763619';
  const msg = encodeURIComponent(
    `🌟 طلب جلسة كوتش — START LINE — خط البداية\n\n` +
    `👤 الاسم: ${name}\n` +
    `🎂 العمر: ${age}\n` +
    `📌 المهارة الحالية: ${curr}\n` +
    `🎯 المهارة المطلوبة: ${tgt}\n` +
    `📞 رقم التواصل: ${phone}`
  );
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');

  addPoints(10, 'طلب جلسة كوتش');
  const idx = STATE.currentMentorRequest;
  if (idx !== undefined) { STATE.sentRequests.add(idx); renderMentors(); }

  const formArea = $('coach-form-area');
  const successArea = $('coach-success');
  if (formArea) formArea.style.display = 'none';
  if (successArea) successArea.style.display = 'block';
  setTimeout(() => closeCoachModal(), 4000);
}

/* =============================================
   Trainer Application Modal
   ============================================= */
async function openTrainerModal() {
  // لازم تسجّل دخول عشان يكون ليك بروفايل ثابت تقدر تعدّله بعدين
  if (!STATE.user) { toast('🔒 سجّل دخولك الأول عشان تقدر تسجّل كمدرّب'); openModal('login'); return; }

  const formArea = $('trainer-form-area');
  const successArea = $('trainer-success');
  if (formArea) formArea.style.display = 'block';
  if (successArea) successArea.style.display = 'none';

  const u = STATE.user;
  if ($('tr-name'))  $('tr-name').value  = u.name  || '';
  if ($('tr-email')) $('tr-email').value = u.email || '';

  // هل عنده بروفايل مدرّب مسجّل بالفعل؟ لو نعم نفتح فورم "تعديل" مسبق التعبئة
  STATE.trainerEditMode = false;
  const mine = (typeof MentorService !== 'undefined') ? await MentorService.getMine(u.id) : null;
  const titleEl = $('trainer-modal-title');
  const submitBtn = $('trainer-submit-btn');

  if (mine) {
    STATE.trainerEditMode = true;
    if ($('tr-name'))         $('tr-name').value = mine.full_name || u.name || '';
    if ($('tr-age'))          $('tr-age').value = mine.age || '';
    if ($('tr-email'))        $('tr-email').value = mine.email || u.email || '';
    if ($('tr-phone'))        $('tr-phone').value = mine.phone || '';
    if ($('tr-role'))         $('tr-role').value = mine.profession || '';
    if ($('tr-experience'))   $('tr-experience').value = mine.years_experience || '';
    if ($('tr-skills'))       $('tr-skills').value = Array.isArray(mine.skills) ? mine.skills.join('، ') : (mine.skills || '');
    if ($('tr-bio'))          $('tr-bio').value = mine.bio || '';
    if ($('tr-portfolio'))    $('tr-portfolio').value = mine.portfolio_url || '';
    if ($('tr-availability')) $('tr-availability').value = mine.availability || '';
    if ($('tr-why'))          $('tr-why').value = mine.motivation || '';
    if ($('tr-mode'))         $('tr-mode').value = mine.mode || 'online';
    if ($('tr-avail-now'))    $('tr-avail-now').checked = mine.avail_now !== false;
    if ($('tr-is-active'))    $('tr-is-active').checked = mine.is_active !== false;
    if (titleEl) titleEl.textContent = 'بروفايلك كمدرّب';
    if (submitBtn) submitBtn.textContent = 'حفظ التعديلات ✏️';
  } else {
    if ($('tr-mode'))      $('tr-mode').value = 'online';
    if ($('tr-avail-now')) $('tr-avail-now').checked = true;
    if ($('tr-is-active')) $('tr-is-active').checked = true;
    if (titleEl) titleEl.textContent = 'سجّل كمدرّب في START LINE';
    if (submitBtn) submitBtn.textContent = 'إرسال 🚀';
  }

  const modal = $('trainer-modal');
  if (modal) modal.classList.add('open');
}

function closeTrainerModal() {
  const modal = $('trainer-modal');
  if (modal) modal.classList.remove('open');
}

async function submitTrainerApplication() {
  if (!STATE.user) { openModal('login'); return; }

  const name        = ($('tr-name')?.value || '').trim();
  const age         = ($('tr-age')?.value || '').trim();
  const email       = ($('tr-email')?.value || '').trim();
  const phone       = ($('tr-phone')?.value || '').trim();
  const role        = ($('tr-role')?.value || '').trim();
  const experience  = ($('tr-experience')?.value || '').trim();
  const skillsRaw   = ($('tr-skills')?.value || '').trim();
  const bio         = ($('tr-bio')?.value || '').trim();
  const portfolio   = ($('tr-portfolio')?.value || '').trim();
  const availability= ($('tr-availability')?.value || '').trim();
  const why         = ($('tr-why')?.value || '').trim();
  const mode        = ($('tr-mode')?.value || 'online');
  const availNow    = !!$('tr-avail-now')?.checked;
  const isActive    = !!$('tr-is-active')?.checked;

  if (!name) { toast('⚠️ أدخل اسمك الكامل'); return; }
  if (!phone) { toast('⚠️ أدخل رقم التواصل'); return; }
  if (!email) { toast('⚠️ أدخل بريدك الإلكتروني'); return; }
  if (!role) { toast('⚠️ أدخل مهنتك أو مسمّاك الوظيفي'); return; }
  if (!bio) { toast('⚠️ أضف نبذة قصيرة عنك'); return; }

  const skills = skillsRaw ? skillsRaw.split(/[,،]/).map(s => s.trim()).filter(Boolean) : [];

  const payload = {
    full_name: name,
    age: age ? parseInt(age, 10) : null,
    email,
    phone,
    profession: role,
    years_experience: experience ? parseInt(experience, 10) : null,
    skills,
    bio,
    portfolio_url: portfolio || null,
    availability: availability || null,
    motivation: why || null,
    mode,
    avail_now: availNow,
    is_active: isActive
  };

  const wasEdit = !!STATE.trainerEditMode;
  const { error } = await MentorService.upsert(STATE.user.id, payload);

  if (error) {
    toast('⚠️ حصل خطأ أثناء الحفظ، حاول مرة تانية');
    return;
  }

  if (!wasEdit && typeof addPoints === 'function') addPoints(15, 'التسجيل كمدرّب');

  const successArea = $('trainer-success');
  const successTitle = successArea?.querySelector('h3');
  const successText  = successArea?.querySelector('p');
  if (successTitle) successTitle.textContent = wasEdit ? 'تم حفظ تعديلاتك بنجاح!' : 'تم استلام طلبك بنجاح! 🎉';
  if (successText)  successText.textContent  = wasEdit
    ? 'تم تحديث بياناتك، وستظهر بعد مراجعة الإدارة إن كانت هناك تغييرات جوهرية.'
    : 'طلبك الآن قيد المراجعة من فريق الإدارة، وسيظهر في قائمة المدربين فور قبوله. شكراً لصبرك! 🙏';

  const formArea = $('trainer-form-area');
  if (formArea) formArea.style.display = 'none';
  if (successArea) successArea.style.display = 'block';
  setTimeout(() => closeTrainerModal(), 4000);

  renderMentors(); // تحديث القائمة فوراً بالبيانات الجديدة
}

/* =============================================
   Plan
   ============================================= */
function renderPlan() {
  const days = STATE.planTab === '7' ? PLAN_7 : PLAN_30;
  setHTML('plan-content', days.map(d => {
    const done = STATE.completedDays.has(`${STATE.planTab}-${d.d}`);
    return `
    <div class="day-card">
      <div class="day-num ${done ? 'done' : ''}">يوم<br>${d.d}</div>
      <div class="day-content"><h4>${sanitizeHTML(d.t)}</h4><p>${sanitizeHTML(d.b)}</p></div>
      <div class="day-check ${done ? 'done' : ''}" data-action="toggleDay" data-day-key="${STATE.planTab}-${d.d}" role="checkbox" aria-checked="${done}" tabindex="0">
        ${done ? '✓' : ''}
      </div>
    </div>`;
  }).join(''));
}

function setPlanTab(tab) {
  STATE.planTab = tab;
  $$('.plan-tab').forEach((t, i) => {
    const isActive = (i === 0 && tab === '7') || (i === 1 && tab === '30');
    t.classList.toggle('active', isActive);
    t.setAttribute('aria-selected', String(isActive));
  });
  renderPlan();
}

function toggleDay(key, el) {
  if (STATE.completedDays.has(key)) {
    STATE.completedDays.delete(key);
    el.classList.remove('done');
    el.textContent = '';
    el.setAttribute('aria-checked', 'false');
    // Update parent day-num
    const dayNum = el.parentElement?.querySelector('.day-num');
    if (dayNum) dayNum.classList.remove('done');
  } else {
    STATE.completedDays.add(key);
    el.classList.add('done');
    el.textContent = '✓';
    el.setAttribute('aria-checked', 'true');
    const dayNum = el.parentElement?.querySelector('.day-num');
    if (dayNum) dayNum.classList.add('done');
    addPoints(15, 'مهمة يومية مكتملة');
  }
  saveProgress(); // centralized — replaces direct localStorage call
}

/* =============================================
   Dashboard
   ============================================= */
const ALL_BADGES_KEYS = ['first_step','first_quiz','first_track','streak_3','streak_7','ch_5','level_3','community_member'];

function getEarnedBadges() {
  const earned = new Set();
  if (STATE.user) earned.add('first_step');
  if (STATE.completedChallenges.size >= 1 || _lsRaw('quiz_done')) earned.add('first_quiz');
  if (STATE.selectedTracks.length >= 1) earned.add('first_track');
  if (STATE.streak >= 3) earned.add('streak_3');
  if (STATE.streak >= 7) earned.add('streak_7');
  if (STATE.completedChallenges.size >= 5) earned.add('ch_5');
  if (getLevelFromPoints(STATE.points) >= 3) earned.add('level_3');
  return earned;
}

function getDailyChallenges() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return [ALL_CHALLENGES[dayOfYear % 30], ALL_CHALLENGES[(dayOfYear + 15) % 30]];
}

function checkDailyReset() {
  const today = new Date().toDateString();
  const lastDay = _lsRaw('noor_challenge_day');
  if (!lastDay || lastDay !== today) {
    _lsRawSet('noor_challenge_day', today);
  }
}

function renderDashboard() {
  const earned = getEarnedBadges();
  setHTML('badge-list', ALL_BADGES.map(b => {
    const isEarned = earned.has(b.key);
    return `<div class="badge-item" title="${sanitizeHTML(b.desc)}">
      <div class="badge-icon ${isEarned ? 'earned' : 'locked'}" aria-label="${isEarned ? 'مكتسبة' : 'مقفلة'}">${b.icon}</div>
      <div class="badge-label">${sanitizeHTML(b.label)}</div>
    </div>`;
  }).join(''));

  const todayChallenges = getDailyChallenges();
  const userLevel = getLevelFromPoints(STATE.points);
  const diffLabels = ['','مبتدئ','مبتدئ','متوسط','متوسط','متقدم','متقدم','خبير'];
  const diffColors = ['','var(--t600)','var(--t600)','var(--a600)','var(--a600)','var(--c600)','var(--c600)','var(--p600)'];

  setHTML('daily-challenges', todayChallenges.map(c => {
    const done = STATE.completedChallenges.has(c.id);
    return `
    <div class="challenge-item" data-action="completeChallenge" data-challenge-id="${c.id}" data-challenge-pts="${c.pts}" style="${done ? 'border-color:var(--t400);background:var(--t50);' : ''}" role="button" aria-label="${done ? 'مكتمل' : 'ابدأ التحدي'}: ${sanitizeHTML(c.title)}">
      <div class="ch-icon">${done ? '✅' : c.icon}</div>
      <div class="ch-info">
        <h4>${sanitizeHTML(c.title)}</h4>
        <p>${sanitizeHTML(c.sub)} · <span style="color:${diffColors[userLevel]};font-weight:700;">${diffLabels[userLevel]}</span></p>
      </div>
      <div class="ch-pts" style="${done ? 'color:var(--t600);' : ''}">
        ${done ? 'مكتمل ✓' : `+${c.pts} نقطة`}
      </div>
    </div>`;
  }).join(''));

  const lv = getLevelFromPoints(STATE.points);
  STATE.level = lv;
  const nextPts = getPointsForNextLevel(lv);
  const prevPts = LEVEL_THRESHOLDS[lv - 1] || 0;
  const pct = lv >= 7 ? 100 : Math.max(0, Math.round(((STATE.points - prevPts) / (nextPts - prevPts)) * 100));

  setText('level-num', lv);
  setText('level-title', `المستوى ${lv} — ${LEVEL_NAMES[lv]}`);
  setText('level-sub', lv >= 7
    ? '🏆 وصلت للمستوى الأعلى! أنت أسطورة!'
    : `${STATE.points} / ${nextPts} نقطة — تحتاج ${nextPts - STATE.points} نقطة للمستوى ${lv + 1}`);
  setStyle('level-xp', 'width', pct + '%');
  setText('streak-num', STATE.streak);
  setText('total-pts', STATE.points);
  setText('challenges-done', STATE.completedChallenges.size);
  setText('confidence', getConfidenceLevel() + '%');

  const tracksEl = $('selected-tracks-val');
  if (tracksEl) {
    tracksEl.textContent = STATE.selectedTracks.length > 0
      ? STATE.selectedTracks.join(' · ')
      : 'لم تختر مسارات بعد';
  }
  setText('selected-tracks-count', STATE.selectedTracks.length);

  renderTrackProgress();

  const user = STATE.user || _ls('noor_user', null);
  if (user?.name) setText('dash-greeting', getSmartGreeting(user.name));
  renderSmartWelcome();

  // منصة التعلم: متابعة التعلم + تقدم المسارات
  if (typeof renderContinueLearning === 'function') renderContinueLearning();
  if (typeof renderPlatformProgress === 'function') renderPlatformProgress();
  if (typeof window._renderActiveTracksWidget === 'function') window._renderActiveTracksWidget();
  // [ENGAGEMENT] Smart Continue Learning + Next Action + Empty States
  if (typeof window._renderSmartContinueLearning === 'function') window._renderSmartContinueLearning();
  if (typeof window._renderNextActionEngine === 'function') window._renderNextActionEngine('dash-next-action');
  if (typeof renderEngagementEmptyStates === 'function') renderEngagementEmptyStates();
  // [INTELLIGENCE] Recommendations + Learning Path
  if (typeof window.renderSmartRecommendations === 'function') window.renderSmartRecommendations('dash-recommendations');
  if (typeof window.renderLearningPathRoadmap === 'function' && STATE.currentTrack) {
    window.renderLearningPathRoadmap('dash-learning-path', STATE.currentTrack);
  }
  if (typeof renderWatchHistory === 'function') renderWatchHistory();
}

function completeChallenge(id, pts, el) {
  if (STATE.completedChallenges.has(id)) return;
  STATE.completedChallenges.add(id);
  saveProgress(); // centralized — no direct localStorage call
  addPoints(pts, 'تحدي يومي مكتمل');
  if (STATE.completedChallenges.size >= 5) saveAchievement('badge', 'ch_5');
  renderDashboard();
}

/* =============================================
   📜 سجل مشاهدة الفيديوهات (Watch History)
   ============================================= */
function _watchHistoryTimeLabel(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  return d.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' }) + ' · ' +
         d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' });
}

async function renderWatchHistory() {
  const box = $('watch-history-section');
  if (!box) return;

  const user = STATE.user || _ls('noor_user', null);
  if (!user?.id || typeof WatchHistoryService === 'undefined') return;

  box.innerHTML = `<p style="color:var(--muted);font-size:13px;text-align:center;padding:12px 0">جاري تحميل السجل...</p>`;

  const history = await WatchHistoryService.loadHistory(user.id, 20);
  if (!history.length) {
    box.innerHTML = `<p style="color:var(--muted);font-size:14px;text-align:center;padding:12px 0">لسه معملتش أي مشاهدة مسجّلة — ابدأ فيديو من أي مسار وهيتسجل هنا تلقائياً 🎬</p>`;
    return;
  }

  box.innerHTML = `<div style="display:flex;flex-direction:column;gap:8px;max-height:260px;overflow-y:auto;">
    ${history.map(h => `
      <div style="display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;background:var(--bg);">
        <span style="font-size:17px;">${h.percent >= 100 ? '✅' : '▶️'}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:12.5px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${sanitizeHTML(h.step_title || 'فيديو')}</div>
          <div style="font-size:11px;color:var(--muted);">${sanitizeHTML(h.roadmap_title || '')} · ${_watchHistoryTimeLabel(h.watched_at)}</div>
        </div>
        <span style="font-size:11px;font-weight:800;color:var(--p600);flex-shrink:0;">${h.percent}%</span>
      </div>
    `).join('')}
  </div>`;
}

/* =============================================
   Track Progress
   ============================================= */
function renderTrackProgress() {
  const el = $('track-progress-list');
  if (!el) return;

  if (STATE.selectedTracks.length === 0) {
    el.innerHTML = '<p style="font-size:13.5px;color:var(--muted);">لم تختر أي مسار بعد. <button class="btn btn-outline btn-sm" style="margin-top:10px;width:100%;justify-content:center;" data-action="showPage" data-page="library">اختر مساراتك ←</button></p>';
    return;
  }

  el.innerHTML = STATE.selectedTracks.map(track => {
    const prog = STATE.trackProgress[track] || 0;
    const career = CAREERS_DATA.find(c => c.name === track);
    const icon = career ? career.icon : '📌';
    return `
    <div class="progress-item">
      <div class="progress-icon">${icon}</div>
      <div class="progress-info">
        <h4>${sanitizeHTML(track)}</h4>
        <p>التقدم: ${prog}%</p>
        <div class="prog-bar"><div class="prog-fill" style="width:${prog}%"></div></div>
      </div>
      <button class="progress-btn" data-action="updateProgress" data-track="${track}">تحديث</button>
    </div>`;
  }).join('');
}

function updateProgress(track) {
  const current = STATE.trackProgress[track] || 0;
  const next = Math.min(current + 25, 100);
  STATE.trackProgress[track] = next;
  saveProgress(); // writes noor_track_pct via core.js saveProgress()

  const career = CAREERS_DATA.find(c => c.name === track);
  if (career) saveTrackProgress(career.id, next);

  if (next === 100) {
    addPoints(100, `🎉 أكملت مسار ${track}!`);
    saveAchievement('badge', `track_complete_${career?.id}`);
    toast(`🏆 رائع! أكملت مسار ${track} بالكامل!`);
  } else {
    addPoints(5, `تقدم في ${track}`);
  }
  renderDashboard();
}

function selectTrack(name) {
  if (!STATE.selectedTracks.includes(name)) {
    STATE.selectedTracks.push(name);
    saveProgress(); // centralized — replaces direct localStorage call
    toast(`✅ تم إضافة "${name}" لمساراتك!`);
    if (STATE.currentPage === 'dashboard') renderDashboard();
  }
}

/* =============================================
   Home Page
   ============================================= */
function renderHomeChips() {
  const chips = CAREERS_DATA.slice(0, 24);

  // بناء HTML للشرائح — نُضاعف القائمة لضمان حركة سلسة لا نهاية لها
  function buildRow(items) {
    return items.map(c => {
      if (c.disabled) {
        return `<div class="career-chip chip-disabled" role="button" tabindex="0"
              data-action="showPage" data-page="library"
              aria-label="${sanitizeHTML(c.name)} — قريباً"
              onkeydown="if(event.key==='Enter'||event.key===' ')showPage('library')">
          <span>${c.icon}</span>${sanitizeHTML(c.name)}
        </div>`;
      }
      return `<div class="career-chip" role="button" tabindex="0"
            data-action="showCareer" data-career-id="${c.id}"
            onkeydown="if(event.key==='Enter'||event.key===' ')showCareer('${c.id}')">
        <span>${c.icon}</span>${sanitizeHTML(c.name)}
      </div>`;
    }).join('');
  }

  // صفان: الأول يسير يميناً، الثاني يساراً
  const row1 = chips.slice(0, 12);
  const row2 = chips.slice(12, 24);

  const el = $('home-chips');
  if (!el) return;

  el.innerHTML = `
    <div class="chips-marquee-wrap">
      <div class="chips-marquee-track chips-marquee-ltr">
        ${buildRow(row1)}${buildRow(row1)}
      </div>
    </div>
    <div class="chips-marquee-wrap" style="margin-top:10px;">
      <div class="chips-marquee-track chips-marquee-rtl">
        ${buildRow(row2)}${buildRow(row2)}
      </div>
    </div>`;
}

async function updateHomeStats() {
  try {
    const { userCount, storyCount } = await ProfileService.getHomeStats();
    setText('stat-users', Math.max(10000, userCount).toLocaleString('ar-EG') + '+');
    setText('stat-stories', Math.max(500, storyCount) + '+');
  } catch(e) {
    // Fallback to impressive default numbers
    setText('stat-users', '+10,000');
    setText('stat-stories', '+500');
  }
}


/* =============================================
   [H] HOMEPAGE INTELLIGENCE  [EVOLVED]
   Renders smart hero based on user state.
   Mode: 'continue' | 'recommend' | 'quiz'
   ============================================= */
function renderHomepageIntelligence() {
  const el = $('homepage-intelligence');
  if (!el) return;

  const mode = (typeof getHomepageMode === 'function') ? getHomepageMode() : 'quiz';

  if (mode === 'continue') {
    const tId = STATE.currentTrack;
    const cId = STATE.currentCourse;
    const lId = STATE.currentLesson;
    const track  = (typeof getTrackById  === 'function') ? getTrackById(tId)  : null;
    const course = (typeof getCourseById === 'function') ? getCourseById(tId, cId) : null;
    const lesson = course ? course.lessons.find(l => l.id === lId) : null;
    if (!track || !lesson) { el.style.display = 'none'; return; }

    const pct = (typeof platform_getTrackProgress === 'function') ? platform_getTrackProgress(tId) : 0;
    el.style.display = '';
    el.innerHTML = `
      <div class="intel-banner intel-continue" style="--intel-color:${track.color}">
        <div class="intel-icon">${track.icon}</div>
        <div class="intel-body">
          <div class="intel-label">متابعة من حيث توقفت</div>
          <div class="intel-title">${sanitizeHTML(lesson.title)}</div>
          <div class="intel-meta">${sanitizeHTML(track.title)} · ${sanitizeHTML(course.title)}</div>
          <div class="intel-bar"><div class="intel-bar-fill" style="width:${pct}%;background:${track.color}"></div></div>
          <div class="intel-pct" style="color:${track.color}">${pct}% مكتمل في المسار</div>
        </div>
        <button class="intel-btn" data-action="continueLearning" style="background:${track.color}">
          ▶ استمر الآن
        </button>
      </div>`;

  } else if (mode === 'recommend') {
    const recs = (typeof getRecommendedTracks === 'function') ? getRecommendedTracks() : [];
    if (!recs.length) { el.style.display = 'none'; return; }
    el.style.display = '';
    el.innerHTML = `
      <div class="intel-banner intel-recommend">
        <div class="intel-rec-header">
          <span class="intel-icon">🎯</span>
          <div>
            <div class="intel-label">بناءً على اختبارك المهني</div>
            <div class="intel-title">المسارات الموصى بها لك</div>
          </div>
        </div>
        <div class="intel-rec-grid">
          ${recs.map(t => `
            <div class="intel-rec-card" data-action="showTrack" data-track-id="${t.id}"
                 style="border-color:${t.color}20;--rc:${t.color}" role="button" tabindex="0">
              <span class="irc-icon">${t.icon}</span>
              <div class="irc-body">
                <div class="irc-title">${sanitizeHTML(t.title)}</div>
                <div class="irc-meta">${sanitizeHTML(t.duration)} · ${t.totalLessons} درس</div>
              </div>
              <span class="irc-arrow" style="color:${t.color}">←</span>
            </div>`).join('')}
        </div>
      </div>`;

  } else {
    // quiz mode — nudge to take the quiz
    el.style.display = '';
    el.innerHTML = `
      <div class="intel-banner intel-quiz">
        <div class="intel-icon">🧭</div>
        <div class="intel-body">
          <div class="intel-label">ابدأ رحلتك</div>
          <div class="intel-title">اكتشف المسار المهني المناسب لك</div>
          <div class="intel-meta">اختبار 3 دقائق — توصيات دقيقة مبنية على شخصيتك</div>
        </div>
        <button class="intel-btn intel-btn-quiz" data-action="showPage" data-page="quiz">
          ابدأ الاختبار ←
        </button>
      </div>`;
  }
}

/* =============================================
   [D] DASHBOARD UPGRADE — Active Tracks + Next Action
   Replaces renderTrackProgress with richer widget.
   ============================================= */
function renderActiveTracksWidget() {
  const el = $('active-tracks-widget');
  if (!el) return;

  if (typeof platform_getTrackProgress !== 'function' || typeof getAllTracks !== 'function') return;

  const startedTracks = getAllTracks().filter(t => platform_getTrackProgress(t.id) > 0);

  if (!startedTracks.length) {
    el.innerHTML = `
      <div class="atw-empty">
        <div style="font-size:28px">📚</div>
        <p>لم تبدأ أي مسار تعليمي بعد</p>
        <button class="btn btn-primary btn-sm" data-action="showPage" data-page="library" style="margin-top:8px">
          اكتشف المسارات
        </button>
      </div>`;
    return;
  }

  el.innerHTML = startedTracks.map(track => {
    const pct  = platform_getTrackProgress(track.id);
    const done = pct === 100;

    // Determine next action for this track
    let nextAction = '';
    if (!done) {
      const tId = track.id;
      const cId = STATE.currentCourse;
      const lId = STATE.currentLesson;
      if (STATE.currentTrack === tId && cId && lId) {
        const course = (typeof getCourseById === 'function') ? getCourseById(tId, cId) : null;
        const lesson = course ? course.lessons.find(l => l.id === lId) : null;
        if (lesson) nextAction = `▶ ${sanitizeHTML(lesson.title)}`;
      }
      if (!nextAction) nextAction = 'ابدأ أول درس';
    }

    return `
      <div class="atw-track ${done ? 'atw-done' : ''}" style="--tc:${track.color}">
        <div class="atw-icon">${track.icon}</div>
        <div class="atw-body">
          <div class="atw-title">${sanitizeHTML(track.title)}</div>
          <div class="atw-bar">
            <div class="atw-fill" style="width:${pct}%;background:${track.color};
              transition:width .8s cubic-bezier(.22,1,.36,1)"></div>
          </div>
          <div class="atw-meta">
            <span style="color:${track.color};font-weight:700">${pct}%</span>
            ${!done ? `<span class="atw-next">${nextAction}</span>` : '<span style="color:var(--t500)">✓ مكتمل</span>'}
          </div>
        </div>
        ${!done
          ? `<button class="atw-btn" data-action="showTrack" data-track-id="${track.id}"
                     style="border-color:${track.color}40;color:${track.color}">تابع</button>`
          : `<div class="atw-done-badge">🏆</div>`}
      </div>`;
  }).join('');
}

/* Hook renderHomepageIntelligence + active tracks into init cycle */
window._renderHomepageIntelligence = renderHomepageIntelligence;
window._renderActiveTracksWidget   = renderActiveTracksWidget;
