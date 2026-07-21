/* =============================================
   START LINE — Service Worker v5.0
   الإصلاحات الأساسية عن الإصدار القديم:
   1) كان مسجّل غلط على مسار /sw.js بينما الملف الفعلي
      كان جوه /js/sw.js → التسجيل كان بيفشل (404) بصمت،
      فأي تحديث في الموقع مكنش بيوصل للمستخدم أبداً إلا
      لو مسح الكاش يدوياً. اتحل بنقل الملف لجذر المشروع.
   2) الاستراتيجية القديمة (Stale-While-Revalidate) كانت
      بترجع النسخة القديمة فوراً وتحدّث في الخلفية للزيارة
      الجاية بس → يعني كل تعديل محتاج تحميلتين. دلوقتي
      Network-First لكل صفحات/CSS/JS: لو النت شغال بيجيب
      أحدث نسخة على طول، ولو النت واقع بيرجع آخر نسخة متخزنة.
   3) تغيير اسم الكاش (v5.0) يخلي أي كاش قديم اتشال تلقائياً
      أول ما الـ SW الجديد يشتغل — مفيش داعي لأي حد يمسح
      الكاش بنفسه.
   ============================================= */

const SW_VERSION   = 'v5.1';
const CACHE_STATIC = `startline-static-${SW_VERSION}`;
const CACHE_FONTS  = `startline-fonts-${SW_VERSION}`;
const ACTIVE_CACHES = [CACHE_STATIC, CACHE_FONTS];

// صفحة/أصول احتياطية تتخزن وقت التثبيت عشان توفر شغل أوفلاين أساسي فقط
const OFFLINE_FALLBACK_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo.webp',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_STATIC)
      .then(cache => cache.addAll(OFFLINE_FALLBACK_ASSETS))
      .then(() => self.skipWaiting())
      .catch(err => console.warn('[SW] Install cache failed (non-fatal):', err))
  );
});

// تفعيل — حذف أي كاش قديم من إصدارات سابقة تلقائياً
self.addEventListener('activate', event => {
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

// السماح للصفحة تطلب من الـ SW يتفعّل فوراً (تستخدمها index.html وقت التحديث)
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 1) Supabase / APIs خارجية — Network only، مع رد JSON لو النت واقع
  if (url.hostname.includes('supabase') || url.hostname.includes('anthropic') || url.hostname.includes('jsdelivr')) {
    event.respondWith(
      fetch(request).catch(() => new Response('{"error":"offline"}', {
        headers: { 'Content-Type': 'application/json' }
      }))
    );
    return;
  }

  // 2) خطوط جوجل — Cache-First (نادراً تتغير، تسريع التحميل)
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

  // 3) نفس الأصل (HTML/CSS/JS/صور) — Network-First دايماً يجيب أحدث نسخة،
  //    ولو النت مقطوع بيرجع آخر نسخة متخزنة كـ fallback أوفلاين فقط
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_STATIC).then(cache => cache.put(request, clone));
          }
          return response;
        })
        .catch(() =>
          caches.match(request).then(cached => cached || caches.match('/index.html'))
        )
    );
    return;
  }
});
