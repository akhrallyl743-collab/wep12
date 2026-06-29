'use strict';

/* ==============================================
   engagement.js — EXPERIENCE DOMINATION LAYER
   Builds ON TOP of existing STATE — no new state systems.

   TASK 1: Smart Continue Learning UX
   TASK 2: Next Action Engine (getNextAction)
   TASK 3: Lesson Completion Feedback
   TASK 4: Progress Visibility — everywhere
   TASK 5: Empty State UX
   TASK 6: Micro-Interactions
   ============================================== */

/* ──────────────────────────────────────────────
   TASK 2 — getNextAction()
   Returns ONE clear action object based on STATE.
   ────────────────────────────────────────────── */
function getNextAction() {
  const tId = STATE.currentTrack;
  const cId = STATE.currentCourse;
  const lId = STATE.currentLesson;

  // 1. Has an in-progress lesson → Continue it
  if (tId && cId && lId && STATE.hasProgress) {
    const track  = (typeof getTrackById  === 'function') ? getTrackById(tId)  : null;
    const course = (typeof getCourseById === 'function') ? getCourseById(tId, cId) : null;
    const lesson = course?.lessons?.find(l => l.id === lId);
    if (track && course && lesson) {
      const pct = (typeof platform_getTrackProgress === 'function') ? platform_getTrackProgress(tId) : 0;
      const done = (typeof platform_totalDone === 'function') ? platform_totalDone() : 0;
      return {
        type: 'continue',
        icon: track.icon,
        label: 'واصل من حيث توقفت',
        title: lesson.title,
        meta: `${track.title} · ${course.title}`,
        pct,
        done,
        color: track.color,
        action: 'continueLearning',
        actionData: {},
        cta: '▶ استمر الآن',
      };
    }
  }

  // 2. Has progress but no active lesson → Find next uncompleted lesson
  if (STATE.hasProgress && typeof getAllTracks === 'function') {
    const allTracks = getAllTracks();
    for (const track of allTracks) {
      const pct = (typeof platform_getTrackProgress === 'function') ? platform_getTrackProgress(track.id) : 0;
      if (pct > 0 && pct < 100) {
        // Find the first incomplete course & lesson
        for (const course of track.courses) {
          const arr = STATE.progress?.[track.id]?.[course.id] || [];
          const nextLesson = course.lessons.find(l => !arr.includes(l.id));
          if (nextLesson) {
            return {
              type: 'next-lesson',
              icon: track.icon,
              label: 'الخطوة القادمة',
              title: nextLesson.title,
              meta: `${track.title} · ${course.title}`,
              pct,
              color: track.color,
              action: 'openLesson',
              actionData: { trackId: track.id, courseId: course.id, lessonId: nextLesson.id },
              cta: '▶ ابدأ الدرس',
            };
          }
          // Course done → next course
        }
        // All courses in this track completed → shouldn't reach here but continue
      }
      // Check for next course in a completed-course scenario
      if (pct === 100) {
        continue; // look for another track with partial progress
      }
    }
  }

  // 3. Quiz done, has recommendations → Start recommended track
  if (STATE.quizDone) {
    const recs = (typeof getRecommendedTracks === 'function') ? getRecommendedTracks() : [];
    if (recs.length) {
      const track = recs[0];
      const firstCourse = track.courses?.[0];
      const firstLesson = firstCourse?.lessons?.[0];
      return {
        type: 'start-track',
        icon: track.icon,
        label: 'المسار الموصى به لك',
        title: track.title,
        meta: `${track.duration} · ${track.totalLessons} درس`,
        pct: 0,
        color: track.color,
        action: firstLesson ? 'openLesson' : 'showTrack',
        actionData: firstLesson
          ? { trackId: track.id, courseId: firstCourse.id, lessonId: firstLesson.id }
          : { trackId: track.id },
        cta: '🚀 ابدأ الآن',
      };
    }
  }

  // 4. No quiz → push to quiz
  return {
    type: 'quiz',
    icon: '🧭',
    label: 'اكتشف مسارك المهني',
    title: 'ابدأ باختبار الميول المهنية',
    meta: '3 دقائق فقط — توصيات مخصصة 100%',
    pct: 0,
    color: 'var(--p600)',
    action: 'showPage',
    actionData: { page: 'quiz' },
    cta: 'ابدأ الاختبار ←',
  };
}

