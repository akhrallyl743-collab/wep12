'use strict';

/* ============================================
   نظام التأهيل v3 — START LINE
   5 خطوات: إنشاء الحساب ← العمر ← الاهتمامات ← المسار المهني ← بدء الرحلة
   ============================================ */

/** كائن الحالة الرئيسي لنظام التأهيل */
const ONB = {
  current: 0,   // الخطوة الحالية (0 حتى 4)
  total: 5,     // إجمالي عدد الخطوات
  data: {
    name: '',           // الاسم الكامل
    email: '',          // البريد أو الهاتف
    password: '',       // كلمة المرور
    age: '',            // العمر
    interest: '',       // المجال المختار
    interestOther: '',  // المجال عند اختيار "أخرى"
    career: '',         // المسار المهني
    careerOther: ''     // المسار عند اختيار "أخرى"
  },
  completed: false  // هل اكتمل التأهيل؟
};

const مفتاح_التخزين    = 'sl_onboarding_v3'; // مفتاح LocalStorage لحفظ البيانات
const مفتاح_الاكتمال   = 'sl_onboarding_done'; // مفتاح دلالة اكتمال التأهيل

/* ── تسميات المسارات المهنية ── */
const تسميات_المسارات = {
  'programming':   'البرمجة',
  'photography':   'التصوير',
  'video-editing': 'المونتاج',
  'graphic-design':'الجرافيك',
  'marketing':     'التسويق',
  'freelancing':   'الفريلانس',
  'other':         'أخرى'
};

/* ── مقترحات الخطوات لكل مسار مهني ── */
const اقتراحات_المسارات = {
  'programming':   ['تعلم HTML/CSS/JS', 'أساسيات Python', 'تطوير تطبيقات الجوال'],
  'photography':   ['أساسيات التصوير', 'تعديل الصور بـ Lightroom', 'التسويق لعملك'],
  'video-editing': ['أساسيات المونتاج', 'Adobe Premiere Pro', 'إنتاج المحتوى'],
  'graphic-design':['Adobe Illustrator', 'تصميم الهوية البصرية', 'Figma للمصممين'],
  'marketing':     ['التسويق الرقمي', 'إدارة وسائل التواصل', 'إعلانات Meta وGoogle'],
  'freelancing':   ['بناء بروفايل قوي', 'مهارات التفاوض', 'إدارة العملاء والمشاريع'],
  'other':         ['استكشاف المسارات المتاحة', 'مهارات التعلم الذاتي', 'بناء شبكة علاقات']
};

/** تسميات المجالات العامة */
const تسميات_المجالات = {
  'tech': 'التقنية', 'design': 'التصميم', 'business': 'الأعمال',
  'medicine': 'الطب', 'law': 'القانون', 'education': 'التعليم',
  'media': 'الإعلام', 'finance': 'المالية', 'engineering': 'الهندسة',
  'arts': 'الفنون', 'science': 'العلوم', 'social': 'العمل الاجتماعي'
};

/* ─── تهيئة نظام التأهيل ─── */
let _onbInitialized = false; // حارس: يمنع إعادة التهيئة أثناء تقدم المستخدم

function onbInit() {
  // حذف مفاتيح الإصدارات القديمة لتجنب التعارض
  try {
    localStorage.removeItem('sl_onboarding_v1');
    localStorage.removeItem('sl_onboarding_v2');
  } catch(e) {}

  // استعادة البيانات المحفوظة مسبقاً (إن وُجدت)
  let savedStep = 0;
  try {
    const محفوظ = JSON.parse(localStorage.getItem(مفتاح_التخزين) || '{}');
    if (محفوظ && Object.keys(محفوظ).length) {
      // استخرج الخطوة المحفوظة وابقِ بقية البيانات في ONB.data
      savedStep = typeof محفوظ._step === 'number' ? محفوظ._step : 0;
      const { _step, ...بياناتفقط } = محفوظ;
      Object.assign(ONB.data, بياناتفقط);
    }
  } catch(e) {}

  // إذا كانت التهيئة حدثت بالفعل والمستخدم في منتصف الخطوات — لا تُعد التهيئة
  if (_onbInitialized && ONB.current > 0) {
    onbRender(ONB.current, false);
    onbUpdateProgress();
    return;
  }

  // استعادة الخطوة المحفوظة (بدلاً من الإعادة دائماً للصفر)
  ONB.current = savedStep;
  _onbInitialized = true;
  onbRender(ONB.current, false);
  onbUpdateProgress();
  _onbInitTilt();
}

