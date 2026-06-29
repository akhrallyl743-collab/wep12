'use strict';

/* =============================================
   مركز الأحداث — Central Event Delegation
   يستبدل جميع onclick المضمّنة في HTML و JS
   ============================================= */

(function initEventDelegation() {

  /* ── مساعد: تحديد أقرب عنصر بخاصية data-action ── */
  function getActionTarget(e) {
    let el = e.target;
    while (el && el !== document.body) {
      if (el.dataset && el.dataset.action) return el;
      el = el.parentElement;
    }
    return null;
  }

  /* ── خريطة الإجراءات ── */
  const ACTION_MAP = {

    // ── تنقّل ──
    showPage(el) {
      const page = el.dataset.page;
      if (page) showPage(page);
    },

    // ── سمة / لغة ──
    toggleTheme()  { toggleTheme(); },
    toggleLang()   { toggleLang(); },

    // ── قائمة الجوال ──
    toggleMobileMenu() { toggleMobileMenu(); },

    // ── مودال المصادقة ──
    openModal(el)         { openModal(el.dataset.tab); },
    closeModal()          { closeModal(); },
    modalOverlayClick(el, e) {
      if (e.target === el) closeModal();
    },
    authShowScreen(el)    { authShowScreen(el.dataset.screen); },
    togglePass(el)        { togglePass(el.dataset.target, el); },
    doLogin()             { doLogin(); },
    doRegister()          { doRegister(); },
    doForgot()            { doForgot(); },
    doResetPassword()     { doResetPassword(); },

    // ── الأسئلة الشائعة (홈페이지 — static FAQ) ──
    toggleFaq(el) {
      const item = el.closest('.faq-item') || el;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('#home-faq-list .faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    },

    // ── اختبار الشخصية ──
    prevQuestion()  { prevQuestion(); },
    nextQuestion()  { nextQuestion(); },
    restartQuiz()   { initQuiz(); showPage('quiz'); },
    copyResultsCard() { copyResultsCard(); },
    selectOpt(el)   { selectOpt(parseInt(el.dataset.optIndex)); },

    // ── مجتمع ──
    addPost()       { addPost(); },
    addPostTag(el)  { addPostTag(el.dataset.tag); },

    // ── خطة ──
    setPlanTab(el)  { setPlanTab(el.dataset.tab); },
    toggleDay(el)   { toggleDay(el.dataset.dayKey, el); },

    // ── لوحة التحكم ──
    completeChallenge(el) {
      completeChallenge(el.dataset.challengeId, parseInt(el.dataset.challengePts), el);
    },
    updateProgress(el) { updateProgress(el.dataset.track); },

    // ── Career library ──
    showCareer(el)        { showCareer(el.dataset.careerId); },
    showCategoryPage(el)  { if (typeof showCategoryPage === 'function') showCategoryPage(el.dataset.catId); },
    setCat(el)            { setCat(el.dataset.cat); },
    startPath(el)         { startPath(el.dataset.careerId); },

    // ── منصة التعلم: مسارات → كورسات → دروس ──
    showTrack(el)         { if (typeof showTrackView === 'function') showTrackView(el.dataset.trackId); },
    showCourse(el)        { if (typeof showCourseView === 'function') showCourseView(el.dataset.trackId, el.dataset.courseId); },
    openLesson(el)        { if (typeof showLessonView === 'function') showLessonView(el.dataset.trackId, el.dataset.courseId, el.dataset.lessonId); },
    markLessonDone(el)    { if (typeof markLessonComplete === 'function') markLessonComplete(el.dataset.trackId, el.dataset.courseId, el.dataset.lessonId); },
    continueLearning()    { if (typeof continueLastLesson === 'function') continueLastLesson(); },

    // ── علم النفس ──
    showPsych(el)   { showPsych(parseInt(el.dataset.psychIndex)); },
    completePsychChallenge(el) { completePsychChallenge(el); },

    // ── مدربون ──
    requestMentor(el) { requestMentor(parseInt(el.dataset.mentorIndex), el); },
    closeCoachModal() { closeCoachModal(); },
    submitCoachRequest() { submitCoachRequest(); },
    openTrainerModal() { if (typeof openTrainerModal === 'function') openTrainerModal(); },
    closeTrainerModal() { if (typeof closeTrainerModal === 'function') closeTrainerModal(); },
    submitTrainerApplication() { if (typeof submitTrainerApplication === 'function') submitTrainerApplication(); },

    // ── الذكاء الاصطناعي ──
    requestAIAnalysis() { if (typeof requestAIAnalysis === 'function') requestAIAnalysis(); },
    copyAIAnalysis()    { if (typeof copyAIAnalysis === 'function') copyAIAnalysis(); },

    // ── onboarding ──
    onbTogglePassword(el) { onbTogglePassword(el.dataset.target, el); },
    onbSelectInterest(el) { onbSelectInterest(el); },
    onbSelectCareer(el)   { onbSelectCareer(el); },
    onbRegister()         { onbRegister(); },
    onbBack()             { onbBack(); },
    onbNext()             { onbNext(); },

    // ── الملف الشخصي ──
    saveProfile()   { saveProfile(); },
    doLogout()      { doLogout(); },

    // ── ملف FAQ المُنتج ديناميكياً ──
    toggleFAQ(el) {
      const i = parseInt(el.dataset.faqIndex);
      if (!isNaN(i) && typeof toggleFAQ === 'function') toggleFAQ(i);
    },
  };

  /* ── معالج النقر الموحّد ── */
  document.addEventListener('click', function(e) {
    const target = getActionTarget(e);
    if (!target) return;

    const action = target.dataset.action;
    const handler = ACTION_MAP[action];
    if (typeof handler === 'function') {
      e.stopPropagation();
      handler(target, e);
    }
  });

  /* ── دعم لوحة المفاتيح: Enter / Space لعناصر role="button" ── */
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const target = getActionTarget(e);
    if (!target) return;
    const role = target.getAttribute('role');
    if (role === 'button' || role === 'link' || role === 'checkbox') {
      e.preventDefault();
      target.click();
    }
  });

})();
