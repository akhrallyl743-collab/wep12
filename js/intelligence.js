'use strict';

/* ================================================================
   intelligence.js  —  ADAPTIVE INTELLIGENCE LAYER  [v1]
   Builds ONLY on existing STATE + _ls / _lsSet / _lsRaw helpers.
   No new state systems. All data lives in STATE + localStorage.

   TASK 1 — Smart Recommendation Engine   → getRecommendedTracks()
   TASK 2 — Adaptive Next Action          → (upgrades getNextAction)
   TASK 3 — Learning Path Engine          → getLearningPath()
   TASK 4 — Retention Triggers            → initRetentionTriggers()
   TASK 5 — Behavioral Signals            → STATE.learning.analytics
   TASK 6 — Motivation Layer              → milestones + XP hooks
   ================================================================ */

/* ────────────────────────────────────────────────────────────────
   TASK 5 — BEHAVIORAL SIGNALS
   Piggybacked onto STATE as STATE.learning.analytics
   Persisted in localStorage key 'noor_intel_signals'
   ──────────────────────────────────────────────────────────────── */

const _SIGNALS_KEY  = 'noor_intel_signals';
const _STAGNATION_THRESHOLD_DAYS = 3;   // days without lesson completion
const _STUCK_THRESHOLD_LESSONS = 2;     // same lesson attempted N times

/* Bootstrap STATE.learning — a lightweight namespace bolted onto STATE */
(function bootstrapLearningNS() {
  if (!STATE.learning) {
    STATE.learning = {
      analytics: _ls(_SIGNALS_KEY, {
        totalLessons:       0,
        sessionsCount:      0,
        lastSessionDate:    null,
        lastCompletionDate: null,
        preferredTracks:    {},   // { trackId: completionCount }
        preferredCategories:{},   // { cat: score }
        lessonAttempts:     {},   // { lessonId: count }  — detect "stuck"
        dailyMinutes:       {},   // { 'YYYY-MM-DD': minutes }
        milestonesSeen:     [],   // keys already shown
      }),
    };
  }
})();

/* Persist signals — called after every mutation */
function _saveSignals() {
  try { _lsSet(_SIGNALS_KEY, STATE.learning.analytics); } catch {}
}

/* Record a new session (called on page load) */
function recordSession() {
  const sig  = STATE.learning.analytics;
  const today = new Date().toDateString();
  if (sig.lastSessionDate !== today) {
    sig.sessionsCount = (sig.sessionsCount || 0) + 1;
    sig.lastSessionDate = today;
    _saveSignals();
  }
}

/* Record a lesson completion — called by the patched markLessonComplete */
function recordLessonCompletion(trackId, courseId, lessonId) {
  const sig = STATE.learning.analytics;
  sig.totalLessons = (sig.totalLessons || 0) + 1;
  sig.lastCompletionDate = new Date().toISOString();

  /* preferred tracks — weight by completions */
  sig.preferredTracks[trackId] = (sig.preferredTracks[trackId] || 0) + 1;

  /* preferred categories */
  const career = (typeof CAREERS_DATA !== 'undefined')
    ? CAREERS_DATA.find(c => c.tracks?.some(t => t.id === trackId))
    : null;
  if (career?.cat) {
    sig.preferredCategories[career.cat] = (sig.preferredCategories[career.cat] || 0) + 1;
  }

  /* clear attempt counter for this lesson — it's now done */
  if (sig.lessonAttempts[lessonId]) delete sig.lessonAttempts[lessonId];

  _saveSignals();

  /* TASK 6 — milestone checks after every lesson */
  _checkMilestones(sig.totalLessons);
}

/* Record a lesson VIEW (not completion) — detect "stuck" pattern */
function recordLessonView(lessonId) {
  const sig = STATE.learning.analytics;
  sig.lessonAttempts[lessonId] = (sig.lessonAttempts[lessonId] || 0) + 1;
  _saveSignals();
}

/* ────────────────────────────────────────────────────────────────
   TASK 1 — SMART RECOMMENDATION ENGINE
   Upgraded getRecommendedTracks() replaces the basic one in core.js
   Logic:
     1. Quiz traits primary signal (topTracks ordering)
     2. Filter out fully-completed tracks
     3. Filter out tracks with no lessons array (disabled)
     4. Boost tracks in same category as preferred tracks
     5. Difficulty progression — prefer beginner if no progress yet
     6. Return top 3 with enriched metadata
   ──────────────────────────────────────────────────────────────── */
