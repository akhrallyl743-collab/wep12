'use strict';

/* =============================================
   Splash Screen
   ============================================= */
(function initSplash() {
  const splash = document.getElementById('sl-splash');
  if (!splash) return;

  // موبايل: 1.5 ثانية — ديسكتوب: 2.2 ثانية (بدل 2.8)
  const isMobile = window.innerWidth < 768;
  const delay = isMobile ? 1500 : 2200;

  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 500);
  }, delay);
})();

/* =============================================
   Streak
   ============================================= */
function updateStreak() {
  const today = new Date().toDateString();
  const lastVisit = _lsRaw('noor_last_visit');
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  if (lastVisit === today) return;
  if (lastVisit === yesterday) STATE.streak += 1;
  else STATE.streak = lastVisit ? 1 : 1;

  _lsRawSet('noor_streak', STATE.streak);
  _lsRawSet('noor_last_visit', today);

  if (STATE.user?.id) ProfileService.updateStreak(STATE.user.id, STATE.streak);
  if (STATE.streak === 3) saveAchievement('badge', 'streak_3');
  if (STATE.streak === 7) saveAchievement('badge', 'streak_7');
}

/* =============================================
   Achievement + Quiz + Track helpers
   ============================================= */
function saveAchievement(type, key) {
  if (!STATE.user?.id) return;
  AchievementService.save(STATE.user.id, type, key);

  // عرض popup للإنجازات الجديدة فقط
  const badge = ALL_BADGES?.find(b => b.key === key);
  if (badge && typeof showAchievementPopup === 'function') {
    // تأخير قصير لتجنب التداخل مع toast
    setTimeout(() => showAchievementPopup(badge.icon, badge.label, badge.desc), 800);
  }
}

function saveQuizResult(answers, scores, topTracks) {
  if (!STATE.user?.id) return;
  QuizService.saveResult(STATE.user.id, answers, scores, topTracks);
}

function saveTrackProgress(trackId, progress) {
  if (!STATE.user?.id) return;
  TrackService.saveProgress(STATE.user.id, trackId, progress);
}

function subscribeToComminity() {
  if (STATE.communityChannel) return;
  STATE.communityChannel = CommunityService.subscribeToNew(() => {
    if (STATE.currentPage === 'community') renderCommunity();
  });
}

/* =============================================
   Points & Levels
   ============================================= */
const LEVEL_THRESHOLDS = [0, 200, 450, 800, 1250, 1800, 2500];
const LEVEL_NAMES = ['', 'مستكشف مبتدئ', 'متعلم نشط', 'منجز متحمس', 'محترف واثق', 'خبير متقدم', 'قائد ملهم', 'أسطورة خط البداية'];

function getLevelFromPoints(pts) {
  let lv = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (pts >= LEVEL_THRESHOLDS[i]) lv = i + 1;
  }
  return Math.min(lv, 7);
}

function getPointsForNextLevel(lv) {
  if (lv >= 7) return LEVEL_THRESHOLDS[6];
  return LEVEL_THRESHOLDS[lv];
}

async function addPoints(pts, reason) {
  const prevLevel = getLevelFromPoints(STATE.points);

  if (!STATE.user?.id) {
    STATE.points += pts;
    _savePointsSecure(STATE.points);
  } else {
    const newTotal = await PointsService.addPoints(STATE.user.id, pts, reason);
    if (newTotal !== null) {
      STATE.points = newTotal;
    } else {
      STATE.points += pts;
    }
    _savePointsSecure(STATE.points);
  }

  const newLevel = getLevelFromPoints(STATE.points);
  STATE.level = newLevel;
  _lsRawSet('noor_level', newLevel);

  if (newLevel > prevLevel) {
    toast(`🎉 ترقيت للمستوى ${newLevel} — ${LEVEL_NAMES[newLevel]}! 🚀`);
    launchConfetti();
    if (newLevel >= 3) saveAchievement('badge', 'level_3');
  } else {
    toast(`+${pts} نقطة — ${reason}`);
  }

  if (STATE.currentPage === 'dashboard') renderDashboard();
}

