'use strict';

/* =============================================
   Auth Modal
   ============================================= */
function authShowScreen(name) {
  const screens = ['login','register','forgot','reset','forgot-sent','confirm','loading'];
  screens.forEach(s => {
    const el = $('auth-screen-' + s);
    if (el) el.style.display = (s === name) ? '' : 'none';
  });
  const tabs = $('auth-tabs');
  if (tabs) tabs.style.display = (name === 'login' || name === 'register') ? '' : 'none';

  const tabLogin    = $('tab-login');
  const tabRegister = $('tab-register');
  if (tabLogin)    { tabLogin.classList.toggle('active', name === 'login'); tabLogin.setAttribute('aria-selected', String(name === 'login')); }
  if (tabRegister) { tabRegister.classList.toggle('active', name === 'register'); tabRegister.setAttribute('aria-selected', String(name === 'register')); }

  authClearError(name);
}

function authShowError(screen, msg) {
  const el = $(screen + '-error');
  if (!el) return;
  el.textContent = msg;
  el.style.display = 'block';
}

function authClearError(screen) {
  const el = $(screen + '-error');
  if (el) { el.textContent = ''; el.style.display = 'none'; }
}

function authSetLoading(btnId, loadingText) {
  const btn = $(btnId);
  if (!btn) return;
  if (loadingText) {
    btn.disabled = true;
    btn.dataset.original = btn.textContent;
    btn.textContent = loadingText;
  } else {
    btn.disabled = false;
    btn.textContent = btn.dataset.original || btn.textContent;
  }
}

function togglePass(inputId, btn) {
  const inp = $(inputId);
  if (!inp) return;
  if (inp.type === 'password') { inp.type = 'text'; btn.textContent = '🙈'; }
  else { inp.type = 'password'; btn.textContent = '👁'; }
}

function openModal(tab) {
  const modal = $('auth-modal');
  if (!modal) return;
  modal.classList.add('open');
  authShowScreen(tab || 'login');
}

// يفعّل وضع "الدخول إجباري" — بيمنع إغلاق نافذة تسجيل الدخول لحد ما المستخدم يسجّل دخول/حساب فعلاً
function requireAuthModal() {
  STATE.authRequired = true;
  const modal = $('auth-modal');
  if (modal) modal.classList.add('force-auth');
  const closeBtn = document.querySelector('#auth-modal .modal-close');
  if (closeBtn) closeBtn.style.display = 'none';
  const note = $('auth-required-note');
  if (note) note.style.display = 'block';
  openModal('login');
}

// يُلغي وضع الإجبار بعد نجاح تسجيل الدخول/إنشاء الحساب
function releaseAuthRequirement() {
  STATE.authRequired = false;
  const modal = $('auth-modal');
  if (modal) modal.classList.remove('force-auth');
  const closeBtn = document.querySelector('#auth-modal .modal-close');
  if (closeBtn) closeBtn.style.display = '';
  const note = $('auth-required-note');
  if (note) note.style.display = 'none';
}

function closeModal() {
  if (STATE.authRequired && !STATE.user) return; // ممنوع الإغلاق قبل تسجيل الدخول
  const modal = $('auth-modal');
  if (modal) modal.classList.remove('open');
}

function modalOverlayClick(e) {
  if (STATE.authRequired && !STATE.user) return; // ممنوع الإغلاق بالضغط خارج النافذة قبل تسجيل الدخول
  if (e.target === $('auth-modal')) closeModal();
}

// Legacy aliases
function switchTab(tab) { authShowScreen(tab); }
function renderLoginForm() { authShowScreen('login'); }
function renderRegisterForm() { authShowScreen('register'); }
function renderForgotForm() { authShowScreen('forgot'); }
function setAuthLoading() {}

/* =============================================
   Auth — Login
   ============================================= */