function getRecommendedTracks() {
  if (typeof getAllTracks !== 'function' || typeof CAREERS_DATA === 'undefined') return [];

  const allTracks = getAllTracks().filter(t => t.courses?.length > 0);
  const sig       = STATE.learning.analytics;

  /* tracks the user already finished — exclude */
  const completedTrackIds = new Set(
    allTracks
      .filter(t => (typeof platform_getTrackProgress === 'function') && platform_getTrackProgress(t.id) === 100)
      .map(t => t.id)
  );

  /* tracks the user started — deprioritise (they can continue from NAE) */
  const startedTrackIds = new Set(
    allTracks
      .filter(t => {
        const p = (typeof platform_getTrackProgress === 'function') ? platform_getTrackProgress(t.id) : 0;
        return p > 0 && p < 100;
      })
      .map(t => t.id)
  );

  /* user's total lessons — gate difficulty */
  const totalDone = (typeof platform_totalDone === 'function') ? platform_totalDone() : 0;
  const preferBeginner = totalDone < 5;

  /* preferred categories from behavior */
  const topPrefCat = Object.entries(sig.preferredCategories || {})
    .sort((a, b) => b[1] - a[1])
    .map(([cat]) => cat)
    .slice(0, 2);

  /* build quiz-ordered ID list */
  const quizOrderedIds = STATE.quizTraits?.topTracks || [];

  /* score each track */
  const scored = allTracks
    .filter(t => !completedTrackIds.has(t.id))
    .map(t => {
      let score = 0;

      /* 1. Quiz trait position — primary signal (decayed by rank) */
      const quizRank = quizOrderedIds.indexOf(t.id);
      if (quizRank !== -1) score += Math.max(0, 80 - quizRank * 8);

      /* 2. Career match % from CAREERS_DATA */
      const career = CAREERS_DATA.find(c => c.tracks?.some(tr => tr.id === t.id));
      if (career) score += (career.match || 0) * 0.4;

      /* 3. Preferred category boost */
      if (career && topPrefCat.includes(career.cat)) score += 25;

      /* 4. Difficulty progression */
      const difficulty = career?.difficulty || '';
      if (preferBeginner && difficulty === 'سهل') score += 20;
      if (!preferBeginner && difficulty === 'متوسط') score += 10;
      if (difficulty === 'صعب' && totalDone < 10) score -= 15;

      /* 5. Preferred tracks (same career as completed lessons) */
      const prefTrackScore = sig.preferredTracks[t.id] || 0;
      score += prefTrackScore * 5;

      /* 6. Slight penalty for already-started (shown in NAE already) */
      if (startedTrackIds.has(t.id)) score -= 10;

      return { track: t, career, score };
    })
    .filter(x => x.score > 0 || quizOrderedIds.includes(x.track.id))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return scored.map(x => ({
    ...x.track,
    _matchScore: Math.round(Math.min(x.score, 100)),
    _career:     x.career,
    _reasonLabel: _buildReasonLabel(x.track, x.career, topPrefCat, startedTrackIds),
  }));
}

function _buildReasonLabel(track, career, topPrefCats, startedIds) {
  if (startedIds.has(track.id)) return 'واصل من حيث توقفت';
  if (career && topPrefCats.includes(career.cat)) return `يناسب اهتمامك بـ ${career.cat}`;
  if (STATE.quizTraits?.topTracks?.includes(career?.id)) return 'مناسب لشخصيتك';
  return 'مسار موصى به';
}

/* ────────────────────────────────────────────────────────────────
   TASK 2 — ADAPTIVE NEXT ACTION (upgrades engagement.js version)
   Detects: stagnation, stuck, needs-easier-path
   ──────────────────────────────────────────────────────────────── */

function _detectStagnation() {
  const sig = STATE.learning.analytics;
  if (!sig.lastCompletionDate) return false;
  const daysSince = (Date.now() - new Date(sig.lastCompletionDate).getTime()) / 86_400_000;
  return daysSince >= _STAGNATION_THRESHOLD_DAYS;
}

function _detectStuck() {
  const tId = STATE.currentTrack;
  const lId = STATE.currentLesson;
  if (!lId) return false;
  const attempts = STATE.learning.analytics.lessonAttempts[lId] || 0;
  return attempts >= _STUCK_THRESHOLD_LESSONS;
}

function _findEasierTrack() {
  const allTracks = (typeof getAllTracks === 'function') ? getAllTracks() : [];
  /* get current difficulty rank */
  const curCareer = STATE.currentTrack
    ? CAREERS_DATA?.find(c => c.tracks?.some(t => t.id === STATE.currentTrack))
    : null;
  const curDiff = curCareer?.difficulty || 'متوسط';
  const diffRank = { 'سهل': 0, 'متوسط': 1, 'صعب': 2 };
  const targetRank = Math.max(0, (diffRank[curDiff] || 1) - 1);
  const targetDiff = Object.keys(diffRank)[targetRank];

  const candidates = allTracks.filter(t => {
    const c = CAREERS_DATA?.find(ca => ca.tracks?.some(tr => tr.id === t.id));
    return c?.difficulty === targetDiff
      && (typeof platform_getTrackProgress === 'function' ? platform_getTrackProgress(t.id) < 100 : true)
      && t.id !== STATE.currentTrack;
  });
  if (!candidates.length) return null;
  /* pick highest quiz match */
  const quiz = STATE.quizTraits?.topTracks || [];
  candidates.sort((a, b) => quiz.indexOf(a.id) - quiz.indexOf(b.id));
  return candidates[0] || null;
}

