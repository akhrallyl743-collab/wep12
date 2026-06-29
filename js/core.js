'use strict';

/* =============================================
   core.js — UNIFIED APP STATE + UTILITIES  [v2 — EVOLVED]

   EVOLUTION UPGRADES:
     [M] Data Migration Layer  — detects noor_track_progress → transforms to new schema
     [S] Centralized Storage   — ALL localStorage reads/writes go through _ls/_lsSet
     [V] Validation Guards     — getTrack(id) / getCourse(id) / getLesson(id) safe fallbacks
     [F] Flow Enforcement      — lesson requires course, course requires track
     [C] Continue Learning     — detects + resumes last visited lesson
     [H] Homepage Intelligence — progress? → Continue | quiz done? → Recommend | else → Quiz
   ============================================= */

/* ── Security helpers ── */
function sanitizeHTML(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g, '&#x2F;');
}

const مفتاح_التوقيع = 'startline-2025-secure';
function _hashPoints(pts) {
  let h = 0;
  const s = pts.toString() + مفتاح_التوقيع;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h.toString(36);
}
function _savePointsSecure(pts) {
  localStorage.setItem('noor_points', pts);
  localStorage.setItem('noor_pts_hash', _hashPoints(pts));
}
function _validatePoints(pts) {
  const stored = localStorage.getItem('noor_pts_hash');
  if (!stored) return true;
  return stored === _hashPoints(pts);
}
function _loadPointsSecure() {
  const pts = parseInt(localStorage.getItem('noor_points') || '0');
  if (!_validatePoints(pts)) {
    console.warn('[StartLine] نقاط غير صالحة — إعادة تعيين');
    _savePointsSecure(0); return 0;
  }
  return pts;
}

/* ── [S] Centralized localStorage helpers ──
   ALL localStorage reads/writes MUST use these.
   No direct localStorage calls outside this block. */
function _ls(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}
function _lsSet(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}
function _lsRaw(key, fallback) {
  try { return localStorage.getItem(key) ?? (fallback !== undefined ? fallback : null); } catch { return fallback ?? null; }
}
function _lsRawSet(key, val) {
  try { localStorage.setItem(key, val); } catch {}
}
function _lsDel(key) {
  try { localStorage.removeItem(key); } catch {}
}

/* ── [M] DATA MIGRATION LAYER ──
   Runs ONCE on boot. Detects legacy key noor_track_progress
   and transforms it into noor_lesson_progress + noor_track_pct.
   Absolutely prevents data loss. */
(function runMigration() {
  try {
    const MIGRATION_FLAG = 'noor_migration_v2_done';
    if (_lsRaw(MIGRATION_FLAG) === '1') return;

    const OLD_KEY = 'noor_track_progress';
    const oldRaw = localStorage.getItem(OLD_KEY);

    if (oldRaw) {
      try {
        const oldData = JSON.parse(oldRaw);
        const existingPct  = _ls('noor_track_pct', {});
        const existingProg = _ls('noor_lesson_progress', {});

        Object.entries(oldData).forEach(function([trackId, val]) {
          if (typeof val === 'number') {
            if (!(trackId in existingPct)) existingPct[trackId] = val;
          } else if (typeof val === 'object' && val !== null) {
            if (!existingProg[trackId]) {
              existingProg[trackId] = val;
            } else {
              Object.entries(val).forEach(function([cId, lessons]) {
                if (!existingProg[trackId][cId]) {
                  existingProg[trackId][cId] = lessons;
                } else {
                  var merged = new Set(existingProg[trackId][cId].concat(lessons));
                  existingProg[trackId][cId] = Array.from(merged);
                }
              });
            }
          }
        });

        _lsSet('noor_track_pct', existingPct);
        _lsSet('noor_lesson_progress', existingProg);
        _lsDel(OLD_KEY);
        console.info('[StartLine] Migration v2: noor_track_progress migrated and removed');
      } catch (e) {
        console.warn('[StartLine] Migration failed — old key preserved:', e);
      }
    }

    _lsRawSet(MIGRATION_FLAG, '1');
    console.info('[StartLine] Migration v2 complete');
  } catch (e) {
    console.warn('[StartLine] Migration error:', e);
  }
})();