function getConfidenceLevel() {
  const totalMinutes = parseInt(_lsRaw('noor_total_minutes') || '0');
  const challengeBonus = STATE.completedChallenges.size * 3;
  const streakBonus = Math.min(STATE.streak * 2, 20);
  const timeBonus = Math.min(totalMinutes / 2, 40);
  return Math.min(Math.round(10 + timeBonus + challengeBonus + streakBonus), 99);
}

function _startMinuteTimer() {
  if (STATE._minuteInterval) clearInterval(STATE._minuteInterval);
  STATE._minuteInterval = setInterval(() => {
    if (!document.hidden) {
      const mins = parseInt(_lsRaw('noor_total_minutes') || '0');
      _lsRawSet('noor_total_minutes', mins + 1);
    }
  }, 60000);
}
_startMinuteTimer();

/* =============================================
   Keyboard Accessibility
   ============================================= */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeCoachModal();
  }
});

/* =============================================
   Coach Modal — click outside
   ============================================= */
const coachModalEl = $('coach-modal');
if (coachModalEl) {
  coachModalEl.addEventListener('click', function(e) {
    if (e.target === this) closeCoachModal();
  });
}

/* =============================================
   Initial Boot Sequence
   ============================================= */

// 1. Apply persisted theme
_applyTheme(STATE.theme);

// 2. Apply persisted language
if (STATE.lang === 'en') _applyLang('en');

// 3. Restore user session from localStorage cache
const _savedUser = _ls('noor_user', null);
if (_savedUser?.name) {
  STATE.user = _savedUser;
  updateStreak();
  updateNavUser(_savedUser);
}

// 4. Initial renders
renderHomeChips();
renderLibrary();
renderPsychology();
renderMentors();
renderPlan();
renderDashboard();
renderFAQ();
initQuiz();
checkDailyReset();

// 4b. [H] Homepage Intelligence — show continue/recommend/quiz banner
if (typeof window._renderHomepageIntelligence === 'function') {
  window._renderHomepageIntelligence();
}

// 4c. [D] Active Tracks widget in dashboard
if (typeof window._renderActiveTracksWidget === 'function') {
  window._renderActiveTracksWidget();
}

// 4d. [ENGAGEMENT] Smart Continue Learning + Next Action Engine + Progress Bar
if (typeof window._renderAllEngagement === 'function') {
  window._renderAllEngagement();
}

// 4e. [INTELLIGENCE] Smart Recommendations + Learning Path
if (typeof window.renderSmartRecommendations === 'function') {
  window.renderSmartRecommendations('home-recommendations');
  window.renderSmartRecommendations('dash-recommendations');
}
if (typeof window.renderLearningPathRoadmap === 'function' && STATE.currentTrack) {
  window.renderLearningPathRoadmap('dash-learning-path', STATE.currentTrack);
}

// 5. Async: update live stats
updateHomeStats();

// 6. Deep link — page-level hash
const _initHash = location.hash.replace('#', '');
if (_initHash && _initHash !== 'onboarding' && $('page-' + _initHash)) {
  setTimeout(() => showPage(_initHash), 0);
}

// 7. Deep link — platform URL params (track/course/lesson)
if (typeof window._platformRestoreFromURL === 'function') {
  setTimeout(window._platformRestoreFromURL, 50);
}

/* ── REVEAL ANIMATION OBSERVER ── */
(function() {
  if (!window.IntersectionObserver) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  function observeReveal() {
    document.querySelectorAll('.reveal').forEach(function(el) {
      if (!el.classList.contains('visible')) observer.observe(el);
    });
  }
  observeReveal();
  /* re-observe when page switches */
  document.addEventListener('click', function() { setTimeout(observeReveal, 200); });
})();