/* Upgraded getNextAction — exported as window.getNextAction */
function getNextActionSmart() {
  const tId = STATE.currentTrack;
  const cId = STATE.currentCourse;
  const lId = STATE.currentLesson;

  const isStuck     = _detectStuck();
  const isStagnant  = _detectStagnation();

  /* ── STUCK: same lesson viewed 2+ times → suggest easier track ── */
  if (isStuck && tId) {
    const easier = _findEasierTrack();
    if (easier) {
      const firstCourse = easier.courses?.[0];
      const firstLesson = firstCourse?.lessons?.[0];
      return {
        type:       'stuck',
        icon:       easier.icon,
        label:      '💡 جرّب مساراً أسهل',
        title:      easier.title,
        meta:       `هذا المسار أبسط — ابنِ ثقتك أولاً`,
        pct:        0,
        color:      easier.color,
        action:     firstLesson ? 'openLesson' : 'showTrack',
        actionData: firstLesson
          ? { trackId: easier.id, courseId: firstCourse.id, lessonId: firstLesson.id }
          : { trackId: easier.id },
        cta:        '← جرّب هذا المسار',
        badge:      '🆘 بديل أسهل',
      };
    }
  }

  /* ── STAGNANT: didn't complete a lesson in N days ── */
  if (isStagnant && STATE.hasProgress) {
    const sig  = STATE.learning.analytics;
    const daysSince = Math.round(
      (Date.now() - new Date(sig.lastCompletionDate || Date.now()).getTime()) / 86_400_000
    );
    /* Fall through to normal action but with urgency badge */
    const base = _baseNextAction();
    if (base) {
      base.badge = `⏰ ${daysSince} يوم بدون تعلم`;
      base.label = 'ارجع — كمّل!';
      base.urgency = true;
      return base;
    }
  }

  /* ── NORMAL flow ── */
  return _baseNextAction();
}

function _baseNextAction() {
  const tId = STATE.currentTrack;
  const cId = STATE.currentCourse;
  const lId = STATE.currentLesson;

  if (tId && cId && lId && STATE.hasProgress) {
    const track  = (typeof getTrackById  === 'function') ? getTrackById(tId)  : null;
    const course = (typeof getCourseById === 'function') ? getCourseById(tId, cId) : null;
    const lesson = course?.lessons?.find(l => l.id === lId);
    if (track && course && lesson) {
      const pct  = (typeof platform_getTrackProgress  === 'function') ? platform_getTrackProgress(tId) : 0;
      const done = (typeof platform_totalDone === 'function') ? platform_totalDone() : 0;
      return {
        type: 'continue', icon: track.icon,
        label: 'واصل من حيث توقفت', title: lesson.title,
        meta: `${track.title} · ${course.title}`,
        pct, done, color: track.color,
        action: 'continueLearning', actionData: {},
        cta: '▶ استمر الآن',
      };
    }
  }

  if (STATE.hasProgress && typeof getAllTracks === 'function') {
    for (const track of getAllTracks()) {
      const pct = (typeof platform_getTrackProgress === 'function') ? platform_getTrackProgress(track.id) : 0;
      if (pct > 0 && pct < 100) {
        for (const course of track.courses) {
          const arr = STATE.progress?.[track.id]?.[course.id] || [];
          const nextLesson = course.lessons.find(l => !arr.includes(l.id));
          if (nextLesson) {
            return {
              type: 'next-lesson', icon: track.icon,
              label: 'الخطوة القادمة', title: nextLesson.title,
              meta: `${track.title} · ${course.title}`,
              pct, color: track.color, action: 'openLesson',
              actionData: { trackId: track.id, courseId: course.id, lessonId: nextLesson.id },
              cta: '▶ ابدأ الدرس',
            };
          }
        }
      }
    }
  }

  /* Just completed a track → suggest next immediately (TASK 4) */
  if (STATE.hasProgress) {
    const recs = getRecommendedTracks();
    if (recs.length) {
      const track = recs[0];
      const firstCourse = track.courses?.[0];
      const firstLesson = firstCourse?.lessons?.[0];
      return {
        type: 'start-track', icon: track.icon,
        label: track._reasonLabel || 'التالي الموصى به',
        title: track.title,
        meta: `${track.duration} · ${track.totalLessons} درس`,
        pct: 0, color: track.color,
        action: firstLesson ? 'openLesson' : 'showTrack',
        actionData: firstLesson
          ? { trackId: track.id, courseId: firstCourse.id, lessonId: firstLesson.id }
          : { trackId: track.id },
        cta: '🚀 ابدأ الآن',
      };
    }
  }

  if (STATE.quizDone) {
    const recs = getRecommendedTracks();
    if (recs.length) {
      const track = recs[0];
      const fc = track.courses?.[0];
      const fl = fc?.lessons?.[0];
      return {
        type: 'start-track', icon: track.icon,
        label: track._reasonLabel || 'مناسب لك',
        title: track.title,
        meta: `${track.duration} · ${track.totalLessons} درس`,
        pct: 0, color: track.color,
        action: fl ? 'openLesson' : 'showTrack',
        actionData: fl ? { trackId: track.id, courseId: fc.id, lessonId: fl.id } : { trackId: track.id },
        cta: '🚀 ابدأ الآن',
      };
    }
  }

  return {
    type: 'quiz', icon: '🧭',
    label: 'اكتشف مسارك المهني',
    title: 'ابدأ باختبار الميول المهنية',
    meta: '3 دقائق فقط — توصيات مخصصة 100%',
    pct: 0, color: 'var(--p600)',
    action: 'showPage', actionData: { page: 'quiz' },
    cta: 'ابدأ الاختبار ←',
  };
}

