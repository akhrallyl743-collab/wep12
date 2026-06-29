/* ============================================================
   js/roadmap-service.js
   ------------------------------------------------------------
   طبقة الوصول للبيانات الجديدة (Roadmaps من Supabase) مع Fallback
   تلقائي وصامت لـ js/roadmap-mapping.js (وهو بدوره يقرأ من
   js/data.js) عند أي فشل في الجلب.

   لا يُنشئ Supabase client جديد — يعيد استخدام window.supa
   المُصدَّر فعلاً من js/services.js (لا تعديل على services.js).

   عقد الإرجاع (Contract): getRoadmap()/listRoadmaps() ترجع دايماً
   نفس الشكل (Shape) سواء المصدر Supabase أو Fallback — أي كود
   عرض (roadmap-ui.js) لا يحتاج يعرف مصدر البيانات.
   ============================================================ */
(function (global) {
  'use strict';

  var FETCH_TIMEOUT_MS = 3000;
  var _roadmapCache = {};   // slug -> roadmap object
  var _listCache = null;    // array of roadmap summaries (بدون sections) أو null

  function withTimeout(promise, ms) {
    return new Promise(function (resolve, reject) {
      var timer = setTimeout(function () { reject(new Error('roadmap-service: timeout after ' + ms + 'ms')); }, ms);
      promise.then(
        function (v) { clearTimeout(timer); resolve(v); },
        function (e) { clearTimeout(timer); reject(e); }
      );
    });
  }

  function getSupa() {
    // يعتمد على window.supa الموجود مسبقاً في js/services.js — لو لسه ما تحمّلش، نرجع null بهدوء
    return (typeof window !== 'undefined' && window.supa) ? window.supa : null;
  }

  /** يحاول جلب مسار كامل (roadmap + sections + steps + resources) من Supabase. يرمي استثناء عند أي فشل. */
  function fetchRoadmapFromSupabase(slug) {
    var supa;
    // Promise.resolve().then(...) يضمن إن أي استثناء "متزامن" (مثلاً supa.from
    // غير موجودة، أو شكل الـ client تغيّر) يتحوّل لـ rejected promise بدل ما
    // يكسر الاستدعاء بالكامل قبل ما يوصل لـ .catch() — أهم سطر حماية بالملف.
    return Promise.resolve().then(function () {
      supa = getSupa();
      if (!supa) throw new Error('roadmap-service: supabase client not ready');
      return supa.from('roadmaps').select('*').eq('slug', slug).eq('is_published', true).single();
    })
      .then(function (res) {
        if (res.error || !res.data) throw new Error('roadmap not found: ' + slug);
        var roadmap = res.data;

        return supa.from('roadmap_sections').select('*').eq('roadmap_id', roadmap.id).eq('is_published', true).order('order_index')
          .then(function (secRes) {
            if (secRes.error) throw secRes.error;
            var sections = secRes.data || [];
            var sectionIds = sections.map(function (s) { return s.id; });
            if (sectionIds.length === 0) return { roadmap: roadmap, sections: [] };

            return supa.from('roadmap_steps').select('*').in('section_id', sectionIds).order('order_index')
              .then(function (stepRes) {
                if (stepRes.error) throw stepRes.error;
                var steps = stepRes.data || [];
                var stepIds = steps.map(function (s) { return s.id; });

                var resourcesPromise = stepIds.length
                  ? supa.from('roadmap_resources').select('*').in('step_id', stepIds).order('order_index')
                  : Promise.resolve({ data: [] });

                return resourcesPromise.then(function (resRes) {
                  if (resRes.error) throw resRes.error;
                  var resources = resRes.data || [];

                  var resourcesByStep = {};
                  resources.forEach(function (r) {
                    (resourcesByStep[r.step_id] = resourcesByStep[r.step_id] || []).push(r);
                  });
                  var stepsBySection = {};
                  steps.forEach(function (st) {
                    st.resources = resourcesByStep[st.id] || [];
                    (stepsBySection[st.section_id] = stepsBySection[st.section_id] || []).push(st);
                  });
                  sections.forEach(function (sec) { sec.steps = stepsBySection[sec.id] || []; });

                  return { roadmap: roadmap, sections: sections };
                });
              });
          });
      })
      .then(function (full) {
        var r = full.roadmap;
        return {
          id: r.id, slug: r.slug, career_id: r.career_id, title: r.title, subtitle: r.subtitle,
          long_desc: r.long_desc, level: r.level, duration_label: r.duration_label,
          icon: r.icon, color: r.color, cover_image: r.cover_image, intro: r.intro || null,
          title_ar: r.title_ar || null, description_ar: r.description_ar || null,
          cat_source_path: r.cat_source_path || null, track_group: r.track_group || null,
          source: 'supabase', sections: full.sections
        };
      });
  }

  /** نقطة الدخول العامة: يرجع المسار الكامل أو null لو فشل كل شيء (Supabase + Fallback). */
  function getRoadmap(slug) {
    if (_roadmapCache[slug]) return Promise.resolve(_roadmapCache[slug]);

    return withTimeout(fetchRoadmapFromSupabase(slug), FETCH_TIMEOUT_MS)
      .catch(function (err) {
        // تمييز حرج: "roadmap not found" يعني الاستعلام نفذ بنجاح فعلاً (لا
        // مشكلة شبكة/اتصال) لكن لم يُرجِع صفاً — وهذا تحديداً ما يحدث عمداً
        // مع مسار مؤرشف (مثل frontend-track) لمستخدم بلا تقدّم سابق عليه:
        // سياسة RLS roadmaps_archived_visible_to_owners ترفض القراءة بهدوء
        // (نتيجة فاضية، لا خطأ اتصال). في هذه الحالة بالتحديد لا يجوز
        // الانزلاق لـfallback محلي (الذي لا يفحص أي صلاحية إطلاقاً ويكشف
        // المحتوى لأي شخص) — يجب أن يبقى المسار مرفوضاً فعلياً كما تقصد
        // سياسة RLS. الـfallback يبقى مخصَّصاً فقط لفشل تقني حقيقي (انقطاع
        // شبكة/timeout/خطأ خادم) لا لرفض وصول مقصود.
        var isPermissionDenialNotTechnicalFailure = err && /roadmap not found/i.test(err.message || '');
        if (isPermissionDenialNotTechnicalFailure) {
          console.warn('[RoadmapService] "' + slug + '" غير متاح لهذا المستخدم (مؤرشف أو بلا صلاحية) — لا يُستخدَم fallback.');
          return null;
        }
        console.warn('[RoadmapService] Supabase fetch failed for "' + slug + '", falling back to local data:', err && err.message);
        if (typeof RoadmapMapping !== 'undefined') {
          try {
            var fallbackRoadmap = RoadmapMapping.adaptLegacyTrackToRoadmap(slug);
            // حماية إضافية: حتى في طريق fallback التقني الحقيقي، لا نعرض
            // مساراً معلَّماً archived في data.js — يبقى مرفوضاً بصرف النظر
            // عن سبب الانزلاق لهذا المسار.
            if (fallbackRoadmap && fallbackRoadmap.archived) return null;
            return fallbackRoadmap;
          }
          catch (e) { console.warn('[RoadmapService] fallback mapping also failed:', e); return null; }
        }
        return null;
      })
      .then(function (roadmap) {
        if (roadmap) _roadmapCache[slug] = roadmap;
        return roadmap;
      });
  }

  function listRoadmaps() {
    if (_listCache) return Promise.resolve(_listCache);
    var supaList = withTimeout(
      Promise.resolve().then(function () {
        var supa = getSupa();
        if (!supa) throw new Error('no client');
        return supa.from('roadmaps').select('*').eq('is_published', true).order('order_index');
      }).then(function (res) { if (res.error || !res.data) throw new Error('list fetch failed'); return res.data; }),
      FETCH_TIMEOUT_MS);

    return supaList
      .catch(function (err) {
        console.warn('[RoadmapService] Supabase list failed, falling back to local data:', err && err.message);
        if (typeof RoadmapMapping === 'undefined') return [];
        return RoadmapMapping.adaptAllLegacyTracks().map(function (r) {
          return { id: r.id, slug: r.slug, career_id: r.career_id, title: r.title, subtitle: r.subtitle,
                   level: r.level, duration_label: r.duration_label, icon: r.icon, color: r.color, cover_image: r.cover_image,
                   title_ar: r.title_ar || null, archived: !!r.archived };
        }).filter(function (r) { return !r.archived; });
      })
      .then(function (list) { _listCache = list; return list; });
  }

  function clearCache() { _roadmapCache = {}; _listCache = null; }

  global.RoadmapService = {
    getRoadmap: getRoadmap,
    listRoadmaps: listRoadmaps,
    clearCache: clearCache
  };
})(typeof window !== 'undefined' ? window : globalThis);