/* ── [C] Continue Learning — load last lesson ──
   Reads from dedicated noor_last_lesson key. */
function _loadLastLesson() {
  var dedicated = _ls('noor_last_lesson', null);
  if (dedicated && dedicated.trackId && dedicated.courseId && dedicated.lessonId) return dedicated;
  return null;
}

function _saveLastLesson(trackId, courseId, lessonId) {
  _lsSet('noor_last_lesson', { trackId: trackId, courseId: courseId, lessonId: lessonId });
}

/* =============================================
   [V] VALIDATION GUARDS
   Safe wrappers — return null if data missing.
   ============================================= */

function getTrack(trackId) {
  if (!trackId) return null;
  try { return (typeof getTrackById === 'function') ? getTrackById(trackId) : null; }
  catch { return null; }
}

function getCourse(trackId, courseId) {
  if (!trackId || !courseId) return null;
  if (!getTrack(trackId)) return null;
  try { return (typeof getCourseById === 'function') ? getCourseById(trackId, courseId) : null; }
  catch { return null; }
}

function getLesson(trackId, courseId, lessonId) {
  if (!trackId || !courseId || !lessonId) return null;
  var course = getCourse(trackId, courseId);
  if (!course) return null;
  try { return course.lessons ? (course.lessons.find(function(l){ return l.id === lessonId; }) || null) : null; }
  catch { return null; }
}

/* =============================================
   UNIFIED APP STATE
   ============================================= */
var _lastLesson = _loadLastLesson();

const AppState = {
  currentPage: 'home',

  currentCareer: null,
  currentTrack:  (_lastLesson && _lastLesson.trackId)  || null,
  currentCourse: (_lastLesson && _lastLesson.courseId) || null,
  currentLesson: (_lastLesson && _lastLesson.lessonId) || null,

  lang:  _lsRaw('noor_lang')  || 'ar',
  theme: _lsRaw('noor_theme') || 'dark',

  user: _ls('noor_user', null),

  points:  _loadPointsSecure(),
  level:   _ls('noor_level',   1),
  streak:  _ls('noor_streak',  0),
  badges:  new Set(_ls('noor_badges', [])),

  quizAnswers: [],
  currentQ:    0,
  selectedOpt: null,
  quizTraits:  _ls('noor_quiz_traits', null),

  currentCategory: 'all',
  currentViewedCategory: null,

  progress:      _ls('noor_lesson_progress', {}),
  trackProgress: _ls('noor_track_pct', {}),
  selectedTracks: _ls('noor_tracks', []),

  completedDays:       new Set(_ls('noor_days',       [])),
  completedChallenges: new Set(_ls('noor_challenges', [])),
  planTab: '7',

  likedPosts:    new Set(),
  sentRequests:  new Set(),
  communityChannel: null,

  currentMentorRequest: undefined,
  sessionStart: Date.now(),
  _minuteInterval: null,

  /* [H] Computed intelligence properties */
  get hasProgress() {
    return Object.keys(this.progress).some(function(tId) {
      var trk = AppState.progress[tId];
      return trk && Object.values(trk).some(function(arr){ return arr.length > 0; });
    });
  },
  get quizDone() {
    return !!(_lsRaw('quiz_done') || this.quizTraits);
  },
  get hasLastLesson() {
    return !!(this.currentTrack && this.currentCourse && this.currentLesson);
  },
};

const STATE = AppState;

/* =============================================
   STATE PERSISTENCE — single write point
   ============================================= */
