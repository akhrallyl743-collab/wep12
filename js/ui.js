'use strict';

/* =============================================
   Theme + Language — initialized from STATE
   ============================================= */
function _applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : '');
  setText('theme-btn', theme === 'dark' ? '☀️' : '🌙');
  const mobBtn = $('theme-btn-mob');
  if (mobBtn) mobBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  STATE.theme = STATE.theme === 'light' ? 'dark' : 'light';
  _applyTheme(STATE.theme);
  _lsRawSet('noor_theme', STATE.theme);
}

function _applyLang(lang) {
  const isEN = lang === 'en';
  document.documentElement.setAttribute('lang', lang);
  document.documentElement.setAttribute('dir', isEN ? 'ltr' : 'rtl');
  document.body.style.direction = isEN ? 'ltr' : 'rtl';
  setText('lang-btn', isEN ? 'AR' : 'EN');
  // Update all translatable elements (only leaf text nodes for safety)
  $$('[data-en]').forEach(el => {
    // skip elements with child elements (handled by their children)
    const hasChildElements = el.children.length > 0;
    if (hasChildElements) return;
    if (!el.dataset.ar) el.dataset.ar = el.textContent.trim();
    el.textContent = isEN ? el.dataset.en : el.dataset.ar;
  });
  // Fix directional arrows when switching language
  $$('.qs-arrow').forEach(el => { el.textContent = isEN ? '→' : '←'; });
  $$('.step-connector').forEach(el => { el.textContent = isEN ? '→' : '←'; });
  // Update HTML lang attribute for proper font rendering
  document.documentElement.lang = lang;
  // Update font family for English
  if (isEN) {
    document.body.style.fontFamily = "'DM Sans', 'Space Grotesk', system-ui, sans-serif";
  } else {
    document.body.style.fontFamily = "'Cairo', system-ui, sans-serif";
  }
  // Re-render dynamic sections that use JS-generated content
  if (typeof renderFAQ === 'function') renderFAQ();
  if (typeof renderHomeChips === 'function') renderHomeChips();
  if (typeof renderLibrary === 'function') renderLibrary();
  if (typeof renderPlan === 'function') renderPlan();
  if (typeof renderDashboard === 'function') renderDashboard();
  if (typeof renderMentors === 'function') renderMentors();
  if (typeof renderPsychology === 'function') renderPsychology();
  // Fire custom event for any other listeners
  document.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
}

function toggleLang() {
  STATE.lang = STATE.lang === 'ar' ? 'en' : 'ar';
  _applyLang(STATE.lang);
  _lsRawSet('noor_lang', STATE.lang);
}

/* =============================================
   Navigation — SINGLE showPage definition
   ============================================= */
const PROTECTED_PAGES = new Set(['dashboard', 'profile', 'community']);

function showPage(pageId) {
  if (PROTECTED_PAGES.has(pageId) && !STATE.user) {
    openModal('login');
    toast('🔒 سجّل دخولك أولاً للوصول لهذه الصفحة');
    return;
  }

  // Hide all pages
  $$('.page').forEach(p => p.classList.remove('active'));

  // Update nav active states
  $$('.nav-link, .bottom-nav-item, .mobile-nav-link').forEach(b => {
    b.classList.toggle('active', b.dataset.page === pageId);
  });

  const target = $('page-' + pageId);
  if (!target) {
    // صفحة غير موجودة — fallback للرئيسية مع رسالة
    console.warn('[ShowPage] Page not found:', pageId);
    const home = $('page-home');
    if (home) home.classList.add('active');
    STATE.currentPage = 'home';
    history.pushState({ page: 'home' }, '', '#home');
    toast('⚠️ الصفحة غير موجودة — تم توجيهك للرئيسية');
    return;
  }
  target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });

  STATE.currentPage = pageId;
  history.pushState({ page: pageId }, '', '#' + pageId);

  // Show footer & back-to-top only on homepage
  document.body.classList.toggle('show-global-footer', pageId === 'home');

  // Close mobile menu
  const mNav = $('mobile-nav');
  const mBtn = $('menu-btn');
  const mOverlay = $('mobile-nav-overlay');
  if (mNav) { mNav.classList.remove('open'); }
  if (mBtn) { mBtn.classList.remove('open'); mBtn.setAttribute('aria-expanded', 'false'); }
  if (mOverlay) { mOverlay.classList.remove('open'); }

  // Trigger reveal re-scan
  document.dispatchEvent(new CustomEvent('pageShown', { detail: pageId }));
  _triggerReveal();

  // Page-specific hooks
  if (pageId === 'community') {
    renderCommunity();
    subscribeToComminity();
  }
  if (pageId === 'dashboard') {
    renderDashboard();
  }
  if (pageId === 'onboarding') {
    // تشغيل onbInit مرة واحدة فقط — منع إعادة التهيئة أثناء تقدم المستخدم بين خطوات الـ wizard
    setTimeout(() => { if (typeof onbInit === 'function') onbInit(); }, 100);
  }
  if (pageId === 'categories') {
    if (typeof renderCategoriesPage === 'function') renderCategoriesPage();
  }
  if (pageId === 'library') {
    if (typeof renderLibrary === 'function') renderLibrary();
  }
}