/* ──────────────────────────────────────────────
   TASK 1 — Smart Continue Learning UX
   Renders the upgraded continue-learning widget.
   Hides completely if no progress.
   ────────────────────────────────────────────── */
function renderSmartContinueLearning() {
  const el = $('continue-learning-section');
  if (!el) return;

  const { currentTrack: tId, currentCourse: cId, currentLesson: lId } = STATE;

  // TASK 5: If no progress → hide section completely
  if (!tId || !cId || !lId || !STATE.hasProgress) {
    el.closest('.dash-section')
      ? (el.closest('.dash-section').style.display = 'none')
      : (el.style.display = 'none');
    return;
  }

  const track  = (typeof getTrackById  === 'function') ? getTrackById(tId)  : null;
  const course = (typeof getCourseById === 'function') ? getCourseById(tId, cId) : null;
  const lesson = course?.lessons?.find(l => l.id === lId);

  if (!track || !course || !lesson) {
    el.closest('.dash-section') && (el.closest('.dash-section').style.display = 'none');
    return;
  }

  // Restore visibility
  el.closest('.dash-section') && (el.closest('.dash-section').style.display = '');

  const trackPct  = (typeof platform_getTrackProgress === 'function') ? platform_getTrackProgress(tId) : 0;
  const coursePct = (typeof platform_getCourseProgress === 'function') ? platform_getCourseProgress(tId, cId) : 0;
  const totalDone = (typeof platform_totalDone === 'function') ? platform_totalDone() : 0;

  // Find track name via career
  let trackLabel = '';
  if (typeof CAREERS_DATA !== 'undefined') {
    const career = CAREERS_DATA.find(c => c.tracks?.some(t => t.id === tId));
    if (career) trackLabel = career.name;
  }

  el.innerHTML = `
    <div class="scl-card" style="--clr:${track.color}" role="region" aria-label="متابعة التعلم">
      <div class="scl-track-badge">
        <span class="scl-track-icon">${track.icon}</span>
        <div class="scl-track-info">
          ${trackLabel ? `<div class="scl-career-name">${sanitizeHTML(trackLabel)}</div>` : ''}
          <div class="scl-track-name">${sanitizeHTML(track.title)}</div>
          <div class="scl-course-name">📖 ${sanitizeHTML(course.title)}</div>
        </div>
        <div class="scl-pct-ring">
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="20" fill="none" stroke="var(--surface2)" stroke-width="5"/>
            <circle cx="26" cy="26" r="20" fill="none" stroke="${track.color}" stroke-width="5"
              stroke-linecap="round"
              stroke-dasharray="${2 * Math.PI * 20}"
              stroke-dashoffset="${2 * Math.PI * 20 * (1 - trackPct / 100)}"
              transform="rotate(-90 26 26)"
              style="transition:stroke-dashoffset 1.2s cubic-bezier(.22,1,.36,1)"/>
          </svg>
          <div class="scl-pct-label">${trackPct}%</div>
        </div>
      </div>

      <div class="scl-lesson-row">
        <div class="scl-lesson-dot" style="background:${track.color}"></div>
        <div class="scl-lesson-title">${sanitizeHTML(lesson.title)}</div>
      </div>

      <div class="scl-progress-wrap">
        <div class="scl-progress-bar">
          <div class="scl-progress-fill" style="width:${trackPct}%;background:${track.color};transition:width 1s ease"></div>
        </div>
        <div class="scl-progress-stats">
          <span style="color:${track.color};font-weight:700">${trackPct}% المسار</span>
          <span style="color:var(--muted)">${totalDone} درس مكتمل</span>
          <span style="color:var(--muted)">${coursePct}% الكورس</span>
        </div>
      </div>

      <button class="scl-resume-btn" data-action="continueLearning"
              style="background:${track.color}" aria-label="استمر في الدرس">
        <span class="scl-btn-icon">▶</span>
        <span>استمر الآن</span>
        <span class="scl-btn-arrow">←</span>
      </button>
    </div>`;
}

/* ──────────────────────────────────────────────
   TASK 2 — Next Action Engine Renderer
   Renders in homepage + dashboard
   ────────────────────────────────────────────── */