/* ─── تأثير الإمالة ثلاثية الأبعاد عند تحريك الماوس فوق الكارد ─── */
function _onbInitTilt() {
  const الحاوية = document.getElementById('onb-container');
  if (!الحاوية || window.matchMedia('(max-width:768px)').matches) return;

  الحاوية.addEventListener('mousemove', (e) => {
    const أبعاد = الحاوية.getBoundingClientRect();
    const مركزX = أبعاد.left + أبعاد.width / 2;
    const مركزY = أبعاد.top + أبعاد.height / 2;
    const نسبةX = (e.clientX - مركزX) / (أبعاد.width / 2);
    const نسبةY = (e.clientY - مركزY) / (أبعاد.height / 2);
    const إمالةX = (-نسبةY * 4).toFixed(2);
    const إمالةY = (نسبةX * 4).toFixed(2);
    الحاوية.style.setProperty('--tilt-x', إمالةX + 'deg');
    الحاوية.style.setProperty('--tilt-y', إمالةY + 'deg');
    الحاوية.classList.add('tilt');
  });

  الحاوية.addEventListener('mouseleave', () => {
    الحاوية.style.setProperty('--tilt-x', '0deg');
    الحاوية.style.setProperty('--tilt-y', '0deg');
    الحاوية.classList.remove('tilt');
  });
}

/* ─── التنقل بين الخطوات ─── */

/** الانتقال للخطوة التالية — يتحقق من صحة البيانات أولاً */
function onbNext() {
  if (!onbValidateStep(ONB.current)) {
    _onbShakeBtn(); return;
  }
  onbSaveStep(ONB.current);

  // إذا كانت هذه آخر خطوة — قم بالتسجيل
  if (ONB.current === ONB.total - 1) {
    onbRegister();
    return;
  }
  onbGoTo(ONB.current + 1, true);
}

/** الرجوع للخطوة السابقة */
function onbBack() {
  if (ONB.current <= 0) return;
  onbGoTo(ONB.current - 1, false);
}

/** الانتقال لخطوة محددة */
function onbGoTo(step, forward) {
  ONB.current = Math.max(0, Math.min(step, ONB.total - 1));
  onbRender(ONB.current, forward);
  onbUpdateProgress();
  onbSaveToStorage();
}

/* ─── عرض الخطوة ─── */
function onbRender(stepIdx, forward) {
  const مسار = document.getElementById('onb-steps-track');
  const زرالتالي = document.getElementById('onb-next-btn');
  const زرالرجوع = document.getElementById('onb-back-btn');
  const شارة = document.getElementById('onb-step-badge');

  if (!مسار) return;

  // تحريك الشريط لإظهار الخطوة الصحيحة
  مسار.style.transition = 'transform .45s cubic-bezier(.77,0,.175,1)';
  مسار.style.transform = `translateX(-${stepIdx * 100}%)`;

  if (شارة) شارة.textContent = `الخطوة ${stepIdx + 1}`;

  // إظهار/إخفاء زر الرجوع (مخفي في الخطوة الأولى)
  if (زرالرجوع) {
    زرالرجوع.style.display = stepIdx === 0 ? 'none' : 'inline-flex';
  }

  // ضبط نص زر التالي/إنهاء
  if (زرالتالي) {
    زرالتالي.style.display = 'inline-flex';
    زرالتالي.disabled = false;

    if (stepIdx >= 3) {
      زرالتالي.textContent = 'إنهاء';
    } else {
      زرالتالي.textContent = 'التالي ←';
    }
  }

  if (typeof onbPopulateStep === 'function') {
    onbPopulateStep(stepIdx);
  }
}