async function doLogin() {
  authClearError('login');
  const modal    = $('auth-modal');
  const email    = (modal?.querySelector('#login-email')?.value || '').trim();
  const password = (modal?.querySelector('#login-password')?.value || '');

  if (!email)               return authShowError('login', 'أدخل البريد الإلكتروني');
  if (!email.includes('@')) return authShowError('login', 'البريد الإلكتروني غير صحيح');
  if (!password)            return authShowError('login', 'أدخل كلمة المرور');

  authSetLoading('login-btn', 'جاري الدخول...');
  let data, error;
  try {
    ({ data, error } = await AuthService.loginWithEmail(email, password));
  } catch (err) {
    authSetLoading('login-btn');
    console.error('[doLogin] استثناء غير متوقع (شبكة/CORS غالباً):', err);
    authShowError('login', 'تعذّر الاتصال بالخادم — تأكد من الإنترنت وحاول مرة أخرى');
    return;
  }
  authSetLoading('login-btn');

  if (error) {
    console.error('[doLogin] فشل تسجيل الدخول:', error);
    const msg = error.message || '';
    if (msg.includes('Invalid login') || msg.includes('invalid') || msg.includes('credentials')) {
      authShowError('login', 'البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } else if (msg.includes('Email not confirmed')) {
      authShowError('login', 'البريد الإلكتروني لم يتم تأكيده — تحقق من بريدك');
    } else if (msg.includes('rate limit') || msg.includes('too many')) {
      authShowError('login', 'محاولات كثيرة — انتظر دقيقة ثم حاول مرة أخرى');
    } else if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
      authShowError('login', 'تعذّر الاتصال بالخادم — تأكد من الإنترنت وحاول مرة أخرى');
    } else {
      authShowError('login', msg ? `حدث خطأ: ${msg}` : 'حدث خطأ — حاول مرة أخرى');
    }
    return;
  }
  if (data?.user) {
    try {
      await onSupaLogin(data.user);
    } catch (err) {
      console.error('[doLogin] onSupaLogin رمى خطأ غير متوقع:', err);
    }
  } else {
    console.warn('[doLogin] تسجيل الدخول نجح لكن data.user غير موجود:', data);
    authShowError('login', 'حصل خطأ غير متوقع — حاول تحدّث الصفحة وجرّب تاني');
  }
}

/* =============================================
   Auth — Register
   ============================================= */
async function doRegister() {
  authClearError('register');
  // نقرأ القيم من داخل modal مباشرة لتجنب تعارض الـ IDs مع شاشة الـ onboarding
  const modal    = $('auth-modal');
  const name     = (modal?.querySelector('#reg-name')?.value || '').trim();
  const email    = (modal?.querySelector('#reg-email')?.value || '').trim();
  const password = (modal?.querySelector('#reg-password')?.value || '');

  if (!name)                return authShowError('register', 'أدخل اسمك الكامل');
  if (!email)               return authShowError('register', 'أدخل البريد الإلكتروني');
  if (!email.includes('@')) return authShowError('register', 'البريد الإلكتروني غير صحيح');
  if (password.length < 8)  return authShowError('register', 'كلمة المرور ٨ أحرف على الأقل');

  authSetLoading('register-btn', 'جاري إنشاء الحساب...');
  let data, error;
  try {
    ({ data, error } = await AuthService.registerWithEmail(email, password, name));
  } catch (err) {
    authSetLoading('register-btn');
    console.error('[doRegister] استثناء غير متوقع (شبكة/CORS غالباً):', err);
    authShowError('register', 'تعذّر الاتصال بالخادم — تأكد من الإنترنت وحاول مرة أخرى');
    return;
  }
  authSetLoading('register-btn');

  if (error) {
    // نطبع الخطأ الحقيقي في الـ console دايماً عشان نقدر نشخّص أي حالة مش متوقعة
    console.error('[doRegister] فشل التسجيل:', error);
    const msg = error.message || '';
    if (msg.includes('already registered') || msg.includes('مسجّل بالفعل')) {
      authShowScreen('login');
      authShowError('login', 'هذا البريد الإلكتروني مسجّل بالفعل — ادخل بكلمة مرورك');
      const inp = $('login-email');
      if (inp) inp.value = email;
    } else if (msg.includes('Password') || msg.includes('weak')) {
      authShowError('register', 'كلمة المرور ضعيفة — أضف أرقاماً أو رموزاً');
    } else if (msg.includes('rate limit') || msg.includes('too many') || msg.includes('after')) {
      authShowError('register', 'محاولات كثيرة في وقت قصير — استنى دقيقة وحاول تاني');
    } else if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('network')) {
      authShowError('register', 'تعذّر الاتصال بالخادم — تأكد من الإنترنت وحاول مرة أخرى');
    } else if (msg.includes('invalid') && msg.includes('email')) {
      authShowError('register', 'صيغة البريد الإلكتروني غير مقبولة');
    } else {
      // بنعرض رسالة الخطأ الحقيقية (بالإنجليزي) بدل رسالة عامة، عشان نقدر نعرف السبب الفعلي بسرعة
      authShowError('register', msg ? `حدث خطأ: ${msg}` : 'حدث خطأ — حاول مرة أخرى');
    }
    return;
  }

  if (data?.user) {
    if (data?.session) {
      await onSupaLogin(data.user, name);
    } else {
      // No email verification — log the user in directly as guest session
      releaseAuthRequirement();
      closeModal();
      const user = { id: data.user.id || ('u_' + Date.now()), name, email, onboarded: false, createdAt: new Date().toISOString() };
      _lsSet('noor_user', user);
      STATE.user = user;
      updateNavUser(user);
      if (typeof AnalyticsService !== 'undefined') AnalyticsService.trackSignup();
      toast(`مرحباً ${name}! 🎉 تم إنشاء حسابك بنجاح`);
    }
  }
}