function renderNextActionEngine(containerId) {
  const el = $(containerId);
  if (!el) return;

  const action = getNextAction();

  const iconBg = action.type === 'quiz'
    ? 'linear-gradient(135deg,var(--p600),var(--t500))'
    : `linear-gradient(135deg,${action.color}dd,${action.color}99)`;

  const actionAttrs = _buildActionAttrs(action);

  el.style.display = '';
  el.innerHTML = `
    <div class="nae-card nae-${action.type}" style="--nae-color:${action.color}" role="region" aria-label="الخطوة القادمة">
      <div class="nae-icon-wrap" style="background:${iconBg}" aria-hidden="true">${action.icon}</div>
      <div class="nae-body">
        <div class="nae-label">${sanitizeHTML(action.label)}</div>
        <div class="nae-title">${sanitizeHTML(action.title)}</div>
        <div class="nae-meta">${sanitizeHTML(action.meta)}</div>
        ${action.pct > 0 ? `
          <div class="nae-mini-bar">
            <div class="nae-mini-fill" style="width:${action.pct}%;background:${action.color}"></div>
          </div>` : ''}
      </div>
      <button class="nae-cta" ${actionAttrs} style="background:${action.color}" aria-label="${sanitizeHTML(action.cta)}">
        ${sanitizeHTML(action.cta)}
      </button>
    </div>`;
}

function _buildActionAttrs(action) {
  switch (action.action) {
    case 'continueLearning':
      return `data-action="continueLearning"`;
    case 'openLesson':
      return `data-action="openLesson"
              data-track-id="${action.actionData.trackId}"
              data-course-id="${action.actionData.courseId}"
              data-lesson-id="${action.actionData.lessonId}"`;
    case 'showTrack':
      return `data-action="showTrack" data-track-id="${action.actionData.trackId}"`;
    case 'showPage':
      return `data-action="showPage" data-page="${action.actionData.page}"`;
    default:
      return '';
  }
}

/* ──────────────────────────────────────────────
   TASK 3 — Lesson Completion Feedback
   Overrides markLessonComplete to add:
   - Arabic success toast
   - Confetti
   - Instant progress update in dashboard
   ────────────────────────────────────────────── */
(function patchLessonComplete() {
  // We wait for platform.js to define markLessonComplete, then wrap it
  const _patch = () => {
    if (typeof markLessonComplete !== 'function') return;
    const _orig = markLessonComplete;
    window.markLessonComplete = function(trackId, courseId, lessonId) {
      const wasAlreadyDone = (typeof platform_isLessonDone === 'function')
        ? platform_isLessonDone(trackId, courseId, lessonId)
        : false;

      _orig(trackId, courseId, lessonId);

      if (!wasAlreadyDone) {
        // TASK 3: Arabic success toast
        const lesson = (typeof getCourseById === 'function')
          ? getCourseById(trackId, courseId)?.lessons?.find(l => l.id === lessonId)
          : null;
        const lessonName = lesson?.title || 'درس جديد';
        toast(`🔥 أحسنت! كملت "${lessonName}"`);

        // TASK 3: Confetti for milestone
        const coursePct = (typeof platform_getCourseProgress === 'function')
          ? platform_getCourseProgress(trackId, courseId) : 0;
        if (coursePct === 100 || coursePct >= 50) launchConfetti();

        // TASK 3: Instant progress update in dashboard
        if (STATE.currentPage === 'dashboard') {
          if (typeof renderSmartContinueLearning === 'function') renderSmartContinueLearning();
          if (typeof window._renderActiveTracksWidget === 'function') window._renderActiveTracksWidget();
          renderNextActionEngine('dash-next-action');
        }
        renderNextActionEngine('home-next-action');

        // TASK 1: Update continue learning
        renderSmartContinueLearning();
      }
    };
    // Also update the PLATFORM_ACTIONS bridge reference
    if (typeof PLATFORM_ACTIONS !== 'undefined') {
      PLATFORM_ACTIONS.markLessonDone = el =>
        window.markLessonComplete(el.dataset.trackId, el.dataset.courseId, el.dataset.lessonId);
    }
  };

  // Try immediately, retry once DOM/scripts are ready
  if (typeof markLessonComplete === 'function') _patch();
  else document.addEventListener('DOMContentLoaded', () => setTimeout(_patch, 300));
})();

/* ──────────────────────────────────────────────
   TASK 4 — Progress Visibility
   Injects visible progress stats wherever user looks.
   ────────────────────────────────────────────── */