/** ضبط أزرار التنقل حسب الخطوة الحالية */
function _onbUpdateButtons(stepIdx) {
  const زرالرجوع   = document.getElementById('onb-back-btn');
  const زرالتالي   = document.getElementById('onb-next-btn');
  const نصالتالي = document.getElementById('onb-next-label');
  const شريطالتنقل     = document.getElementById('onb-nav');

  if (!شريطالتنقل || !زرالرجوع || !زرالتالي) return;

  شريطالتنقل.style.display = 'flex';
  زرالرجوع.style.visibility = stepIdx === 0 ? 'hidden' : 'visible';

  if (stepIdx === ONB.total - 1) {
    نصالتالي.textContent = 'ابدأ رحلتي 🚀';
  } else {
    نصالتالي.textContent = 'التالي ←';
  }

  onbUpdateNextBtn();
}

/** تعبئة بيانات خطوة محددة من ONB.data */
function onbPopulateStep(stepIdx) {
  // الخطوة 0: استعادة حقول بيانات الحساب
  if (stepIdx === 0) {
    const حقلالاسم = document.getElementById('onb-reg-fullname');
    const حقلالبريد = document.getElementById('onb-reg-email');
    if (حقلالاسم && ONB.data.name) حقلالاسم.value = ONB.data.name;
    if (حقلالبريد && ONB.data.email) حقلالبريد.value = ONB.data.email;
    setTimeout(() => حقلالاسم && حقلالاسم.focus(), 300);
    onbRegValidate();
  }

  // الخطوة 1: استعادة العمر
  if (stepIdx === 1) {
    const حقلالعمر = document.getElementById('onb-age-input');
    const عنوانالعمر = document.getElementById('onb-age-title');
    if (عنوانالعمر && ONB.data.name) عنوانالعمر.textContent = `كم عمرك يا ${ONB.data.name}؟`;
    if (حقلالعمر && ONB.data.age) {
      حقلالعمر.value = ONB.data.age;
      const تلميح = document.getElementById('onb-age-hint');
      if (تلميح) تلميح.style.display = 'block';
    }
    setTimeout(() => حقلالعمر && حقلالعمر.focus(), 300);
    onbUpdateNextBtn();
  }

  // الخطوة 2: استعادة المجال المختار
  if (stepIdx === 2) {
    document.querySelectorAll('#onb-interest-cards .onb-card-opt').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === ONB.data.interest);
    });
    const غلافأخرى = document.getElementById('onb-interest-other-wrap');
    const حقلأخرى  = document.getElementById('onb-interest-other-input');
    if (ONB.data.interest === 'other') {
      if (غلافأخرى) غلافأخرى.style.display = 'block';
      if (حقلأخرى && ONB.data.interestOther) حقلأخرى.value = ONB.data.interestOther;
    } else {
      if (غلافأخرى) غلافأخرى.style.display = 'inline-flex';
    }
    onbUpdateNextBtn();
  }

  // الخطوة 3: استعادة المسار المهني
  if (stepIdx === 3) {
    document.querySelectorAll('#onb-career-cards .onb-card-opt').forEach(c => {
      c.classList.toggle('selected', c.dataset.value === ONB.data.career);
    });
    const غلافأخرى = document.getElementById('onb-career-other-wrap');
    const حقلأخرى  = document.getElementById('onb-career-other-input');
    if (ONB.data.career === 'other') {
      if (غلافأخرى) غلافأخرى.style.display = 'block';
      if (حقلأخرى && ONB.data.careerOther) حقلأخرى.value = ONB.data.careerOther;
    } else {
      if (غلافأخرى) غلافأخرى.style.display = 'inline-flex';
    }
    onbUpdateNextBtn();
  }

  // الخطوة 4: بناء ملخص البيانات والمسارات المقترحة
  if (stepIdx === 4) {
    const اسمالاكتمال = document.getElementById('onb-finish-name');
    if (اسمالاكتمال) اسمالاكتمال.textContent = ONB.data.name || 'صديقي';

    const ملخصالعمر   = document.getElementById('onb-sum-age');
    const ملخصالمجال  = document.getElementById('onb-sum-interests');
    const ملخصالمسار  = document.getElementById('onb-sum-career');

    if (ملخصالعمر) ملخصالعمر.innerHTML = `🎂 العمر: <strong>${ONB.data.age || '—'} سنة</strong>`;

    if (ملخصالمجال) {
      const تسميات_المجالات_محلية = {
        'frontend': 'مطور Frontend', 'graphic': 'جرافيك ديزاين',
        'video': 'مونتاج فيديو', 'marketing': 'تسويق رقمي', 'other': 'أخرى'
      };
      const تسميةالمجال = ONB.data.interest === 'other'
        ? (ONB.data.interestOther || 'أخرى')
        : (تسميات_المجالات_محلية[ONB.data.interest] || ONB.data.interest || '—');
      ملخصالمجال.innerHTML = `💡 المجال: <strong>${تسميةالمجال}</strong>`;
    }

    if (ملخصالمسار) {
      const تسميةالمسار = ONB.data.career === 'other'
        ? (ONB.data.careerOther || 'أخرى')
        : (تسميات_المسارات[ONB.data.career] || '—');
      ملخصالمسار.innerHTML = `🎯 المسار: <strong>${تسميةالمسار}</strong>`;
    }

    // عرض المسارات المقترحة بناءً على اختيار المستخدم
    const غلافالمسارات = document.getElementById('onb-paths-wrap');
    if (غلافالمسارات) {
      const المسارات = اقتراحات_المسارات[ONB.data.career] || اقتراحات_المسارات['other'];
      غلافالمسارات.innerHTML = `
        <p style="font-size:14px; font-weight:700; margin-bottom:10px; opacity:.8;">🗺️ المسارات المقترحة لك:</p>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${المسارات.map(p => `
            <div style="display:flex; align-items:center; gap:10px; padding:10px 14px; background:var(--onb-card-bg,rgba(255,255,255,.06)); border-radius:12px; border:1px solid rgba(255,255,255,.1);">
              <span style="font-size:18px;">⭐</span>
              <span style="font-size:14px; font-weight:600;">${p}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    onbConfetti();
    // الخطوة النهائية: إخفاء شريط التنقل (يستخدم زر "ابدأ رحلتي" بدلاً منه)
    const زرالتالي = document.getElementById('onb-next-btn');
    const شريطالتنقل   = document.getElementById('onb-nav');
    if (شريطالتنقل) شريطالتنقل.style.display = 'none';
  }
}

