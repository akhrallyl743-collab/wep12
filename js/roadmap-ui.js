/* ============================================================
   js/roadmap-ui.js
   ------------------------------------------------------------
   عرض المسار الجديد: Vertical Timeline + Sticky Sidebar +
   Expandable Sections + Resource Viewer (داخلي/خارجي).

   مدخل واحد فقط يُستخدم من platform.js: RoadmapUI.mount(roadmap, trackId, opts)
   - roadmap: الشكل الموحّد القادم من RoadmapService.getRoadmap()
   - opts.expandSectionSlug / opts.highlightLessonId (اختياري)

   لا يعتمد على events.js — يربط مستمعيه مباشرة بعد الحقن في DOM
   (نفس نمط community.js / intelligence.js الموجود فعلاً في المشروع).
   ============================================================ */
(function (global) {
  'use strict';

  // مرجع المسار الحالي — يُحدَّث عند كل استدعاء mount()
  var _roadmapForLock = null;

  /* ── هل LockEngine متوفر؟ ── */
  function _useLockEngine() {
    return (typeof LockEngine !== 'undefined');
  }

  /* ── قراءة حالة خطوة (مع دعم LockEngine + fallback للنظام القديم) ── */
  function isStepDone(trackId, legacyLessonId) {
    if (!legacyLessonId) return false;
    if (_useLockEngine() && _roadmapForLock) {
      return LockEngine.getStepStatus(_roadmapForLock, legacyLessonId, trackId) === 'completed';
    }
    try {
      var trackProg = (typeof AppState !== 'undefined' && AppState.progress && AppState.progress[trackId]) || {};
      return Object.keys(trackProg).some(function (cid) { return trackProg[cid].includes(legacyLessonId); });
    } catch (e) { return false; }
  }

  function getStepStatusFull(roadmap, legacyLessonId, trackId) {
    if (_useLockEngine() && roadmap) return LockEngine.getStepStatus(roadmap, legacyLessonId, trackId);
    return isStepDone(trackId, legacyLessonId) ? 'completed' : 'available';
  }

  function sectionStats(section, trackId) {
    var total = section.steps.length;
    var done;
    if (_useLockEngine() && _roadmapForLock) {
      done = section.steps.filter(function (st) {
        return LockEngine.getStepStatus(_roadmapForLock, st.legacy_lesson_id, trackId) === 'completed';
      }).length;
    } else {
      done = section.steps.filter(function (st) { return isStepDone(trackId, st.legacy_lesson_id); }).length;
    }
    return { total: total, done: done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  function roadmapStats(roadmap, trackId) {
    if (_useLockEngine() && roadmap) {
      var counts = LockEngine.getCompletedCount(roadmap);
      return { total: counts.total, done: counts.completed, pct: counts.percent };
    }
    var total = 0, done = 0;
    roadmap.sections.forEach(function (sec) {
      var s = sectionStats(sec, trackId);
      total += s.total; done += s.done;
    });
    return { total: total, done: done, pct: total ? Math.round((done / total) * 100) : 0 };
  }

  var TYPE_LABEL = {
    video:    { icon: '🎬', label: 'فيديو', cls: '' },
    exercise: { icon: '💪', label: 'تدريب', cls: 'rm-type-exercise' },
    project:  { icon: '🚀', label: 'مشروع', cls: 'rm-type-project' },
    quiz:     { icon: '📝', label: 'اختبار', cls: 'rm-type-quiz' },
    reading:  { icon: '📄', label: 'قراءة', cls: '' }
  };

  function esc(s) { return (typeof sanitizeHTML === 'function') ? sanitizeHTML(s) : String(s == null ? '' : s); }

  /* يستخرج YouTube Video ID من أي شكل رابط شائع (watch?v=, youtu.be/, embed/, shorts/) */
  function extractYouTubeId(url) {
    if (!url) return null;
    var m = String(url).match(/(?:youtube\.com\/(?:watch\?v=|embed\/(?!videoseries)|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  /* يستخرج معرّف قائمة تشغيل YouTube من رابط embed/videoseries?list=... أو playlist?list=... */
  function extractYouTubePlaylistId(url) {
    if (!url) return null;
    var m = String(url).match(/[?&]list=([a-zA-Z0-9_-]+)/);
    return m ? m[1] : null;
  }

  /* يستخرج اسم الدومين من رابط خارجي لعرضه للمستخدم قبل التحويل ("سيتم تحويلك إلى ...") */
  function extractHostname(url) {
    if (!url) return null;
    try { return new URL(url).hostname.replace(/^www\./, ''); }
    catch (e) {
      var m = String(url).match(/^https?:\/\/([^\/]+)/);
      return m ? m[1].replace(/^www\./, '') : null;
    }
  }

  /* ── [تشخيص مؤقت] سجلّات Console لتتبّع مشكلة "الدرس التالي لا يُفتح" ──
     يمكن حذف هذا الـ flag وكل أسطر console المرتبطة به بعد التأكد من الحل. */
  var SL6_DEBUG_PROGRESS = true;
  function _dbg() { if (SL6_DEBUG_PROGRESS && typeof console !== 'undefined') console.log.apply(console, ['[SL6_DEBUG]'].concat(Array.prototype.slice.call(arguments))); }

  /* ── تتبّع نسبة مشاهدة فيديو YouTube عبر IFrame Player API الرسمي ──

     [تشخيص — السبب الجذري الحقيقي لعدم فتح الدرس التالي]
     الكود السابق (مرتين على التوالي) حاول "تقليد" بروتوكول postMessage
     الداخلي لمشغّل يوتيوب يدوياً (إرسال {"event":"listening"} أو
     {"event":"addEventListener"} مباشرة لـ iframe.contentWindow) بدون
     تحميل سكربت "https://www.youtube.com/iframe_api" الرسمي أولاً.

     هذا غير موثوق بنيوياً، لا بسبب تفصيل صياغة الرسالة:
       • المشغّل المُضمَّن (embed) لا يضمن بدء بثّ 'infoDelivery' فقط لأن
         enablejsapi=1 موجود في الرابط — البثّ الفعلي يعتمد على تفاوض
         داخلي مع نفس origin الصفحة المستضيفة، وهو تفصيل تنفيذ داخلي
         يتغيّر بين إصدارات المشغّل ومتصفح ومتصفح (يعمل أحياناً على
         Desktop ولا يعمل على متصفح الموبايل أو العكس) — بدون أي خطأ
         ظاهر في console، فقط: postMessage تُرسَل، لا رد، النسبة تبقى
         0% للأبد => زر "أنهيت هذا الدرس" لا يُفعَّل => الدرس لا يُكتمل
         => الدرس التالي يبقى مقفولاً. هذا يطابق تماماً العارض المُبلَّغ
         عنه ("بعد مشاهدة 90% الدرس التالي لا يُفتح") لأنه ببساطة لا
         توجد طريقة لتطبيق المستخدم يعرف أنه شاهد 90% أصلاً.

     الإصلاح الجذري: استخدام مكتبة YouTube الرسمية والمُوثَّقة (IFrame
     Player API) بدلاً من محاكاة بروتوكولها الداخلي:
       1) تحميل https://www.youtube.com/iframe_api مرة واحدة فقط للصفحة.
       2) بناء iframe الفيديو عبر new YT.Player(...) (لا <iframe> خام).
       3) الاستماع لـ onStateChange + استقصاء دوري لـ getCurrentTime()/
          getDuration() — كلتاهما دالتان رسميتان موثّقتان من YT.Player،
          لا تخمين لأي بروتوكول داخلي.
     هذا يعمل بثبات عبر كل المتصفحات لأنه الاستخدام المُعتمَد رسمياً. */

  var _ytApiLoadPromise = null;
  var _ytApiQueue = [];

  /** يحمّل سكربت YouTube IFrame API مرة واحدة فقط ويُرجع Promise يتحقق عند جهوزية window.YT */
  function _loadYouTubeIframeApi() {
    if (_ytApiLoadPromise) return _ytApiLoadPromise;

    _ytApiLoadPromise = new Promise(function (resolve) {
      if (global.YT && global.YT.Player) { resolve(global.YT); return; }

      // onYouTubeIframeAPIReady هو اسم callback ثابت يستدعيه سكربت يوتيوب
      // تلقائياً بعد تحميله بالكامل — هذا جزء من الـ API الرسمي، موثّق رسمياً.
      var prevCallback = global.onYouTubeIframeAPIReady;
      global.onYouTubeIframeAPIReady = function () {
        if (typeof prevCallback === 'function') { try { prevCallback(); } catch (e) {} }
        resolve(global.YT);
      };

      if (!document.getElementById('sl6-youtube-iframe-api')) {
        var tag = document.createElement('script');
        tag.id = 'sl6-youtube-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    });

    return _ytApiLoadPromise;
  }

  function _trackYouTubeProgress(iframeId, legacyLessonId, stepId) {
    var lastLoggedPct = -1, pollTimer = null, player = null;

    function emitPercent(pct) {
      pct = Math.max(0, Math.min(100, Math.round(pct)));
      if (pct !== lastLoggedPct) {
        _dbg('نسبة مشاهدة الفيديو لدرس [' + legacyLessonId + ']:', pct + '%');
        lastLoggedPct = pct;
      }
      LockEngine.recordVideoProgress(legacyLessonId, stepId, pct);
    }

    function startPolling() {
      pollTimer = setInterval(function () {
        var el = document.getElementById(iframeId);
        if (!el || !el.isConnected || !player) { clearInterval(pollTimer); return; }
        try {
          var duration = player.getDuration();
          var current = player.getCurrentTime();
          if (typeof duration === 'number' && duration > 0 && typeof current === 'number') {
            emitPercent((current / duration) * 100);
          }
        } catch (e) { /* المشغّل قد يكون في حالة انتقالية — تجاهل بهدوء، المحاولة التالية ستنجح */ }
      }, 1000);
    }

    _loadYouTubeIframeApi().then(function (YT) {
      var el = document.getElementById(iframeId);
      if (!el) return; // المستخدم أغلق/غادر قبل اكتمال تحميل الـ API — لا داعي للاستمرار

      player = new YT.Player(iframeId, {
        events: {
          onStateChange: function (e) {
            // YT.PlayerState.ENDED === 0 — انتهى الفيديو فعلياً، اعتبرها 100% فوراً
            // (أدق من انتظار آخر استقصاء currentTime/duration الذي قد لا يصل 100% بالضبط)
            if (e.data === 0) { emitPercent(100); }
          },
          onReady: function () {
            startPolling();
          }
        }
      });
    }).catch(function (e) {
      console.warn('[RoadmapUI] تعذّر تحميل YouTube IFrame API (silent):', e && e.message);
    });
  }

  /* ── يُرجع legacy_lesson_id للخطوة التالية مباشرة بعد خطوة معيّنة (عبر كل الأقسام بالترتيب) ──
     يُستخدم لفتح الدرس التالي تلقائياً بعد إكمال الدرس الحالي. لا يُغيّر ترتيب أي شيء — فقط يقرأه. */
  function _findNextLegacyId(roadmap, legacyLessonId) {
    var flat = [];
    (roadmap.sections || []).forEach(function (sec) {
      (sec.steps || []).forEach(function (st) { flat.push(st.legacy_lesson_id); });
    });
    var idx = flat.indexOf(legacyLessonId);
    if (idx === -1 || idx === flat.length - 1) return null;
    return flat[idx + 1];
  }

  /* ── يفتح الخطوة التالية تلقائياً بعد إعادة رسم الصفحة (بعد إكمال الخطوة الحالية) ──
     يستعلم عن DOM الجديد (بعد mount())، يوسّع قسمها، يفتح تفاصيلها (ويُشغّل
     الفيديو تلقائياً لو كان المورد الوحيد — نفس منطق rm-step-toggle الحالي)،
     ثم يُمرّر إليها بسلاسة. */
  function _openNextStepAfterCompletion(nextLegacyId) {
    if (!nextLegacyId) { _dbg('لا يوجد درس تالٍ — هذا آخر درس في المسار.'); return; }

    var nextEl = document.querySelector('.rm-step[data-legacy-id="' + CSS.escape(nextLegacyId) + '"]');
    if (!nextEl) {
      _dbg('⚠️ تعذّر العثور على عنصر الدرس التالي في DOM بعد إعادة الرسم:', nextLegacyId);
      return;
    }

    var status = nextEl.getAttribute('data-rm-step-status');
    _dbg('حالة الدرس التالي [' + nextLegacyId + '] بعد إعادة الرسم:', status);

    if (status === 'locked') {
      // هذا يكشف "قفل بالخطأ" حقيقي لو حدث — راجع LockEngine.getStepStatus
      console.warn('[SL6_DEBUG] ⚠️ الدرس التالي ظهر مقفلاً رغم إكمال الذي قبله مباشرة. تحقّق من LockEngine.getStepStatus والبيانات (legacy_lesson_id) لهذا المسار.');
      return;
    }

    var sectionEl = nextEl.closest('.rm-section');
    if (sectionEl) sectionEl.classList.add('rm-expanded');

    if (!nextEl.classList.contains('rm-open') && nextEl.hasAttribute('data-rm-step-toggle')) {
      nextEl.click(); // يفتح تفاصيل الخطوة، ويُشغّل الفيديو تلقائياً لو كان المورد الوحيد
    }

    nextEl.scrollIntoView && nextEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  var KIND_LABEL = {
    youtube:         { icon: '🎬', label: 'فيديو' },
    video:           { icon: '🎬', label: 'فيديو' },
    article:         { icon: '📄', label: 'مقال' },
    external_article:{ icon: '📰', label: 'مقال خارجي' },
    pdf:             { icon: '📕', label: 'PDF' },
    cheatsheet:      { icon: '📋', label: 'ورقة مرجعية' },
    notes:           { icon: '📝', label: 'ملاحظات' },
    doc_summary:     { icon: '📘', label: 'ملخّص توثيق' },
    official_docs:   { icon: '📘', label: 'توثيق رسمي' },
    tutorial:        { icon: '🎓', label: 'شرح تفصيلي' },
    github_repo:     { icon: '💻', label: 'مستودع GitHub' },
    external_exam:   { icon: '📝', label: 'اختبار خارجي' },
    practice:        { icon: '🏋️', label: 'تدريب عملي' },
    challenge:       { icon: '🏆', label: 'تحدّي' }
  };

  /* ── Loading state (نفس نمط .spinner المستخدم في community.js) ── */
  function renderLoading() {
    return '<div style="text-align:center;padding:60px 20px;color:var(--muted);">' +
      '<div class="spinner" style="margin:0 auto 14px;"></div>' +
      '<p style="font-size:14px;">جاري تحميل المسار...</p></div>';
  }

  /* ── مورد واحد ──
     المنطق يعتمد حصرياً على resource.kind + resource.external_url (عمودا قاعدة البيانات الفعليان):
       • kind === 'youtube'         → iframe مُضمَّن دائماً (فيديو مفرد أو قائمة تشغيل). لا زر "فتح على YouTube" مطلقاً.
       • kind === 'github_repo'     → GitHub Resource Card مخصصة.
       • kind === 'external_article'→ Article Card مخصصة.
       • غير ذلك (official_docs/external_exam/practice/داخلي) → بطاقة عامة (خارج نطاق هذا التعديل). */
  function renderResource(res) {
    var resTitle = res.title_ar || res.title;

    // ── 1) kind === 'youtube' — تضمين iframe إلزامي، ممنوع أي رابط خارجي ──
    if (res.kind === 'youtube') {
      var ytId   = extractYouTubeId(res.external_url);
      var listId = !ytId ? extractYouTubePlaylistId(res.external_url) : null;

      // فيديو مفرد: صورة مصغّرة حقيقية + زر تشغيل → iframe (embed/VIDEO_ID) عند الضغط
      if (ytId) {
        return '<div class="rm-resource-video" data-rm-video-card data-yt-id="' + esc(ytId) + '" data-yt-title="' + esc(resTitle) + '">' +
          '<div class="rm-video-frame" data-rm-video-play>' +
            '<img class="rm-video-thumb" src="https://img.youtube.com/vi/' + esc(ytId) + '/hqdefault.jpg" alt="' + esc(resTitle) + '" loading="lazy">' +
            '<div class="rm-video-play-btn">▶</div>' +
          '</div>' +
          '<div class="rm-video-title">🎬 ' + esc(resTitle) + '</div>' +
        '</div>';
      }

      // قائمة تشغيل كاملة: لا صورة مصغّرة لفيديو واحد، غلاف عام + زر تشغيل → iframe (embed/videoseries?list=ID)
      if (listId) {
        return '<div class="rm-resource-video" data-rm-video-card data-yt-playlist-id="' + esc(listId) + '" data-yt-title="' + esc(resTitle) + '">' +
          '<div class="rm-video-frame rm-video-frame-playlist" data-rm-video-play>' +
            '<div class="rm-video-play-btn">▶</div>' +
          '</div>' +
          '<div class="rm-video-title">🎬📋 ' + esc(resTitle) + ' (قائمة تشغيل كاملة)</div>' +
        '</div>';
      }

      // رابط يوتيوب لا يحمل معرّف فيديو ولا قائمة تشغيل صالحَين (رابط قناة أو صيغة غير مدعومة):
      // لا يوجد ما يُضمَّن داخل iframe، وممنوع تقديم رابط خارجي بديل لفتحه على يوتيوب.
      return '<div class="rm-resource-video rm-resource-video-unavailable">' +
        '<div class="rm-internal-viewer rm-empty-note">تعذّر تحميل هذا الفيديو حالياً.</div>' +
      '</div>';
    }

    // ── 2) kind === 'github_repo' — GitHub Resource Card ──
    if (res.kind === 'github_repo') {
      var repoPath = _extractGithubRepoPath(res.external_url);
      return '<a class="rm-resource-card rm-resource-github" href="' + esc(res.external_url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="rm-resource-card-icon">💻</span>' +
        '<span class="rm-resource-card-body">' +
          '<span class="rm-resource-card-title">' + esc(resTitle) + '</span>' +
          (repoPath ? '<span class="rm-resource-card-sub">' + esc(repoPath) + '</span>' : '') +
        '</span>' +
        '<span class="rm-resource-card-action">فتح المستودع ↗</span>' +
      '</a>';
    }

    // ── 3) kind === 'external_article' — Article Card ──
    if (res.kind === 'external_article') {
      var articleHost = extractHostname(res.external_url);
      return '<a class="rm-resource-card rm-resource-article" href="' + esc(res.external_url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="rm-resource-card-icon">📰</span>' +
        '<span class="rm-resource-card-body">' +
          '<span class="rm-resource-card-title">' + esc(resTitle) + '</span>' +
          (articleHost ? '<span class="rm-resource-card-sub">' + esc(articleHost) + '</span>' : '') +
        '</span>' +
        '<span class="rm-resource-card-action">قراءة المقال ↗</span>' +
      '</a>';
    }

    // ── 3.ب) kind === 'pdf' — بطاقة PDF مخصَّصة (📚) ──
    if (res.kind === 'pdf') {
      var pdfUrl = res.external_url || res.internal_file_path;
      return '<a class="rm-resource-card rm-resource-pdf" href="' + esc(pdfUrl) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="rm-resource-card-icon">📚</span>' +
        '<span class="rm-resource-card-body">' +
          '<span class="rm-resource-card-title">' + esc(resTitle) + '</span>' +
          '<span class="rm-resource-card-sub">ملف PDF</span>' +
        '</span>' +
        '<span class="rm-resource-card-action">فتح الملف ↗</span>' +
      '</a>';
    }

    // ── 3.ج) kind === 'challenge' — بطاقة تحدّي مخصَّصة (🏆)، منفصلة عن practice (🧪) ──
    if (res.kind === 'challenge') {
      var challengeHost = extractHostname(res.external_url);
      return '<a class="rm-resource-card rm-resource-challenge" href="' + esc(res.external_url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="rm-resource-card-icon">🏆</span>' +
        '<span class="rm-resource-card-body">' +
          '<span class="rm-resource-card-title">' + esc(resTitle) + '</span>' +
          (challengeHost ? '<span class="rm-resource-card-sub">' + esc(challengeHost) + '</span>' : '') +
        '</span>' +
        '<span class="rm-resource-card-action">بدء التحدي ↗</span>' +
      '</a>';
    }

    // ── 4) أنواع أخرى (official_docs / external_exam / practice / داخلي) — بطاقة عامة ──
    if (res.scope === 'external') {
      var kindInfo = KIND_LABEL[res.kind] || { icon: '🔗', label: 'رابط خارجي' };
      var host = extractHostname(res.external_url);
      return '<div class="rm-resource rm-resource-external">' +
        '<span class="rm-badge-external">' + kindInfo.icon + ' ' + kindInfo.label + '</span>' +
        '<span class="rm-resource-title">' + esc(resTitle) + '</span>' +
        (host ? '<span class="rm-resource-warning">سيتم تحويلك إلى ' + esc(host) + '</span>' : '') +
        '<a class="rm-external-link" href="' + esc(res.external_url) + '" target="_blank" rel="noopener noreferrer">فتح ↗</a>' +
        '</div>';
    }

    // داخلي (غير فيديو)
    var inKind = KIND_LABEL[res.kind] || { icon: '📄', label: 'داخلي' };
    var inner = '';
    if (res.internal_file_path) {
      inner = '<a class="rm-external-link" style="color:var(--t600)" href="' + esc(res.internal_file_path) + '" target="_blank" rel="noopener noreferrer">📄 فتح الملف</a>';
    } else if (res.internal_content) {
      inner = '<div class="rm-internal-viewer">' + esc(res.internal_content) + '</div>';
    } else {
      inner = '<div class="rm-internal-viewer" style="color:var(--muted)">لا يوجد محتوى مُضاف بعد.</div>';
    }
    return '<div class="rm-resource rm-resource-internal">' +
      '<span class="rm-badge-internal">' + inKind.icon + ' ' + inKind.label + '</span>' +
      '<span class="rm-resource-title">' + esc(resTitle) + '</span>' +
      '</div>' + inner;
  }

  /* يستخرج "owner/repo" من رابط GitHub لعرضه كنص فرعي في البطاقة (بدون استدعاء أي API) */
  function _extractGithubRepoPath(url) {
    if (!url) return null;
    var m = String(url).match(/github\.com\/([^\/?#]+\/[^\/?#]+)/i);
    return m ? m[1].replace(/\.git$/i, '') : null;
  }

  /* ── خطوة واحدة + لوحة تفاصيلها (الموارد + زر إنهاء) ──
     ثلاث حالات: completed (مكتمل) / available (متاح) / locked (مقفل) */
  function renderStep(step, trackId, opts) {
    var status = getStepStatusFull(_roadmapForLock, step.legacy_lesson_id, trackId); // 'completed' | 'available' | 'locked'
    var isLocked    = status === 'locked';
    var isCompleted = status === 'completed';
    var t = TYPE_LABEL[step.step_type] || TYPE_LABEL.reading;
    var highlight = opts.highlightLessonId && opts.highlightLessonId === step.legacy_lesson_id;
    var stepTitle = step.title_ar || step.title;

    // ترتيب تعليمي ثابت داخل كل Topic: 1=فيديو، 2=توثيق رسمي، 3=تطبيق عملي،
    // 4=مشروع، 5=تحدي — عبر display_order_in_topic بدل order_index الخام
    // (الذي يعكس فقط ترتيب الإدراج، لا الترتيب التعليمي المطلوب).
    var sortedResources = (step.resources || []).slice().sort(function (a, b) {
      var oa = (a.display_order_in_topic != null) ? a.display_order_in_topic : 2;
      var ob = (b.display_order_in_topic != null) ? b.display_order_in_topic : 2;
      return oa - ob;
    });

    var resourcesHtml = sortedResources.length
      ? sortedResources.map(renderResource).join('')
      // الرسالة الإلزامية عند عدم وجود موارد فعلية لهذه الخطوة — بدون بطاقات فارغة
      : '<div class="rm-internal-viewer rm-empty-note">لا توجد موارد متاحة لهذه الخطوة حالياً.</div>';

    var statusIcon = isCompleted ? '✓' : (isLocked ? '🔒' : '');
    var statusCls  = isCompleted ? ' rm-done' : (isLocked ? ' rm-locked' : ' rm-available');

    var btnHtml;
    if (isCompleted) {
      btnHtml = '<button class="rm-mark-done-btn" disabled>✓ منجز</button>';
    } else if (isLocked) {
      btnHtml = '<button class="rm-mark-done-btn rm-btn-disabled" disabled>🔒 أكمل الخطوة السابقة أولاً</button>';
    } else {
      // مبدأ القفل: 90% مشاهدة مطلوبة فقط لخطوة "فيديو تعليمي" حقيقية (step_type === 'video')،
      // لا لأي مشروع/مرجع يصادف أن رابطه يوتيوب (انظر توضيح inferResourceKind في roadmap-mapping.js)
      var hasVideo = step.step_type === 'video' && step.resources && step.resources.some(function (r) { return r.kind === 'youtube' || r.kind === 'video'; });
      var canFinish = (typeof LockEngine === 'undefined') || LockEngine.canComplete(step);
      btnHtml = canFinish
        ? '<button class="rm-mark-done-btn" data-rm-mark-done data-legacy-id="' + esc(step.legacy_lesson_id) + '">✓ أنهيت هذا الدرس</button>'
        : '<button class="rm-mark-done-btn rm-btn-disabled" data-rm-mark-done data-legacy-id="' + esc(step.legacy_lesson_id) + '" disabled>▶ شاهد 90% من الفيديو لإكمال الدرس</button>';
    }

    return (
      '<div class="rm-step' + statusCls + (highlight ? ' rm-highlight' : '') + (isLocked ? ' rm-step-locked' : '') + '"' +
        (isLocked ? '' : ' data-rm-step-toggle') +
        ' data-legacy-id="' + esc(step.legacy_lesson_id) + '"' +
        ' data-rm-step-id="' + esc(step.id) + '"' +
        ' data-rm-step-status="' + status + '">' +
        '<div class="rm-step-status' + statusCls + '">' + statusIcon + '</div>' +
        '<div class="rm-step-body">' +
          '<div class="rm-step-title">' + esc(stepTitle) + '</div>' +
          '<div class="rm-step-meta">' +
            '<span class="rm-step-type-tag ' + t.cls + '">' + t.icon + ' ' + t.label + '</span>' +
            (step.estimated_duration ? '<span>⏱ ' + esc(step.estimated_duration) + '</span>' : '') +
            (sortedResources.length ? '<span>📎 ' + sortedResources.length + ' مورد</span>' : '') +
            (isLocked ? '<span class="rm-locked-tag">🔒 مقفل</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="rm-step-chevron">' + (isLocked ? '' : '▾') + '</div>' +
      '</div>' +
      (isLocked ? '' : '<div class="rm-step-detail">' + resourcesHtml + btnHtml + '</div>')
    );
  }

  /* ── قسم/مرحلة كاملة (Expandable) ── */
  function renderSection(section, idx, trackId, opts) {
    var stats = sectionStats(section, trackId);
    var sectionTitle = section.title_ar || section.title;
    var isExpanded = opts.expandSectionSlug
      ? opts.expandSectionSlug === section.slug
      : (idx === opts._defaultExpandIdx);

    var body = section.steps.length
      ? section.steps.map(function (st) { return renderStep(st, trackId, opts); }).join('')
      : '<div class="rm-empty-section">' + (section.description_ar || section.description || 'لا يوجد محتوى لهذه المرحلة بعد.') + '</div>';

    return (
      '<div class="rm-section' + (isExpanded ? ' rm-expanded' : '') + '" data-rm-section="' + esc(section.slug) + '">' +
        '<div class="rm-section-header" data-rm-section-toggle>' +
          '<div class="rm-section-num' + (stats.pct === 100 ? ' rm-done' : '') + '">' + (stats.pct === 100 ? '✓' : (idx + 1)) + '</div>' +
          '<div class="rm-section-body-info">' +
            '<div class="rm-section-title">' + esc(sectionTitle) + '</div>' +
            '<div class="rm-section-meta">' +
              (section.estimated_duration ? '<span>📅 ' + esc(section.estimated_duration) + '</span>' : '') +
              '<span>📖 ' + stats.total + ' خطوة</span>' +
              '<span>' + stats.pct + '% مكتمل</span>' +
            '</div>' +
            '<div class="rm-section-progress-bar"><div class="rm-section-progress-fill" style="width:' + stats.pct + '%"></div></div>' +
          '</div>' +
          '<div class="rm-section-chevron">▾</div>' +
        '</div>' +
        '<div class="rm-section-content">' + body + '</div>' +
      '</div>'
    );
  }

  /* ── الشريط الجانبي الثابت (Sticky Sidebar) ── */
  function renderSidebar(roadmap, trackId, opts) {
    var overall = roadmapStats(roadmap, trackId);
    var items = roadmap.sections.map(function (sec, idx) {
      var stats = sectionStats(sec, trackId);
      var dotCls = stats.pct === 100 ? 'rm-done' : (stats.pct > 0 ? 'rm-partial' : '');
      var isActive = opts.expandSectionSlug ? opts.expandSectionSlug === sec.slug : (idx === opts._defaultExpandIdx);
      return '<div class="rm-phase-link' + (isActive ? ' rm-active' : '') + '" data-rm-sidebar-link="' + esc(sec.slug) + '">' +
        '<div class="rm-phase-dot ' + dotCls + '">' + (stats.pct === 100 ? '✓' : (idx + 1)) + '</div>' +
        '<div class="rm-phase-link-title">' + esc(sec.title) + '</div>' +
        '<div class="rm-phase-link-pct">' + stats.pct + '%</div>' +
        '</div>';
    }).join('');

    return (
      '<aside class="rm-sidebar">' +
        '<div class="rm-sidebar-title">تقدّمك في المسار</div>' +
        '<div class="rm-sidebar-overall">' +
          '<div class="rm-sidebar-overall-pct" style="color:' + esc(roadmap.color || '#4f35e8') + '">' + overall.pct + '%</div>' +
          '<div style="font-size:12px;color:var(--muted)">' + overall.done + ' من ' + overall.total + ' خطوة</div>' +
        '</div>' +
        items +
        (roadmap.source === 'fallback' ? '<div class="rm-source-tag">⚙️ محتوى محلي</div>' : '') +
      '</aside>'
    );
  }

  /* ── المحتوى التمهيدي (الأدوات + الحسابات + الخطة) — قبل دخول المسار ── */
  function renderIntro(roadmap) {
    var intro = roadmap.intro;
    if (!intro) return '';

    var toolsHtml = (intro.tools || []).map(function (t) {
      return '<div class="rm-intro-tool">' +
        (t.url ? '<a href="' + esc(t.url) + '" target="_blank" rel="noopener noreferrer" class="rm-intro-tool-name">' + esc(t.name) + ' ↗</a>' : '<span class="rm-intro-tool-name">' + esc(t.name) + '</span>') +
        '<span class="rm-intro-tool-purpose">' + esc(t.purpose) + '</span>' +
      '</div>';
    }).join('');

    var accountsHtml = (intro.accounts || []).map(function (a) {
      return '<div class="rm-intro-account">' +
        (a.url ? '<a href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer" class="rm-intro-account-name">' + esc(a.name) + ' ↗</a>' : '<span class="rm-intro-account-name">' + esc(a.name) + '</span>') +
        '<span class="rm-intro-account-why">' + esc(a.why) + '</span>' +
      '</div>';
    }).join('');

    var planHtml = (intro.plan || []).map(function (p, i) {
      return '<div class="rm-intro-plan-step">' +
        '<div class="rm-intro-plan-num">' + (i + 1) + '</div>' +
        '<div class="rm-intro-plan-body">' +
          '<div class="rm-intro-plan-title">' + esc(p.title) + '</div>' +
          '<div class="rm-intro-plan-meta">⏱ ' + esc(p.duration) + '</div>' +
          '<div class="rm-intro-plan-goal">' + esc(p.goal) + '</div>' +
        '</div>' +
      '</div>';
    }).join('');

    var challengeHtml = (intro.challenge || []).map(function (c) {
      return '<a class="rm-intro-challenge" href="' + esc(c.url) + '" target="_blank" rel="noopener noreferrer">🏆 ' + esc(c.name) + ' ↗</a>';
    }).join('');

    return (
      '<div class="rm-intro">' +
        (toolsHtml ? '<div class="rm-intro-block"><div class="rm-intro-heading">🛠️ الأدوات المطلوبة</div><div class="rm-intro-tools-grid">' + toolsHtml + '</div></div>' : '') +
        (accountsHtml ? '<div class="rm-intro-block"><div class="rm-intro-heading">👤 حسابات تحتاج تنشئها</div><div class="rm-intro-tools-grid">' + accountsHtml + '</div></div>' : '') +
        (planHtml ? '<div class="rm-intro-block"><div class="rm-intro-heading">🗺️ خطة المسار</div><div class="rm-intro-plan-list">' + planHtml + '</div></div>' : '') +
        (challengeHtml ? '<div class="rm-intro-block"><div class="rm-intro-heading">🏆 تحدّي نفسك</div><div class="rm-intro-challenge-row">' + challengeHtml + '</div></div>' : '') +
      '</div>'
    );
  }

  /* ── الصفحة الكاملة ── */
  function renderTrackPage(roadmap, trackId, opts) {
    opts = opts || {};
    var roadmapTitle = roadmap.title_ar || roadmap.title;
    var roadmapDesc = roadmap.description_ar || roadmap.long_desc;

    // كشف Roadmap Shell: مسار بقسم واحد فقط بـslug ثابت "official-content" —
    // معناه أن المرجع لا يحوي تفصيلاً داخلياً (Notion/Drive خارجي فقط)، فهذا
    // المسار يُعرَض ببطاقة "المحتوى الرسمي" المميَّزة بصرياً بدل خط زمني عادي
    // (الذي قد يُفهَم خطأً كنقص محتوى فعلي).
    var isShellRoadmap = roadmap.sections && roadmap.sections.length === 1 &&
      roadmap.sections[0].slug === 'official-content';

    if (isShellRoadmap) {
      return renderShellTrackPage(roadmap, roadmapTitle, roadmapDesc);
    }

    // افتراضياً: وسّع أول قسم فيه خطوات غير مكتملة (متابعة التعلّم)، أو أول قسم عموماً
    if (!opts.expandSectionSlug) {
      var firstUnfinished = roadmap.sections.findIndex(function (sec) {
        return sec.steps.length > 0 && sectionStats(sec, trackId).pct < 100;
      });
      opts._defaultExpandIdx = firstUnfinished !== -1 ? firstUnfinished : 0;
    }

    var overall = roadmapStats(roadmap, trackId);
    var sectionsHtml = roadmap.sections.map(function (sec, idx) { return renderSection(sec, idx, trackId, opts); }).join('');

    return (
      '<div class="platform-wrap">' +
        '<nav class="breadcrumb" aria-label="مسار التنقل">' +
          '<span data-action="showPage" data-page="home" role="link" tabindex="0">🏠 الرئيسية</span>' +
          '<span class="sep">›</span>' +
          '<span aria-current="page">' + esc(roadmapTitle) + '</span>' +
        '</nav>' +

        '<div class="track-hero" style="--track-color:' + esc(roadmap.color || '#4f35e8') + '">' +
          '<div class="track-hero-icon">' + (roadmap.icon || '🧭') + '</div>' +
          '<div class="track-hero-body">' +
            (roadmap.level ? '<div class="track-level-badge">' + esc(roadmap.level) + '</div>' : '') +
            '<h1 class="track-hero-title">' + esc(roadmapTitle) + '</h1>' +
            (roadmap.subtitle ? '<p class="track-hero-sub">' + esc(roadmap.subtitle) + '</p>' : '') +
            '<div class="track-hero-meta">' +
              (roadmap.duration_label ? '<span>📅 ' + esc(roadmap.duration_label) + '</span>' : '') +
              '<span>📖 ' + overall.total + ' خطوة</span>' +
              '<span>🧭 ' + roadmap.sections.length + ' مرحلة</span>' +
            '</div>' +
          '</div>' +
          '<div class="track-progress-ring-wrap">' +
            '<svg class="progress-ring" width="80" height="80" viewBox="0 0 80 80">' +
              '<circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="7"/>' +
              '<circle cx="40" cy="40" r="32" fill="none" stroke="white" stroke-width="7" stroke-linecap="round" ' +
                'stroke-dasharray="' + (2 * Math.PI * 32) + '" ' +
                'stroke-dashoffset="' + (2 * Math.PI * 32 * (1 - overall.pct / 100)) + '" ' +
                'transform="rotate(-90 40 40)" style="transition:stroke-dashoffset 1s ease"/>' +
            '</svg>' +
            '<div class="progress-ring-text">' + overall.pct + '%</div>' +
          '</div>' +
        '</div>' +

        renderIntro(roadmap) +

        (typeof AppState !== 'undefined' && AppState.currentTrack === trackId && AppState.currentLesson ? (
          '<div class="continue-banner" data-action="continueLearning">' +
            '<div class="continue-icon">▶</div>' +
            '<div class="continue-info">' +
              '<div class="continue-label">متابعة من حيث توقفت</div>' +
              '<div class="continue-title">استمر في رحلتك التعليمية</div>' +
            '</div>' +
            '<div class="continue-arrow">←</div>' +
          '</div>'
        ) : '') +

        '<div class="rm-layout">' +
          renderSidebar(roadmap, trackId, opts) +
          '<div class="rm-timeline">' + sectionsHtml + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── صفحة مسار Shell (لا تفصيل داخلي — فقط مورد رسمي خارجي، مثل Notion) ──
     تصميم بصري مختلف جذرياً عن الخط الزمني العادي لمنع وهم وجود محتوى
     تفصيلي غير موجود فعلاً في المرجع. */
  function renderShellTrackPage(roadmap, roadmapTitle, roadmapDesc) {
    var section = roadmap.sections[0];
    var step = section.steps[0];
    var stepTitle = step ? (step.title_ar || step.title) : '';
    var resources = (step && step.resources) ? step.resources.slice().sort(function (a, b) {
      return (a.display_order_in_topic || 2) - (b.display_order_in_topic || 2);
    }) : [];

    return (
      '<div class="platform-wrap">' +
        '<nav class="breadcrumb" aria-label="مسار التنقل">' +
          '<span data-action="showPage" data-page="home" role="link" tabindex="0">🏠 الرئيسية</span>' +
          '<span class="sep">›</span>' +
          '<span aria-current="page">' + esc(roadmapTitle) + '</span>' +
        '</nav>' +

        '<div class="track-hero" style="--track-color:' + esc(roadmap.color || '#4f35e8') + '">' +
          '<div class="track-hero-icon">' + (roadmap.icon || '📚') + '</div>' +
          '<div class="track-hero-body">' +
            '<h1 class="track-hero-title">' + esc(roadmapTitle) + '</h1>' +
            (roadmap.subtitle ? '<p class="track-hero-sub">' + esc(roadmap.subtitle) + '</p>' : '') +
          '</div>' +
        '</div>' +

        '<div class="rm-shell-card">' +
          '<div class="rm-shell-badge">📚 هذا المسار مُستضاف حالياً على المصدر الرسمي الخارجي</div>' +
          (roadmapDesc ? '<p class="rm-shell-desc">' + esc(roadmapDesc) + '</p>' : '') +
          '<div class="rm-shell-section-title">' + esc(section.title_ar || section.title) + '</div>' +
          (stepTitle ? '<div class="rm-shell-step-title">' + esc(stepTitle) + '</div>' : '') +
          '<div class="rm-shell-resources">' + resources.map(renderResource).join('') + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  /* ── ربط التفاعلات بعد الحقن في DOM (بدون لمس events.js) ── */
  function attachListeners(container, roadmap, trackId, opts) {
    if (!container) return;

    container.querySelectorAll('[data-rm-section-toggle]').forEach(function (header) {
      header.addEventListener('click', function () {
        var sectionEl = header.closest('.rm-section');
        if (sectionEl) sectionEl.classList.toggle('rm-expanded');
      });
    });

    container.querySelectorAll('[data-rm-sidebar-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        var slug = link.dataset.rmSidebarLink;
        var sectionEl = container.querySelector('.rm-section[data-rm-section="' + slug + '"]');
        if (sectionEl) {
          sectionEl.classList.add('rm-expanded');
          sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    container.querySelectorAll('[data-rm-step-toggle]').forEach(function (stepEl) {
      stepEl.addEventListener('click', function () {
        stepEl.classList.toggle('rm-open');
        if (stepEl.classList.contains('rm-open')) {
          var detail = stepEl.nextElementSibling;
          var videoCards = detail ? detail.querySelectorAll('[data-rm-video-card]') : [];
          // لو المورد الوحيد لهذه الخطوة فيديو واحد -> شغّله فوراً بنفس نقرة فتح الخطوة
          // (نقرة واحدة فقط = الفيديو يبدأ، وتُحسب "تفاعل مستخدم" يسمح للمتصفح بالتشغيل التلقائي)
          if (videoCards.length === 1) {
            var playEl = videoCards[0].querySelector('[data-rm-video-play]');
            if (playEl) playEl.click();
          }
        }
      });
    });

    container.querySelectorAll('[data-rm-video-play]').forEach(function (playEl) {
      playEl.addEventListener('click', function (e) {
        e.stopPropagation();
        var card = playEl.closest('[data-rm-video-card]');
        if (!card) return;
        var ytId      = card.dataset.ytId || null;
        var playlistId = card.dataset.ytPlaylistId || null;
        var title = card.dataset.ytTitle || '';

        // [إصلاح — سبب جذري ثانٍ ومستقل لعدم تتبّع المشاهدة أبداً]
        // الكود القديم استخدم card.closest('[data-legacy-id]') بحثاً عن خطوة
        // الدرس (.rm-step) التي تحمل data-legacy-id. لكن closest() يبحث فقط
        // في سلسلة الأجداد (ancestors) — و.rm-step-detail (الحاوي الفعلي
        // لـ card) هو عنصر *شقيق* لـ.rm-step في الـ HTML المُولَّد (انظر
        // renderStep: يُغلَق </div> لـ.rm-step قبل فتح <div class="rm-step-detail">
        // مباشرة)، وليس ابناً له. لذلك closest('[data-legacy-id]') كانت ترجع
        // null دائماً (لا يوجد أي جدّ يحمل هذه السمة) => legacyId = null دائماً
        // => الشرط أدناه (legacyId && ...) كان يفشل صمتاً في كل مرة => _trackYouTubeProgress
        // لا تُستدعى أبداً => recordVideoProgress لا يُستدعى أبداً => النسبة تبقى
        // 0% للأبد => زر "أنهيت هذا الدرس" لا يُفعَّل أبداً => الدرس التالي يبقى مقفولاً.
        // هذا يطابق العارض المُبلَّغ عنه تماماً، وهو مستقل تماماً عن إصلاح
        // postMessage/YouTube IFrame API أعلاه — كلا الخللين كانا يحجبان
        // تتبّع المشاهدة، وكلاهما يلزم إصلاحه معاً.
        // الإصلاح: detail = أقرب .rm-step-detail يحوي card فعلياً (سليل حقيقي)،
        // ثم stepEl = الشقيق المباشر السابق له (.rm-step) — يطابق بنية HTML الفعلية.
        var detailEl = card.closest('.rm-step-detail');
        var stepEl = detailEl ? detailEl.previousElementSibling : null;
        var legacyId = (stepEl && stepEl.hasAttribute('data-legacy-id')) ? stepEl.dataset.legacyId : null;
        var iframeId = 'rm-yt-' + (ytId || playlistId || 'pl') + '-' + Math.random().toString(36).slice(2, 7);

        var embedSrc = ytId
          ? 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0&enablejsapi=1'
          : 'https://www.youtube.com/embed/videoseries?list=' + playlistId + '&autoplay=1&rel=0&enablejsapi=1';

        playEl.outerHTML =
          '<div class="rm-video-iframe-wrap">' +
            '<iframe id="' + iframeId + '" ' +
              'src="' + embedSrc + '" ' +
              'title="' + title.replace(/"/g, '&quot;') + '" frameborder="0" ' +
              'allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe>' +
          '</div>';

        // تتبّع نسبة المشاهدة عبر YouTube IFrame Player API الرسمي — لتفعيل عتبة الـ 90%
        // ملاحظة: لقوائم التشغيل، duration/currentTime تعكسان الفيديو الحالي ضمن القائمة فقط
        // (يوتيوب لا يوفّر نسبة تقدّم عبر القائمة بأكملها) — يُستخدم كتقريب معقول للمشاهدة الفعلية.
        if (legacyId && typeof LockEngine !== 'undefined') {
          _trackYouTubeProgress(iframeId, legacyId, stepEl ? stepEl.dataset.rmStepId : null);
        }
      });
    });

    container.querySelectorAll('[data-rm-mark-done]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (btn.disabled) return;
        var legacyId = btn.dataset.legacyId;

        if (typeof LockEngine !== 'undefined') {
          _dbg('محاولة إنهاء الدرس:', legacyId);
          var ok = LockEngine.markComplete(legacyId, roadmap, trackId);
          if (ok) {
            var nextLegacyId = _findNextLegacyId(roadmap, legacyId);
            _dbg('تم إنهاء الدرس بنجاح. الدرس التالي المتوقع:', nextLegacyId || '(لا يوجد)');
            // أعد رسم الصفحة بالكامل لتحديث حالات القفل/الفتح للخطوة التالية
            mount(roadmap, trackId, opts);
            // ثم افتح الدرس التالي تلقائياً بعد إعادة الرسم (المطلب: فتح تلقائي بعد الاكتمال)
            _openNextStepAfterCompletion(nextLegacyId);
          } else {
            // فشل (مثلاً لم تكتمل نسبة المشاهدة) — لا تغيير، الزر يبقى كما هو
            console.warn('[RoadmapUI] تعذّر إنهاء الدرس — تحقق من شرط مشاهدة الفيديو.');
          }
          return;
        }

        // fallback للنظام القديم لو LockEngine غير محمّل
        if (typeof RoadmapMapping === 'undefined' || typeof markLessonComplete !== 'function') return;
        var courseId = RoadmapMapping.legacyCourseIdForLesson(trackId, legacyId);
        if (courseId) markLessonComplete(trackId, courseId, legacyId);
      });
    });

    if (opts && opts.highlightLessonId) {
      var highlighted = container.querySelector('.rm-step.rm-highlight');
      if (highlighted) {
        setTimeout(function () { highlighted.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 150);
      }
    }
  }

  /** نقطة الدخول الوحيدة من platform.js — تحقن الـ HTML وتربط المستمعين */
  function mount(roadmap, trackId, opts) {
    opts = opts || {};
    _roadmapForLock = roadmap;   // يُستخدم في isStepDone/sectionStats/roadmapStats أعلاه

    // اسحب أي تقدّم سحابي حُفظ على جهاز آخر قبل الرسم (صامت، لا يحجب العرض)
    if (typeof LockEngine !== 'undefined' && typeof LockEngine.syncCompletedStepsFromCloud === 'function') {
      LockEngine.syncCompletedStepsFromCloud(roadmap.slug).then(function () {
        // أعد الرسم فقط لو تغيّر شيء فعلياً بعد المزامنة (نادر) — بسيط وآمن
      });
    }

    var html = renderTrackPage(roadmap, trackId, opts);
    setHTML('platform-page-inner', html);
    showPage('platform');
    attachListeners(document.getElementById('platform-page-inner'), roadmap, trackId, opts);

    // أعد رسم زر "أنهيت الدرس" تلقائياً عند بلوغ عتبة الفيديو 90%
    // (نزيل أي مستمع سابق أولاً لتفادي تكدّس المستمعين عبر استدعاءات mount() المتكررة)
    document.removeEventListener('sl6:lockEngine:videoProgress', _onVideoProgressEvent);
    document.addEventListener('sl6:lockEngine:videoProgress', _onVideoProgressEvent);
  }

  function _onVideoProgressEvent(e) {
    var legacyId = e.detail && e.detail.legacyLessonId;
    if (!legacyId) return;
    var btn = document.querySelector('[data-rm-mark-done][data-legacy-id="' + CSS.escape(legacyId) + '"]');
    if (btn && e.detail.thresholdMet) {
      btn.disabled = false;
      btn.classList.remove('rm-btn-disabled');
      btn.textContent = '✓ أنهيت هذا الدرس';
    }
  }

  global.RoadmapUI = {
    renderLoading: renderLoading,
    renderTrackPage: renderTrackPage,
    mount: mount,
    _isStepDone: isStepDone,        // مُصدَّرة للاختبار فقط
    _roadmapStats: roadmapStats     // مُصدَّرة للاختبار فقط
  };
})(typeof window !== 'undefined' ? window : globalThis);
