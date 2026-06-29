/* ============================================================
   js/roadmap-mapping.js
   ------------------------------------------------------------
   طبقة "بحتة" (Pure) — لا تلمس DOM ولا Supabase ولا localStorage.
   مهمتها الوحيدة: تحويل track من CAREERS_DATA (js/data.js) إلى
   نفس الشكل (Shape) اللي بيرجّعه RoadmapService من Supabase،
   عشان roadmap-ui.js ما يفرقّش مصدر البيانات.

   هذا هو "محرك الـ Fallback" — لو Supabase وقع، هنا بيُستخدم.

   ملاحظة تاريخية: scripts/generate_roadmap_seed.js كان يولّد تصنيف Frontend
   القديم (11 مرحلة بمدى IDs ثابت) — بعد إعادة هيكلة المسار بالكامل (يونيو 2026،
   Frontend Circle Roadmap 2026) أصبح ذلك السكريبت غير مطابق ولا يُستخدم؛ البنية
   الحالية (انظر buildFrontendRoadmap أسفل) واستيراد بيانات Supabase الفعلي
   موجودان في supabase_migrations/007_frontend_restructure.sql.

   يعتمد على وجود getAllTracks() كـ global (مُعرّفة في js/data.js
   ومُحمّلة قبل هذا الملف في index.html).
   ============================================================ */