/* ─── التحقق من صحة البيانات ─── */
function onbValidateStep(stepIdx) {
  switch (stepIdx) {
    case 0: return _onbStep0Valid();
    case 1: {
      const عمر = parseInt(document.getElementById('onb-age-input')?.value || '0');
      return عمر >= 13 && عمر <= 70;
    }
    case 2: {
      if (!ONB.data.interest) return false;
      if (ONB.data.interest === 'other') {
        return (document.getElementById('onb-interest-other-input')?.value || '').trim().length >= 2;
      }
      return true;
    }
    case 3: {
      if (!ONB.data.career) return false;
      if (ONB.data.career === 'other') {
        return (document.getElementById('onb-career-other-input')?.value || '').trim().length >= 2;
      }
      return true;
    }
    case 4: return true;
    default: return true;
  }
}

/** التحقق من صحة بيانات الخطوة الأولى (إنشاء الحساب) */
function _onbStep0Valid() {
  const الاسم     = (document.getElementById('onb-reg-fullname')?.value || '').trim();
  const البريد    = (document.getElementById('onb-reg-email')?.value || '').trim();
  const كلمةالمرور = (document.getElementById('onb-reg-password')?.value || '');
  const التأكيد  = (document.getElementById('onb-reg-confirm')?.value || '');

  // يقبل بريداً إلكترونياً أو رقم هاتف
  const بريدأوهاتف = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(البريد) || /^[0-9+]{7,15}$/.test(البريد.replace(/\s/g,''));
  return الاسم.length >= 2 && بريدأوهاتف && كلمةالمرور.length >= 8 && كلمةالمرور === التأكيد;
}