/* ────────────────────────────────────────────────────────────────
   TASK 3 — LEARNING PATH ENGINE
   getLearningPath() returns ordered steps for a visual roadmap
   ──────────────────────────────────────────────────────────────── */
function getLearningPath(trackId) {
  trackId = trackId || STATE.currentTrack;
  if (!trackId || typeof getTrackById !== 'function') return null;

  const track = getTrackById(trackId);
  if (!track) return null;

  const steps = [];
  let foundCurrent = false;

  track.courses.forEach((course, ci) => {
    const coursePct = (typeof platform_getCourseProgress === 'function')
      ? platform_getCourseProgress(trackId, course.id) : 0;
    const courseDone = coursePct === 100;

    course.lessons.forEach((lesson, li) => {
      const isDone     = (typeof platform_isLessonDone === 'function')
        ? platform_isLessonDone(trackId, course.id, lesson.id) : false;
      const isCurrent  = !foundCurrent && !isDone;
      if (isCurrent) foundCurrent = true;

      steps.push({
        type:      'lesson',
        id:        lesson.id,
        title:     lesson.title,
        duration:  lesson.duration,
        lessonType:lesson.type,
        courseId:  course.id,
        courseTitle:course.title,
        trackId,
        courseIdx: ci,
        lessonIdx: li,
        isDone,
        isCurrent,
        isNext:    false,           /* filled below */
        action:    'openLesson',
        actionData:{ trackId, courseId: course.id, lessonId: lesson.id },
      });
    });

    /* Course separator */
    steps.push({
      type:       'course-marker',
      id:         course.id,
      title:      course.title,
      duration:   course.duration,
      courseIdx:  ci,
      isDone:     courseDone,
      pct:        coursePct,
    });
  });

  /* Mark next 3 undone lessons as "next" */
  let nextCount = 0;
  steps.forEach(s => {
    if (s.type === 'lesson' && !s.isDone && !s.isCurrent && nextCount < 3) {
      s.isNext = true;
      nextCount++;
    }
  });

  const trackPct = (typeof platform_getTrackProgress === 'function')
    ? platform_getTrackProgress(trackId) : 0;

  return {
    trackId,
    track,
    steps: steps.filter(s => s.type === 'lesson'),   /* lessons only for roadmap */
    courseMarkers: steps.filter(s => s.type === 'course-marker'),
    trackPct,
    totalLessons: track.totalLessons,
    doneLessons: steps.filter(s => s.type === 'lesson' && s.isDone).length,
  };
}

