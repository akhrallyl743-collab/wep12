/* ============================================================
   js/roadmap-lock-engine.js
   ------------------------------------------------------------
   محرك القفل الإجباري:
     • يمنع فتح درس قبل إتمام السابق
     • يمنع فتح مرحلة قبل إتمام المرحلة السابقة كلها
     • يشترط مشاهدة 90%+ من أي فيديو قبل تفعيل زر "أنهيت هذا الدرس"
     • يحفظ نسبة مشاهدة الفيديو في Supabase (user_video_progress) + localStorage
     • يُصدّر LockEngine.getStepStatus() / LockEngine.recordVideoProgress() / LockEngine.canComplete()

   يُحمَّل بعد: roadmap-service.js, roadmap-path-selector.js.
   يعمل محلياً (localStorage) ويزامن سحابياً بصمت (fire-and-forget).
   ============================================================ */
(function (global) {
  'use strict';

  var VIDEO_THRESHOLD = 90;        // نسبة المشاهدة المطلوبة %
  var LS_VIDEO_KEY    = 'sl6_video_progress';   // { stepId: percent }
  var LS_DONE_KEY     = 'sl6_completed_steps';  // Set<legacyLessonId> (array in JSON)

  // ── Supabase / Auth helpers ────────────────────────────────────
  function getSupa()   { return (global.supa) ? global.supa : null; }
  function getUserId() {
    try { return (typeof STATE !== 'undefined' && STATE.user && STATE.user.id) ? STATE.user.id : null; }
    catch(e) { return null; }
  }

  // ── localStorage helpers ────────────────────────────────────────
  function _readJSON(key, def) {
    try { return JSON.parse(localStorage.getItem(key) || 'null') || def; }
    catch(e) { return def; }
  }
  function _writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
  }

  // مجموعة الدروس المكتملة (استخدام legacyLessonId كـ key)
  function _getDoneSet()        { return new Set(_readJSON(LS_DONE_KEY, [])); }
  function _saveDoneSet(set)    { _writeJSON(LS_DONE_KEY, Array.from(set)); }

  // نسب مشاهدة الفيديوهات { legacyLessonId: percent }
  function _getVideoProgress()  { return _readJSON(LS_VIDEO_KEY, {}); }
  function _saveVideoProgress(p){ _writeJSON(LS_VIDEO_KEY, p); }

  // ── الدالة الجوهرية: حالة خطوة واحدة ──────────────────────────
  // ترجع: 'completed' | 'available' | 'locked'
  // تعمل محلياً 100% بدون شبكة.
  // الإدخال: roadmap (الشكل الموحد) + stepId (legacy_lesson_id) + trackId
  function getStepStatus(roadmap, legacyLessonId, trackId) {
    if (!roadmap || !roadmap.sections) return 'locked';

    var done = _getDoneSet();

    // هل الخطوة مكتملة أصلاً؟
    if (done.has(legacyLessonId)) return 'completed';

    // ابحث عن الخطوة وقسمها
    var targetStep = null, targetSection = null, stepIdx = -1, sectionIdx = -1;

    for (var si = 0; si < roadmap.sections.length; si++) {
      var sec = roadmap.sections[si];
      for (var sti = 0; sti < sec.steps.length; sti++) {
        var st = sec.steps[sti];
        if (st.legacy_lesson_id === legacyLessonId) {
          targetStep = st; targetSection = sec;
          stepIdx = sti; sectionIdx = si;
          break;
        }
      }
      if (targetStep) break;
    }

    if (!targetStep) return 'locked';

    // أول خطوة في أول مرحلة: متاحة دائماً
    if (sectionIdx === 0 && stepIdx === 0) return 'available';

    // إذا لم تكن الأولى في قسمها: تحقق من الخطوة السابقة في نفس القسم
    if (stepIdx > 0) {
      var prevLegacyId = targetSection.steps[stepIdx - 1].legacy_lesson_id;
      return done.has(prevLegacyId) ? 'available' : 'locked';
    }

    // أول خطوة في قسم غير أول: يجب أن ينتهي القسم السابق كله
    if (stepIdx === 0 && sectionIdx > 0) {
      var prevSection = roadmap.sections[sectionIdx - 1];
      var allDone = prevSection.steps.every(function(st) {
        return done.has(st.legacy_lesson_id);
      });
      return allDone ? 'available' : 'locked';
    }

    return 'locked';
  }

  // ── هل يمكن إنهاء الخطوة؟ (شرط 90% للفيديو) ──────────────────
  function canComplete(step) {
    if (!step) return false;
    // مبدأ القفل: 90% مشاهدة مطلوبة فقط لخطوة "فيديو تعليمي" حقيقية (step_type === 'video')،
    // لا لأي مشروع/مرجع يصادف أن رابطه يوتيوب (انظر توضيح inferResourceKind في roadmap-mapping.js)
    var hasVideo = step.step_type === 'video' && step.resources && step.resources.some(function(r) {
      return r.kind === 'youtube' || r.kind === 'video';
    });
    // لو مفيش فيديو تعليمي في الخطوة: مسموح إنهاؤها مباشرة
    if (!hasVideo) return true;

    // لو فيها فيديو: يجب أن تكون النسبة >= 90%
    var vp = _getVideoProgress();
    var legacyId = step.legacy_lesson_id;
    return (vp[legacyId] || 0) >= VIDEO_THRESHOLD;
  }

  // ── تسجيل تقدم مشاهدة فيديو ────────────────────────────────────
  // يُستدعى من roadmap-ui.js عبر postMessage من iframe أو YouTube IFrame API
  function recordVideoProgress(legacyLessonId, stepId, percent, resourceId) {
    percent = Math.max(0, Math.min(100, Math.round(percent)));

    // localStorage
    var vp = _getVideoProgress();
    var previous = vp[legacyLessonId] || 0; // [إصلاح] نحفظ القيمة القديمة قبل أي تحديث

    if (previous < percent) {
      vp[legacyLessonId] = percent;
      _saveVideoProgress(vp);
    }

    // Supabase fire-and-forget (فقط عند "عبور" عتبة جديدة: 25, 50, 75, 90, 100)
    // [إصلاح] الكود القديم كان يقارن percent بـ vp[legacyLessonId] بعد تحديثها بالفعل
    // إلى percent نفسها، فالشرط كان يتحقق فقط لو percent === m بالضبط (نادر الحدوث
    // عملياً لأن النسبة تُحسب من زمن متغيّر) => تحديث Supabase كان لا يحدث تقريباً أبداً.
    // الإصلاح: المقارنة الصحيحة هي مقابل previous (قبل التحديث).
    var milestones = [25, 50, 75, 90, 100];
    var crossed = milestones.filter(function (m) { return percent >= m && previous < m; });
    if (crossed.length) {
      if (typeof console !== 'undefined') console.log('[SL6_DEBUG] عبور عتبة مشاهدة جديدة لدرس [' + legacyLessonId + ']:', crossed, '— سيتم تحديث Supabase الآن (نسبة=' + percent + '%)');
      _syncVideoProgressToCloud(legacyLessonId, stepId, percent, resourceId);
    }

    // إطلاق حدث للـ UI لتحديث زر "أنهيت هذا الدرس"
    _emit('videoProgress', { legacyLessonId: legacyLessonId, percent: percent, thresholdMet: percent >= VIDEO_THRESHOLD });
  }

  function _syncVideoProgressToCloud(legacyLessonId, stepId, percent, resourceId) {
    var supa = getSupa(), uid = getUserId();
    if (!supa || !uid || !stepId) {
      console.log('[SL6_DEBUG] تخطّي تحديث user_video_progress في Supabase (مستخدم غير مسجّل أو stepId غير متاح) لدرس:', legacyLessonId);
      return;
    }
    supa.from('user_video_progress').upsert({
      user_id: uid,
      step_id: stepId,
      resource_id: resourceId || null,
      watch_percent: percent,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,step_id' }).then(function (res) {
      if (res && res.error) {
        console.warn('[LockEngine] video progress sync failed (silent):', res.error.message);
      } else {
        console.log('[SL6_DEBUG] ✅ تم تحديث user_video_progress في Supabase بنجاح — درس:', legacyLessonId, 'نسبة:', percent + '%');
      }
    }).catch(function (e) {
      console.warn('[LockEngine] video progress sync failed (silent):', e && e.message);
    });
  }

  // ── تسجيل إتمام خطوة ───────────────────────────────────────────
  function markComplete(legacyLessonId, roadmap, trackId) {
    // تحقق نهائي قبل التسجيل
    var status = getStepStatus(roadmap, legacyLessonId, trackId);
    console.log('[SL6_DEBUG] markComplete — حالة الدرس [' + legacyLessonId + '] قبل التحقق:', status);
    if (status === 'locked') {
      console.warn('[LockEngine] محاولة إنهاء خطوة مقفلة:', legacyLessonId);
      return false;
    }

    // ابحث عن الخطوة لفحص شرط الفيديو
    var step = _findStep(roadmap, legacyLessonId);
    if (step && !canComplete(step)) {
      console.log('[SL6_DEBUG] markComplete — رُفض الإكمال: نسبة المشاهدة الحالية =', getVideoPercent(legacyLessonId) + '%', '(المطلوب: ' + VIDEO_THRESHOLD + '%)');
      _emit('videoThresholdNotMet', { legacyLessonId: legacyLessonId, required: VIDEO_THRESHOLD });
      return false;
    }

    // سجّل الإتمام محلياً
    var done = _getDoneSet();
    done.add(legacyLessonId);
    _saveDoneSet(done);
    console.log('[SL6_DEBUG] ✅ تم تسجيل اكتمال الدرس محلياً (localStorage):', legacyLessonId);

    // حدّث "آخر درس" (AppState.currentTrack/currentCourse/currentLesson) — هذا
    // بالضبط ما تفعله platform_completeLesson القديمة في js/platform.js، وهو
    // المصدر الذي تعتمد عليه ميزة "متابعة من حيث توقفت" (بانر الـ Roadmap،
    // وبطاقة Continue Learning في لوحة التحكم، وزر continueLearning). بدون هذا
    // التحديث، إنهاء درس من الواجهة الجديدة (Roadmap UI) لا يُحرّك مؤشر
    // الاستكمال أبداً، فيبقى المستخدم "عالقاً" على نقطة قديمة أو بلا نقطة.
    if (typeof AppState !== 'undefined' && typeof RoadmapMapping !== 'undefined'
        && typeof RoadmapMapping.legacyCourseIdForLesson === 'function') {
      var resolvedCourseId = RoadmapMapping.legacyCourseIdForLesson(trackId, legacyLessonId);
      if (resolvedCourseId) {
        AppState.currentTrack  = trackId;
        AppState.currentCourse = resolvedCourseId;
        AppState.currentLesson = legacyLessonId;
        if (typeof saveProgress === 'function') saveProgress();
        // نفس تحديثات الواجهة التي تُجرى بعد markLessonComplete القديمة في
        // js/platform.js — حتى تتحدث فوراً أي عناصر مرئية أخرى (نقاط، badges)
        if (typeof window !== 'undefined') {
          if (typeof window._renderHomepageIntelligence === 'function') window._renderHomepageIntelligence();
          if (typeof window._renderAllEngagement === 'function') window._renderAllEngagement();
        }
      }
    }

    // إطلاق حدث لتحديث الـ UI
    _emit('stepCompleted', { legacyLessonId: legacyLessonId, roadmap: roadmap });

    // مزامنة سحابية (RoadmapProgressService الموجود مسبقاً)
    if (typeof RoadmapProgressService !== 'undefined') {
      var section = _findSection(roadmap, legacyLessonId);
      RoadmapProgressService.markStepComplete(
        roadmap.slug,
        section ? section.slug : null,
        legacyLessonId
      );
    } else {
      console.warn('[SL6_DEBUG] ⚠️ RoadmapProgressService غير محمّل — لن تتم مزامنة اكتمال الدرس مع Supabase.');
    }

    return true;
  }

  // ── helpers داخلية ─────────────────────────────────────────────
  function _findStep(roadmap, legacyLessonId) {
    for (var si = 0; si < roadmap.sections.length; si++) {
      for (var sti = 0; sti < roadmap.sections[si].steps.length; sti++) {
        if (roadmap.sections[si].steps[sti].legacy_lesson_id === legacyLessonId) {
          return roadmap.sections[si].steps[sti];
        }
      }
    }
    return null;
  }

  function _findSection(roadmap, legacyLessonId) {
    for (var si = 0; si < roadmap.sections.length; si++) {
      var sec = roadmap.sections[si];
      if (sec.steps.some(function(st) { return st.legacy_lesson_id === legacyLessonId; })) {
        return sec;
      }
    }
    return null;
  }

  function _emit(name, detail) {
    try { document.dispatchEvent(new CustomEvent('sl6:lockEngine:' + name, { detail: detail })); }
    catch(e) {}
  }

  // ── نسبة مشاهدة فيديو لدرس معين ─────────────────────────────
  function getVideoPercent(legacyLessonId) {
    return (_getVideoProgress()[legacyLessonId] || 0);
  }

  // ── إحصاء خطوات مكتملة للمسار ────────────────────────────────
  function getCompletedCount(roadmap) {
    var done = _getDoneSet();
    var total = 0, completed = 0;
    (roadmap.sections || []).forEach(function(sec) {
      (sec.steps || []).forEach(function(st) {
        total++;
        if (done.has(st.legacy_lesson_id)) completed++;
      });
    });
    return { total: total, completed: completed, percent: total ? Math.round((completed / total) * 100) : 0 };
  }

  // ── تحميل التقدم السحابي عند تسجيل الدخول ─────────────────────
  function syncCompletedStepsFromCloud(roadmapSlug) {
    var supa = getSupa(), uid = getUserId();
    if (!supa || !uid) return Promise.resolve();

    return Promise.resolve().then(function() {
      return supa.from('user_completed_steps')
        .select('roadmap_steps(legacy_lesson_id), completed_at')
        .eq('user_id', uid)
        .then(function(res) {
          if (res.error || !res.data) return;
          var done = _getDoneSet();
          var changed = false;
          res.data.forEach(function(row) {
            var lid = row.roadmap_steps && row.roadmap_steps.legacy_lesson_id;
            if (lid && !done.has(lid)) { done.add(lid); changed = true; }
          });
          if (changed) _saveDoneSet(done);
        });
    }).catch(function(e) {
      console.warn('[LockEngine] syncFromCloud failed (silent):', e && e.message);
    });
  }

  global.LockEngine = {
    getStepStatus:              getStepStatus,
    canComplete:                canComplete,
    recordVideoProgress:        recordVideoProgress,
    markComplete:               markComplete,
    getVideoPercent:            getVideoPercent,
    getCompletedCount:          getCompletedCount,
    syncCompletedStepsFromCloud: syncCompletedStepsFromCloud,
    VIDEO_THRESHOLD:            VIDEO_THRESHOLD
  };

})(typeof window !== 'undefined' ? window : globalThis);
