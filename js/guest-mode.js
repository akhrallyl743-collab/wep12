'use strict';

/* =============================================
   guest-mode.js — "متابعة كضيف" (Continue as Guest)
   ------------------------------------------------
   يضيف خيار دخول سريع للمشاهدة فقط بدون تسجيل، بدون
   حفظ أي بيانات (لا localStorage ولا سحابة)، وبدون وصول
   للوحة التحكم/البروفايل/المجتمع/الإدارة (تظل هذه الصفحات
   محمية زي ما هي، لأن STATE.user بيفضل فاضي طول ما الزائر
   ضيف). الملف ده بيتحمّل بعد app.bundle.min.js ولا يعدّل
   فيه — بيغلّف (wrap) الدوال العامة الموجودة أصلاً بس.
   ============================================= */

(function () {
  window.__slGuestMode = false;

  /* ---------- منع أي كتابة على localStorage وإحنا في وضع الضيف ----------
     كل كتابة بيانات فعلية في المشروع بتمر بـ localStorage.setItem في
     النهاية (سواء عن طريق _lsSet/_lsRawSet أو مباشرة زي _savePointsSecure
     أو تخزين تقدّم الدروس). عشان نضمن "مفيش تخزين خالص" من غير ما نلمس
     الباندل، بنعمل shadow لدالة setItem على localStorage نفسه بس (مش على
     Storage.prototype عشان مانأثرش على sessionStorage اللي بتستخدمه
     الإحصائيات لتوليد session id). */
  try {
    var _nativeLocalSetItem = window.localStorage.setItem.bind(window.localStorage);
    Object.defineProperty(window.localStorage, 'setItem', {
      value: function (key, value) {
        if (window.__slGuestMode) return; // ضيف: تجاهل أي حفظ
        return _nativeLocalSetItem(key, value);
      },
      writable: true,
      configurable: true
    });
  } catch (e) {
    console.warn('[guest-mode] تعذّر تفعيل حماية التخزين الكاملة في هذا المتصفح — سيُعتمد فقط على منع الوصول لصفحات الحساب.', e);
  }

  function _showGuestOption() {
    var wrap = document.getElementById('auth-guest-wrap');
    if (wrap) wrap.style.display = 'block';
  }
  function _hideGuestOption() {
    var wrap = document.getElementById('auth-guest-wrap');
    if (wrap) wrap.style.display = 'none';
  }

  function continueAsGuest() {
    window.__slGuestMode = true;
    if (typeof releaseAuthRequirement === 'function') releaseAuthRequirement();
    if (typeof closeModal === 'function') closeModal();
    _hideGuestOption();
    if (typeof toast === 'function') {
      toast('👀 وضع الضيف: تصفح سريع بدون حفظ بيانات وبدون لوحة تحكم — سجّل حساب في أي وقت للحفظ', 4800);
    }
  }
  window.continueAsGuest = continueAsGuest;

  function _wireGuestButton() {
    var btn = document.getElementById('auth-guest-btn');
    if (btn && !btn._guestWired) {
      btn._guestWired = true;
      btn.addEventListener('click', continueAsGuest);
    }
  }

  /* ---------- ربط ظهور الزر بنفس لحظة إجبار تسجيل الدخول ---------- */
  function _wrapAuthGate() {
    if (typeof window.requireAuthModal === 'function' && !window.requireAuthModal._guestWrapped) {
      var _origRequire = window.requireAuthModal;
      var wrapped = function () {
        _origRequire.apply(this, arguments);
        _showGuestOption();
      };
      wrapped._guestWrapped = true;
      window.requireAuthModal = wrapped;
    }
    if (typeof window.releaseAuthRequirement === 'function' && !window.releaseAuthRequirement._guestWrapped) {
      var _origRelease = window.releaseAuthRequirement;
      var wrappedRelease = function () {
        _origRelease.apply(this, arguments);
        _hideGuestOption();
      };
      wrappedRelease._guestWrapped = true;
      window.releaseAuthRequirement = wrappedRelease;
    }
  }

  /* ---------- إلغاء وضع الضيف فور نجاح تسجيل دخول/حساب حقيقي ----------
     عشان بياناته تبدأ تتحفظ طبيعي بمجرد ما يبقى مستخدم فعلي. */
  function _wrapRealAuth() {
    if (typeof window.onSupaLogin === 'function' && !window.onSupaLogin._guestWrapped) {
      var _origOnSupaLogin = window.onSupaLogin;
      var wrapped = function () {
        window.__slGuestMode = false;
        return _origOnSupaLogin.apply(this, arguments);
      };
      wrapped._guestWrapped = true;
      window.onSupaLogin = wrapped;
    }
    ['doLogin', 'doRegister'].forEach(function (name) {
      if (typeof window[name] === 'function' && !window[name]._guestWrapped) {
        var _orig = window[name];
        var wrapped = async function () {
          var wasGuest = window.__slGuestMode;
          window.__slGuestMode = false; // اسمح بالحفظ أثناء محاولة الدخول/التسجيل
          var result = await _orig.apply(this, arguments);
          if (wasGuest && typeof STATE !== 'undefined' && !STATE.user) {
            window.__slGuestMode = true; // فشلت المحاولة — ارجعله وضع الضيف المحمي
          }
          return result;
        };
        wrapped._guestWrapped = true;
        window[name] = wrapped;
      }
    });
  }

  function _init() {
    _wireGuestButton();
    _wrapAuthGate();
    _wrapRealAuth();
    // لو الموديل كان اتفتح إجبارياً قبل ما الملف ده يتحمّل، اظهر الزر فوراً
    if (typeof STATE !== 'undefined' && STATE.authRequired && !STATE.user) {
      _showGuestOption();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _init);
  } else {
    _init();
  }
})();