/* ─── حفظ بيانات الخطوة ─── */
function onbSaveStep(stepIdx) {
  if (stepIdx === 0) {
    ONB.data.name     = (document.getElementById('onb-reg-fullname')?.value || '').trim();
    ONB.data.email    = (document.getElementById('onb-reg-email')?.value || '').trim();
    ONB.data.password = (document.getElementById('onb-reg-password')?.value || '');
  }
  if (stepIdx === 1) {
    ONB.data.age = document.getElementById('onb-age-input')?.value || '';
  }
  if (stepIdx === 3) {
    if (ONB.data.career === 'other') {
      ONB.data.careerOther = (document.getElementById('onb-career-other-input')?.value || '').trim();
    }
  }
  onbSaveToStorage();
}

/** حفظ بيانات التأهيل في LocalStorage */
function onbSaveToStorage() {
  try {
    localStorage.setItem(مفتاح_التخزين, JSON.stringify({ ...ONB.data, _step: ONB.current }));
  } catch(e) {}
}

/* ─── تفاعلات حقول الإدخال ─── */

/** التحقق الفوري من حقول الخطوة الأولى أثناء الكتابة */
function onbRegValidate() {
  const الاسم     = (document.getElementById('onb-reg-fullname')?.value || '').trim();
  const البريد    = (document.getElementById('onb-reg-email')?.value || '').trim();
  const كلمةالمرور = (document.getElementById('onb-reg-password')?.value || '');
  const التأكيد  = (document.getElementById('onb-reg-confirm')?.value || '');
  const عنصرالخطأ    = document.getElementById('onb-reg-error');

  const بريدأوهاتف = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(البريد) || /^[0-9+]{7,15}$/.test(البريد.replace(/\s/g,''));
  const كلمةصحيحة  = كلمةالمرور.length >= 8;
  const متطابقة      = كلمةالمرور === التأكيد;

  let خطأ = '';
  if (الاسم.length > 0 && الاسم.length < 2) خطأ = 'الاسم قصير جداً';
  else if (البريد.length > 0 && !بريدأوهاتف) خطأ = 'أدخل بريداً إلكترونياً أو رقم هاتف صحيح';
  else if (كلمةالمرور.length > 0 && !كلمةصحيحة) خطأ = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
  else if (التأكيد.length > 0 && !متطابقة) خطأ = 'كلمتا المرور غير متطابقتين';

  if (عنصرالخطأ) {
    عنصرالخطأ.style.display = خطأ ? 'block' : 'none';
    عنصرالخطأ.textContent = خطأ;
  }

  onbUpdateNextBtn();
}

/** عند تغيير حقل العمر — إظهار تلميح التأكيد */
function onbAgeInputChange() {
  const حقلالعمر = document.getElementById('onb-age-input');
  const التلميح   = document.getElementById('onb-age-hint');
  if (!حقلالعمر || !التلميح) return;
  const عمر = parseInt(حقلالعمر.value || '0');
  التلميح.style.display = (عمر >= 13 && عمر <= 70) ? 'block' : 'none';
  onbUpdateNextBtn();
}

/** إظهار/إخفاء نص كلمة المرور في حقل التأهيل */
function onbTogglePassword(id, btn) {
  const حقل = document.getElementById(id);
  if (!حقل) return;
  حقل.type = حقل.type === 'password' ? 'text' : 'password';
  btn.textContent = حقل.type === 'password' ? '👁' : '🙈';
}