/* Render the learning path as a visual roadmap */
function renderLearningPathRoadmap(containerId, trackId) {
  const el = $(containerId);
  if (!el) return;

  const path = getLearningPath(trackId);
  if (!path) { el.innerHTML = ''; return; }

  const { steps, track, trackPct, doneLessons, totalLessons } = path;

  const typeIcon = { 'فيديو': '🎬', 'تدريب': '💪', 'مشروع': '🚀' };

  el.innerHTML = `
    <div class="lp-roadmap" style="--lp-color:${track.color}">
      <div class="lp-header">
        <div class="lp-track-info">
          <span class="lp-track-icon">${track.icon}</span>
          <div>
            <div class="lp-track-name">${sanitizeHTML(track.title)}</div>
            <div class="lp-track-meta">${doneLessons} / ${totalLessons} درس مكتمل</div>
          </div>
        </div>
        <div class="lp-pct" style="color:${track.color}">${trackPct}%</div>
      </div>

      <div class="lp-bar-wrap">
        <div class="lp-bar">
          <div class="lp-bar-fill" style="width:${trackPct}%;background:${track.color}"></div>
        </div>
      </div>

      <div class="lp-steps">
        ${steps.map((step, i) => `
          <div class="lp-step ${step.isDone ? 'lp-done' : ''} ${step.isCurrent ? 'lp-current' : ''} ${step.isNext ? 'lp-next' : ''}"
               ${!step.isDone ? `data-action="${step.action}"
                 data-track-id="${step.actionData.trackId}"
                 data-course-id="${step.actionData.courseId}"
                 data-lesson-id="${step.actionData.lessonId}"
                 role="button" tabindex="0"` : ''}
               style="--step-color:${track.color}">
            <div class="lp-step-node">
              ${step.isDone
                ? `<span class="lp-node-done" style="background:${track.color}">✓</span>`
                : step.isCurrent
                  ? `<span class="lp-node-current" style="background:${track.color};box-shadow:0 0 0 4px ${track.color}33">▶</span>`
                  : `<span class="lp-node-num">${i + 1}</span>`}
              ${i < steps.length - 1 ? `<div class="lp-step-line ${step.isDone ? 'lp-line-done' : ''}" style="${step.isDone ? `background:${track.color}` : ''}"></div>` : ''}
            </div>
            <div class="lp-step-body">
              <div class="lp-step-course">${sanitizeHTML(step.courseTitle)}</div>
              <div class="lp-step-title">${sanitizeHTML(step.title)}</div>
              <div class="lp-step-meta">
                <span>${typeIcon[step.lessonType] || '📖'} ${sanitizeHTML(step.lessonType)}</span>
                <span>⏱ ${sanitizeHTML(step.duration)}</span>
                ${step.isCurrent ? `<span class="lp-current-badge" style="background:${track.color}20;color:${track.color}">▶ الآن</span>` : ''}
                ${step.isNext ? `<span class="lp-next-badge">التالي</span>` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

/* ────────────────────────────────────────────────────────────────
   TASK 4 — RETENTION TRIGGERS
   - On load: detect returning user / inactivity
   - On lesson complete: instant next suggestion
   - On stuck: suggest alternative
   ──────────────────────────────────────────────────────────────── */
function initRetentionTriggers() {
  /* Check inactivity on page load (after short delay) */
  setTimeout(() => {
    if (!STATE.hasProgress) return;           /* new user — skip */
    const sig = STATE.learning.analytics;
    if (!sig.lastCompletionDate) return;

    const daysSince = (Date.now() - new Date(sig.lastCompletionDate).getTime()) / 86_400_000;

    if (daysSince >= 7) {
      _showRetentionBanner('مرحباً بعودتك! 🎉', `مرّت ${Math.round(daysSince)} أيام — متى تكمل درسك القادم؟`, 'continueLearning', 'ارجع وكمّل! 🔥');
    } else if (daysSince >= _STAGNATION_THRESHOLD_DAYS) {
      _showRetentionBanner('⏰ لا تتوقف الآن', `كنت قريباً — واصل تقدمك اليوم!`, 'continueLearning', 'واصل التعلم ←');
    }
  }, 3500);
}

function _showRetentionBanner(title, msg, action, cta) {
  /* Inject into retention-banner slot if it exists, else create a subtle toast-like bar */
  let el = $('retention-banner');
  if (!el) {
    el = document.createElement('div');
    el.id = 'retention-banner';
    el.style.cssText = `
      position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);
      background:linear-gradient(135deg,var(--p700),var(--p500));
      color:#fff;padding:14px 20px 14px 16px;border-radius:16px;
      z-index:8888;display:flex;align-items:center;gap:12px;
      box-shadow:0 16px 50px rgba(79,53,232,.45);
      max-width:340px;width:calc(100vw - 32px);
      opacity:0;transition:all .5s cubic-bezier(.22,1,.36,1);pointer-events:auto;`;
    document.body.appendChild(el);
  }

  el.innerHTML = `
    <div style="flex:1">
      <div style="font-size:13px;font-weight:800;margin-bottom:2px">${sanitizeHTML(title)}</div>
      <div style="font-size:11.5px;opacity:.88">${sanitizeHTML(msg)}</div>
    </div>
    <button data-action="${action}"
            style="flex-shrink:0;border:none;background:rgba(255,255,255,.18);
                   color:#fff;border-radius:10px;padding:8px 13px;
                   font-size:11px;font-weight:800;cursor:pointer;
                   transition:background .2s">
      ${sanitizeHTML(cta)}
    </button>
    <button id="retention-close"
            style="flex-shrink:0;background:none;border:none;color:#fff;
                   opacity:.7;cursor:pointer;font-size:18px;line-height:1;
                   padding:0 0 0 4px">✕</button>`;

  requestAnimationFrame(() => {
    el.style.opacity  = '1';
    el.style.transform = 'translateX(-50%) translateY(0)';
  });

  $('retention-close')?.addEventListener('click', () => {
    el.style.opacity  = '0';
    el.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => el.remove(), 500);
  });

  /* Auto-dismiss after 8s */
  setTimeout(() => {
    el.style.opacity  = '0';
    el.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => el.remove?.(), 500);
  }, 8000);
}