/* =============================================
   Auth — Forgot Password
   ============================================= */
async function doForgot() {
  authClearError('forgot');
  const modal = $('auth-modal');
  const email = (modal?.querySelector('#forgot-email')?.value || '').trim();
  if (!email)               return authShowError('forgot', 'أدخل البريد الإلكتروني');
  if (!email.includes('@')) return authShowError('forgot', 'البريد الإلكتروني غير صحيح');

  authSetLoading('forgot-btn', 'جاري الإرسال...');
  const { error } = await AuthService.sendPasswordReset(email);
  authSetLoading('forgot-btn');

  if (error) { authShowError('forgot', 'حدث خطأ — تأكد من البريد وحاول مرة أخرى'); return; }

  const display = $('forgot-email-display');
  if (display) display.textContent = email;
  authShowScreen('forgot-sent');
}

/* =============================================
   Auth — Reset Password
   ============================================= */
async function doResetPassword() {
  authClearError('reset');
  const modal = $('auth-modal');
  const p1 = (modal?.querySelector('#new-pass')?.value || '');
  const p2 = (modal?.querySelector('#new-pass-confirm')?.value || '');
  if (p1.length < 8) return authShowError('reset', 'كلمة المرور ٨ أحرف على الأقل');
  if (p1 !== p2)     return authShowError('reset', 'كلمتا المرور غير متطابقتين');

  authSetLoading('reset-btn', 'جاري الحفظ...');
  const { error } = await AuthService.updatePassword(p1);
  authSetLoading('reset-btn');

  if (error) { authShowError('reset', 'حدث خطأ — حاول مرة أخرى'); return; }
  closeModal();
  toast('✅ تم تغيير كلمة المرور بنجاح');
}

/* =============================================
   Auth — After Login
   ============================================= */