function renderProgressSummaryBar() {
  const el = $('progress-summary-bar');
  if (!el) return;

  if (!STATE.hasProgress) { el.style.display = 'none'; return; }

  const totalDone  = (typeof platform_totalDone === 'function') ? platform_totalDone() : 0;
  const allTracks  = (typeof getAllTracks === 'function') ? getAllTracks() : [];
  const started    = allTracks.filter(t => (typeof platform_getTrackProgress === 'function') && platform_getTrackProgress(t.id) > 0);
  const completed  = started.filter(t => platform_getTrackProgress(t.id) === 100);
  const avgPct     = started.length
    ? Math.round(started.reduce((s, t) => s + platform_getTrackProgress(t.id), 0) / started.length)
    : 0;

  el.style.display = '';
  el.innerHTML = `
    <div class="psb-inner">
      <div class="psb-stat">
        <span class="psb-num" style="color:var(--p500)">${totalDone}</span>
        <span class="psb-lbl">درس مكتمل</span>
      </div>
      <div class="psb-div"></div>
      <div class="psb-stat">
        <span class="psb-num" style="color:var(--t500)">${started.length}</span>
        <span class="psb-lbl">مسار نشط</span>
      </div>
      <div class="psb-div"></div>
      <div class="psb-stat">
        <span class="psb-num" style="color:var(--a500)">${completed.length}</span>
        <span class="psb-lbl">مسار مكتمل</span>
      </div>
      <div class="psb-div"></div>
      <div class="psb-stat">
        <span class="psb-num" style="color:var(--c500)">${avgPct}%</span>
        <span class="psb-lbl">متوسط التقدم</span>
      </div>
    </div>`;
}

/* ──────────────────────────────────────────────
   TASK 5 — Empty State UX
   Ensures every empty state guides the user.
   Already partly covered by renderSmartContinueLearning,
   here we also handle no-tracks in library + track-progress.
   ────────────────────────────────────────────── */
function renderEngagementEmptyStates() {
  // track-progress-list empty state
  const tpEl = $('track-progress-list');
  if (tpEl && !STATE.hasProgress) {
    tpEl.innerHTML = `
      <div class="engagement-empty">
        <div class="ee-icon">🗺️</div>
        <p class="ee-msg">لم تبدأ أي مسار بعد — الخطوة الأولى تبدأ هنا!</p>
        <button class="btn btn-primary btn-sm" data-action="showPage" data-page="${STATE.quizDone ? 'library' : 'quiz'}">
          ${STATE.quizDone ? '🔍 استكشف المسارات' : '🧠 ابدأ الاختبار المهني'}
        </button>
      </div>`;
  }

  // active-tracks-widget empty state
  const atwEl = $('active-tracks-widget');
  if (atwEl && !STATE.hasProgress) {
    atwEl.innerHTML = `
      <div class="engagement-empty">
        <div class="ee-icon">📚</div>
        <p class="ee-msg">اختر مسارك الأول وابدأ رحلة التعلم!</p>
        <button class="btn btn-primary btn-sm" data-action="showPage" data-page="library">
          + اكتشف المسارات
        </button>
      </div>`;
  }
}

/* ──────────────────────────────────────────────
   TASK 6 — Micro-Interactions CSS injection
   Adds smooth hover states, transitions, animations
   without touching architecture.
   ────────────────────────────────────────────── */