/** تبديل تحديد وسم اهتمام (حد أقصى 3 مجالات) */
function onbToggleTag(el, field) {
  const المصفوفة = ONB.data[field];
  const القيمة = el.dataset.value;
  const الحدالأقصى = 3;

  if (el.classList.contains('selected')) {
    el.classList.remove('selected');
    const i = المصفوفة.indexOf(القيمة);
    if (i > -1) المصفوفة.splice(i, 1);
  } else {
    if (المصفوفة.length >= الحدالأقصى) {
      // إزالة الأقدم وإضافة الجديد
      const القديم = المصفوفة.shift();
      const عنصرقديم = document.querySelector(`#onb-interest-tags [data-value="${القديم}"]`);
      if (عنصرقديم) عنصرقديم.classList.remove('selected');
    }
    el.classList.add('selected');
    المصفوفة.push(القيمة);
  }

  const تلميح = document.getElementById('onb-interests-hint');
  if (تلميح) تلميح.textContent = المصفوفة.length === 0
    ? 'اختر من 1 إلى 3 مجالات'
    : `تم اختيار ${المصفوفة.length} ${المصفوفة.length === 1 ? 'مجال' : 'مجالات'} (الحد الأقصى 3)`;

  onbSaveToStorage();
  onbUpdateNextBtn();
}

/** تحديد مسار مهني (اختيار واحد فقط) */
function onbSelectCareer(el) {
  // إزالة التحديد من جميع البطاقات
  document.querySelectorAll('#onb-career-cards .onb-card-opt').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  ONB.data.career = el.dataset.value;
  onbSaveToStorage();

  // إظهار/إخفاء حقل "أخرى"
  const غلاف = document.getElementById('onb-career-other-wrap');
  if (غلاف) {
    غلاف.style.display = ONB.data.career === 'other' ? 'block' : 'none';
    if (ONB.data.career === 'other') {
      setTimeout(() => document.getElementById('onb-career-other-input')?.focus(), 100);
    }
  }

  onbUpdateNextBtn();

  // تقدم تلقائي إذا لم يكن الاختيار "أخرى"
  if (ONB.data.career !== 'other') {
    setTimeout(() => {
      if (onbValidateStep(ONB.current)) onbNext();
    }, 420);
  }
}

/** عند الكتابة في حقل المسار "أخرى" */
function onbCareerOtherChange() {
  ONB.data.careerOther = (document.getElementById('onb-career-other-input')?.value || '').trim();
  onbSaveToStorage();
  onbUpdateNextBtn();
}

/** تحديد مجال اهتمام (اختيار واحد فقط) */
function onbSelectInterest(el) {
  // إزالة التحديد من جميع البطاقات
  document.querySelectorAll('#onb-interest-cards .onb-card-opt').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  ONB.data.interest = el.dataset.value;
  onbSaveToStorage();

  const غلاف = document.getElementById('onb-interest-other-wrap');
  if (غلاف) {
    غلاف.style.display = ONB.data.interest === 'other' ? 'block' : 'none';
    if (ONB.data.interest === 'other') {
      setTimeout(() => document.getElementById('onb-interest-other-input')?.focus(), 100);
    }
  }

  onbUpdateNextBtn();

  // تقدم تلقائي إذا لم يكن الاختيار "أخرى"
  if (ONB.data.interest !== 'other') {
    setTimeout(() => {
      if (onbValidateStep(ONB.current)) onbNext();
    }, 420);
  }
}

/** عند الكتابة في حقل المجال "أخرى" */
function onbInterestOtherChange() {
  ONB.data.interestOther = (document.getElementById('onb-interest-other-input')?.value || '').trim();
  onbSaveToStorage();
  onbUpdateNextBtn();
}

/* ─── تحديث حالة زر التالي ─── */
/** تعطيل/تفعيل زر "التالي" بناءً على صحة بيانات الخطوة الحالية */
function onbUpdateNextBtn() {
  const زر = document.getElementById('onb-next-btn');
  if (!زر) return;
  زر.disabled = !onbValidateStep(ONB.current);
}

