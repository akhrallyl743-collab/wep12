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
    toggleMobileShortcuts() { if (typeof toggleMobileShortcuts === 'function') toggleMobileShortcuts(); },

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
    submitQuizClarify() { if (typeof submitQuizClarify === 'function') submitQuizClarify(); },

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

    // ── لوحة تحكم الأدمن ──
    setAdminTab(el) { if (typeof setAdminTab === 'function') setAdminTab(el.dataset.adminTab); },
    refreshAdminTrainers()  { if (typeof refreshAdminTrainers === 'function') refreshAdminTrainers(); },
    refreshAdminUsers()     { if (typeof refreshAdminUsers === 'function') refreshAdminUsers(); },
    refreshAdminCommunity() { if (typeof refreshAdminCommunity === 'function') refreshAdminCommunity(); },
    adminToggleTrainerActive(el) {
      if (typeof adminToggleTrainerActive === 'function') adminToggleTrainerActive(el.dataset.id, el.dataset.value === 'true');
    },
    adminToggleTrainerBlocked(el) {
      if (typeof adminToggleTrainerBlocked === 'function') adminToggleTrainerBlocked(el.dataset.id, el.dataset.value === 'true');
    },
    adminDeleteTrainer(el) { if (typeof adminDeleteTrainer === 'function') adminDeleteTrainer(el.dataset.id); },
    adminAdjustPoints(el)  { if (typeof adminAdjustPoints === 'function') adminAdjustPoints(el.dataset.id, parseInt(el.dataset.delta, 10)); },
    adminDeletePost(el)    { if (typeof adminDeletePost === 'function') adminDeletePost(el.dataset.id); },

    // ── مراجعة طلبات المدربين ──
    adminSetTrainerFilter(el) { if (typeof adminSetTrainerFilter === 'function') adminSetTrainerFilter(el.dataset.value); },
    adminSetTrainerStatus(el) { if (typeof adminSetTrainerStatus === 'function') adminSetTrainerStatus(el.dataset.id, el.dataset.value); },
    adminGoToAdminsTab()      { if (typeof adminGoToAdminsTab === 'function') adminGoToAdminsTab(); },
    adminQuickNotifyUser(el)  { if (typeof adminQuickNotifyUser === 'function') adminQuickNotifyUser(el.dataset.id, el.dataset.name); },

    // ── إدارة المسارات التعليمية ──
    refreshAdminRoadmaps()  { if (typeof refreshAdminRoadmaps === 'function') refreshAdminRoadmaps(); },
    adminNewRoadmap()       { if (typeof adminNewRoadmap === 'function') adminNewRoadmap(); },
    adminEditRoadmap(el)    { if (typeof adminEditRoadmap === 'function') adminEditRoadmap(el.dataset.id); },
    adminBackToRoadmapList(){ if (typeof adminBackToRoadmapList === 'function') adminBackToRoadmapList(); },
    adminDeleteRoadmap(el)  { if (typeof adminDeleteRoadmap === 'function') adminDeleteRoadmap(el.dataset.id); },
    adminSaveRoadmapMeta(el){ if (typeof adminSaveRoadmapMeta === 'function') adminSaveRoadmapMeta(el.dataset.id); },
    adminAddSection(el)     { if (typeof adminAddSection === 'function') adminAddSection(el.dataset.roadmapId); },
    adminSaveSection(el)    { if (typeof adminSaveSection === 'function') adminSaveSection(el.dataset.id); },
    adminDeleteSection(el)  { if (typeof adminDeleteSection === 'function') adminDeleteSection(el.dataset.id); },
    adminAddStep(el)        { if (typeof adminAddStep === 'function') adminAddStep(el.dataset.sectionId); },
    adminSaveStep(el)       { if (typeof adminSaveStep === 'function') adminSaveStep(el.dataset.id); },
    adminDeleteStep(el)     { if (typeof adminDeleteStep === 'function') adminDeleteStep(el.dataset.id); },
    adminAddResource(el)    { if (typeof adminAddResource === 'function') adminAddResource(el.dataset.stepId); },
    adminSaveResource(el)   { if (typeof adminSaveResource === 'function') adminSaveResource(el.dataset.id); },
    adminDeleteResource(el) { if (typeof adminDeleteResource === 'function') adminDeleteResource(el.dataset.id); },

    // ── إدارة أسئلة الاختبار ──
    refreshAdminQuizzes()     { if (typeof refreshAdminQuizzes === 'function') refreshAdminQuizzes(); },
    adminAddQuizQuestion()    { if (typeof adminAddQuizQuestion === 'function') adminAddQuizQuestion(); },
    adminSaveQuizQuestion(el) { if (typeof adminSaveQuizQuestion === 'function') adminSaveQuizQuestion(el.dataset.id); },
    adminDeleteQuizQuestion(el) { if (typeof adminDeleteQuizQuestion === 'function') adminDeleteQuizQuestion(el.dataset.id); },

    // ── إدارة الشهادات ──
    refreshAdminCertificates() { if (typeof refreshAdminCertificates === 'function') refreshAdminCertificates(); },
    adminSearchCertUser()      { if (typeof adminSearchCertUser === 'function') adminSearchCertUser(); },
    adminIssueCertificate()    { if (typeof adminIssueCertificate === 'function') adminIssueCertificate(); },
    adminToggleCertRevoked(el) { if (typeof adminToggleCertRevoked === 'function') adminToggleCertRevoked(el.dataset.id, el.dataset.value === 'true'); },
    adminDeleteCertificate(el) { if (typeof adminDeleteCertificate === 'function') adminDeleteCertificate(el.dataset.id); },

    // ── إدارة الإشعارات ──
    refreshAdminNotifications() { if (typeof refreshAdminNotifications === 'function') refreshAdminNotifications(); },
    adminSendNotification()     { if (typeof adminSendNotification === 'function') adminSendNotification(); },
    adminDeleteNotification(el) { if (typeof adminDeleteNotification === 'function') adminDeleteNotification(el.dataset.id); },

    // ── إدارة صلاحيات المشرفين ──
    adminSearchForPromotion() { if (typeof adminSearchForPromotion === 'function') adminSearchForPromotion(); },
    adminPromoteFound()       { if (typeof adminPromoteFound === 'function') adminPromoteFound(); },
    adminDemoteUser(el)       { if (typeof adminDemoteUser === 'function') adminDemoteUser(el.dataset.id, el.dataset.name); },

    // ── مركز الإشعارات (للمستخدم العادي) ──
    toggleNotifCenter()  { if (typeof toggleNotifCenter === 'function') toggleNotifCenter(); },
    markAllNotifsRead()  { if (typeof markAllNotifsRead === 'function') markAllNotifsRead(); },

    // ── المجتمع: صور/فيديو + تعليقات ──
    triggerMediaPicker() { if (typeof triggerMediaPicker === 'function') triggerMediaPicker(); },
    _likePostBtn(el)     { if (typeof _likePostBtn === 'function') _likePostBtn(el); },
    deletePost(el)       { if (typeof deletePost === 'function') deletePost(el.dataset.id); },
    toggleComments(el)   { if (typeof toggleComments === 'function') toggleComments(el); },
    submitComment(el)    { if (typeof submitComment === 'function') submitComment(el); },
    deleteComment(el)    { if (typeof deleteComment === 'function') deleteComment(el); },
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
