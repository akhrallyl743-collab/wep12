/* ============================================================
   js/roadmap-path-selector.js
   ------------------------------------------------------------
   نظام اختيار المسار النشط:
     • مستخدم يختار مسار واحد فقط في كل وقت
     • تغيير المسار يظهر تحذيراً (التقدم القديم لا يُحذف لكن القفل يتوقف)
     • يحفظ المسار النشط في Supabase (user_active_roadmap) + localStorage كـ fallback
     • يُصدّر PathSelector.getActive() / PathSelector.setActive() / PathSelector.isActive()

   يُحمَّل بعد: services.js (window.supa) و core.js (STATE).
   يُستخدم من: platform.js (عند ضغط "ابدأ هذا المسار") و roadmap-ui.js.
   ============================================================ */
(function (global) {
  'use strict';

  var LS_KEY    = 'sl6_active_roadmap';          // localStorage fallback
  var _cache    = null;                           // { roadmapId, roadmapSlug, activatedAt }
  var _pending  = false;

  function getSupa()  { return (global.supa) ? global.supa : null; }
  function getUserId() {
    try { return (typeof STATE !== 'undefined' && STATE.user && STATE.user.id) ? STATE.user.id : null; }
    catch(e) { return null; }
  }

  // ── قراءة من localStorage ──────────────────────────────────────
  function readLocal() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || 'null'); }
    catch(e) { return null; }
  }
  function writeLocal(data) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(data)); }
    catch(e) {}
  }
  function clearLocal() {
    try { localStorage.removeItem(LS_KEY); }
    catch(e) {}
  }

  // ── قراءة من Supabase ──────────────────────────────────────────
  function fetchFromSupabase() {
    var supa = getSupa(), uid = getUserId();
    if (!supa || !uid) return Promise.resolve(null);
    return supa.from('user_active_roadmap')
      .select('roadmap_id, roadmap_slug, activated_at')
      .eq('user_id', uid)
      .single()
      .then(function(res) {
        if (res.error || !res.data) return null;
        return { roadmapId: res.data.roadmap_id, roadmapSlug: res.data.roadmap_slug, activatedAt: res.data.activated_at };
      })
      .catch(function() { return null; });
  }

  // ── حفظ في Supabase ────────────────────────────────────────────
  function saveToSupabase(roadmapId, roadmapSlug) {
    var supa = getSupa(), uid = getUserId();
    if (!supa || !uid) return Promise.resolve(false);
    return supa.from('user_active_roadmap')
      .upsert({ user_id: uid, roadmap_id: roadmapId, roadmap_slug: roadmapSlug }, { onConflict: 'user_id' })
      .then(function(res) { return !res.error; })
      .catch(function(e) {
        console.warn('[PathSelector] Supabase save failed (silent):', e && e.message);
        return false;
      });
  }

  // ── جلب المسار النشط (Supabase → localStorage → null) ─────────
  function getActive() {
    if (_cache) return Promise.resolve(_cache);

    // أولاً: جرّب Supabase
    return fetchFromSupabase().then(function(data) {
      if (data) { _cache = data; writeLocal(data); return data; }
      // ثانياً: localStorage
      var local = readLocal();
      if (local) { _cache = local; return local; }
      return null;
    });
  }

  // ── هل المسار الحالي هو المسار النشط؟ ─────────────────────────
  function isActive(roadmapSlug) {
    if (!roadmapSlug) return Promise.resolve(false);
    return getActive().then(function(active) {
      return !!(active && active.roadmapSlug === roadmapSlug);
    });
  }

  // ── تفعيل مسار جديد ─────────────────────────────────────────────
  // إذا كان هناك مسار آخر نشط → يُظهر تحذير أولاً ثم يُكمل
  function setActive(roadmapId, roadmapSlug) {
    return getActive().then(function(current) {
      if (current && current.roadmapSlug && current.roadmapSlug !== roadmapSlug) {
        // يوجد مسار آخر نشط → أظهر تحذير
        var confirmed = _showChangeWarning(current.roadmapSlug, roadmapSlug);
        if (!confirmed) return false;
      }
      return _doSetActive(roadmapId, roadmapSlug);
    });
  }

  // ── التفعيل الفعلي بدون تحذير (بعد التأكيد) ────────────────────
  function _doSetActive(roadmapId, roadmapSlug) {
    var data = { roadmapId: roadmapId, roadmapSlug: roadmapSlug, activatedAt: new Date().toISOString() };
    _cache = data;
    writeLocal(data);
    // حفظ سحابي fire-and-forget
    saveToSupabase(roadmapId, roadmapSlug);
    // أطلق حدث مخصص لإعلام roadmap-lock-engine.js وغيره
    _emit('pathChanged', { roadmapSlug: roadmapSlug });
    return true;
  }

  // ── تحذير تغيير المسار ──────────────────────────────────────────
  function _showChangeWarning(fromSlug, toSlug) {
    // محاولة استخدام مودال موجود في المشروع أولاً (initConfirmModal)
    // إذا لم يتوفر: fallback لـ window.confirm المباشر
    var msg = [
      '⚠️ تغيير المسار',
      '',
      'أنت حالياً في مسار: ' + fromSlug,
      'ستنتقل إلى مسار: ' + toSlug,
      '',
      'ملاحظة: تقدّمك في المسار الحالي محفوظ ولن يُحذف،',
      'لكن القفل الإجباري سيُطبَّق على المسار الجديد من البداية.',
      '',
      'هل تريد المتابعة؟'
    ].join('\n');

    if (typeof showConfirmDialog === 'function') {
      // showConfirmDialog هو مساعد UI موجود في بعض إصدارات المشروع
      return showConfirmDialog(msg);
    }
    return window.confirm(msg);
  }

  // ── مسح المسار النشط (مثلاً عند تسجيل الخروج) ─────────────────
  function clearActive() {
    _cache = null;
    clearLocal();
    var supa = getSupa(), uid = getUserId();
    if (supa && uid) {
      supa.from('user_active_roadmap').delete().eq('user_id', uid).catch(function() {});
    }
  }

  // ── أحداث مخصصة ────────────────────────────────────────────────
  function _emit(name, detail) {
    try { document.dispatchEvent(new CustomEvent('sl6:pathSelector:' + name, { detail: detail })); }
    catch(e) {}
  }

  // ── مزامنة عند تسجيل الدخول (تُستدعى من auth.js) ──────────────
  function syncOnLogin() {
    _cache = null;
    return fetchFromSupabase().then(function(data) {
      if (data) { _cache = data; writeLocal(data); }
      else {
        // لو مفيش بيانات سحابية خذها من localStorage (مستخدم أنشأ قبل التسجيل)
        var local = readLocal();
        if (local) {
          _cache = local;
          // ارفعها للسحابة
          saveToSupabase(local.roadmapId, local.roadmapSlug);
        }
      }
      return _cache;
    });
  }

  global.PathSelector = {
    getActive:    getActive,
    setActive:    setActive,
    isActive:     isActive,
    clearActive:  clearActive,
    syncOnLogin:  syncOnLogin,
    // للاستخدام المباشر من roadmap-ui.js بدون confirm (بعد تأكيد سابق):
    _forceSetActive: _doSetActive
  };

})(typeof window !== 'undefined' ? window : globalThis);