/* ─── شريط التقدم ─── */
/** تحديث شريط التقدم والنقاط الدالة على الخطوة */
function onbUpdateProgress() {
  const نسبة = ((ONB.current + 1) / ONB.total) * 100;

  const شريطالتعبئة  = document.getElementById('onb-progress-fill');
  const توهجالشريط  = document.getElementById('onb-progress-glow');
  const شارةالخطوة = document.getElementById('onb-step-badge');

  if (شريطالتعبئة)  شريطالتعبئة.style.width = نسبة + '%';
  if (توهجالشريط)  توهجالشريط.style.left  = نسبة + '%';
  if (شارةالخطوة) شارةالخطوة.textContent = `الخطوة ${ONB.current + 1} من ${ONB.total}`;

  // تلوين النقاط (active = الحالية، done = المكتملة)
  document.querySelectorAll('.onb-dot').forEach((نقطة, i) => {
    نقطة.classList.remove('active', 'done');
    if (i === ONB.current) نقطة.classList.add('active');
    else if (i < ONB.current) نقطة.classList.add('done');
  });

  const غلاف = document.getElementById('onb-progress-bar-wrap');
  if (غلاف) غلاف.setAttribute('aria-valuenow', Math.round(نسبة));
}

/* ─── التسجيل وإنهاء التأهيل ─── */

/** إنشاء الحساب — يُستدعى في الخطوة الأخيرة */
function onbRegister() {
  const الاسم     = ONB.data.name  || (document.getElementById('onb-reg-fullname')?.value || '').trim();
  const البريد    = ONB.data.email || (document.getElementById('onb-reg-email')?.value || '').trim();
  const كلمةالمرور = ONB.data.password || '';

  const زر   = document.getElementById('onb-register-btn');
  const نص = document.getElementById('onb-register-label');

  if (زر) زر.disabled = true;
  if (نص) نص.textContent = 'جارٍ إنشاء الحساب...';

  const تسميةالمسار = ONB.data.career === 'other'
    ? (ONB.data.careerOther || 'أخرى')
    : (تسميات_المسارات[ONB.data.career] || '');

  const تسميةالمجال = ONB.data.interest === 'other'
    ? (ONB.data.interestOther || 'أخرى')
    : ({ 'frontend': 'مطور Frontend', 'graphic': 'جرافيك ديزاين', 'video': 'مونتاج فيديو', 'marketing': 'تسويق رقمي' }[ONB.data.interest] || ONB.data.interest);

  const مستخدمجديد = {
    id: 'u_' + Date.now(),
    name: الاسم,
    email: البريد,
    age: ONB.data.age,
    interest: تسميةالمجال,
    career: تسميةالمسار,
    onboarded: true,
    createdAt: new Date().toISOString()
  };

  // محاولة التسجيل عبر Supabase إذا كان متاحاً
  if (typeof window.supabase !== 'undefined' && window.supabase && كلمةالمرور) {
    window.supabase.auth.signUp({ email: البريد, password: كلمةالمرور, options: { data: { name: الاسم } } })
      .then(({ data, error }) => {
        if (error) {
          _onbRegError(error.message || 'حدث خطأ، حاول مرة أخرى');
          if (زر) زر.disabled = false;
          if (نص) نص.textContent = 'ابدأ رحلتي الآن 🚀';
        } else {
          _onbFinishRegistration(مستخدمجديد);
        }
      })
      .catch(() => _onbFallbackRegister(مستخدمجديد, كلمةالمرور));
  } else {
    // تسجيل محلي إذا لم يكن Supabase متاحاً
    _onbFallbackRegister(مستخدمجديد, كلمةالمرور);
  }
}

/** تسجيل محلي (احتياطي) — يحفظ بيانات المستخدم في LocalStorage */
function _onbFallbackRegister(مستخدم, كلمةالمرور) {
  try {
    const المستخدمون = JSON.parse(localStorage.getItem('sl_users') || '[]');
    const موجود = المستخدمون.find(u => u.email === مستخدم.email);
    if (موجود) {
      _onbRegError('هذا البريد الإلكتروني مسجل مسبقاً');
      const زر   = document.getElementById('onb-register-btn');
      const نص = document.getElementById('onb-register-label');
      if (زر) زر.disabled = false;
      if (نص) نص.textContent = 'ابدأ رحلتي الآن 🚀';
      return;
    }
    مستخدم._pw = كلمةالمرور; // للعرض التجريبي المحلي فقط
    المستخدمون.push(مستخدم);
    localStorage.setItem('sl_users', JSON.stringify(المستخدمون));
  } catch(e) {}
  _onbFinishRegistration(مستخدم);
}