async function onSupaLogin(supaUser, fallbackName) {
  const name =
    supaUser.user_metadata?.full_name ||
    supaUser.user_metadata?.name      ||
    fallbackName                       ||
    supaUser.email?.split('@')[0]      ||
    'مستخدم';
  const email = supaUser.email || '';
  const user  = { id: supaUser.id, name, email, createdAt: supaUser.created_at };

  // ✅ أهم خطوة: نثبّت حالة الدخول فوراً — حتى لو أي حاجة تانية بعد كده فشلت،
  // المستخدم يبقى Logged-in فعلياً في الواجهة ومايفضلش عالق.
  _lsSet('noor_user', user);
  STATE.user = user;
  releaseAuthRequirement();
  closeModal();
  updateNavUser(user);
  if (typeof AnalyticsService !== 'undefined') AnalyticsService.trackLogin();

  const guestStreak = STATE.streak || parseInt(_lsRaw('noor_streak') || '0');

  try {
    const profile = await ProfileService.loadOrCreate(supaUser, guestStreak);
    if (profile) {
      STATE.points = Math.max(STATE.points, profile.points || 0);
      STATE.streak = Math.max(guestStreak, profile.streak || 0);
      STATE.level  = getLevelFromPoints(STATE.points);
      _savePointsSecure(STATE.points);
      _lsRawSet('noor_streak', STATE.streak);
      _lsRawSet('noor_level', STATE.level);
      STATE.isAdmin = profile.is_admin === true;
      if (typeof _updateAdminNavVisibility === 'function') _updateAdminNavVisibility();
    }
  } catch (err) {
    console.error('[onSupaLogin] فشل تحميل بيانات البروفايل:', err);
  }

  if (typeof PresenceService !== 'undefined') PresenceService.start(supaUser.id);

  updateStreak();

  // ☁️ Cloud Sync — سحب بيانات المستخدم من الـ cloud ودمجها مع الـ local
  try {
    if (window.ProgressSyncService) {
      ProgressSyncService.pullAndApply(supaUser.id, STATE, saveProgress).then(pulled => {
        if (pulled) {
          renderDashboard();
          if (typeof window._renderAllEngagement === 'function') window._renderAllEngagement();
          if (typeof window._renderHomepageIntelligence === 'function') window._renderHomepageIntelligence();
          toast(`مرحباً ${name}! ☁️ تم استعادة تقدمك`);
        } else {
          // أول مرة يدخل — ارفع الـ local data للـ cloud
          ProgressSyncService.pushAll(supaUser.id, STATE);
          toast(`مرحباً ${name}! 🎉`);
        }
      }).catch(err => console.warn('[onSupaLogin] Cloud sync (pull) فشل:', err));
    } else {
      toast(`مرحباً ${name}! 🎉`);
    }
  } catch (err) {
    console.warn('[onSupaLogin] Cloud sync غير متاح:', err);
  }

  // ☁️ مزامنة المسار النشط الجديد + التقدم الإجباري (نظام المسارات الجديد) — صامتة، لا تحجب الواجهة
  try {
    if (window.PathSelector && typeof PathSelector.syncOnLogin === 'function') {
      PathSelector.syncOnLogin().then(active => {
        if (active && window.LockEngine && typeof LockEngine.syncCompletedStepsFromCloud === 'function') {
          LockEngine.syncCompletedStepsFromCloud(active.roadmapSlug);
        }
      }).catch(err => console.warn('[onSupaLogin] PathSelector.syncOnLogin فشل:', err));
    }
  } catch (err) {
    console.warn('[onSupaLogin] PathSelector غير متاح:', err);
  }

  try { renderDashboard(); } catch (err) { console.warn('[onSupaLogin] renderDashboard فشل:', err); }
  try { saveAchievement('badge', 'first_step'); } catch (err) { console.warn('[onSupaLogin] saveAchievement فشل:', err); }

  // 🔔 تحميل الإشعارات الخاصة بالمستخدم
  if (typeof refreshNotifCenter === 'function') refreshNotifCenter();

  // Update community post avatar
  const postAvatar = $('post-avatar');
  if (postAvatar) {
    postAvatar.textContent = (name[0] || 'م').toUpperCase();
    postAvatar.style.background = 'linear-gradient(135deg,var(--p600),var(--t400))';
    postAvatar.style.color = '#fff';
  }

  updateHomeStats();
}

/* =============================================
   Auth State Listener
   ============================================= */
AuthService.onAuthStateChange(async (event, session) => {
  if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user && !STATE.user) {
    closeModal();
    await onSupaLogin(session.user);
  }
  if (event === 'TOKEN_REFRESHED' && session?.user && !STATE.user) {
    await onSupaLogin(session.user);
  }
  if (event === 'SIGNED_OUT') {
    STATE.user = null;
    STATE.isAdmin = false;
    if (typeof _updateAdminNavVisibility === 'function') _updateAdminNavVisibility();
    if (typeof PresenceService !== 'undefined') PresenceService.stop();
    _lsDel('noor_user');
    const area = $('nav-auth-area');
    if (area) area.innerHTML = '<button class="nav-cta" data-action="openModal" data-tab="login">دخول</button>';
    requireAuthModal();
  }
  if (event === 'PASSWORD_RECOVERY') {
    openModal('login');
    authShowScreen('reset');
  }
});