/* Called after lesson complete — suggest next immediately */
function triggerPostCompletionSuggestion() {
  /* Re-render NAE with latest state */
  if (typeof window._renderNextActionEngine === 'function') {
    window._renderNextActionEngine('home-next-action');
    window._renderNextActionEngine('dash-next-action');
  }
  /* Re-render recommendations */
  renderSmartRecommendations('home-recommendations');
  renderSmartRecommendations('dash-recommendations');
}

/* ────────────────────────────────────────────────────────────────
   TASK 6 — MOTIVATION LAYER
   Milestones + streak + XP hooks
   ──────────────────────────────────────────────────────────────── */
const MILESTONES = [
  { at: 1,   icon: '🎉', msg: 'أكملت أول درس! الرحلة بدأت!' },
  { at: 3,   icon: '🔥', msg: 'كملت 3 دروس — أنت جاد!' },
  { at: 5,   icon: '⚡', msg: '🔥 كملت 5 دروس! أنت في المسار الصح!' },
  { at: 10,  icon: '🏅', msg: '10 دروس! أنت من الجادين فعلاً!' },
  { at: 20,  icon: '🚀', msg: '20 درس! المستوى القادم بينتظرك!' },
  { at: 50,  icon: '👑', msg: '50 درس! أنت أسطورة خط البداية!' },
];

function _checkMilestones(totalDone) {
  const sig  = STATE.learning.analytics;
  const seen = new Set(sig.milestonesSeen || []);

  MILESTONES.forEach(m => {
    if (totalDone >= m.at && !seen.has(m.at)) {
      seen.add(m.at);
      sig.milestonesSeen = Array.from(seen);
      _saveSignals();

      /* Delayed so it doesn't clash with completion toast */
      setTimeout(() => {
        toast(`${m.icon} ${m.msg}`, 4000);
        if (typeof launchConfetti === 'function') launchConfetti();
        if (typeof showAchievementPopup === 'function') {
          showAchievementPopup(m.icon, m.msg, `وصلت ${m.at} دروس مكتملة`);
        }
      }, 900);
    }
  });

  /* Streak celebration */
  const streak = STATE.streak || 0;
  const streakMilestones = [3, 7, 14, 30];
  const seenStreaks = new Set(sig.milestonesSeen || []);
  streakMilestones.forEach(s => {
    const key = `streak_${s}`;
    if (streak >= s && !seenStreaks.has(key)) {
      seenStreaks.add(key);
      sig.milestonesSeen = Array.from(seenStreaks);
      _saveSignals();
      setTimeout(() => {
        toast(`🔥 ${s} أيام متواصلة! استمر!`, 4000);
        launchConfetti?.();
      }, 1400);
    }
  });
}

/* XP Hook — award bonus XP on behavioral signals */
function awardIntelligenceXP(reason) {
  const xpMap = {
    'session_start':      5,
    'return_after_break': 20,
    'path_exploration':   10,
  };
  const pts = xpMap[reason] || 0;
  if (pts && typeof addPoints === 'function') addPoints(pts, reason);
}

/* ────────────────────────────────────────────────────────────────
   RENDER — Smart Recommendations widget (homepage + dashboard)
   ──────────────────────────────────────────────────────────────── */
function renderSmartRecommendations(containerId) {
  const el = $(containerId);
  if (!el) return;

  const recs = getRecommendedTracks();
  if (!recs.length) { el.style.display = 'none'; return; }

  el.style.display = '';
  el.innerHTML = `
    <div class="sr-section">
      <div class="sr-header">
        <span class="sr-title">🎯 مسارات مناسبة لك</span>
        <span class="sr-sub">بناءً على تحليل ملفك</span>
      </div>
      <div class="sr-cards">
        ${recs.map(track => {
          const pct = (typeof platform_getTrackProgress === 'function')
            ? platform_getTrackProgress(track.id) : 0;
          const fc = track.courses?.[0];
          const fl = fc?.lessons?.[0];
          const actionAttrs = fl
            ? `data-action="openLesson" data-track-id="${track.id}" data-course-id="${fc.id}" data-lesson-id="${fl.id}"`
            : `data-action="showTrack" data-track-id="${track.id}"`;
          return `
            <div class="sr-card" style="--src:${track.color}" role="button" tabindex="0" ${actionAttrs}>
              <div class="sr-card-top">
                <span class="sr-icon">${track.icon}</span>
                <div class="sr-reason">${sanitizeHTML(track._reasonLabel || 'موصى به')}</div>
              </div>
              <div class="sr-card-title">${sanitizeHTML(track.title)}</div>
              <div class="sr-card-meta">
                <span>📅 ${sanitizeHTML(track.duration)}</span>
                <span>📖 ${track.totalLessons} درس</span>
              </div>
              ${pct > 0 ? `
                <div class="sr-mini-bar">
                  <div class="sr-mini-fill" style="width:${pct}%;background:${track.color}"></div>
                </div>
                <div class="sr-mini-pct" style="color:${track.color}">${pct}% مكتمل</div>
              ` : ''}
              <div class="sr-cta" style="color:${track.color}">
                ${pct > 0 ? 'واصل ←' : 'ابدأ الآن ←'}
              </div>
            </div>`;
        }).join('')}
      </div>
    </div>`;
}

