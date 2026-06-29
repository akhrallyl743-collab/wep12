BEGIN;

-- ============ أقسام ui-ux-track ============
-- قسم: uiux-figma-fundamentals
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-figma-fundamentals', 'كورس أساسي: UI Design و Figma من الصفر (21 حلقة)', NULL, 'core_skills'::roadmap_stage_type, NULL, '—', NULL, 1
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-01', 'مقدمة كورس تعلم Figma من الصفر للاحتراف 2026', 'video'::roadmap_step_type, '5:50', 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: مقدمة كورس تعلم Figma من الصفر للاحتراف 2026', 'https://www.youtube.com/embed/XD_IEIbbF4Q', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-01'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-02', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الأولى المقدمة', 'video'::roadmap_step_type, '9:32', 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الأولى المقدمة', 'https://www.youtube.com/embed/MJDPFYe_0g0', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-02'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-03', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثانيه هل المجال مهم وليه مستقبل؟', 'video'::roadmap_step_type, '4:02', 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثانيه هل المجال مهم وليه مستقبل؟', 'https://www.youtube.com/embed/qSOAlU6112o', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-03'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-04', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثالثه ايه الجهاز الي محتاجه؟', 'video'::roadmap_step_type, '5:03', 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثالثه ايه الجهاز الي محتاجه؟', 'https://www.youtube.com/embed/YQ8kgnIVLMw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-04'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-05', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الرابعه كل حاجه محتاج تعرفها عن الالوان Color', 'video'::roadmap_step_type, '27:06', 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الرابعه كل حاجه محتاج تعرفها عن الالوان Color', 'https://www.youtube.com/embed/1SfKlnZxdNw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-05'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-06', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الخامسة كل حاجه محتاج تعرفها عن النصوص Typography', 'video'::roadmap_step_type, '21:19', 6
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الخامسة كل حاجه محتاج تعرفها عن النصوص Typography', 'https://www.youtube.com/embed/IgcyqReaUb8', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-06'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-07', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السادسة كل حاجه  عن المسافات UI Spacing', 'video'::roadmap_step_type, '38:36', 7
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السادسة كل حاجه  عن المسافات UI Spacing', 'https://www.youtube.com/embed/kr7ExgMWmAY', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-07'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-08', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الاول', 'video'::roadmap_step_type, '19:55', 8
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الاول', 'https://www.youtube.com/embed/gJ5SHjWMTyE', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-08'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-09', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الثاني', 'video'::roadmap_step_type, '8:16', 9
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الثاني', 'https://www.youtube.com/embed/nHRcr2NivzU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-09'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-10', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الثالث', 'video'::roadmap_step_type, '7:42', 10
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة السابعة كل حاجه عن الـ UI Layout الجزء الثالث', 'https://www.youtube.com/embed/rxOvJsjuGIA', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-10'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-11', 'كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثامنة كل حاجه عن الـ Wireframes وامتي تستخدمه!', 'video'::roadmap_step_type, '13:07', 11
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: كورس تعلم الـ UI Design من الصفر للاحتراف | الحلقة الثامنة كل حاجه عن الـ Wireframes وامتي تستخدمه!', 'https://www.youtube.com/embed/4eh8iMcjgXs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-11'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-12', 'الحلقة الأولى من  كورس تعلم Figma من الصفر للاحتراف', 'video'::roadmap_step_type, '5:00', 12
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة الأولى من  كورس تعلم Figma من الصفر للاحتراف', 'https://www.youtube.com/embed/vpCqCd0n9kc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-12'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-13', 'الحلقة الثانية من  كورس تعلم Figma من الصفر للاحتراف 2026 | تعلم واجهة فيجما الجزء الاول', 'video'::roadmap_step_type, '16:08', 13
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة الثانية من  كورس تعلم Figma من الصفر للاحتراف 2026 | تعلم واجهة فيجما الجزء الاول', 'https://www.youtube.com/embed/i8mBt_883y8', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-13'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-14', 'الحلقة الثالثة من  كورس تعلم Figma من الصفر للاحتراف 2026 | تعلم واجهة فيجما الجزء الثاني', 'video'::roadmap_step_type, '42:35', 14
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة الثالثة من  كورس تعلم Figma من الصفر للاحتراف 2026 | تعلم واجهة فيجما الجزء الثاني', 'https://www.youtube.com/embed/JOUcTCl4Ad4', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-14'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-15', 'الحلقة الرابعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام النصوص Typography باحترافيه', 'video'::roadmap_step_type, '28:42', 15
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة الرابعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام النصوص Typography باحترافيه', 'https://www.youtube.com/embed/p_i-mUsb8nk', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-15'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-16', 'الحلقة الخامسة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام الالوان Colors باحترافيه', 'video'::roadmap_step_type, '16:20', 16
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة الخامسة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام الالوان Colors باحترافيه', 'https://www.youtube.com/embed/XCiFT9gEmoo', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-16'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-17', 'الحلقة السادسة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام التآثيرات Effects  باحترافيه', 'video'::roadmap_step_type, '17:52', 17
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة السادسة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام التآثيرات Effects  باحترافيه', 'https://www.youtube.com/embed/swo9bRDPLb8', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-17'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-18', 'الحلقة السابعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام Sections لتسليم المبرمج الشغل', 'video'::roadmap_step_type, '8:08', 18
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة السابعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام Sections لتسليم المبرمج الشغل', 'https://www.youtube.com/embed/qkgI9XtfSdU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-18'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-19', 'الحلقة الثامنه من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام Groups وايه مميزاته', 'video'::roadmap_step_type, '4:15', 19
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة الثامنه من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام Groups وايه مميزاته', 'https://www.youtube.com/embed/aQtJAtNy1DU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-19'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-20', 'الحلقة التاسعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  بدايه استخدام ال Auto Layout', 'video'::roadmap_step_type, '28:29', 20
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة التاسعة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  بدايه استخدام ال Auto Layout', 'https://www.youtube.com/embed/Tcm9-lPP8Fo', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-20'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-figma-21', 'الحلقة العاشرة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام ال Auto Layout الجزء الثاني', 'video'::roadmap_step_type, '37:42', 21
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-figma-fundamentals'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: الحلقة العاشرة من  كورس تعلم Figma من الصفر للاحتراف 2026 |  استخدام ال Auto Layout الجزء الثاني', 'https://www.youtube.com/embed/Y9rgIyJlBDc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-figma-21'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w01
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w01', 'Level 1: Beginner - الأسبوع 1: What is UI/UX, and what is the difference between UI & UX & Product Design?', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 2
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w01-r1', 'What is UI/UX, and what is the difference between UI & UX & Product Design? — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w01'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: What is UI/UX, and what is the difference between UI & UX & Product Design? — فيديو 1', 'https://youtu.be/Nje7GiGeKW0?si=y4-xJl9wg114HdWR', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w01-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w01-r2', 'What is UI/UX, and what is the difference between UI & UX & Product Design? — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w01'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: What is UI/UX, and what is the difference between UI & UX & Product Design? — فيديو 2', 'https://youtu.be/9xxkKl_8XjM?si=7DTn5i5Ws2YMSLh2', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w01-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w01-extra', 'موارد إضافية لهذا الأسبوع: What is UI/UX, and what is the difference between UI & UX & Product Design? — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w01'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: What is UI/UX, and what is the difference between UI & UX & Product Design? — مصدر إضافي', 'https://www.interaction-design.org/literature/article/ux-vs-ui-what-s-the-difference', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w01-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w01-task', 'مهمة الأسبوع: 1. Summarize what you learned.', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w01'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: 1. Summarize what you learned.', 'https://youtu.be/Nje7GiGeKW0?si=y4-xJl9wg114HdWR', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w01-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w02
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w02', 'Level 1: Beginner - الأسبوع 2: Intro to UX Design', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 3
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w02-r1', 'Intro to UX Design — فيديو 1', 'reading'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w02'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'Intro to UX Design — فيديو 1', 'https://maharatech.gov.eg/mod/hvp/view.php?id=9511', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w02-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w02-task', 'مهمة الأسبوع: Summarize the course & get the certificate', 'project'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w02'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: Summarize the course & get the certificate', 'https://maharatech.gov.eg/mod/hvp/view.php?id=9511', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w02-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w03
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w03', 'Level 1: Beginner - الأسبوع 3: Visual Design Principles', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 4
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w03-r1', 'Visual Design Principles — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w03'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Visual Design Principles — فيديو 1', 'https://youtu.be/9EPTM91TBDU?si=hm6WvAuDei_RfQHA', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w03-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w03-r2', 'Visual Design Principles — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w03'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Visual Design Principles — فيديو 2', 'https://youtu.be/Tj5WzZW8KJM?si=nLfPDi0cVXSh-ABi', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w03-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w03-extra', 'موارد إضافية لهذا الأسبوع: Visual Design Principles — مصدر إضافي، Visual Design Principles — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w03'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: Visual Design Principles — مصدر إضافي، Visual Design Principles — مصدر إضافي', 'https://www.toptal.com/designers/ui/principles-of-design', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w03-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w03-task', 'مهمة الأسبوع: 1. Summarize what you learned.', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w03'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: 1. Summarize what you learned.', 'https://youtu.be/9EPTM91TBDU?si=hm6WvAuDei_RfQHA', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w03-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w04
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w04', 'Level 1: Beginner - الأسبوع 4: Figma Interface', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 5
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w04-task', 'مهمة الأسبوع: Design the task in the video', 'project'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w04'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Design the task in the video', 'https://youtu.be/Ym7HCe5cQP8?si=NURguYLa1Ro2dnUP', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w04-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w05
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w05', 'Level 1: Beginner - الأسبوع 5: UI Principles (p1)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 6
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w05-r1', 'UI Principles (p1) — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w05'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: UI Principles (p1) — فيديو 1', 'https://youtu.be/IgcyqReaUb8?si=tSFKTxcs6OY6uGmu', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w05-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w05-r2', 'UI Principles (p1) — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w05'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: UI Principles (p1) — فيديو 2', 'https://youtu.be/GCluIaNmOG0?si=XVHhKXUyJ7fxnYQI', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w05-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w05-extra', 'موارد إضافية لهذا الأسبوع: UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w05'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي، UI Principles (p1) — مصدر إضافي', 'https://youtu.be/1SfKlnZxdNw?si=jhvpL0EfCOE1GzfI', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w05-extra'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w06
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w06', 'Level 1: Beginner - الأسبوع 6: UI Principles (p2)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 7
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w06-r1', 'UI Principles (p2) — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w06'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: UI Principles (p2) — فيديو 1', 'https://youtu.be/kr7ExgMWmAY?si=sf1E7H90njE3KFq1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w06-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w06-r2', 'UI Principles (p2) — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w06'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: UI Principles (p2) — فيديو 2', 'https://youtu.be/cf95Z7Ngg8k?si=hRhTW9UOwSJV6YxI', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w06-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w06-extra', 'موارد إضافية لهذا الأسبوع: UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w06'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي، UI Principles (p2) — مصدر إضافي', 'https://youtu.be/gJ5SHjWMTyE?si=l9bW-C93qB9rLB8n', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w06-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w06-task', 'مهمة الأسبوع: Copy the design:', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w06'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: Copy the design:', 'https://cdn.dribbble.com/userupload/45637093/file/3bf31d7cb7c33d65f93a00fdf2968fed.png?resize=1504x1128&vertical=center', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w06-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w07
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w07', 'Level 1: Beginner - الأسبوع 7: Auto Layout', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 8
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w07-r1', 'Auto Layout — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w07'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Auto Layout — فيديو 1', 'https://youtu.be/Tcm9-lPP8Fo?si=1sw81dII7Us4YylN', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w07-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w07-r2', 'Auto Layout — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w07'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Auto Layout — فيديو 2', 'https://youtu.be/Y1CHg3KVQoc?si=kDUoYbUqRY08yLGz', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w07-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w07-task', 'مهمة الأسبوع: Copy the design:', 'project'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w07'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: Copy the design:', 'https://www.behance.net/gallery/245941343/Social-User-Profile-Management-Settings-UI-/modules/1421156267', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w07-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w08
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w08', 'Level 1: Beginner - الأسبوع 8: Wireframe', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 9
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w08-r1', 'Wireframe — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w08'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Wireframe — فيديو 1', 'https://youtu.be/4eh8iMcjgXs?si=ugQcuvIdZ9eCaTAi', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w08-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w08-r2', 'Wireframe — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w08'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Wireframe — فيديو 2', 'https://youtu.be/qpH7-KFWZRI?si=3lHsFmcpdii8n_C2', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w08-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w08-extra', 'موارد إضافية لهذا الأسبوع: Wireframe — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w08'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: Wireframe — مصدر إضافي', 'https://www.toools.design/best-ux-design-and-prototype-tools#wireframing-tools', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w08-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w08-task', 'مهمة الأسبوع: Login & Sign up (Low-fidelity screens)', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w08'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Login & Sign up (Low-fidelity screens)', 'https://youtu.be/4eh8iMcjgXs?si=ugQcuvIdZ9eCaTAi', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w08-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l1-w09
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l1-w09', 'Level 1: Beginner - الأسبوع 9: Final Project & Competition', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 10
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l1-w09-r1', 'Final Project & Competition — فيديو 1', 'reading'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l1-w09'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'Final Project & Competition — فيديو 1', 'https://drive.google.com/drive/folders/1ENSIbbb58iNyYDJHRBhpq-H0stSY-Gsm?usp=sharing', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l1-w09-r1'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w10
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w10', 'Level 2: Intermediate - الأسبوع 10: UX Basics', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 11
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w10-r1', 'UX Basics — فيديو 1', 'reading'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w10'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'UX Basics — فيديو 1', 'https://www.edraak.org/en/programs/specialization/uiux-v1/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w10-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w10-task', 'مهمة الأسبوع: 1. Summarize what you learned. 2. Course Certificate', 'project'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w10'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: 1. Summarize what you learned. 2. Course Certificate', 'https://www.edraak.org/en/programs/specialization/uiux-v1/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w10-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w11
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w11', 'Level 2: Intermediate - الأسبوع 11: Design Thinking', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 12
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w11-r1', 'Design Thinking — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w11'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Design Thinking — فيديو 1', 'https://youtu.be/n8V5yV2VEtU?si=7H9I0EqsTW9sB64w', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w11-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w11-r2', 'Design Thinking — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w11'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Design Thinking — فيديو 2', 'https://youtu.be/p_IKACdmH10?si=dlceVdo1YrT0Ji3u', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w11-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w11-extra', 'موارد إضافية لهذا الأسبوع: Design Thinking — مصدر إضافي، Design Thinking — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w11'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: Design Thinking — مصدر إضافي، Design Thinking — مصدر إضافي', 'https://www.nngroup.com/articles/design-thinking/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w11-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w11-task', 'مهمة الأسبوع: 1. Choose a problem you face in your daily life or in an app you use, and apply the **Design Thinking process** to it.', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w11'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: 1. Choose a problem you face in your daily life or in an app you use, and apply the **Design Thinking process** to it.', 'https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w11-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w12
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w12', 'Level 2: Intermediate - الأسبوع 12: Components & Variants', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 13
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w12-r1', 'Components & Variants — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w12'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Components & Variants — فيديو 1', 'https://youtu.be/bMStMrZMLBc?si=VCh501BTA1Z5eW3-', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w12-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w12-r2', 'Components & Variants — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w12'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Components & Variants — فيديو 2', 'https://youtu.be/BGNacvycbiI?si=fUpE5m_A7XQHgsxY', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w12-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w12-extra', 'موارد إضافية لهذا الأسبوع: Components & Variants — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w12'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Components & Variants — مصدر إضافي', 'https://youtu.be/gDbNZ8s-yrA?si=8ND7qjOVPuNrvVDP', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w12-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w12-task', 'مهمة الأسبوع: Design a Home Page for a simple app (for example: shopping, food delivery, or notes app) and make sure to apply these requirements 👇 1. Cards • Create a Card Component that includes: ◦ A product image (use Instant Swap to change images). ◦ Product name and price. ◦ A Button Component placed inside the card. • The Button Component should have 2 Variants: ◦ Active ◦ Pressed 2. Navigation Bar • Create a Nav Bar Component that contains icons or tabs (e.g. Home, Profile, Cart). • Use Instant Swap between navigation states. (active - disabled)', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w12'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Design a Home Page for a simple app (for example: shopping, food delivery, or notes app) and make sure to apply these requirements 👇 1. Cards • Create a Card Component that includes: ◦ A product image (use Instant Swap to change images). ◦ Product name and price. ◦ A Button Component placed inside the card. • The Button Component should have 2 Variants: ◦ Active ◦ Pressed 2. Navigation Bar • Create a Nav Bar Component that contains icons or tabs (e.g. Home, Profile, Cart). • Use Instant Swap between navigation states. (active - disabled)', 'https://youtu.be/bMStMrZMLBc?si=VCh501BTA1Z5eW3-', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w12-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w13
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w13', 'Level 2: Intermediate - الأسبوع 13: Styles', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 14
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w13-r1', 'Styles — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w13'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Styles — فيديو 1', 'https://youtu.be/P5y_QuPb9g4?si=pARd-aljQ2DBGd7T', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w13-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w13-r2', 'Styles — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w13'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Styles — فيديو 2', 'https://youtu.be/DSNE3FPGmac?si=tLCzB6E6JfyKDLLw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w13-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w13-extra', 'موارد إضافية لهذا الأسبوع: Styles — مصدر إضافي، Styles — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w13'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Styles — مصدر إضافي، Styles — مصدر إضافي', 'https://youtu.be/78Yiblp1Ib4?si=tFl_iUBQUiB-cs4c', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w13-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w13-task', 'مهمة الأسبوع: 1. Summarize what you read.', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w13'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: 1. Summarize what you read.', 'https://www.figma.com/design/ZLJwFg2Jg0SUJchKXDPQ6t/Task?node-id=0-1&t=E77nXsxYiJxtwBkp-1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w13-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w14
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w14', 'Level 2: Intermediate - الأسبوع 14: Design System p1', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 15
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w14-r1', 'Design System p1 — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w14'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Design System p1 — فيديو 1', 'https://youtu.be/_SK2L3Nns_s?si=u3Awmd5OcA35XwV1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w14-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w14-r2', 'Design System p1 — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w14'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Design System p1 — فيديو 2', 'https://youtu.be/4STqQw-gMtE?si=V5a9DAtNdfJTLa9f', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w14-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w14-task', 'مهمة الأسبوع: 1. Create text field components', 'project'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w14'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: 1. Create text field components', 'https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w14-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w15
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w15', 'Level 2: Intermediate - الأسبوع 15: Design System p2', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 16
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w15-r1', 'Buttons', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w15'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Buttons', 'https://youtu.be/gvDOui1V5l4?si=oI-OKSOb5AoGZHr1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w15-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w15-r2', 'Dropdowns', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w15'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Dropdowns', 'https://youtu.be/MXnzu6RtHJU?si=yjoflCgQaHtW4d3-', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w15-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w15-task', 'مهمة الأسبوع: 1. Create buttons & dropdown components', 'project'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w15'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: 1. Create buttons & dropdown components', 'https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w15-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w16
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w16', 'Level 2: Intermediate - الأسبوع 16: Design System p3', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 17
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w16-r1', 'Checkboxes & Radio Buttons', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w16'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Checkboxes & Radio Buttons', 'https://youtu.be/vfCAFDtENVE?si=b1nOsCoHx5vLdm2W', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w16-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w16-r2', 'Pattern Library', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w16'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Pattern Library', 'https://youtu.be/qu53GgSgOak?si=i5tMGpkaSmsEG5dW', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w16-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w16-task', 'مهمة الأسبوع: 1. Design Login & Sign up screens for mobile app & desktop using design system Resources:', 'project'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w16'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: 1. Design Login & Sign up screens for mobile app & desktop using design system Resources:', 'https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w16-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w17
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w17', 'Level 2: Intermediate - الأسبوع 17: Grids', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 18
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w17-r1', 'Grids', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w17'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Grids', 'https://youtu.be/xUfiMPTz2mI?si=YALdlkiK35hdSiU2', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w17-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w17-task', 'مهمة الأسبوع: راجع رابط المهمة المرفق', 'project'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w17'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مهمة الأسبوع: راجع رابط المهمة المرفق', 'https://drive.google.com/drive/folders/1SHozBcnm3hZWPzgZSLYB6NVewxPtYNXR?usp=sharing', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w17-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w18
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w18', 'Level 2: Intermediate - الأسبوع 18: Responsive Design', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 19
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w18-r1', 'Responsive Design — فيديو 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w18'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Responsive Design — فيديو 1', 'https://youtu.be/g1LDcbIcqgQ?si=4hE4Es-R-r-BhsQ_', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w18-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w18-r2', 'Responsive Design — فيديو 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w18'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Responsive Design — فيديو 2', 'https://youtu.be/gsVWwYC9gXI?si=eMiNKXpauJf76yHN', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w18-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w18-task', 'مهمة الأسبوع: راجع رابط المهمة المرفق', 'project'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w18'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: راجع رابط المهمة المرفق', 'https://youtu.be/Jz51jYRB_kE?si=cGDJjskeMEGbErXI', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w18-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l2-w19
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l2-w19', 'Level 2: Intermediate - الأسبوع 19: Variables', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 20
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w19-r1', 'Playlist (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w19'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Playlist (Arabic)', 'https://youtube.com/playlist?list=PLk31GonFeFpuGaYgN2uiwa4SpMEitr-ft&si=eD7S-m9mynO_sQWG', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w19-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w19-r2', 'Variables — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w19'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Variables — فيديو 2 (English)', 'https://youtu.be/fn4rP20U2UM?si=08EO2v-L7TtB0_dh', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w19-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w19-extra', 'موارد إضافية لهذا الأسبوع: How to Use Variables in Figma – A Handbook for Beginners، Design Tokens 101: How to Use Figma Variables in Real Projects | by Nathan | Apr, 2026 | Muzli - Design Inspiration', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w19'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: How to Use Variables in Figma – A Handbook for Beginners، Design Tokens 101: How to Use Figma Variables in Real Projects | by Nathan | Apr, 2026 | Muzli - Design Inspiration', 'https://www.freecodecamp.org/news/variables-in-figma-handbook', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w19-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l2-w19-task', 'مهمة الأسبوع: Create an E-commerce Home Page that supports: - Light / Dark themes - English / Arabic layout - Variables for colors, spacing, and typography', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l2-w19'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Create an E-commerce Home Page that supports: - Light / Dark themes - English / Arabic layout - Variables for colors, spacing, and typography', 'https://youtube.com/playlist?list=PLk31GonFeFpuGaYgN2uiwa4SpMEitr-ft&si=eD7S-m9mynO_sQWG', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l2-w19-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w21
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w21', 'Level 3: Advanced - الأسبوع 21: UX Research → (Emphasis)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 21
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w21-r1', 'UX Research → (Emphasis) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w21'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: UX Research → (Emphasis) — فيديو 1 (Arabic)', 'https://youtu.be/z3ruzLItPlM?si=Q5Hv9qyn12EwcQUc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w21-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w21-r2', 'UX Research → (Emphasis) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w21'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: UX Research → (Emphasis) — فيديو 2 (English)', 'https://youtu.be/Lg2rXgxUoGE?si=oY_Ju1fwXlbG_h5a', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w21-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w21-extra', 'موارد إضافية لهذا الأسبوع: UX Research → (Emphasis) — مصدر إضافي، UX Research → (Emphasis) — مصدر إضافي، What is User Research? — updated 2025 | IxDF، UX design research methods | Figma، Quantitative vs. qualitative research', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w21'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: UX Research → (Emphasis) — مصدر إضافي، UX Research → (Emphasis) — مصدر إضافي، What is User Research? — updated 2025 | IxDF، UX design research methods | Figma، Quantitative vs. qualitative research', 'https://youtu.be/zGCRhd3r4fE?si=2Ew6DZ2xaRaH6xbc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w21-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w21-task', 'مهمة الأسبوع: Summarize what you learned', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w21'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Summarize what you learned', 'https://youtu.be/z3ruzLItPlM?si=Q5Hv9qyn12EwcQUc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w21-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w22
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w22', 'Level 3: Advanced - الأسبوع 22: Surveys & Interviews → (Emphasis)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 22
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w22-r1', 'Surveys & Interviews → (Emphasis) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w22'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Surveys & Interviews → (Emphasis) — فيديو 1 (Arabic)', 'https://youtu.be/1I80heBlPN4?si=feo-dF_C21TIVXm_', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w22-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w22-r2', 'Surveys & Interviews → (Emphasis) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w22'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Surveys & Interviews → (Emphasis) — فيديو 2 (English)', 'https://youtu.be/5tVbFfGDQCk?si=_yNa6zYLvBj7WX01', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w22-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w22-extra', 'موارد إضافية لهذا الأسبوع: Surveys & Interviews → (Emphasis) — مصدر إضافي، Surveys & Interviews → (Emphasis) — مصدر إضافي، User Interviews for UX Research: What, Why & How، Surveys for UX Research', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w22'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Surveys & Interviews → (Emphasis) — مصدر إضافي، Surveys & Interviews → (Emphasis) — مصدر إضافي، User Interviews for UX Research: What, Why & How، Surveys for UX Research', 'https://youtu.be/MuyJOQFwwlw?si=Xc7wExzxhfuA2lM3', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w22-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w22-task', 'مهمة الأسبوع: Apply to your project user interviews & survey analytics', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w22'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Apply to your project user interviews & survey analytics', 'https://youtu.be/1I80heBlPN4?si=feo-dF_C21TIVXm_', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w22-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w23
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w23', 'Level 3: Advanced - الأسبوع 23: Competitive & SWOT Analysis → (Emphasis)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 23
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w23-r1', 'Competitive & SWOT Analysis → (Emphasis) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w23'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Competitive & SWOT Analysis → (Emphasis) — فيديو 1 (Arabic)', 'https://youtu.be/JyLiEl3px28?si=Yb1Sh1xz9agRKVVe', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w23-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w23-r2', 'Competitive & SWOT Analysis → (Emphasis) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w23'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Competitive & SWOT Analysis → (Emphasis) — فيديو 2 (English)', 'https://youtu.be/uC1k3KnW9Ik?si=52nF5hwsgRJseIS3', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w23-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w23-extra', 'موارد إضافية لهذا الأسبوع: Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive Analysis for UX – Top 6 Research Methods | UXPin، Top Things to Know About UX Competitive Analysis | by uxplanet.org | UX Planet', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w23'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive & SWOT Analysis → (Emphasis) — مصدر إضافي، Competitive Analysis for UX – Top 6 Research Methods | UXPin، Top Things to Know About UX Competitive Analysis | by uxplanet.org | UX Planet', 'https://youtu.be/xaIeoPtHnuY?si=bjmUfOD-FqnfoPxA', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w23-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w23-task', 'مهمة الأسبوع: Choose **3–4 competitors** for your project topic and create a **Competitive Analysis + SWOT Analysis**', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w23'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Choose **3–4 competitors** for your project topic and create a **Competitive Analysis + SWOT Analysis**', 'https://youtu.be/JyLiEl3px28?si=Yb1Sh1xz9agRKVVe', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w23-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w24
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w24', 'Level 3: Advanced - الأسبوع 24: Problem Statement → (Define)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 24
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w24-r1', 'Problem Statement → (Define) — فيديو 1 (English)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w24'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Problem Statement → (Define) — فيديو 1 (English)', 'https://youtu.be/SLwQxKvzfz8?si=UZoP4lEXZE6KPowU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w24-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w24-r2', 'UX problem statement examples and tips to master it (Guide)', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w24'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'UX problem statement examples and tips to master it (Guide)', 'https://www.eleken.co/blog-posts/ux-problem-statement-examples', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w24-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w24-extra', 'موارد إضافية لهذا الأسبوع: Problem Statement → (Define) — مصدر إضافي، Problem Statements in UX Discovery - NN/G', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w24'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Problem Statement → (Define) — مصدر إضافي، Problem Statements in UX Discovery - NN/G', 'https://youtu.be/kT0ZqwdPYRM?si=3PN40j2dtKUIMZ9O', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w24-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w24-task', 'مهمة الأسبوع: Apply to your project **Problem Statement**', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w24'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Apply to your project **Problem Statement**', 'https://youtu.be/SLwQxKvzfz8?si=UZoP4lEXZE6KPowU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w24-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w25
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w25', 'Level 3: Advanced - الأسبوع 25: Persona & Empathy Map → (Define)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 25
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w25-r1', 'Persona & Empathy Map → (Define) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w25'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Persona & Empathy Map → (Define) — فيديو 1 (Arabic)', 'https://youtu.be/0gJR-Jb99U4?si=u-FrzK__FIkvU66M', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w25-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w25-r2', 'Persona & Empathy Map → (Define) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w25'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Persona & Empathy Map → (Define) — فيديو 2 (English)', 'https://youtu.be/u44pBnAn7cM?si=Ozci7QZeqFO1mzjB', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w25-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w25-extra', 'موارد إضافية لهذا الأسبوع: Persona & Empathy Map → (Define) — مصدر إضافي، Persona & Empathy Map → (Define) — مصدر إضافي، User Persona and Empathy Map: Key Differences & Importance، Creating Personas. A guide, not a template | by Ben Le Ralph | Medium، Empathy Map – Why and How to Use It | IxDF', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w25'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Persona & Empathy Map → (Define) — مصدر إضافي، Persona & Empathy Map → (Define) — مصدر إضافي، User Persona and Empathy Map: Key Differences & Importance، Creating Personas. A guide, not a template | by Ben Le Ralph | Medium، Empathy Map – Why and How to Use It | IxDF', 'https://youtu.be/QwF9a56WFWA?si=YHn--rvmGDPMRohr', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w25-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w25-task', 'مهمة الأسبوع: Apply to your project **Persona & Empathy map**', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w25'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Apply to your project **Persona & Empathy map**', 'https://youtu.be/0gJR-Jb99U4?si=u-FrzK__FIkvU66M', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w25-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w26
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w26', 'Level 3: Advanced - الأسبوع 26: Journey Map → (Define)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 26
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w26-r1', 'Journey Map → (Define) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w26'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Journey Map → (Define) — فيديو 1 (Arabic)', 'https://youtu.be/tlOClosfiPc?si=X9tUetE0AO2lZ1bT', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w26-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w26-r2', 'Journey Map → (Define) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w26'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Journey Map → (Define) — فيديو 2 (English)', 'https://youtu.be/3iwL2OEeWiw?si=EksYfam21yN50-Q1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w26-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w26-extra', 'موارد إضافية لهذا الأسبوع: What is a Customer Journey Map? Tips & Examples | Miro، Customer Journey Map: Definition & Process | IxDF، How to create a customer journey map: a practical guide with real examples', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w26'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: What is a Customer Journey Map? Tips & Examples | Miro، Customer Journey Map: Definition & Process | IxDF، How to create a customer journey map: a practical guide with real examples', 'https://miro.com/customer-journey-map/what-is-a-customer-journey-map/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w26-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w26-task', 'مهمة الأسبوع: Apply to your project **Journey Map**', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w26'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Apply to your project **Journey Map**', 'https://youtu.be/tlOClosfiPc?si=X9tUetE0AO2lZ1bT', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w26-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w27
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w27', 'Level 3: Advanced - الأسبوع 27: Brainstorming & Affinity Diagram → (Ideate)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 27
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w27-r1', 'Brainstorming & Affinity Diagram → (Ideate) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w27'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Brainstorming & Affinity Diagram → (Ideate) — فيديو 1 (Arabic)', 'https://youtu.be/NvZ-Fz6eP7I?si=HSxGSW5q_HHeb4hv', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w27-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w27-r2', 'Brainstorming & Affinity Diagram → (Ideate) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w27'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Brainstorming & Affinity Diagram → (Ideate) — فيديو 2 (English)', 'https://youtu.be/uVz_oFK472w?si=_0O8_C37V5KTq07G', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w27-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w27-extra', 'موارد إضافية لهذا الأسبوع: Brainstorming & Affinity Diagram → (Ideate) — مصدر إضافي، Brainstorming & Affinity Diagram → (Ideate) — مصدر إضافي، What is Brainstorming? Techniques and Methods | Miro، What Is An Affinity Diagram And How Do You Use It? | MiroBlog', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w27'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Brainstorming & Affinity Diagram → (Ideate) — مصدر إضافي، Brainstorming & Affinity Diagram → (Ideate) — مصدر إضافي، What is Brainstorming? Techniques and Methods | Miro، What Is An Affinity Diagram And How Do You Use It? | MiroBlog', 'https://youtu.be/1hImtrUooe0?si=PY2JDDVi6tAMF5K0', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w27-extra'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w28
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w28', 'Level 3: Advanced - الأسبوع 28: Information Architecture & User Flow → (Ideate)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 28
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w28-r1', 'Information Architecture & User Flow → (Ideate) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w28'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Information Architecture & User Flow → (Ideate) — فيديو 1 (Arabic)', 'https://youtu.be/2iCYjjgqVWY?si=iYMB9SGLMAzt1tLw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w28-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w28-r2', 'Information Architecture & User Flow → (Ideate) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w28'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Information Architecture & User Flow → (Ideate) — فيديو 2 (English)', 'https://youtu.be/OJLfjgVlwDo?si=lXyZua8fGmJ7Q0LU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w28-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w28-extra', 'موارد إضافية لهذا الأسبوع: Information Architecture & User Flow → (Ideate) — مصدر إضافي، Information Architecture & User Flow → (Ideate) — مصدر إضافي، What is Information Architecture in UX Design? - GeeksforGeeks، UX Information Architecture: Guide & Examples | Clay، What Is a User Flow? | Figma، [How to master the design of user flows [ complete guide]](', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w28'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Information Architecture & User Flow → (Ideate) — مصدر إضافي، Information Architecture & User Flow → (Ideate) — مصدر إضافي، What is Information Architecture in UX Design? - GeeksforGeeks، UX Information Architecture: Guide & Examples | Clay، What Is a User Flow? | Figma، [How to master the design of user flows [ complete guide]](', 'https://youtu.be/0_6z39YcMTo?si=aQba2cWl89VFtJd4', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w28-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w28-task', 'مهمة الأسبوع: Apply to your project **Information Architecture & User Flow**', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w28'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Apply to your project **Information Architecture & User Flow**', 'https://youtu.be/2iCYjjgqVWY?si=iYMB9SGLMAzt1tLw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w28-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w29
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w29', 'Level 3: Advanced - الأسبوع 29: Prototype → (Design)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 29
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w29-r1', 'Prototype → (Design) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w29'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Prototype → (Design) — فيديو 1 (Arabic)', 'https://youtu.be/1hJjyL0o7vg?si=JqkIfqD7apHi7oKh', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w29-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w29-r2', 'Logo Animation', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w29'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Logo Animation', 'https://youtu.be/ZSDe8TMKgq0?si=C0qAGtuqjzMa4RTH', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w29-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w29-extra', 'موارد إضافية لهذا الأسبوع: Prototype → (Design) — مصدر إضافي، Text Animation، Onboarding Animation، Loading Animation، Navigation Bar Animation، **Swipe Card Animation**، Menu Animation', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w29'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Prototype → (Design) — مصدر إضافي، Text Animation، Onboarding Animation، Loading Animation، Navigation Bar Animation، **Swipe Card Animation**، Menu Animation', 'https://youtu.be/p8IUj994qP8?si=UItsKGHLqdMJJqqx', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w29-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w29-task', 'مهمة الأسبوع: Prototype your project', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w29'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Prototype your project', 'https://youtu.be/1hJjyL0o7vg?si=JqkIfqD7apHi7oKh', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w29-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w30
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w30', 'Level 3: Advanced - الأسبوع 30: Test & Case Study → (Test)', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 30
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w30-r1', 'Test & Case Study → (Test) — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w30'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Test & Case Study → (Test) — فيديو 1 (Arabic)', 'https://youtu.be/XisQC2JWhCA?si=CHSxkF7oSMKrUwn5', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w30-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w30-r2', 'Test & Case Study → (Test) — فيديو 2 (English)', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w30'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Test & Case Study → (Test) — فيديو 2 (English)', 'https://youtu.be/nYCJTea1AUQ?si=Mjabwl9CLdrN6MR9', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w30-r2'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w30-extra', 'موارد إضافية لهذا الأسبوع: A Comprehensive Guide To User Testing — Smashing Magazine، Iterative Usability Testing - All You Need To Know | Adobe XD Ideas، Usability testing: the complete guide | by Andrew Tipp | UX Planet', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w30'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'موارد إضافية لهذا الأسبوع: A Comprehensive Guide To User Testing — Smashing Magazine، Iterative Usability Testing - All You Need To Know | Adobe XD Ideas، Usability testing: the complete guide | by Andrew Tipp | UX Planet', 'https://www.smashingmagazine.com/2018/03/guide-user-testing/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w30-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w30-task', 'مهمة الأسبوع: Make the usability testing & upload your case study on behance', 'project'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w30'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Make the usability testing & upload your case study on behance', 'https://youtu.be/XisQC2JWhCA?si=CHSxkF7oSMKrUwn5', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w30-task'
ON CONFLICT DO NOTHING;

-- قسم: uiux-l3-w31
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'uiux-l3-w31', 'Level 3: Advanced - الأسبوع 31: Dashboard', NULL, 'core_skills'::roadmap_stage_type, NULL, 'أسبوع', NULL, 31
FROM public.roadmaps WHERE slug = 'ui-ux-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w31-r1', 'Dashboard — فيديو 1 (Arabic)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w31'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو: Dashboard — فيديو 1 (Arabic)', 'https://youtu.be/9g-MzZ91k3I?si=jWLCLSJU_73XMVe-', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w31-r1'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w31-extra', 'موارد إضافية لهذا الأسبوع: Dashboard — مصدر إضافي، Dashboard — مصدر إضافي', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w31'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'موارد إضافية لهذا الأسبوع: Dashboard — مصدر إضافي، Dashboard — مصدر إضافي', 'https://youtu.be/xZjRhIS0H0c?si=_dBjrym99jp0gXk1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w31-extra'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'uiux-l3-w31-task', 'مهمة الأسبوع: Design this dashboard', 'project'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND s.slug = 'uiux-l3-w31'
ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'مهمة الأسبوع: Design this dashboard', 'https://youtu.be/9g-MzZ91k3I?si=jWLCLSJU_73XMVe-', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id
WHERE r.slug = 'ui-ux-track' AND st.legacy_lesson_id = 'uiux-l3-w31-task'
ON CONFLICT DO NOTHING;


COMMIT;
