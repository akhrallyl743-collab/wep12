'use strict';

/* =============================================
   platform.js — UNIFIED PLATFORM MODULE
   Refactored: Replaces PlatformState with AppState
   Sections:
     [1] PLATFORM DATA (removed — now in data.js)
     [2] PROGRESS API   — reads/writes AppState.progress
     [3] NAVIGATION     — single navigate() function
     [4] VIEWS          — Track / Course / Lesson renderers
     [5] DASHBOARD      — continue-learning widgets
     [6] DISCOVERY      — career → tracks integration
     [7] ACTION BRIDGE  — wires data-action into events.js
   ============================================= */

/* ─────────────────────────────────────────────
   [2] PROGRESS API
   All reads/writes go through AppState.progress
   Format: { trackId: { courseId: [lessonId, ...] } }
   ───────────────────────────────────────────── */

function _getProgObj(trackId, courseId) {
  if (!AppState.progress[trackId]) AppState.progress[trackId] = {};
  if (!AppState.progress[trackId][courseId]) AppState.progress[trackId][courseId] = [];
  return AppState.progress[trackId][courseId];
}

function platform_completeLesson(trackId, courseId, lessonId) {
  const arr = _getProgObj(trackId, courseId);
  if (!arr.includes(lessonId)) arr.push(lessonId);
  AppState.currentTrack  = trackId;
  AppState.currentCourse = courseId;
  AppState.currentLesson = lessonId;
  saveProgress();
}

function platform_isLessonDone(trackId, courseId, lessonId) {
  return (_getProgObj(trackId, courseId)).includes(lessonId);
}

function platform_getCourseProgress(trackId, courseId) {
  const course = getCourseById(trackId, courseId);
  if (!course) return 0;
  const done = _getProgObj(trackId, courseId).length;
  return Math.round((done / course.lessons.length) * 100);
}

function platform_getTrackProgress(trackId) {
  const track = getTrackById(trackId);
  if (!track) return 0;
  let total = 0, done = 0;
  track.courses.forEach(c => {
    total += c.lessons.length;
    done  += _getProgObj(trackId, c.id).length;
  });
  return total ? Math.round((done / total) * 100) : 0;
}

function platform_totalDone() {
  let count = 0;
  Object.values(AppState.progress).forEach(trk =>
    Object.values(trk).forEach(arr => { count += arr.length; })
  );
  return count;
}

/** Backward compat shim — old code calls PlatformState.xxx */
const PlatformState = {
  get currentTrackId()  { return AppState.currentTrack; },
  set currentTrackId(v) { AppState.currentTrack = v; },
  get currentCourseId() { return AppState.currentCourse; },
  set currentCourseId(v){ AppState.currentCourse = v; },
  get currentLessonId() { return AppState.currentLesson; },
  set currentLessonId(v){ AppState.currentLesson = v; },
  get lastVisited() {
    const { currentTrack: t, currentCourse: c, currentLesson: l } = AppState;
    return (t && c && l) ? { trackId: t, courseId: c, lessonId: l } : null;
  },
  get progress() { return AppState.progress; },
  save()                              { saveProgress(); },
  completeLesson(t, c, l)            { platform_completeLesson(t, c, l); },
  isLessonDone(t, c, l)              { return platform_isLessonDone(t, c, l); },
  isCourseDone(t, c)                 { return platform_getCourseProgress(t, c) === 100; },
  getCourseProgress(t, c)            { return platform_getCourseProgress(t, c); },
  getTrackProgress(t)                { return platform_getTrackProgress(t); },
  totalDone()                        { return platform_totalDone(); },
};

/* ─────────────────────────────────────────────
   [3] NAVIGATION — single routing function
   Syncs AppState + URL params
   Replaces: category-router routing + platform routing
   ───────────────────────────────────────────── */

/** Navigate to: career / track / course / lesson
 *  Only pass the params you need — the rest become null */
function platformNavigate({ careerId, trackId, courseId, lessonId } = {}) {
  AppState.currentCareer = careerId || null;
  AppState.currentTrack  = trackId  || null;
  AppState.currentCourse = courseId || null;
  AppState.currentLesson = lessonId || null;

  // Build URL query string
  const params = new URLSearchParams();
  if (careerId) params.set('career', careerId);
  if (trackId)  params.set('track',  trackId);
  if (courseId) params.set('course', courseId);
  if (lessonId) params.set('lesson', lessonId);
  const qs = params.toString();
  history.replaceState(null, '', qs ? '?' + qs : window.location.pathname);

  // Render the correct view
  if (lessonId && trackId && courseId) {
    showLessonView(trackId, courseId, lessonId);
  } else if (courseId && trackId) {
    showCourseView(trackId, courseId);
  } else if (trackId) {
    showTrackView(trackId);
  } else if (careerId) {
    showCareer(careerId);
  }
}