/* ────────────────────────────────────────────────────────────────
   CSS — Intelligence Layer styles
   ──────────────────────────────────────────────────────────────── */
(function injectIntelligenceStyles() {
  const style = document.createElement('style');
  style.id = 'intelligence-styles';
  style.textContent = `

  /* ── Smart Recommendations ── */
  .sr-section { padding: 4px 0 8px; }
  .sr-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
  .sr-title { font-size: 14px; font-weight: 800; color: var(--text); }
  .sr-sub { font-size: 11px; color: var(--muted); }
  .sr-cards { display: grid; grid-template-columns: repeat(auto-fill,minmax(180px,1fr)); gap: 12px; }
  .sr-card {
    background: var(--surface1);
    border: 1.5px solid color-mix(in srgb, var(--src) 20%, transparent);
    border-radius: 14px; padding: 14px; cursor: pointer;
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
    display: flex; flex-direction: column; gap: 6px;
  }
  .sr-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px color-mix(in srgb, var(--src) 25%, transparent);
    border-color: color-mix(in srgb, var(--src) 50%, transparent);
  }
  .sr-card:active { transform: scale(.97); }
  .sr-card-top { display: flex; align-items: center; justify-content: space-between; }
  .sr-icon { font-size: 24px; }
  .sr-reason {
    font-size: 9px; font-weight: 700; color: var(--src);
    background: color-mix(in srgb, var(--src) 12%, transparent);
    border-radius: 6px; padding: 2px 7px; text-align: right;
  }
  .sr-card-title { font-size: 13px; font-weight: 800; color: var(--text); line-height: 1.3; }
  .sr-card-meta { display: flex; gap: 8px; flex-wrap: wrap; font-size: 10.5px; color: var(--muted); }
  .sr-mini-bar { height: 3px; background: var(--surface3,#2a2a3a); border-radius: 3px; overflow: hidden; }
  .sr-mini-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
  .sr-mini-pct { font-size: 10px; font-weight: 700; }
  .sr-cta { font-size: 11.5px; font-weight: 800; margin-top: auto; }

  /* ── Learning Path Roadmap ── */
  .lp-roadmap { padding: 4px 0; }
  .lp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .lp-track-info { display: flex; align-items: center; gap: 10px; }
  .lp-track-icon { font-size: 26px; }
  .lp-track-name { font-size: 14px; font-weight: 800; color: var(--text); }
  .lp-track-meta { font-size: 11px; color: var(--muted); }
  .lp-pct { font-size: 20px; font-weight: 900; }
  .lp-bar-wrap { margin-bottom: 16px; }
  .lp-bar { height: 6px; background: var(--surface2); border-radius: 6px; overflow: hidden; }
  .lp-bar-fill { height: 100%; border-radius: 6px; transition: width 1s ease; }

  .lp-steps { display: flex; flex-direction: column; }
  .lp-step {
    display: flex; gap: 12px; padding: 6px 0;
    cursor: default; transition: background .15s ease; border-radius: 10px;
  }
  .lp-step[data-action] { cursor: pointer; padding: 8px 8px 8px 0; }
  .lp-step[data-action]:hover { background: var(--surface1); }
  .lp-step[data-action]:hover .lp-step-title { color: var(--step-color); }

  .lp-step-node { display: flex; flex-direction: column; align-items: center; width: 28px; flex-shrink: 0; }
  .lp-node-done, .lp-node-current, .lp-node-num {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 800; flex-shrink: 0;
  }
  .lp-node-done { color: #fff; }
  .lp-node-current { color: #fff; animation: current-pulse 2.5s ease-in-out infinite; }
  @keyframes current-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(79,53,232,.4); }
    50%      { box-shadow: 0 0 0 8px rgba(79,53,232,.0); }
  }
  .lp-node-num {
    background: var(--surface2); color: var(--muted);
    font-size: 11px;
  }
  .lp-step-line {
    width: 2px; flex: 1; background: var(--surface2); min-height: 20px; margin: 3px 0;
    border-radius: 2px; transition: background 1s ease;
  }
  .lp-line-done { }

  .lp-step-body { flex: 1; padding-top: 4px; }
  .lp-step-course { font-size: 9.5px; color: var(--muted); font-weight: 600; margin-bottom: 2px; text-transform: uppercase; letter-spacing: .4px; }
  .lp-step-title { font-size: 13px; font-weight: 700; color: var(--text); transition: color .15s; }
  .lp-done .lp-step-title { color: var(--muted); text-decoration: line-through; opacity: .6; }
  .lp-step-meta { display: flex; gap: 8px; flex-wrap: wrap; font-size: 10.5px; color: var(--muted); margin-top: 4px; }
  .lp-current-badge {
    border-radius: 6px; padding: 1px 7px; font-size: 10px; font-weight: 800;
    animation: badge-pop .4s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes badge-pop { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
  .lp-next-badge {
    background: var(--surface2); color: var(--muted);
    border-radius: 6px; padding: 1px 7px; font-size: 10px; font-weight: 700;
  }
  .lp-current .lp-step-title { font-size: 14px; font-weight: 900; }
  .lp-current .lp-step-body  { padding-top: 2px; }

  /* ── Recommendations inside dashboard ── */
  #dash-recommendations, #home-recommendations { padding: 0; }

  /* ── Responsive ── */
  @media (max-width: 480px) {
    .sr-cards { grid-template-columns: 1fr 1fr; }
    .lp-step-title { font-size: 12px; }
  }
  @media (max-width: 360px) {
    .sr-cards { grid-template-columns: 1fr; }
  }
  `;
  document.head.appendChild(style);
})();