(function (global) {
  'use strict';

  function stepTypeOf(lesson) {
    if (lesson.type === 'فيديو') return 'video';
    if (lesson.type === 'مشروع') return 'project';
    if (lesson.type === 'تدريب') return lesson.quizData ? 'quiz' : 'exercise';
    return 'reading';
  }

  /* يحدّد kind المورد المناسب من رابط lesson.videoUrl بدل افتراض 'youtube' دائماً —
     مهم لأن مبدأ القفل (90% مشاهدة) في roadmap-lock-engine.js يُطبَّق حصرياً على
     kind === 'youtube'/'video' (انظر hasVideo في js/roadmap-ui.js). أي رابط غير
     يوتيوب (مقال/توثيق/GitHub/أداة) يجب أن يُصنَّف بنوعه الحقيقي حتى:
       (أ) يُعرَض بالشكل الصحيح (بطاقة مقال/GitHub بدل محاولة تضمينه كفيديو والفشل)
       (ب) لا يُقفَل خلفه باقي المسار بلا داعٍ — فقط lesson.type === 'فيديو' الحقيقي يُقفَل. */
  /* يحدّد kind المورد المناسب من رابط lesson.videoUrl لغرض "طريقة العرض" فقط
     (تضمين كفيديو/بطاقة مقال/بطاقة GitHub) — هذا الحقل لا يُستخدَم بعد الآن
     لتحديد القفل (انظر hasVideo في roadmap-ui.js وroadmap-lock-engine.js، أصبحا
     يعتمدان على step.step_type === 'video' فقط، أي lesson.type === "فيديو" حصرياً،
     تطبيقاً لمبدأ "القفل يُطبَّق فقط على محتوى الفيديو [التعليمي]" — لا على أي
     رابط يوتيوب وارد كمرجع/مشروع). */
  function inferResourceKind(lesson, url) {
    if (lesson.type === 'فيديو') return 'youtube'; // فيديو تعليمي حقيقي
    if (/youtube\.com|youtu\.be/i.test(url)) return 'youtube'; // رابط يوتيوب كمرجع/مشروع — يُعرَض كفيديو لكن بلا قفل (step_type ليس video)
    if (/github\.com/i.test(url)) return 'github_repo';
    return 'external_article'; // مقال / توثيق رسمي / أداة / منصة تدريب — بطاقة رابط عادية بلا قفل
  }

  function resourceFromLesson(lesson, order) {
    if (!lesson.videoUrl || !lesson.videoUrl.trim()) return null;
    var url = lesson.videoUrl.trim();
    var kind = inferResourceKind(lesson, url);
    var isRealVideo = lesson.type === 'فيديو';
    return {
      id: 'fallback-res-' + lesson.id,
      scope: 'external',
      kind: kind,
      title: (isRealVideo ? 'فيديو: ' : '') + lesson.title,
      description: null,
      external_url: url,
      internal_content: null,
      internal_file_path: null,
      order_index: order || 1
    };
  }

  function makeStep(lesson, order) {
    var res = resourceFromLesson(lesson, 1);
    return {
      id: 'fallback-step-' + lesson.id,
      legacy_lesson_id: lesson.id,
      title: lesson.title,
      step_type: stepTypeOf(lesson),
      estimated_duration: lesson.duration || null,
      order_index: order,
      is_required: true,
      resources: res ? [res] : []
    };
  }

  function range(prefix, from, to, pad) {
    var ids = [];
    for (var i = from; i <= to; i++) {
      var n = String(i);
      while (n.length < pad) n = '0' + n;
      ids.push(prefix + n);
    }
    return ids;
  }

  // ── تصنيف المسارات العامة (Graphic / UI-UX / Marketing) ──
  function inferStageType(course, ci, total) {
    var idLower = (course.id || '').toLowerCase();
    if (idLower.indexOf('career') !== -1 || idLower.indexOf('freelance') !== -1) return 'career_path';
    var projectLessons = course.lessons.filter(function (l) { return l.type === 'مشروع'; }).length;
    if (projectLessons / course.lessons.length > 0.5) return 'projects';
    if (ci === 0) return 'fundamentals';
    if (ci === total - 1) return 'advanced_topics';
    return 'core_skills';
  }

  function buildGenericRoadmap(track, careerId) {
    var sections = track.courses.map(function (course, ci) {
      return {
        id: 'fallback-sec-' + track.id + '-' + course.id,
        slug: course.id,
        title: course.title,
        description: null,
        stage_type: inferStageType(course, ci, track.courses.length),
        difficulty_level: null,
        estimated_duration: course.duration || null,
        icon: null,
        order_index: ci + 1,
        steps: course.lessons.map(function (lesson, li) { return makeStep(lesson, li + 1); })
      };
    });
    return {
      id: 'fallback-' + track.id,
      slug: track.id,
      career_id: careerId,
      title: track.title,
      subtitle: track.subtitle,
      long_desc: track.longDesc,
      level: track.level,
      duration_label: track.duration,
      icon: track.icon,
      color: track.color,
      cover_image: track.coverImage,
      intro: track.intro || null,
      archived: !!track.archived,
      source: 'fallback',
      sections: sections
    };
  }

  // ── تصنيف Frontend الجديد (3 مراحل: Foundation / Core Engineering / Specialization) ──
  // كل "كورس" في js/data.js أصبح يمثّل قسماً متكاملاً بذاته (أسبوع أو مجموعة موارد)
  // بعد إعادة الهيكلة بناءً على Frontend Circle Roadmap 2026 — فلا حاجة لتفكيكه
  // وإعادة فهرسته بمدى IDs كما كان قديماً؛ فقط نُجمّع الكورسات الموجودة فعلياً تحت
  // 3 مراحل رئيسية، مع قسم فاصل (0 خطوة) في أول كل مرحلة لإظهار عنوانها بصرياً.
  function buildFrontendRoadmap(track) {
    var PHASE_DIVIDERS = {
      'html-week1': { title: '🏗️ Phase 1: Foundation', dur: '5 أسابيع', desc: 'الهدف: بناء صفحات ثابتة منظّمة وجميلة تتبع أفضل الممارسات — HTML · CSS · Git · التصميم المتجاوب.' },
      'js-week1':   { title: '⚙️ Phase 2: Core Engineering', dur: '13 أسبوع', desc: 'الهدف: احتراف JavaScript والخوارزميات والأدوات الاحترافية — JavaScript · DOM · API · OOP · SASS · NPM.' },
      'react-prerequisites': { title: '⚛️ Phase 3: Specialization', dur: '8 أسابيع', desc: 'الهدف: بناء تطبيقات SPA وFullstack بمستوى الإنتاج — اختر مسارك: React / Vue / Angular.' }
    };

    // stage_type تقريبي حسب موضع الكورس في المسار (لا يغيّر شيئاً بصرياً مهماً، فقط للتصنيف الداخلي)
    function stageForCourseId(id, idx, total) {
      if (id === 'career-frontend') return 'career_path';
      if (/^quiz-/.test(id)) return 'projects';
      if (idx < 12) return idx === 0 ? 'fundamentals' : 'fundamentals';
      if (idx < 36) return 'core_skills';
      return 'advanced_topics';
    }

    var sections = [];
    track.courses.forEach(function (course, idx) {
      var divider = PHASE_DIVIDERS[course.id];
      if (divider) {
        sections.push({
          id: 'fallback-sec-' + track.id + '-phase-divider-' + sections.length,
          slug: 'phase-divider-' + sections.length,
          title: divider.title,
          description: divider.desc,
          stage_type: 'introduction',
          difficulty_level: null,
          estimated_duration: divider.dur,
          icon: null,
          order_index: sections.length + 1,
          steps: []
        });
      }
      sections.push({
        id: 'fallback-sec-' + track.id + '-' + course.id,
        slug: course.id,
        title: course.title,
        description: null,
        stage_type: stageForCourseId(course.id, idx, track.courses.length),
        difficulty_level: null,
        estimated_duration: course.duration || null,
        icon: null,
        order_index: sections.length + 1,
        steps: course.lessons.map(function (lesson, li) { return makeStep(lesson, li + 1); })
      });
    });

    return {
      id: 'fallback-' + track.id,
      slug: track.id,
      career_id: 'frontend',
      title: track.title,
      subtitle: track.subtitle,
      long_desc: track.longDesc,
      level: track.level,
      duration_label: track.duration,
      icon: track.icon,
      color: track.color,
      cover_image: track.coverImage,
      intro: track.intro || null,
      archived: !!track.archived,
      source: 'fallback',
      sections: sections
    };
  }

  var CAREER_ID_BY_TRACK = {
    'graphic-design-track': 'graphic',
    'ui-ux-track': 'ui-ux',
    'digital-marketing-track': 'marketing',
    'frontend-track': 'frontend',
    'gamedev-track': 'gamedev',
    'backend-nodejs-track': 'backend',
    'backend-dotnet-track': 'backend',
    'backend-laravel-track': 'backend',
    'backend-spring-track': 'backend',
    'cybersecurity-track': 'cybersecurity'
  };

  /** نقطة الدخول الوحيدة: roadmapSlug == track.id القديم (مثال: 'frontend-track') */
  function adaptLegacyTrackToRoadmap(roadmapSlug) {
    if (typeof getAllTracks !== 'function') return null;
    var track = getAllTracks().find(function (t) { return t.id === roadmapSlug; });
    if (!track) return null;
    if (roadmapSlug === 'frontend-track') return buildFrontendRoadmap(track);
    return buildGenericRoadmap(track, CAREER_ID_BY_TRACK[roadmapSlug] || null);
  }

  function adaptAllLegacyTracks() {
    if (typeof getAllTracks !== 'function') return [];
    return getAllTracks().map(function (t) { return adaptLegacyTrackToRoadmap(t.id); }).filter(Boolean);
  }

  /** يرجّع courseId الأصلي (القديم) اللي كان الدرس فيه في data.js — مطلوب
   *  لاستدعاء markLessonComplete/platform_completeLesson الموجودين بدون تعديلهم،
   *  لأن localStorage لسه مبني على بنية trackId→courseId→[lessonIds]. */
  function legacyCourseIdForLesson(trackId, legacyLessonId) {
    if (typeof getAllTracks !== 'function') return null;
    var track = getAllTracks().find(function (t) { return t.id === trackId; });
    if (!track) return null;
    for (var i = 0; i < track.courses.length; i++) {
      if (track.courses[i].lessons.some(function (l) { return l.id === legacyLessonId; })) {
        return track.courses[i].id;
      }
    }
    return null;
  }

  var RoadmapMapping = {
    adaptLegacyTrackToRoadmap: adaptLegacyTrackToRoadmap,
    adaptAllLegacyTracks: adaptAllLegacyTracks,
    legacyCourseIdForLesson: legacyCourseIdForLesson
  };

  global.RoadmapMapping = RoadmapMapping;
})(typeof window !== 'undefined' ? window : globalThis);