/** حفظ بيانات المستخدم وإنهاء التأهيل */
function _onbFinishRegistration(مستخدم) {
  try {
    localStorage.setItem('noor_user', JSON.stringify(مستخدم));
    localStorage.setItem('sl_profile', JSON.stringify({ ...مستخدم, onboarded: true }));
    localStorage.setItem('sl_session', JSON.stringify({ userId: مستخدم.id, loggedAt: Date.now() }));
  } catch(e) {}

  _onbComplete(مستخدم);
}

/** عرض رسالة خطأ في نموذج التسجيل */
function _onbRegError(msg) {
  const عنصرالخطأ = document.getElementById('onb-reg-error');
  if (عنصرالخطأ) {
    عنصرالخطأ.style.display = 'block';
    عنصرالخطأ.textContent = '⚠️ ' + msg;
  }
}

/* ─── اكتمال التأهيل ─── */
/** تحديث الحالة العامة وتوجيه المستخدم للصفحة الرئيسية */
function _onbComplete(مستخدم) {
  _onbInitialized = false; // السماح بإعادة التهيئة إذا احتجنا لاحقاً
  if (typeof STATE !== 'undefined') {
    STATE.user = STATE.user || {};
    Object.assign(STATE.user, مستخدم);
  }

  onbSaveToStorage();
  localStorage.setItem(مفتاح_الاكتمال, '1');

  if (typeof updateNavUser === 'function') updateNavUser(مستخدم);

  const الاسم = مستخدم.name || ONB.data.name || 'صديقي';
  if (typeof toast === 'function') toast(`مرحباً يا ${الاسم}! 🎉 رحلتك بدأت!`);

  // توجيه للصفحة الرئيسية بعد لحظة
  setTimeout(() => {
    if (typeof showPage === 'function') showPage('home');
  }, 600);
}

/* ─── رج الزر عند الإدخال الخاطئ ─── */
function _onbShakeBtn() {
  const زر = document.getElementById('onb-next-btn');
  if (!زر) return;
  زر.style.animation = 'none';
  زر.offsetHeight; // إعادة تشغيل الـ reflow لإعادة الحركة
  زر.style.animation = 'onb-shake .4s cubic-bezier(.36,.07,.19,.97) both';
}

// حقن حركة الرج في الصفحة
(function() {
  const نمط = document.createElement('style');
  نمط.textContent = `
    @keyframes onb-shake {
      10%,90%{transform:translateX(-2px)}
      20%,80%{transform:translateX(3px)}
      30%,50%,70%{transform:translateX(-4px)}
      40%,60%{transform:translateX(4px)}
    }
  `;
  document.head.appendChild(نمط);
})();

/* ─── تأثير الورق المتساقط عند الاكتمال ─── */
function onbConfetti() {
  const الألوان = ['#4f35e8','#1fbb85','#e8a81a','#e8502a','#3d8ef5','#c3baff','#a7f0d6'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const قطعة = document.createElement('div');
      قطعة.className = 'onb-confetti';
      قطعة.style.cssText = `
        left: ${Math.random() * 100}vw;
        top: -20px;
        background: ${الألوان[Math.floor(Math.random() * الألوان.length)]};
        animation-duration: ${1.8 + Math.random() * 2}s;
        animation-delay: ${Math.random() * .6}s;
        transform: rotate(${Math.random() * 360}deg);
        opacity: ${0.7 + Math.random() * 0.3};
        width: ${6 + Math.random() * 7}px;
        height: ${10 + Math.random() * 10}px;
        border-radius: ${Math.random() > .5 ? '50%' : '3px'};
      `;
      document.body.appendChild(قطعة);
      setTimeout(() => قطعة.remove(), 4000);
    }, i * 28);
  }
}

/* ─── فحص عند أول زيارة ─── */
/** إذا لم يُكمل المستخدم التأهيل من قبل — تُعرض صفحة التأهيل تلقائياً */
function onbCheckAndShow() {
  const مكتمل = localStorage.getItem(مفتاح_الاكتمال);
  if (!مكتمل) {
    if (typeof showPage === 'function') showPage('onboarding');
  }
}