/* ────────────────────────────────────────────────────────────────
   PATCH — markLessonComplete (intelligence hooks)
   Runs after engagement.js patch, safe to double-wrap
   ──────────────────────────────────────────────────────────────── */
(function patchMarkLessonIntelligence() {
  const _doIntelPatch = () => {
    if (typeof markLessonComplete !== 'function') return;
    const _prev = markLessonComplete;
    window.markLessonComplete = function(trackId, courseId, lessonId) {
      const wasDone = (typeof platform_isLessonDone === 'function')
        ? platform_isLessonDone(trackId, courseId, lessonId) : false;
      _prev(trackId, courseId, lessonId);
      if (!wasDone) {
        recordLessonCompletion(trackId, courseId, lessonId);
        triggerPostCompletionSuggestion();
      }
    };
    /* Also patch showLessonView to record views */
    if (typeof showLessonView === 'function') {
      const _origShow = showLessonView;
      window.showLessonView = function(trackId, courseId, lessonId) {
        recordLessonView(lessonId);
        return _origShow(trackId, courseId, lessonId);
      };
    }
  };

  if (typeof markLessonComplete === 'function') _doIntelPatch();
  else document.addEventListener('DOMContentLoaded', () => setTimeout(_doIntelPatch, 500));
})();

/* ────────────────────────────────────────────────────────────────
   PATCH — showPage → hook analytics on navigation
   ──────────────────────────────────────────────────────────────── */
(function patchShowPageAnalytics() {
  const _doPagePatch = () => {
    if (typeof showPage !== 'function') return;
    const _origShow = showPage;
    window.showPage = function(pageId) {
      _origShow(pageId);
      /* Re-render intelligence widgets on relevant pages */
      if (pageId === 'home') {
        setTimeout(() => {
          renderSmartRecommendations('home-recommendations');
          if (typeof window._renderNextActionEngine === 'function')
            window._renderNextActionEngine('home-next-action');
        }, 50);
      }
      if (pageId === 'dashboard') {
        setTimeout(() => {
          renderSmartRecommendations('dash-recommendations');
          if (typeof window._renderNextActionEngine === 'function')
            window._renderNextActionEngine('dash-next-action');
          if ($('dash-learning-path')) {
            renderLearningPathRoadmap('dash-learning-path', STATE.currentTrack);
          }
        }, 50);
      }
    };
  };

  if (typeof showPage === 'function') _doPagePatch();
  else document.addEventListener('DOMContentLoaded', () => setTimeout(_doPagePatch, 200));
})();

/* ────────────────────────────────────────────────────────────────
   OVERRIDE — expose smart versions globally
   ──────────────────────────────────────────────────────────────── */
window.getRecommendedTracks         = getRecommendedTracks;   /* overrides core.js version */
window.getNextAction                = getNextActionSmart;     /* overrides engagement.js version */
window.getLearningPath              = getLearningPath;
window.renderLearningPathRoadmap    = renderLearningPathRoadmap;
window.renderSmartRecommendations   = renderSmartRecommendations;
window.recordLessonCompletion       = recordLessonCompletion;
window.recordLessonView             = recordLessonView;
window.recordSession                = recordSession;
window._detectStagnation            = _detectStagnation;
window._detectStuck                 = _detectStuck;

/* ── Boot sequence ── */
recordSession();
initRetentionTriggers();

/* Award session-start XP once per day */
(function sessionStartXP() {
  const key = 'noor_last_xp_day';
  const today = new Date().toDateString();
  if (_lsRaw(key) !== today) {
    _lsRawSet(key, today);
    const daysSince = STATE.learning.analytics.lastCompletionDate
      ? (Date.now() - new Date(STATE.learning.analytics.lastCompletionDate).getTime()) / 86_400_000
      : 0;
    if (daysSince >= 2) awardIntelligenceXP('return_after_break');
    else awardIntelligenceXP('session_start');
  }
})();
