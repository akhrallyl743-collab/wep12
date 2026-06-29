/* =============================================
   START LINE — Service Worker v4.0
   يدعم: Cache-First للملفات الثابتة
         Network-First لـ Supabase
         Stale-While-Revalidate للـ CSS/JS
         صفحة offline مخصصة
   ============================================= */

const CACHE_NAME = 'startline-v4.0';
const CACHE_STATIC = 'startline-static-v4.0';
const CACHE_FONTS  = 'startline-fonts-v4.0';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/tokens.css',
  '/css/nav.css',
  '/css/components.css',
  '/css/pages.css',
  '/css/platform.css',
  '/css/mobile.css',
  '/css/effects.css',
  '/css/homepage.css',
  '/css/onboarding.css',
  '/css/polish.css',
  '/css/upgrade.css',
  '/css/lightmode.css',
  '/js/services.js',
  '/js/data.js',
  '/js/core.js',
  '/js/ui.js',
  '/js/quiz.js',
  '/js/careers.js',
  '/js/features.js',
  '/js/community.js',
  '/js/auth.js',
  '/js/profile.js',
  '/js/onboarding.js',
  '/js/init.js',
  '/js/events.js',
  '/js/engagement.js',
  '/js/intelligence.js',
  '/js/platform.js',
  '/assets/logo.png',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
];

// تثبيت
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Install cache failed (non-fatal):', err))
  );
});

// تفعيل — حذف كاشات قديمة
self.addEventListener('activate', event => {
  const ACTIVE_CACHES = [CACHE_NAME, CACHE_STATIC, CACHE_FONTS];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => !ACTIVE_CACHES.includes(k))
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — استراتيجية ذكية
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1. Supabase / APIs — Network only, fallback JSON
  if (url.hostname.includes('supabase') || url.hostname.includes('anthropic') || url.hostname.includes('jsdelivr')) {
    event.respondWith(
      fetch(request).catch(() => new Response('{"error":"offline"}', {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  // 2. Google Fonts — Cache-First (نادراً تتغير)
  if (url.hostname.includes('fonts.google') || url.hostname.includes('fonts.gstatic')) {
    event.respondWith(
      caches.open(CACHE_FONTS).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // 3. Static assets — Stale-While-Revalidate
  event.respondWith(
    caches.open(CACHE_STATIC).then(cache =>
      cache.match(request).then(cached => {
        const fetchPromise = fetch(request).then(response => {
          if (response && response.status === 200) {
            cache.put(request, response.clone());
          }
          return response;
        }).catch(() => null);

        // إرجاع الكاش فوراً إذا موجود، وتحديث في الخلفية
        return cached || fetchPromise || cache.match('/index.html');
      })
    )
  );
});