window.addEventListener('popstate', e => {
  // لا تُعيد تحميل صفحة الـ onboarding عبر popstate إذا كان المستخدم في منتصف الخطوات
  // (الـ wizard يُدير تنقله الداخلي بنفسه بدون history entries)
  if (e.state?.page === 'onboarding' && typeof ONB !== 'undefined' && ONB.current > 0) return;
  if (e.state?.page) showPage(e.state.page);
});

function toggleMobileMenu() {
  const nav = $('mobile-nav');
  const btn = $('menu-btn');
  const overlay = $('mobile-nav-overlay');
  if (!nav || !btn) return;
  const isOpen = nav.classList.contains('open');
  nav.classList.toggle('open', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.setAttribute('aria-expanded', String(!isOpen));
  if (overlay) overlay.classList.toggle('open', !isOpen);
}

/* إغلاق القائمة عند الضغط على الـ overlay */
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('mobile-nav-overlay');
  if (overlay) {
    overlay.addEventListener('click', () => {
      const nav = document.getElementById('mobile-nav');
      const btn = document.getElementById('menu-btn');
      if (nav) nav.classList.remove('open');
      if (btn) { btn.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
      overlay.classList.remove('open');
    });
  }
});

/* =============================================
   ✨ Scroll Reveal
   ============================================= */
function _triggerReveal() {
  setTimeout(() => {
    const revealEls = document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-scale:not(.visible)');
    if (!revealEls.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }, 80);
}

(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if (!revealEls.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
})();

/* =============================================
   Animated Counter
   ============================================= */
function animateCounter(el, from, to, dur = 1200) {
  const start = performance.now();
  const isInt = Number.isInteger(to);
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / dur, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    const value = from + (to - from) * ease;
    el.textContent = isInt ? Math.round(value).toLocaleString('ar') : value.toFixed(1);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

(function initCounterObserver() {
  const counterEls = document.querySelectorAll('.metric-val, .stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const raw = el.textContent.replace(/[^0-9.]/g, '');
      const num = parseFloat(raw);
      if (isNaN(num) || num === 0) return;
      const suffix = el.textContent.replace(/[0-9.,]/g, '').trim();
      animateCounter(el, 0, num, 1400);
      setTimeout(() => {
        if (!el.textContent.includes(suffix) && suffix) {
          el.textContent = el.textContent + suffix;
        }
      }, 1450);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => observer.observe(el));
})();

/* =============================================
   Enhanced Confetti
   ============================================= */
window._uiConfetti = window.launchConfetti = function() {
  const colors = ['#4f35e8','#1fbb85','#e8a81a','#e8502a','#3d8ef5','#fff','#c4b8ff','#a5f3da'];
  const shapes = ['', 'confetti-round'];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    piece.className = 'confetti-piece ' + shape;
    const size = 6 + Math.random() * 8;
    piece.style.cssText = [
      `left:${Math.random() * 100}vw`,
      `top:-24px`,
      `background:${colors[Math.floor(Math.random() * colors.length)]}`,
      `transform:rotate(${Math.random() * 360}deg)`,
      `animation-delay:${Math.random() * 1.4}s`,
      `animation-duration:${2.2 + Math.random() * 1.8}s`,
      `width:${size}px`,
      `height:${size * 1.6}px`,
      `opacity:${0.7 + Math.random() * 0.3}`,
    ].join(';');
    frag.appendChild(piece);
    setTimeout(() => piece.remove(), 5000);
  }
  document.body.appendChild(frag);
};

/* =============================================
   Loading Skeleton
   ============================================= */
window.showSkeletonCards = function(containerId, count = 3) {
  const container = $(containerId);
  if (!container) return;
  container.innerHTML = Array.from({ length: count }, () => `
    <div class="skeleton-card">
      <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px;">
        <div class="skeleton skeleton-avatar"></div>
        <div style="flex:1">
          <div class="skeleton skeleton-text lg"></div>
          <div class="skeleton skeleton-text sm"></div>
        </div>
      </div>
      <div class="skeleton skeleton-text" style="width:100%;height:12px;"></div>
      <div class="skeleton skeleton-text" style="width:85%;height:12px;"></div>
      <div class="skeleton skeleton-badge" style="margin-top:8px;"></div>
    </div>`).join('');
};

/* =============================================
   Scroll Reveal Observer
   ============================================= */
function _initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  function observeAll() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
  }
  observeAll();
  document.addEventListener('pageShown', observeAll);
}

/* =============================================
   Nav Scroll Effect
   ============================================= */
function _initNavScroll() {
  const nav = document.querySelector('nav[role="navigation"]:not(.mobile-nav)');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 10);
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  _initReveal();
  _initNavScroll();
});
if (document.readyState !== 'loading') {
  _initReveal();
  _initNavScroll();
}

// Initial reveal trigger
setTimeout(_triggerReveal, 200);

/* =============================================
   Home FAQ Toggle (homepage accordion)
   ============================================= */
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  // close all
  document.querySelectorAll('#home-faq-list .faq-item').forEach(item => item.classList.remove('open'));
  // open clicked if it was closed
  if (!isOpen) el.classList.add('open');
}
