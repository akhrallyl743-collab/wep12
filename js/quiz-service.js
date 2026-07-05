/* ============================================================
   js/quiz-service.js
   ------------------------------------------------------------
   يجلب أسئلة اختبار الشخصية من Supabase (جدول quiz_questions) مع
   Fallback تلقائي وصامت لمصفوفة QUIZ_QUESTIONS الثابتة في js/data.js
   عند أي فشل (نفس نمط js/roadmap-service.js تماماً).
   ============================================================ */
(function (global) {
  'use strict';

  var FETCH_TIMEOUT_MS = 3000;
  var _cache = null;

  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () { reject(new Error('quiz-service: timeout after ' + ms + 'ms')); }, ms);
      promise.then(
        function (v) { clearTimeout(timer); resolve(v); },
        function (e) { clearTimeout(timer); reject(e); }
      );
    });
  }

  function getSupa() {
    return (typeof window !== 'undefined' && window.supa) ? window.supa : null;
  }

  function fetchFromSupabase() {
    return Promise.resolve().then(function () {
      var supa = getSupa();
      if (!supa) throw new Error('quiz-service: supabase client not ready');
      return supa.from('quiz_questions').select('*').eq('is_published', true).order('order_index');
    }).then(function (res) {
      if (res.error) throw res.error;
      if (!res.data || !res.data.length) throw new Error('quiz-service: no questions found');
      return res.data.map(function (row) {
        return { cat: row.category || '', q: row.question, opts: row.options || [], weights: row.weights || [] };
      });
    });
  }

  /** يرجع مصفوفة الأسئلة بنفس شكل QUIZ_QUESTIONS دائماً (Supabase أو fallback). */
  function getQuestions() {
    if (_cache) return Promise.resolve(_cache);
    return withTimeout(fetchFromSupabase(), FETCH_TIMEOUT_MS)
      .catch(function (err) {
        console.warn('[QuizService] Supabase fetch failed, falling back to local data:', err && err.message);
        return (typeof QUIZ_QUESTIONS !== 'undefined') ? QUIZ_QUESTIONS : [];
      })
      .then(function (list) { _cache = list; return list; });
  }

  function clearCache() { _cache = null; }

  global.QuizService = { getQuestions: getQuestions, clearCache: clearCache };
})(typeof window !== 'undefined' ? window : globalThis);