(function injectMicroInteractions() {
  const style = document.createElement('style');
  style.id = 'engagement-styles';
  style.textContent = `

  /* ═══════════════════════════════
     TASK 1 — Smart Continue Learning Card
     ═══════════════════════════════ */
  .scl-card {
    background: var(--surface1);
    border: 1.5px solid color-mix(in srgb, var(--clr) 25%, transparent);
    border-radius: 18px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    overflow: hidden;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .scl-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, color-mix(in srgb, var(--clr) 8%, transparent) 0%, transparent 60%);
    pointer-events: none;
  }
  .scl-card:hover { transform: translateY(-2px); box-shadow: 0 12px 40px color-mix(in srgb, var(--clr) 20%, transparent); }
  .scl-track-badge { display: flex; align-items: center; gap: 12px; }
  .scl-track-icon { font-size: 28px; flex-shrink: 0; }
  .scl-track-info { flex: 1; min-width: 0; }
  .scl-career-name { font-size: 10px; color: var(--muted); font-weight: 600; letter-spacing: .5px; text-transform: uppercase; margin-bottom: 2px; }
  .scl-track-name { font-size: 15px; font-weight: 800; color: var(--text); line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .scl-course-name { font-size: 12px; color: var(--muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .scl-pct-ring { position: relative; width: 52px; height: 52px; flex-shrink: 0; }
  .scl-pct-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: var(--text); }
  .scl-lesson-row { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: var(--surface2); border-radius: 10px; }
  .scl-lesson-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; animation: pulse-dot 2s ease-in-out infinite; }
  @keyframes pulse-dot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }
  .scl-lesson-title { font-size: 13px; font-weight: 700; color: var(--text); flex: 1; }
  .scl-progress-wrap { display: flex; flex-direction: column; gap: 6px; }
  .scl-progress-bar { height: 6px; background: var(--surface3,#2a2a3a); border-radius: 6px; overflow: hidden; }
  .scl-progress-fill { height: 100%; border-radius: 6px; }
  .scl-progress-stats { display: flex; justify-content: space-between; font-size: 11px; }
  .scl-resume-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    border: none; border-radius: 12px; padding: 13px 18px;
    color: #fff; font-size: 14px; font-weight: 800; cursor: pointer;
    transition: filter .2s ease, transform .15s ease, box-shadow .2s ease;
    position: relative; overflow: hidden;
  }
  .scl-resume-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0);
    transition: background .2s ease;
  }
  .scl-resume-btn:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,0,0,.3); }
  .scl-resume-btn:hover::after { background: rgba(255,255,255,.08); }
  .scl-resume-btn:active { transform: translateY(0) scale(.98); }
  .scl-btn-icon { font-size: 16px; }
  .scl-btn-arrow { opacity: .8; margin-right: auto; }

  /* ═══════════════════════════════
     TASK 2 — Next Action Engine Card
     ═══════════════════════════════ */
  .nae-wrapper { padding: 0 20px 16px; }
  .nae-card {
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--surface1);
    border: 1.5px solid color-mix(in srgb, var(--nae-color) 22%, transparent);
    border-radius: 18px;
    padding: 16px 18px;
    position: relative;
    overflow: hidden;
    transition: transform .25s ease, box-shadow .25s ease;
  }
  .nae-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg, color-mix(in srgb, var(--nae-color) 6%, transparent) 0%, transparent 70%);
    pointer-events: none;
  }
  .nae-card:hover { transform: translateY(-2px); box-shadow: 0 10px 32px color-mix(in srgb, var(--nae-color) 20%, transparent); }
  .nae-icon-wrap { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0; }
  .nae-body { flex: 1; min-width: 0; }
  .nae-label { font-size: 10px; color: var(--muted); font-weight: 700; letter-spacing: .6px; text-transform: uppercase; margin-bottom: 3px; }
  .nae-title { font-size: 14px; font-weight: 800; color: var(--text); line-height: 1.25; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nae-meta { font-size: 11px; color: var(--muted); margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .nae-mini-bar { height: 3px; background: var(--surface2); border-radius: 3px; overflow: hidden; margin-top: 6px; }
  .nae-mini-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
  .nae-cta {
    flex-shrink: 0;
    border: none; border-radius: 10px; padding: 10px 16px;
    color: #fff; font-size: 12px; font-weight: 800; cursor: pointer; white-space: nowrap;
    transition: filter .2s, transform .15s, box-shadow .2s;
  }
  .nae-cta:hover { filter: brightness(1.12); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,.25); }
  .nae-cta:active { transform: scale(.97); }

  /* ═══════════════════════════════
     TASK 4 — Progress Summary Bar
     ═══════════════════════════════ */
  .psb-inner {
    display: flex; align-items: center; justify-content: center;
    gap: 20px; padding: 14px 20px;
    background: var(--surface1);
    border-bottom: 1px solid var(--border);
    flex-wrap: wrap;
  }
  .psb-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
  .psb-num { font-size: 20px; font-weight: 900; line-height: 1; }
  .psb-lbl { font-size: 10px; color: var(--muted); font-weight: 600; }
  .psb-div { width: 1px; height: 28px; background: var(--border); }

  /* ═══════════════════════════════
     TASK 5 — Empty State UX
     ═══════════════════════════════ */
  .engagement-empty {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    padding: 28px 20px; text-align: center;
  }
  .ee-icon { font-size: 36px; }
  .ee-msg { font-size: 13.5px; color: var(--muted); line-height: 1.5; max-width: 240px; }

  /* ═══════════════════════════════
     TASK 6 — Micro-Interactions
     ═══════════════════════════════ */

  /* Universal button hover feedback */
  .btn, .hbtn, .intel-btn, .atw-btn, .dti-continue, .cc-btn, button[data-action] {
    transition: transform .15s ease, box-shadow .15s ease, filter .15s ease !important;
  }
  .btn:hover, .hbtn:hover, .atw-btn:hover, .dti-continue:hover, .cc-btn:hover {
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 20px rgba(0,0,0,.18) !important;
  }
  .btn:active, .hbtn:active, .atw-btn:active, .dti-continue:active {
    transform: scale(.97) !important;
  }

  /* Card hover lifts */
  .course-card, .lesson-item, .career-track-card, .intel-rec-card, .atw-track {
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease !important;
  }
  .course-card:hover, .intel-rec-card:hover, .career-track-card:hover {
    transform: translateY(-2px) !important;
    box-shadow: 0 8px 28px rgba(0,0,0,.15) !important;
  }
  .lesson-item:hover { transform: translateX(-3px) !important; }

  /* Smooth page transitions */
  .page {
    animation: page-fadein .3s ease both;
  }
  @keyframes page-fadein {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Progress bar animated entrance */
  .course-progress-fill, .dti-fill, .intel-bar-fill, .atw-fill {
    transition: width 1s cubic-bezier(.22,1,.36,1) !important;
  }

  /* FAB-style pulse on primary CTA when idle */
  @keyframes cta-pulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(79,53,232,.4); }
    50% { box-shadow: 0 0 0 10px rgba(79,53,232,0); }
  }
  .hbtn-primary { animation: cta-pulse 3s ease-in-out infinite; }

  /* Lesson done checkmark pop */
  .lesson-num-done {
    animation: check-pop .4s cubic-bezier(.34,1.56,.64,1) both;
  }
  @keyframes check-pop {
    from { transform: scale(0) rotate(-45deg); opacity: 0; }
    to   { transform: scale(1) rotate(0); opacity: 1; }
  }

  /* Toast slide-up */
  #toast.show { animation: toast-rise .35s cubic-bezier(.22,1,.36,1) both; }
  @keyframes toast-rise {
    from { opacity: 0; transform: translateX(-50%) translateY(20px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  /* Next action engine entrance */
  .nae-card { animation: nae-enter .4s cubic-bezier(.22,1,.36,1) both; }
  @keyframes nae-enter {
    from { opacity: 0; transform: translateX(12px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  /* Continue learning card entrance */
  .scl-card { animation: scl-enter .5s cubic-bezier(.22,1,.36,1) both; }
  @keyframes scl-enter {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Section headers fade in */
  .dash-section h3, .dash-left h3, .dash-right > h3 {
    animation: fade-up .4s ease both;
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Metric cards stagger */
  .metric-card:nth-child(1) { animation-delay: .05s; }
  .metric-card:nth-child(2) { animation-delay: .1s; }
  .metric-card:nth-child(3) { animation-delay: .15s; }
  .metric-card { animation: fade-up .4s ease both; }

  /* Nav item active indicator */
  .nav-item.active .nav-icon {
    transform: scale(1.15);
    transition: transform .2s cubic-bezier(.34,1.56,.64,1);
  }

  /* Responsive NAE */
  @media (max-width: 480px) {
    .nae-card { flex-wrap: wrap; }
    .nae-cta { width: 100%; text-align: center; margin-top: 4px; }
    .scl-progress-stats { font-size: 10px; }
  }
  `;
  document.head.appendChild(style);
})();

/* ──────────────────────────────────────────────
   MASTER RENDER — call all engagement renderers
   ────────────────────────────────────────────── */
function renderAllEngagement() {
  renderSmartContinueLearning();
  renderProgressSummaryBar();
  renderEngagementEmptyStates();
  renderNextActionEngine('home-next-action');
  renderNextActionEngine('dash-next-action');
}

/* Expose for external calls */
window._renderSmartContinueLearning = renderSmartContinueLearning;
window._renderNextActionEngine = renderNextActionEngine;
window._renderAllEngagement = renderAllEngagement;
window.getNextAction = getNextAction;