/** Restore state from URL on page load */
function platformRestoreFromURL() {
  const p = new URLSearchParams(window.location.search);
  const career = p.get('career'), track = p.get('track');
  const course = p.get('course'), lesson = p.get('lesson');
  if (track || career) {
    platformNavigate({ careerId: career, trackId: track, courseId: course, lessonId: lesson });
  }
}

/** Continue from last visited lesson */
function continueLastLesson() {
  const { currentTrack: t, currentCourse: c, currentLesson: l } = AppState;
  if (t && c && l) platformNavigate({ trackId: t, courseId: c, lessonId: l });
}

/* ─────────────────────────────────────────────
   [4] VIEWS — Track / Course / Lesson renderers
   All PlatformState.xxx calls replaced with
   platform_xxx() helper functions
   ───────────────────────────────────────────── */

/** النسخة القديمة (كاملة بدون أي تغيير) — تُستخدم كـ Fallback نهائي */
function _legacyShowTrackView(trackId) {
  const track = getTrackById(trackId);
  if (!track) return;

  // فحص أمني حرج: المسار القديم (data.js) لا يعرف شيئاً عن سياسة RLS الجديدة
  // في Supabase، فقد كان يعرض أي مسار (بما فيه frontend-track المؤرشف) لأي
  // مستخدم بصرف النظر عن صلاحيته — هذا يتجاوز تماماً حماية RLS المقصودة
  // (راجع roadmap-service.js: نفس الإصلاح الأمني، مكان مختلف). نفحص هنا
  // صريحاً قبل عرض أي محتوى.
  if (track.archived) {
    setHTML('platform-page-inner',
      '<div class="platform-wrap"><div class="rm-shell-card">' +
        '<div class="rm-shell-badge">📦 هذا المسار غير متاح حالياً</div>' +
        '<p class="rm-shell-desc">تم استبدال هذا المسار بنسخة محدَّثة. تصفّح الفئات لإيجاد المسار البديل.</p>' +
        '<button class="rm-mark-done-btn" data-action="showPage" data-page="categories">تصفّح الفئات</button>' +
      '</div></div>'
    );
    return;
  }

  AppState.currentTrack = trackId;
  const totalPct = platform_getTrackProgress(trackId);
  const career = CAREERS_DATA.find(c => c.tracks && c.tracks.some(t => t.id === trackId));
  const lastVisited = PlatformState.lastVisited;

  const html = `
    <div class="platform-wrap">
      <nav class="breadcrumb" aria-label="مسار التنقل">
        <span data-action="showPage" data-page="home" role="link" tabindex="0">🏠 الرئيسية</span>
        <span class="sep">›</span>
        ${career ? `<span data-action="showCareer" data-career-id="${career.id}" role="link" tabindex="0" style="cursor:pointer;">${sanitizeHTML(career.name)}</span><span class="sep">›</span>` : ''}
        <span aria-current="page">${sanitizeHTML(track.title)}</span>
      </nav>

      <div class="track-hero" style="--track-color:${track.color}">
        <div class="track-hero-icon">${track.icon}</div>
        <div class="track-hero-body">
          <div class="track-level-badge">${sanitizeHTML(track.level)}</div>
          <h1 class="track-hero-title">${sanitizeHTML(track.title)}</h1>
          <p class="track-hero-sub">${sanitizeHTML(track.subtitle)}</p>
          <div class="track-hero-meta">
            <span>📅 ${sanitizeHTML(track.duration)}</span>
            <span>📖 ${track.totalLessons} درس</span>
            <span>🎯 ${track.courses.length} كورس</span>
          </div>
        </div>
        <div class="track-progress-ring-wrap">
          <svg class="progress-ring" width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="7"/>
            <circle cx="40" cy="40" r="32" fill="none" stroke="white" stroke-width="7"
              stroke-linecap="round"
              stroke-dasharray="${2 * Math.PI * 32}"
              stroke-dashoffset="${2 * Math.PI * 32 * (1 - totalPct / 100)}"
              transform="rotate(-90 40 40)"
              style="transition:stroke-dashoffset 1s ease"/>
          </svg>
          <div class="progress-ring-text">${totalPct}%</div>
        </div>
      </div>

      ${lastVisited?.trackId === trackId ? `
        <div class="continue-banner" data-action="continueLearning">
          <div class="continue-icon">▶</div>
          <div class="continue-info">
            <div class="continue-label">متابعة من حيث توقفت</div>
            <div class="continue-title">${sanitizeHTML(getCourseById(trackId, lastVisited.courseId)?.title || '')}</div>
          </div>
          <div class="continue-arrow">←</div>
        </div>
      ` : ''}

      <div class="courses-list">
        ${track.courses.map((course, ci) => {
          const pct = platform_getCourseProgress(trackId, course.id);
          const isDone = pct === 100;
          return `
            <div class="course-card ${isDone ? 'course-done' : ''}"
                 data-action="showCourse"
                 data-track-id="${trackId}"
                 data-course-id="${course.id}"
                 role="button" tabindex="0">
              <div class="course-num">${ci + 1}</div>
              <div class="course-body">
                <div class="course-title">${sanitizeHTML(course.title)}</div>
                <div class="course-meta">
                  <span>📅 ${sanitizeHTML(course.duration)}</span>
                  <span>📖 ${course.lessons.length} درس</span>
                </div>
                <div class="course-progress-bar">
                  <div class="course-progress-fill" style="width:${pct}%;background:${track.color}"></div>
                </div>
              </div>
              <div class="course-status">
                ${isDone
                  ? '<span class="status-done">✓ مكتمل</span>'
                  : `<span class="status-pct" style="color:${track.color}">${pct}%</span>`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  setHTML('platform-page-inner', html);
  showPage('platform');
}

/** النسخة القديمة (كاملة بدون أي تغيير) — تُستخدم كـ Fallback نهائي */
function _legacyShowCourseView(trackId, courseId) {
  /* [F] Flow enforcement — course requires valid track */
  if (!canOpenCourse(trackId, courseId)) return;
  const track = getTrackById(trackId);
  const course = getCourseById(trackId, courseId);
  if (!track || !course) return;

  AppState.currentTrack  = trackId;
  AppState.currentCourse = courseId;
  const coursePct = platform_getCourseProgress(trackId, courseId);

  const html = `
    <div class="platform-wrap">
      <nav class="breadcrumb" aria-label="مسار التنقل">
        <span data-action="showPage" data-page="home" role="link" tabindex="0">🏠 الرئيسية</span>
        <span class="sep">›</span>
        <span data-action="showTrack" data-track-id="${trackId}" role="link" tabindex="0" style="cursor:pointer;">${sanitizeHTML(track.title)}</span>
        <span class="sep">›</span>
        <span aria-current="page">${sanitizeHTML(course.title)}</span>
      </nav>

      <button class="back-btn" data-action="showTrack" data-track-id="${trackId}">← العودة للمسار</button>

      <div class="course-hero" style="border-color:${track.color}20">
        <div class="course-hero-icon" style="color:${track.color}">${track.icon}</div>
        <div>
          <h1 class="course-hero-title">${sanitizeHTML(course.title)}</h1>
          <p class="course-hero-meta">📅 ${sanitizeHTML(course.duration)} · ${course.lessons.length} درس</p>
          <div class="course-progress-bar" style="margin-top:10px">
            <div class="course-progress-fill" style="width:${coursePct}%;background:${track.color}"></div>
          </div>
          <div style="font-size:12px;color:var(--muted);margin-top:4px;">${coursePct}% مكتمل</div>
        </div>
      </div>

      <div class="lessons-list">
        ${course.lessons.map((lesson, li) => {
          const done = platform_isLessonDone(trackId, courseId, lesson.id);
          const typeIcon = lesson.type === 'فيديو' ? '🎬' : lesson.type === 'تدريب' ? '💪' : '🚀';
          return `
            <div class="lesson-item ${done ? 'lesson-done' : ''}"
                 data-action="openLesson"
                 data-track-id="${trackId}"
                 data-course-id="${courseId}"
                 data-lesson-id="${lesson.id}"
                 role="button" tabindex="0">
              <div class="lesson-num ${done ? 'lesson-num-done' : ''}" style="${!done ? `background:${track.color}15;color:${track.color}` : ''}">
                ${done ? '✓' : li + 1}
              </div>
              <div class="lesson-body">
                <div class="lesson-title">${sanitizeHTML(lesson.title)}</div>
                <div class="lesson-meta">
                  <span>${typeIcon} ${sanitizeHTML(lesson.type)}</span>
                  <span>⏱ ${sanitizeHTML(lesson.duration)}</span>
                </div>
              </div>
              <div class="lesson-arrow" style="${done ? 'opacity:.4' : `color:${track.color}`}">←</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  setHTML('platform-page-inner', html);
  showPage('platform');
}

/** النسخة القديمة (كاملة بدون أي تغيير) — تُستخدم كـ Fallback نهائي */
function _legacyShowLessonView(trackId, courseId, lessonId) {
  /* [F] Flow enforcement — lesson requires valid track + course chain */
  if (!canOpenLesson(trackId, courseId, lessonId)) return;
  const track = getTrackById(trackId);
  const course = getCourseById(trackId, courseId);
  if (!track || !course) return;

  const lesson = course.lessons.find(l => l.id === lessonId);
  if (!lesson) return;

  const lessonIndex = course.lessons.findIndex(l => l.id === lessonId);
  const nextLesson  = course.lessons[lessonIndex + 1];
  const prevLesson  = course.lessons[lessonIndex - 1];
  const isDone      = platform_isLessonDone(trackId, courseId, lessonId);
  const typeIcon    = lesson.type === 'فيديو' ? '🎬' : lesson.type === 'تدريب' ? '💪' : '🚀';
  const typeColor   = lesson.type === 'فيديو' ? track.color : lesson.type === 'تدريب' ? '#0d8a5f' : '#e8a81a';

  const html = `
    <div class="lesson-wrap">
      <nav class="breadcrumb" aria-label="مسار التنقل">
        <span data-action="showPage" data-page="home" role="link" tabindex="0">🏠</span>
        <span class="sep">›</span>
        <span data-action="showTrack" data-track-id="${trackId}" role="link" tabindex="0" style="cursor:pointer;">${sanitizeHTML(track.title)}</span>
        <span class="sep">›</span>
        <span data-action="showCourse" data-track-id="${trackId}" data-course-id="${courseId}" role="link" tabindex="0" style="cursor:pointer;">${sanitizeHTML(course.title)}</span>
        <span class="sep">›</span>
        <span aria-current="page">${sanitizeHTML(lesson.title)}</span>
      </nav>

      <div class="lesson-header">
        <div class="lesson-type-badge" style="background:${typeColor}15;color:${typeColor}">${typeIcon} ${sanitizeHTML(lesson.type)}</div>
        <h1 class="lesson-title-big">${sanitizeHTML(lesson.title)}</h1>
        <div class="lesson-header-meta">
          <span>⏱ ${sanitizeHTML(lesson.duration)}</span>
          <span>📖 ${sanitizeHTML(course.title)}</span>
          ${isDone ? '<span class="done-badge">✓ مكتمل</span>' : ''}
        </div>
      </div>

      <div class="lesson-content-area">
        ${generateLessonContent(lesson, track)}
      </div>

      <div class="lesson-actions">
        ${prevLesson ? `
          <button class="lesson-nav-btn lesson-prev"
                  data-action="openLesson"
                  data-track-id="${trackId}"
                  data-course-id="${courseId}"
                  data-lesson-id="${prevLesson.id}">→ السابق</button>
        ` : '<div></div>'}

        ${lesson.type === 'فيديو' ? (!isDone ? `
          <button class="lesson-complete-btn"
                  data-action="markLessonDone"
                  data-track-id="${trackId}"
                  data-course-id="${courseId}"
                  data-lesson-id="${lessonId}"
                  style="background:${track.color}">✓ إنهاء الدرس</button>
        ` : `<div class="lesson-done-state">✓ أنهيت هذا الدرس</div>`) : '<div></div>'}

        ${nextLesson ? `
          <button class="lesson-nav-btn lesson-next"
                  data-action="openLesson"
                  data-track-id="${trackId}"
                  data-course-id="${courseId}"
                  data-lesson-id="${nextLesson.id}"
                  style="border-color:${track.color};color:${track.color}">← الدرس التالي</button>
        ` : `
          <button class="lesson-nav-btn lesson-next"
                  data-action="showCourse"
                  data-track-id="${trackId}"
                  data-course-id="${courseId}"
                  style="border-color:${track.color};color:${track.color}">🎉 إنهاء الكورس</button>
        `}
      </div>
    </div>
  `;

  setHTML('platform-page-inner', html);
  showPage('platform');

  // Persist last visited via AppState
  AppState.currentTrack  = trackId;
  AppState.currentCourse = courseId;
  AppState.currentLesson = lessonId;
  saveProgress();
}

function generateLessonContent(lesson, track) {
  if (lesson.type === 'فيديو') {
    const embedSrc = lesson.videoUrl && lesson.videoUrl.trim()
      ? lesson.videoUrl.trim()
      : '';
    const videoBlock = embedSrc
      ? `<iframe width="100%" height="100%" src="${embedSrc}" frameborder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen></iframe>`
      : `<div class="video-no-url">🎬 لم يُضف رابط الفيديو بعد</div>`;
    return `
      <div class="lesson-video-mock" style="border-color:${track.color}30">
        <div class="video-placeholder" style="background:${track.color}10">
          ${videoBlock}
        </div>
          <div class="video-label">محاضرة: ${sanitizeHTML(lesson.title)}</div>
          <div class="video-duration">${sanitizeHTML(lesson.duration)}</div>
        </div>
        <div class="lesson-body-text">
          <h3>ماذا ستتعلم في هذا الدرس؟</h3>
          <ul class="lesson-objectives">
            <li>فهم المفهوم الأساسي لـ ${sanitizeHTML(lesson.title)}</li>
           
          </ul>
          <div class="lesson-note">💡 <strong>ملاحظة:</strong>  هذا المحتوى مقدم من المحاضر عبدالرحمن جمال برعاية اكاديمية (Nouvil) </div>
        </div>
      </div>`;
  }
  if (lesson.type === 'تدريب') {
    /* ── Quiz mode ── */
    if (lesson.quizData && lesson.quizData.questions) {
      const qd = lesson.quizData;
      const langColors = {html:'#e34c26', css:'#264de4', js:'#f7df1e'};
      const langNames  = {html:'HTML', css:'CSS', js:'JavaScript'};
      const lc = langColors[qd.lang] || track.color;
      const ln = langNames[qd.lang]  || qd.lang;
      const qs = qd.questions.map((q, qi) => `
        <div class="quiz-q" id="qq-${qi}" data-qi="${qi}">
          <div class="quiz-q-num">${qi+1}</div>
          <div class="quiz-q-body">
            <p class="quiz-q-text">${sanitizeHTML(q.q)}</p>
            <div class="quiz-opts">
              ${q.opts.map((o, oi) => `
                <button class="quiz-opt" data-qi="${qi}" data-oi="${oi}" data-ans="${q.ans}"
                        onclick="quizPickAnswer(this,${qi},${oi},${q.ans})">
                  <span class="quiz-opt-letter">${['A','B','C','D'][oi]}</span>
                  <span>${sanitizeHTML(o)}</span>
                </button>`).join('')}
            </div>
          </div>
        </div>`).join('');
      return `
        <div class="quiz-wrap" style="--qc:${lc}">
          <div class="quiz-header">
            <span class="quiz-lang-badge" style="background:${lc}22;color:${lc};border:1px solid ${lc}44">${ln}</span>
            <h2 class="quiz-title">${sanitizeHTML(lesson.title)}</h2>
            <div class="quiz-meta">${qd.questions.length} أسئلة · اختر الإجابة الصحيحة</div>
          </div>
          <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="qpfill" style="width:0%;background:${lc}"></div></div>
          <div class="quiz-questions">${qs}</div>
          <div class="quiz-result" id="quiz-result" style="display:none">
            <div class="quiz-result-icon" id="qr-icon">🏆</div>
            <div class="quiz-result-score" id="qr-score"></div>
            <div class="quiz-result-msg"  id="qr-msg"></div>
            <button class="quiz-retry-btn" style="background:${lc}" onclick="quizRetry()">🔄 حاول مرة أخرى</button>
          </div>
        </div>
        <script>
        (function(){
          window._quizTotal = ${qd.questions.length};
          window._quizDone  = 0;
          window._quizScore = 0;
          window.quizPickAnswer = function(btn, qi, oi, ans) {
            const wrap = document.getElementById('qq-'+qi);
            if (wrap.dataset.done) return;
            wrap.dataset.done = '1';
            const correct = (oi === ans);
            if (correct) { btn.classList.add('quiz-opt-correct'); window._quizScore++; }
            else {
              btn.classList.add('quiz-opt-wrong');
              wrap.querySelectorAll('.quiz-opt')[ans].classList.add('quiz-opt-correct');
            }
            wrap.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);
            window._quizDone++;
            document.getElementById('qpfill').style.width = (window._quizDone/window._quizTotal*100)+'%';
            if (window._quizDone === window._quizTotal) {
              setTimeout(function(){
                const sc = window._quizScore, tot = window._quizTotal;
                const pct = Math.round(sc/tot*100);
                document.getElementById('qr-score').textContent = sc+' / '+tot+' ('+pct+'%)';
                document.getElementById('qr-icon').textContent  = pct>=80?'🏆':pct>=60?'👍':'💪';
                document.getElementById('qr-msg').textContent   = pct>=80?'ممتاز! أنت تتقن هذه المادة':pct>=60?'جيد! راجع الأسئلة الخاطئة':'حاول مرة أخرى بعد المراجعة';
                document.getElementById('quiz-result').style.display='flex';
              }, 500);
            }
          };
          window.quizRetry = function() {
            window._quizDone=0; window._quizScore=0;
            document.getElementById('qpfill').style.width='0%';
            document.getElementById('quiz-result').style.display='none';
            document.querySelectorAll('.quiz-q').forEach(function(w){
              delete w.dataset.done;
              w.querySelectorAll('.quiz-opt').forEach(function(b){
                b.classList.remove('quiz-opt-correct','quiz-opt-wrong');
                b.disabled=false;
              });
            });
          };
        })();
        <\/script>`;
    }
    /* ── Default exercise mode ── */
    return `
      <div class="lesson-exercise-area">
        <div class="exercise-header" style="background:${track.color}10;border-color:${track.color}30">
          <div style="font-size:32px">💪</div>
          <div>
            <h3>تدريب عملي: ${sanitizeHTML(lesson.title)}</h3>
            <p>طبّق ما تعلمته وأنجز المهمة التالية</p>
          </div>
        </div>
        <div class="exercise-tasks">
          <div class="exercise-task"><div class="task-check">☐</div><div>المهمة الأولى: اقرأ المرجع المرفق</div></div>
          <div class="exercise-task"><div class="task-check">☐</div><div>المهمة الثانية: طبّق المثال بنفسك</div></div>
          <div class="exercise-task"><div class="task-check">☐</div><div>المهمة الثالثة: أرسل نتيجتك للمراجعة</div></div>
        </div>
        <div class="lesson-note">🔧 <strong>تدريب:</strong> نفّذه بنفسك قبل الانتقال للدرس التالي.</div>
      </div>`;
  }
  const projectEmbedSrc = lesson.videoUrl && lesson.videoUrl.trim()
    ? lesson.videoUrl.trim()
    : '';
  const projectVideoBlock = projectEmbedSrc
    ? `<iframe width="100%" height="100%" src="${projectEmbedSrc}" frameborder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowfullscreen></iframe>`
    : `<div class="video-no-url">🎬 لم يُضف رابط الفيديو بعد</div>`;
  return `
    <div class="lesson-video-mock" style="border-color:${track.color}30">
      <div class="video-placeholder" style="background:${track.color}10">
        ${projectVideoBlock}
      </div>
      <div class="video-label">محاضرة: ${sanitizeHTML(lesson.title)}</div>
      <div class="video-duration">${sanitizeHTML(lesson.duration)}</div>
    </div>
    <div class="lesson-body-text">
      <h3>ماذا ستتعلم في هذا الدرس؟</h3>
      <ul class="lesson-objectives">
        <li>فهم المفهوم الأساسي لـ ${sanitizeHTML(lesson.title)}</li>
      </ul>
      <div class="lesson-note">💡 <strong>ملاحظة:</strong> هذا المحتوى مقدم من المحاضر عبدالرحمن جمال برعاية اكاديمية (Nouvil)</div>
    </div>`;
}

/* ─────────────────────────────────────────────
   [4b] VIEWS — النسخ الجديدة (Roadmap Timeline UI)
   بنفس الأسماء القديمة تماماً (showTrackView/showCourseView/
   showLessonView) — كل أماكن الاستدعاء الحالية (events.js،
   platformNavigate، markLessonComplete، intelligence.js)
   تستمر تعمل بدون أي تعديل.

   النمط: رسم فوري لحالة تحميل (بدون أي تأخير محسوس) ثم
   استبدالها بـ RoadmapUI الجديد عند النجاح، أو بالنسخة القديمة
   _legacyShow*View عند أي فشل/استثناء/Timeout — صفر احتمال
   لشاشة فاضية أو كسر سلوك حالي.
   ───────────────────────────────────────────── */

function showTrackView(trackId) {
  if (typeof RoadmapService === 'undefined' || typeof RoadmapUI === 'undefined') {
    return _legacyShowTrackView(trackId);
  }
  setHTML('platform-page-inner', RoadmapUI.renderLoading());
  showPage('platform');

  RoadmapService.getRoadmap(trackId).then(function (roadmap) {
    if (!roadmap) { _legacyShowTrackView(trackId); return; }
    try { RoadmapUI.mount(roadmap, trackId, {}); }
    catch (e) { console.warn('[showTrackView] فشل العرض الجديد، رجوع للنسخة القديمة:', e); _legacyShowTrackView(trackId); }
  }).catch(function (e) {
    console.warn('[showTrackView] خطأ غير متوقع، رجوع للنسخة القديمة:', e);
    _legacyShowTrackView(trackId);
  });
}

function showCourseView(trackId, courseId) {
  if (typeof RoadmapService === 'undefined' || typeof RoadmapUI === 'undefined') {
    return _legacyShowCourseView(trackId, courseId);
  }
  if (!canOpenCourse(trackId, courseId)) return _legacyShowCourseView(trackId, courseId);

  setHTML('platform-page-inner', RoadmapUI.renderLoading());
  showPage('platform');

  RoadmapService.getRoadmap(trackId).then(function (roadmap) {
    if (!roadmap) { _legacyShowCourseView(trackId, courseId); return; }
    try {
      var course = getCourseById(trackId, courseId);
      var firstLessonId = course && course.lessons[0] && course.lessons[0].id;
      var targetSection = firstLessonId
        ? roadmap.sections.find(function (sec) { return sec.steps.some(function (st) { return st.legacy_lesson_id === firstLessonId; }); })
        : null;
      RoadmapUI.mount(roadmap, trackId, { expandSectionSlug: targetSection ? targetSection.slug : undefined });
    } catch (e) {
      console.warn('[showCourseView] فشل العرض الجديد، رجوع للنسخة القديمة:', e);
      _legacyShowCourseView(trackId, courseId);
    }
  }).catch(function (e) {
    console.warn('[showCourseView] خطأ غير متوقع، رجوع للنسخة القديمة:', e);
    _legacyShowCourseView(trackId, courseId);
  });
}

function showLessonView(trackId, courseId, lessonId) {
  if (typeof RoadmapService === 'undefined' || typeof RoadmapUI === 'undefined') {
    return _legacyShowLessonView(trackId, courseId, lessonId);
  }
  if (!canOpenLesson(trackId, courseId, lessonId)) return _legacyShowLessonView(trackId, courseId, lessonId);

  setHTML('platform-page-inner', RoadmapUI.renderLoading());
  showPage('platform');

  RoadmapService.getRoadmap(trackId).then(function (roadmap) {
    if (!roadmap) { _legacyShowLessonView(trackId, courseId, lessonId); return; }
    try {
      var targetSection = roadmap.sections.find(function (sec) { return sec.steps.some(function (st) { return st.legacy_lesson_id === lessonId; }); });
      RoadmapUI.mount(roadmap, trackId, {
        expandSectionSlug: targetSection ? targetSection.slug : undefined,
        highlightLessonId: lessonId
      });
    } catch (e) {
      console.warn('[showLessonView] فشل العرض الجديد، رجوع للنسخة القديمة:', e);
      _legacyShowLessonView(trackId, courseId, lessonId);
    }
  }).catch(function (e) {
    console.warn('[showLessonView] خطأ غير متوقع، رجوع للنسخة القديمة:', e);
    _legacyShowLessonView(trackId, courseId, lessonId);
  });
}

/* ─────────────────────────────────────────────
   [5] PROGRESS — mark complete + award points
   ───────────────────────────────────────────── */

function markLessonComplete(trackId, courseId, lessonId) {
  if (platform_isLessonDone(trackId, courseId, lessonId)) return;

  platform_completeLesson(trackId, courseId, lessonId);

  // مزامنة صامتة (Fire-and-forget) مع جداول Roadmaps الجديدة — لا تؤثر أبداً
  // على تجربة المستخدم الحالية، حتى لو فشلت بالكامل (مستخدم غير مسجّل،
  // Supabase غير متاح، أو أي خطأ آخر).
  if (typeof RoadmapProgressService !== 'undefined') {
    RoadmapProgressService.markStepComplete(trackId, null, lessonId).catch(function () {});
  }

  const lesson = getCourseById(trackId, courseId)?.lessons.find(l => l.id === lessonId);
  const pts = lesson?.type === 'مشروع' ? 30 : lesson?.type === 'تدريب' ? 20 : 10;
  if (typeof addPoints === 'function') addPoints(pts, `درس مكتمل: ${lesson?.title || ''}`);

  if (platform_getCourseProgress(trackId, courseId) === 100) {
    toast('🎉 أكملت الكورس! ممتاز!');
    launchConfetti();
    if (typeof addPoints === 'function') addPoints(50, 'إكمال كورس كامل');
  }
  if (platform_getTrackProgress(trackId) === 100) {
    toast('🏆 أتممت المسار بالكامل! أنت بطل!');
    launchConfetti();
    if (typeof addPoints === 'function') addPoints(200, 'إكمال مسار كامل');
  }

  showLessonView(trackId, courseId, lessonId);
  if (typeof window._renderHomepageIntelligence === 'function') window._renderHomepageIntelligence();
  if (typeof window._renderAllEngagement === 'function') window._renderAllEngagement();
}

/* ─────────────────────────────────────────────
   [6] DISCOVERY — career → tracks section
   ───────────────────────────────────────────── */

function renderCareerTracks(careerId) {
  const tracks = getTracksForCareer(careerId);
  if (!tracks.length) return '';

  return `
    <div class="career-tracks-section">
      <h3>📚 المسارات التعليمية المتاحة</h3>
      <div class="career-tracks-grid">
        ${tracks.map(track => {
          const pct = platform_getTrackProgress(track.id);
          const isStarted = pct > 0;
          const coverImg = track.coverImage || null;
          return `
            <div class="career-track-card"
                 data-action="showTrack"
                 data-track-id="${track.id}"
                 role="button" tabindex="0"
                 style="--track-color:${track.color}">
              <div class="ctc-cover">
                ${coverImg
                  ? `<img src="${coverImg}" alt="${sanitizeHTML(track.title)}" class="ctc-cover-img" loading="lazy">`
                  : `<div class="ctc-cover-fallback" style="background:linear-gradient(135deg,color-mix(in srgb,${track.color} 18%,transparent),color-mix(in srgb,${track.color} 6%,transparent))"><span class="ctc-cover-icon">${track.icon}</span></div>`
                }
                <div class="ctc-cover-overlay" style="--track-color:${track.color}"></div>
                <div class="ctc-level-badge">${sanitizeHTML(track.level)}</div>
                <div class="ctc-cover-icon-badge">${track.icon}</div>
              </div>
              <div class="ctc-body">
                <div class="ctc-title">${sanitizeHTML(track.title)}</div>
                <div class="ctc-subtitle">${sanitizeHTML(track.subtitle)}</div>
                ${track.longDesc ? `<div class="ctc-long-desc">${sanitizeHTML(track.longDesc)}</div>` : ''}
                <div class="ctc-meta">
                  <span>📅 ${sanitizeHTML(track.duration)}</span>
                  <span>📖 ${track.totalLessons} درس</span>
                  <span>🎯 ${track.courses.length} كورس</span>
                </div>
                ${isStarted ? `
                  <div class="ctc-progress">
                    <div class="ctc-progress-fill" style="width:${pct}%;background:${track.color}"></div>
                  </div>
                  <div class="ctc-pct" style="color:${track.color}">${pct}% مكتمل</div>
                ` : `<div class="ctc-start" style="color:${track.color}">ابدأ المسار الآن ←</div>`}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

/* ─────────────────────────────────────────────
   [7] DASHBOARD — continue-learning widgets
   ───────────────────────────────────────────── */

function renderContinueLearning() {
  const el = $('continue-learning-section');
  if (!el) return;

  const { currentTrack: tId, currentCourse: cId, currentLesson: lId } = AppState;
  if (!tId || !cId || !lId) {
    el.innerHTML = `
      <div class="continue-empty">
        <div style="font-size:32px">🚀</div>
        <p>لم تبدأ أي مسار تعليمي بعد</p>
        <button class="btn btn-primary btn-sm" data-action="showPage" data-page="library" style="margin-top:10px">اكتشف المسارات</button>
      </div>`;
    return;
  }

  const track  = getTrackById(tId);
  const course = getCourseById(tId, cId);
  const lesson = course?.lessons.find(l => l.id === lId);
  if (!track || !course || !lesson) return;

  const pct = platform_getTrackProgress(tId);
  el.innerHTML = `
    <div class="continue-card" style="--track-color:${track.color}">
      <div class="cc-header">
        <div class="cc-icon">${track.icon}</div>
        <div class="cc-info">
          <div class="cc-track">${sanitizeHTML(track.title)}</div>
          <div class="cc-lesson">▶ ${sanitizeHTML(lesson.title)}</div>
          <div class="cc-meta">📖 ${sanitizeHTML(course.title)}</div>
        </div>
        <div class="cc-pct" style="color:${track.color}">${pct}%</div>
      </div>
      <div class="cc-progress">
        <div class="cc-progress-fill" style="width:${pct}%;background:${track.color}"></div>
      </div>
      <button class="cc-btn" data-action="continueLearning" style="background:${track.color}">
        ▶ متابعة من حيث توقفت
      </button>
    </div>`;
}

function renderPlatformProgress() {
  const el = $('platform-progress-section');
  if (!el) return;

  const startedTracks = getAllTracks().filter(t => platform_getTrackProgress(t.id) > 0);

  if (!startedTracks.length) {
    el.innerHTML = `<p style="color:var(--muted);font-size:14px;text-align:center;padding:20px 0">لم تبدأ أي مسار تعليمي بعد</p>`;
    return;
  }

  el.innerHTML = startedTracks.map(track => {
    const pct = platform_getTrackProgress(track.id);
    return `
      <div class="dash-track-item">
        <div class="dti-icon">${track.icon}</div>
        <div class="dti-body">
          <div class="dti-title">${sanitizeHTML(track.title)}</div>
          <div class="dti-bar">
            <div class="dti-fill" style="width:${pct}%;background:${track.color}"></div>
          </div>
          <div class="dti-pct" style="color:${track.color}">${pct}%</div>
        </div>
        <button class="dti-continue"
                data-action="showTrack"
                data-track-id="${track.id}"
                style="border-color:${track.color}30;color:${track.color}">تابع</button>
      </div>`;
  }).join('');
}

/* ─────────────────────────────────────────────
   [8] ACTION BRIDGE — maps data-action strings
   These are registered into events.js ACTION_MAP
   ───────────────────────────────────────────── */

const PLATFORM_ACTIONS = {
  showTrack:        el => showTrackView(el.dataset.trackId),
  showCourse:       el => showCourseView(el.dataset.trackId, el.dataset.courseId),
  openLesson:       el => showLessonView(el.dataset.trackId, el.dataset.courseId, el.dataset.lessonId),
  markLessonDone:   el => markLessonComplete(el.dataset.trackId, el.dataset.courseId, el.dataset.lessonId),
  continueLearning: ()  => continueLastLesson(),
};

/* PLATFORM_ACTIONS are merged directly into ACTION_MAP in events.js */

/* API-ready stubs */
async function fetchTracks()               { return getAllTracks(); }
async function syncProgressToAPI(uid, p)   { saveProgress(); return { success: true }; }
async function fetchUserProgress(uid)      { return AppState.progress; }

/* ── Expose for URL restore on init ── */
window._platformRestoreFromURL = platformRestoreFromURL;
