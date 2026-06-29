/* ============================================================
   js/roadmap-progress-service.js
   ------------------------------------------------------------
   مزامنة "صامتة" (Fire-and-forget) لتقدّم المستخدم إلى الجداول
   الجديدة (user_completed_steps + roadmap_progress) — بدون أي
   تأثير على نظام التقدّم القديم (localStorage + ProgressSyncService)
   اللي يستمر يعمل تماماً كما هو، بدون أي تعديل عليه.

   يعمل فقط لمستخدم مسجّل دخول (نفس شرط ProgressSyncService الحالي:
   STATE.user?.id) — أي فشل (شبكة/RLS/أي شيء) يُسجَّل بـ console.warn
   فقط ولا يُرمى (throw) أبداً، فلا يقدر يكسر أي تجربة مستخدم.
   ============================================================ */
(function (global) {
  'use strict';

  function getUserId() {
    // STATE مُعرّفة بـ const في core.js — لا تظهر كـ window.STATE (سلوك JS طبيعي لـ
    // top-level const/let)، لكنها متاحة كمتغيّر مشترك بين كل <script> في الصفحة.
    // نفس نمط القراءة المستخدم في js/auth.js (STATE.user) بدون أي بادئة window/global.
    try { return (typeof STATE !== 'undefined' && STATE.user && STATE.user.id) || null; }
    catch (e) { return null; }
  }

  function getSupa() {
    return (typeof window !== 'undefined' && window.supa) ? window.supa : null;
  }

  function findStep(roadmap, sectionSlug, legacyLessonId) {
    if (!roadmap || !roadmap.sections) return null;
    for (var i = 0; i < roadmap.sections.length; i++) {
      var sec = roadmap.sections[i];
      if (sectionSlug && sec.slug !== sectionSlug) continue;
      for (var j = 0; j < sec.steps.length; j++) {
        if (sec.steps[j].legacy_lesson_id === legacyLessonId) return { section: sec, step: sec.steps[j] };
      }
    }
    return null;
  }

  function isRealUuid(id) {
    return typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id);
  }

  function countTotalSteps(roadmap) {
    return roadmap.sections.reduce(function (s, sec) { return s + sec.steps.length; }, 0);
  }

  /**
   * يُسجَّل اكتمال خطوة في الجداول الجديدة. لا يُرجع شيء مهم للمتصل —
   * يُستخدم كـ "fire and forget": RoadmapProgressService.markStepComplete(...)
   * بدون await وبدون .then/.catch من جهة المتصل (الدالة نفسها تتولى الأخطاء).
   */
  function markStepComplete(roadmapSlug, sectionSlug, legacyLessonId) {
    var userId = getUserId();
    var supa = getSupa();
    if (!userId || !supa) return Promise.resolve(false); // مستخدم غير مسجّل أو Supabase غير جاهز — تجاهل بهدوء

    if (typeof RoadmapService === 'undefined') return Promise.resolve(false);

    return RoadmapService.getRoadmap(roadmapSlug)
      .then(function (roadmap) {
        if (!roadmap || roadmap.source !== 'supabase') {
          // البيانات جاية من Fallback (لا UUIDs حقيقية) — مفيش جداول نقدر نكتب فيها بأمان
          console.log('[SL6_DEBUG][Supabase] تخطّي تحديث قاعدة البيانات — المسار يعمل من بيانات fallback (لا UUIDs حقيقية):', roadmapSlug);
          return false;
        }
        var found = findStep(roadmap, sectionSlug, legacyLessonId);
        if (!found || !isRealUuid(found.step.id) || !isRealUuid(roadmap.id)) {
          console.log('[SL6_DEBUG][Supabase] تخطّي تحديث قاعدة البيانات — لم يتم العثور على step_id/roadmap_id حقيقي لدرس:', legacyLessonId);
          return false;
        }

        var stepId = found.step.id;
        var roadmapId = roadmap.id;
        console.log('[SL6_DEBUG][Supabase] بدء تحديث user_completed_steps لدرس [' + legacyLessonId + '] step_id=' + stepId);

        return supa.from('user_completed_steps')
          .upsert({ user_id: userId, step_id: stepId, roadmap_id: roadmapId }, { onConflict: 'user_id,step_id' })
          .then(function (res) {
            if (res.error) throw res.error;
            console.log('[SL6_DEBUG][Supabase] ✅ تم تحديث user_completed_steps بنجاح لدرس:', legacyLessonId);
            return supa.from('user_completed_steps').select('step_id', { count: 'exact', head: true })
              .eq('user_id', userId).eq('roadmap_id', roadmapId);
          })
          .then(function (countRes) {
            var total = countTotalSteps(roadmap);
            var done = (countRes && typeof countRes.count === 'number') ? countRes.count : null;
            var percent = (done !== null && total > 0) ? Math.round((done / total) * 100) : null;

            var progressRow = {
              user_id: userId, roadmap_id: roadmapId,
              last_visited_step_id: stepId, last_activity_at: new Date().toISOString()
            };
            if (percent !== null) progressRow.percent_complete = percent;
            if (percent === 100) progressRow.completed_at = new Date().toISOString();

            console.log('[SL6_DEBUG][Supabase] بدء تحديث roadmap_progress — تقدّم المسار:', percent, '% (' + done + '/' + total + ')');
            return supa.from('roadmap_progress').upsert(progressRow, { onConflict: 'user_id,roadmap_id' });
          })
          .then(function (res) {
            if (res && res.error) throw res.error;
            console.log('[SL6_DEBUG][Supabase] ✅ تم تحديث roadmap_progress بنجاح للمسار:', roadmapSlug);
            return true;
          });
      })
      .catch(function (err) {
        console.warn('[RoadmapProgressService] silent failure (لا يؤثر على التطبيق):', err && err.message);
        return false;
      });
  }

  /** قراءة أفضل-محاولة لتقدّم المستخدم السحابي لمسار معيّن (اختياري — للاستخدام المستقبلي بالواجهة) */
  function getCloudProgress(roadmapSlug) {
    var userId = getUserId();
    var supa = getSupa();
    if (!userId || !supa || typeof RoadmapService === 'undefined') return Promise.resolve(null);

    return RoadmapService.getRoadmap(roadmapSlug).then(function (roadmap) {
      if (!roadmap || !isRealUuid(roadmap.id)) return null;
      return supa.from('roadmap_progress').select('*').eq('user_id', userId).eq('roadmap_id', roadmap.id).single()
        .then(function (res) { return (res && !res.error) ? res.data : null; })
        .catch(function () { return null; });
    }).catch(function () { return null; });
  }

  global.RoadmapProgressService = {
    markStepComplete: markStepComplete,
    getCloudProgress: getCloudProgress
  };
})(typeof window !== 'undefined' ? window : globalThis);