function saveProgress() {
  _lsSet('noor_lesson_progress', AppState.progress);
  _lsSet('noor_track_pct',       AppState.trackProgress);
  _lsSet('noor_tracks',          AppState.selectedTracks);
  _lsSet('noor_days',            Array.from(AppState.completedDays));
  _lsSet('noor_challenges',      Array.from(AppState.completedChallenges));
  _lsSet('noor_badges',          Array.from(AppState.badges));
  _lsSet('noor_level',           AppState.level);
  _lsSet('noor_streak',          AppState.streak);
  _savePointsSecure(AppState.points);

  if (AppState.currentTrack && AppState.currentCourse && AppState.currentLesson) {
    _saveLastLesson(AppState.currentTrack, AppState.currentCourse, AppState.currentLesson);
  }

  // ☁️ Auto cloud sync — debounced 3 seconds after any save
  if (AppState.user?.id && window.ProgressSyncService) {
    ProgressSyncService.schedulePush(AppState.user.id, AppState);
  }
}

function saveQuizTraits(traits) {
  AppState.quizTraits = traits;
  _lsSet('noor_quiz_traits', traits);
  _lsRawSet('quiz_done', '1');
}

/* =============================================
   [F] LEARNING FLOW ENFORCEMENT
   ============================================= */

function canOpenLesson(trackId, courseId, lessonId) {
  if (!getTrack(trackId)) {
    console.warn('[Flow] Blocked: track not found:', trackId);
    toast('⚠️ المسار غير موجود');
    return false;
  }
  if (!getCourse(trackId, courseId)) {
    console.warn('[Flow] Blocked: course not found:', courseId);
    toast('⚠️ الكورس غير موجود في هذا المسار');
    return false;
  }
  if (!getLesson(trackId, courseId, lessonId)) {
    console.warn('[Flow] Blocked: lesson not found:', lessonId);
    toast('⚠️ الدرس غير موجود');
    return false;
  }
  return true;
}

function canOpenCourse(trackId, courseId) {
  if (!getTrack(trackId)) {
    console.warn('[Flow] Blocked: track not found:', trackId);
    toast('⚠️ المسار غير موجود');
    return false;
  }
  if (!getCourse(trackId, courseId)) {
    console.warn('[Flow] Blocked: course not found:', courseId);
    toast('⚠️ الكورس غير موجود في هذا المسار');
    return false;
  }
  return true;
}

/* =============================================
   [H] HOMEPAGE INTELLIGENCE
   Returns: 'continue' | 'recommend' | 'quiz'
   ============================================= */
function getHomepageMode() {
  if (AppState.hasProgress && AppState.hasLastLesson) return 'continue';
  if (AppState.quizDone) return 'recommend';
  return 'quiz';
}

function getRecommendedTracks() {
  var traits = AppState.quizTraits;
  if (!traits || !traits.topTracks || !traits.topTracks.length) return [];
  try {
    return traits.topTracks
      .map(function(id){ return getTrack(id); })
      .filter(Boolean)
      .slice(0, 3);
  } catch { return []; }
}

/* =============================================
   DOM UTILITIES
   ============================================= */
function $(id)               { return document.getElementById(id); }
function $$(sel)             { return document.querySelectorAll(sel); }
function setText(id, val)    { var el = $(id); if (el) el.textContent = val; }
function setHTML(id, val)    { var el = $(id); if (el) el.innerHTML = val; }
function setStyle(id, p, v)  { var el = $(id); if (el) el.style[p] = v; }
function setValue(id, val)   { var el = $(id); if (el) el.value = val || ''; }

/* =============================================
   TOAST NOTIFICATIONS
   ============================================= */
var _toastTimer = null;
function toast(msg, dur) {
  dur = dur || 3200;
  var el = $('toast');
  if (!el) return;
  if (_toastTimer) clearTimeout(_toastTimer);
  el.textContent = msg;
  el.classList.add('show');
  _toastTimer = setTimeout(function(){ el.classList.remove('show'); }, dur);
}

/* =============================================
   CONFETTI
   ============================================= */
function launchConfetti() {
  if (typeof window._uiConfetti === 'function') window._uiConfetti();
}

/* ── Expose guards for other modules ── */
window._flowGuards   = { canOpenLesson: canOpenLesson, canOpenCourse: canOpenCourse, getTrack: getTrack, getCourse: getCourse, getLesson: getLesson };
window._homepageIntel = { getHomepageMode: getHomepageMode, getRecommendedTracks: getRecommendedTracks };