async function doLogout() {
  await AuthService.logout();
  STATE.user = null;
  STATE.isAdmin = false;
  if (typeof _updateAdminNavVisibility === 'function') _updateAdminNavVisibility();
  if (typeof PresenceService !== 'undefined') PresenceService.stop();
  _lsDel('noor_user');
  toast('👋 تم تسجيل خروجك');
  showPage('home');
  requireAuthModal();
}

/* =============================================
   Nav User Display
   ============================================= */
function updateNavUser(user) {
  if (!user?.name) return;
  const area = $('nav-auth-area');
  if (!area) return;
  area.innerHTML = `
    <div class="nav-user" data-action="showPage" data-page="profile" role="button" tabindex="0" aria-label="ملفك الشخصي">
      <div class="nav-avatar" id="nav-avatar" aria-hidden="true">${(user.name[0] || 'م').toUpperCase()}</div>
      <span>${sanitizeHTML(user.name.split(' ')[0])}</span>
    </div>`;
  _loadProfileFields(user);
}

/* =============================================
   Profile
   ============================================= */
function _loadProfileFields(user) {
  // Only set if elements exist (profile page may not be active)
  setValue('pf-name', user.name);
  setValue('pf-email', user.email);
  setValue('pf-age', user.age);
  setValue('pf-bio', user.bio);
  setValue('pf-skills', user.skills);
  setValue('pf-interests', user.interests);
  setValue('pf-profession', user.profession);
  setValue('pf-phone', user.phone);

  _renderAvatar('nav-avatar', user);
  _renderAvatar('profile-avatar-display', user);
  setText('profile-name-display', user.name);
  setText('profile-email-display', user.email || '');
}

// يعرض صورة البروفايل الحقيقية لو موجودة، وإلا أول حرف من الاسم
function _renderAvatar(elId, user) {
  const el = $(elId);
  if (!el) return;
  if (user.avatar_url) {
    el.innerHTML = `<img src="${sanitizeHTML(user.avatar_url)}" alt="${sanitizeHTML(user.name || '')}" referrerpolicy="no-referrer">`;
  } else {
    el.textContent = ((user.name || 'م')[0] || 'م').toUpperCase();
  }
}

function loadProfile(user) {
  _loadProfileFields(user);
}

function saveProfile() {
  const user = STATE.user || _ls('noor_user', {});
  user.name       = ($('pf-name')?.value || '').trim();
  user.email      = ($('pf-email')?.value || '').trim();
  user.age        = $('pf-age')?.value || '';
  user.bio        = ($('pf-bio')?.value || '').trim();
  user.skills     = ($('pf-skills')?.value || '').trim();
  user.interests  = ($('pf-interests')?.value || '').trim();
  user.profession = ($('pf-profession')?.value || '').trim();
  user.phone      = ($('pf-phone')?.value || '').trim();

  _lsSet('noor_user', user);
  STATE.user = user;
  updateNavUser(user);

  if (user.id) {
    ProfileService.update(user.id, {
      username: user.name,
      bio: user.bio,
      skills: user.skills,
      interests: user.interests,
      profession: user.profession,
      phone: user.phone
    });
  }
  toast('✅ تم حفظ ملفك الشخصي!');
}

// رفع صورة بروفايل جديدة
async function uploadProfileAvatar(inputEl) {
  const user = STATE.user || _ls('noor_user', {});
  const file = inputEl?.files?.[0];
  if (!file) return;

  if (!user.id) {
    toast('⚠️ سجّل دخولك الأول عشان ترفع صورة');
    return;
  }
  if (!file.type.startsWith('image/')) {
    toast('⚠️ الملف لازم يكون صورة');
    return;
  }
  if (file.size > 2 * 1024 * 1024) {
    toast('⚠️ الصورة لازم تكون أقل من 2MB');
    return;
  }

  toast('⏳ جاري رفع الصورة...');
  const url = await ProfileService.uploadAvatar(user.id, file);
  inputEl.value = '';

  if (!url) {
    toast('❌ حصل خطأ في رفع الصورة، حاول تاني');
    return;
  }
  user.avatar_url = url;
  _lsSet('noor_user', user);
  STATE.user = user;
  _renderAvatar('nav-avatar', user);
  _renderAvatar('profile-avatar-display', user);
  toast('✅ تم تحديث صورة البروفايل!');
}

