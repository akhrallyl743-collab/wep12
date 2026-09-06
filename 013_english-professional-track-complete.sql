-- ============================================================
-- Migration 013 — إكمال مسار تعلم اللغة الإنجليزية (نسخة نهائية كاملة)
-- يحل محل 012: يضيف كل الأسابيع (A1 الجديدة + A2/B1/B2/C1 كاملة بلا نواقص) + أسبوع ختامي
-- ملاحظة: لو نفّذت 012 القديم قبل كده، شغّل هذا الملف بعده بأمان — ON CONFLICT DO NOTHING
-- هيتجاهل أي صف موجود بنفس legacy_lesson_id ومش هيحدّثه، فلو حابب تحديث فعلي
-- للصفوف القديمة الناقصة، قولّي عشان أجهزلك DELETE + INSERT بدل كده.
-- ============================================================

BEGIN;

-- ============ قسم: A1 - الأسبوع 1 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a1-week1', 'A1 - الأسبوع 1: Meeting People and Talking About Yourself', NULL, 'fundamentals'::roadmap_stage_type, 'A1', 'أسبوع', NULL, 2
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w1-grammar', 'Grammar: Present simple: ''to be''', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week1' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w1-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w1-vocab', 'Vocabulary (10 كلمة): Name, Country, Nationality, Job, Age, Married, Single, Address, Phone number, Family', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week1' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w1-reading', 'Reading: Meeting People and Talking About Yourself', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week1' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w1-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week1' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع A1', 'https://learnenglish.britishcouncil.org/free-resources/listening/a1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w1-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w1-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week1' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع ممارسة إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple-be', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w1-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A1 - الأسبوع 2 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a1-week2', 'A1 - الأسبوع 2: Everyday Objects and Where They Are', NULL, 'fundamentals'::roadmap_stage_type, 'A1', 'أسبوع', NULL, 3
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w2-grammar', 'Grammar: Using ''there is'' and ''there are''', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/using-there-there-are', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w2-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w2-vocab', 'Vocabulary (10 كلمة): Table, Chair, Kitchen, Bedroom, Window, Fridge, Sofa, Shelf, Lamp, Wardrobe', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week2' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w2-reading', 'Reading: Everyday Objects and Where They Are', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week2' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w2-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع A1', 'https://learnenglish.britishcouncil.org/free-resources/listening/a1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w2-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w2-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع ممارسة إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/using-there-there-are', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w2-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A1 - الأسبوع 3 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a1-week3', 'A1 - الأسبوع 3: Daily Routines and Habits', NULL, 'fundamentals'::roadmap_stage_type, 'A1', 'أسبوع', NULL, 4
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w3-grammar', 'Grammar: Present simple', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w3-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w3-vocab', 'Vocabulary (10 كلمة): Wake up, Breakfast, Commute, Routine, Usually, Always, Never, Sometimes, Bedtime, Schedule', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week3' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w3-reading', 'Reading: Daily Routines and Habits', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week3' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w3-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع A1', 'https://learnenglish.britishcouncil.org/free-resources/listening/a1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w3-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w3-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع ممارسة إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/present-simple', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w3-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A1 - الأسبوع 4 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a1-week4', 'A1 - الأسبوع 4: Shopping and Asking Questions', NULL, 'fundamentals'::roadmap_stage_type, 'A1', 'أسبوع', NULL, 5
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w4-grammar', 'Grammar: Question forms', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/question-forms', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w4-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w4-vocab', 'Vocabulary (10 كلمة): Price, Discount, Cashier, Receipt, Size, Fitting room, Cash, Card, Bargain, Shop assistant', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w4-reading', 'Reading: Shopping and Asking Questions', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w4-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع A1', 'https://learnenglish.britishcouncil.org/free-resources/listening/a1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w4-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a1-w4-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a1-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع ممارسة إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/question-forms', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a1-w4-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 3 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week3', 'A2 - الأسبوع 3: A Day in an Amusement Park', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 6
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w3-grammar', 'Grammar: Adjectives ending in ''-ed'' and ''-ing''', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.youtube.com/watch?v=L1sa_ZQAjlc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w3-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w3-vocab', 'Vocabulary (10 كلمة): Crowded, Thrilled, Terrifying, Exhausted, Disturbing, Refreshing, Talented, Impressive, Breathtaking, Rewarding', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week3' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w3-reading', 'Reading: A Day in an Amusement Park', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week3' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w3-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b1-listening/chatting-about-series', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w3-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w3-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://forms.gle/5DwkPZYEFEbL5qB48', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w3-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 4 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week4', 'A2 - الأسبوع 4: City Life vs. Village Life', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 7
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w4-grammar', 'Grammar: comparative adjectives', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/HqueToxC4d4?si=DlDPtqqoxhIlaspx', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w4-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w4-vocab', 'Vocabulary (12 كلمة): opportunities, entertainment, attractive, polluted, community, public transportation, services, facilities, lifestyle, healthcare, isolation, rural', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w4-reading', 'Reading: City Life vs. Village Life', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w4-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://www.youtube.com/watch?v=hSg1eZcqMio', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w4-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w4-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.english-4u.de/en/grammar-quizzes/comparison.htm', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w4-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 5 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week5', 'A2 - الأسبوع 5: Why People Travel', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 8
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w5-grammar', 'Grammar: Infinitive of purpose Grammar - Infinitive ( to + verb ) - شرح قواعد انجليزي - الفعل المصدر للمتابعة علي القناة للدروس بشكل صحيح من خلال قوائم التشغيل للصفوف با', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.youtube.com/watch?v=GaN7qgqYrvg&list=PLrnXHWfgl8kYxbKS1PpvWUZDCk9vW_E2e', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w5-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w5-vocab', 'Vocabulary (11 كلمة): Relax, Vacation, Discover, Occasion, Routine, Explore, Support, – to help someone or something., Volunteer, Difference, Connect', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w5-reading', 'Reading: Why People Travel', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w5-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b1-listening/meeting-old-friend', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w5-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w5-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.youtube.com/watch?v=GaN7qgqYrvg&list=PLrnXHWfgl8kYxbKS1PpvWUZDCk9vW_E2e', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w5-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 6 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week6', 'A2 - الأسبوع 6: Tips for Healthy Eating', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 9
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w6-grammar', 'Grammar: Quantifiers: ''few'', ''a few'', ''little'' and ''a bit of'' Learn English Grammar: FEW, LITTLE, A FEW, A LITTLE Do you have little time or a little time? Do you have f', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.engvid.com/learn-english-grammar-few-little-a-few-a-little', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w6-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w6-vocab', 'Vocabulary (12 كلمة): Consistently, Beverages, patterns, Whole grains, Fortified, Lean meats, Poultry, Legumes, Saturated fat, Hydration, Metabolism, fad', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w6-reading', 'Reading: Tips for Healthy Eating', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w6-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://www.patreon.com/listeningtime', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w6-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w6-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://byjus.com/english/few-a-few-little-a-little-exercises/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w6-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 7 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week7', 'A2 - الأسبوع 7: Hobbies and Free Time Activities', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 10
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w7-grammar', 'Grammar: Verbs followed by ''-ing'' or infinitive infinitives and ing forms / gerund شرح متى تأتى الأفعال فى المصدر ومتى تأتى مع ing infinitives and gerund للإعلان على الق', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.instagram.com/mr.ammar.adel/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w7-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w7-vocab', 'Vocabulary (10 كلمة): Hesitate, Sign up, Take part, Capture, Dream of, Retired, Recommend, Historical, Eventually, Improve', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w7-reading', 'Reading: Hobbies and Free Time Activities', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w7-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://test-english.com/listening/b1/stories-of-school-and-education-b1-english-listening-test/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w7-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w7-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.instagram.com/mr.ammar.adel/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w7-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 8 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week8', 'A2 - الأسبوع 8: A Strange Thing That Happened Last Night | your favorite movie’s story', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 11
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w8-grammar', 'Grammar: Past continuous and past simple How to Talk About the Past in English In this lesson, you can learn how to talk about the past in English. Talking about the pas', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'http://bit.ly/ooe-teachers.', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w8-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w8-vocab', 'Vocabulary (11 كلمة): consensus, Gripping, Dystopian, Narrative, Dedicated, Criticism, Particularly, Evolution, themes, Resonate, Standout', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w8-reading', 'Reading: A Strange Thing That Happened Last Night | your favorite movie’s story', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w8-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/a2', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w8-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w8-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/skills/reading/b1-reading/digital-habits-across-generations', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w8-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 9 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week9', 'A2 - الأسبوع 9: The Most Amazing Places in the World', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 12
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w9-grammar', 'Grammar: Superlative adjectives Superlative Adjectives – English Grammar Lessons Do you know how to compare three or more things in English? Learn how and when to use su', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.youtube.com/watch?v=K1Rs793CjqE', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w9-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w9-vocab', 'Vocabulary (10 كلمة): Canyon, Stunning, Ancient, Tomb, Symbol, Volcano, Peaceful, Luxury, Coral, Mystery', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week9' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w9-reading', 'Reading: The Most Amazing Places in the World', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week9' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w9-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://practiceenglishlistening.blogspot.com/2025/07/english-listening-level-b1-EP33.html', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w9-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w9-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.youtube.com/watch?v=K1Rs793CjqE', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w9-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 10 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week10', 'A2 - الأسبوع 10: Why People Quit Their Jobs', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 13
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w10-grammar', 'Grammar: Too / enough Using Too or Enough | English Grammar for Beginners Learn how to use too or enough in this English grammar lesson for beginners. I''ll teach you the', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/02fYhyGiDys', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w10-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w10-vocab', 'Vocabulary (12 كلمة): Career, Lifestyle, Mission, Replaceable, Promotion, Workshops, Seminars, Tuition, Align (with), Supervisor, Integral, Layout', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w10-reading', 'Reading: Why People Quit Their Jobs', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w10-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://youtu.be/VFBJIz2U20A', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w10-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w10-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.grammarism.com/too-enough-exercises/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w10-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 11 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week11', 'A2 - الأسبوع 11: Life Experiences You Should Try Bucket List: 100+ Incredible Things to Do Before You Die Creating a bucket list is the single most impactful thing I''ve done in my life. This post gives you some bucket', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 14
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w11-grammar', 'Grammar: Present perfect Present Perfect – Grammar & Verb Tenses Did you know there are two common uses of the present perfect tense in English? Learn how and when to us', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.youtube.com/watch?v=553eeL1Dvho', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w11-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w11-vocab', 'Vocabulary (11 كلمة): FOMO, Languishing, Nagging thought, Recession, Trajectory, Embargo, Real estate, Exotic, Epic, Obligatory, swipe', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week11' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w11-reading', 'Reading: Life Experiences You Should Try Bucket List: 100+ Incredible Things to Do Before You Die Creating a bucket list is the single most impactful thing I''ve done in my life. This post gives you some bucket', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week11' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w11-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://open.spotify.com/show/3GRJb6bwpKEbOOG7QFjRqS', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w11-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w11-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://test-english.com/grammar-points/a2/present-perfect/2/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w11-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 12 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week12', 'A2 - الأسبوع 12: How to Stay Motivated', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 15
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w12-grammar', 'Grammar: Zero and first conditionals Zero and First Conditionals: Games and Exercises in English Zero and First Conditionals: Games and Exercises in English', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.lingobest.com/free-online-english-course/zero-and-first-conditionals-games-and-exercises-in-english/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w12-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w12-vocab', 'Vocabulary (15 كلمة): Motivation, Determination, Persistence, Goal, Focus, Self-discipline, Inspiration, Encouragement, Achievement, Positive mindset, Overcome, Confidence, Resilience, Ambition, Dedication', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w12-reading', 'Reading: How to Stay Motivated', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w12-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://open.spotify.com/show/3GRJb6bwpKEbOOG7QFjRqS', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w12-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w12-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.perfect-english-grammar.com/first-conditional-exercise-1.html', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w12-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 13 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week13', 'A2 - الأسبوع 13: Becoming More Independent', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 16
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w13-grammar', 'Grammar: Reflexive pronouns REFLEXIVE pronouns | EMPHATIC pronouns | RECIPROCAL pronouns - myself, yourself... myself | yourself | himself | herself | itself | yourselve', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/j25CFx-4g0I', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w13-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w13-vocab', 'Vocabulary (14 كلمة): Independent, Responsibility, Routine, Organize, Priorities, Volunteering, Communicate, Confidence, Discipline, Courage, Limits, Maturity, Adaptability, Gradual', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w13-reading', 'Reading: Becoming More Independent', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w13-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://www.patreon.com/teded', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w13-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w13-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://youtu.be/j25CFx-4g0I', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w13-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: A2 - الأسبوع 14 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-a2-week14', 'A2 - الأسبوع 14: Celebrity Interviews', NULL, 'core_skills'::roadmap_stage_type, 'A2', 'أسبوع', NULL, 17
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w14-grammar', 'Grammar: Reported speech (basic statements) المباشر والغير مباشر في الانجليزي او الكلام المنقول Reported Speech | Direct and indirect الكلام المنقول او المباشر والغير مب', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://bit.ly/2ZGCqRG', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w14-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w14-vocab', 'Vocabulary (15 كلمة): Celebrity, Interview, Host, Guest, Audience, Famous, Well-known, Public image, Reputation, Private life, Career, Achievements, Scandal, Rumor, Talk show', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w14-reading', 'Reading: Celebrity Interviews', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w14-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'http://TED.com', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w14-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-a2-w14-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-a2-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://bit.ly/2ZGCqRG', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-a2-w14-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 5 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week5', 'B1 - الأسبوع 5: Childhood Memories of a Famous Author', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 18
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w5-grammar', 'Grammar: Past habits: ''used to'', ''would'' and the past simple', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/past-habits-used-to-would-past-simple', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w5-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w5-vocab', 'Vocabulary (10 كلمة): Nostalgic, Reminisce, Childhood, Upbringing, Sibling, Household, Curious, Imaginative, Cherish, Memory', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w5-reading', 'Reading: Childhood Memories of a Famous Author', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w5-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w5-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w5-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/past-habits-used-to-would-past-simple', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w5-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 6 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week6', 'B1 - الأسبوع 6: How People Adapt to New Cities', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 19
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w6-grammar', 'Grammar: Different uses of ''used to'' USED TO| BE USED TO| GET USED TO - English grammar used to | be used to | get used to | English Grammar lesson Hi Guys! In today''s v', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://techsmith.z6rjha.net/RyaDA9', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w6-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w6-vocab', 'Vocabulary (10 كلمة): Settle in, Feel homesick, Culture shock, Crowded, Rent, Neighborhood, Transportation, Suburb, Flatmate / Roommate, Language barrier', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w6-reading', 'Reading: How People Adapt to New Cities', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w6-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://youtu.be/PXEqJ0xhbZE?si=thLB-Bq7un9q8wIP', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w6-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w6-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://techsmith.z6rjha.net/RyaDA9', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w6-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 7 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week7', 'B1 - الأسبوع 7: The Future of Artificial Intelligence', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 20
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w7-grammar', 'Grammar: Future forms: ''will'', ''be going to'' and present continuous', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w7-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w7-vocab', 'Vocabulary (10 كلمة): Automation, Algorithm, Innovation, Efficiency, Robotics, Prediction, Ethical, Workforce, Breakthrough, Dependence', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w7-reading', 'Reading: The Future of Artificial Intelligence', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w7-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w7-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w7-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-forms-will-be-going-present-continuous', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w7-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 8 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week8', 'B1 - الأسبوع 8: A Day in the Life of a Time Traveler', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 21
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w8-grammar', 'Grammar: Future perfect & Future continuous Future Continuous and Future Perfect Explained | Advanced English Grammar Ready to unlock your English fluency? I''m reopening', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.speakconfidentenglish.com/fluencyschool/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w8-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w8-vocab', 'Vocabulary (10 كلمة): Futuristic, Historical event, Era, Time machine, Out of sync, Time distortion, Teleportation, Parallel, Unpredictable consequences, Mission', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w8-reading', 'Reading: A Day in the Life of a Time Traveler', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w8-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://englisheasypractice.com/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w8-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w8-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://test-english.com/grammar-points/b1-b2/future-continuous-and-future-perfect/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w8-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 9 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week9', 'B1 - الأسبوع 9: Life Lessons from People Over 80', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 22
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w9-grammar', 'Grammar: Present perfect Present Perfect – Grammar & Verb Tenses Did you know there are two common uses of the present perfect tense in English? Learn how and when to us', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/553eeL1Dvho?si=p7KWljF4bvcwu4rP', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w9-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w9-vocab', 'Vocabulary (11 كلمة): Wisdom, Perspective, Valuable, Reflect, Insight, Retired, Regret, Courage, Opportunities, Path, Youth', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week9' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w9-reading', 'Reading: Life Lessons from People Over 80', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week9' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w9-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://englisheasypractice.com/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w9-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w9-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.englishclub.com/grammar/verb-tenses_present-perfect_quiz.php#google_vignette', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w9-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 10 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week10', 'B1 - الأسبوع 10: The Journey of an Olympic Athlete', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 23
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w10-grammar', 'Grammar: Present perfect simple and continuous PRESENT PERFECT or PRESENT PERFECT CONTINUOUS? | the difference What''s the difference between the PRESENT PERFECT and the ', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://ko-fi.com/s/b66bf4d984', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w10-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w10-vocab', 'Vocabulary (12 كلمة): Athlete, Victory, Defeat, Dedication, Training, Strong will, Ambitious, Stamina, Strength, Opening ceremony, Record, National anthem', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w10-reading', 'Reading: The Journey of an Olympic Athlete', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w10-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://englisheasypractice.com/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w10-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w10-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/present-perfect-simple-continuous', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w10-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 12 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week12', 'B1 - الأسبوع 12: How Chocolate is Made', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 24
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w12-grammar', 'Grammar: Passive voice (present & past simple)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w12-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w12-vocab', 'Vocabulary (10 كلمة): Harvest, Roast, Grind, Ferment, Ingredient, Process, Cultivate, Refine, Export, Blend', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w12-reading', 'Reading: How Chocolate is Made', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w12-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w12-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w12-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/passives', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w12-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 13 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week13', 'B1 - الأسبوع 13: The Man Who Changed the World', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 25
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w13-grammar', 'Grammar: Relative clauses: defining relative clauses RELATIVE PRONOUNS | RELATIVE CLAUSES | ADJECTIVE CLAUSES - who, which, that, whose, whom relative pronouns - who, wh', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/kmI_2wCewpU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w13-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w13-vocab', 'Vocabulary (12 كلمة): Inspire, Pioneer, Recognition, Revolutionary, Contribution, Influential, Legacy, Global impact, Genius, Visionary, Ambitious, Resilient', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w13-reading', 'Reading: The Man Who Changed the World', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w13-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://open.spotify.com/show/3GRJb6bwpKEbOOG7QFjRqS', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w13-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w13-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://youtu.be/kmI_2wCewpU', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w13-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 14 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week14', 'B1 - الأسبوع 14: The Pros and Cons of Social Media', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 26
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w14-grammar', 'Grammar: Contrasting ideas: ''although'', ''despite'' and others', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/contrasting-ideas-although-despite-others', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w14-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w14-vocab', 'Vocabulary (10 كلمة): Addictive, Isolation, Comparison, Connection, Awareness, Distraction, Influence, Balance, Anxiety, Community', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w14-reading', 'Reading: The Pros and Cons of Social Media', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w14-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w14-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w14-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/contrasting-ideas-although-despite-others', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w14-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 15 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week15', 'B1 - الأسبوع 15: How to Be Confident: Are You Good Enough?', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 27
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w15-grammar', 'Grammar: Using ''enough''', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/using-enough', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w15-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w15-vocab', 'Vocabulary (10 كلمة): Confidence, Self-doubt, Achievement, Capable, Insecure, Reassurance, Competent, Worthy, Motivation, Encourage', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week15' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w15-reading', 'Reading: How to Be Confident: Are You Good Enough?', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week15' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w15-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w15-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w15-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/using-enough', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w15-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 16 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week16', 'B1 - الأسبوع 16: What If You Lived on Mars?', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 28
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w16-grammar', 'Grammar: Conditionals: zero, first and second', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week16' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w16-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w16-vocab', 'Vocabulary (10 كلمة): Colonize, Atmosphere, Habitat, Survive, Resource, Adapt, Exploration, Sustainable, Barren, Terrain', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week16' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w16-reading', 'Reading: What If You Lived on Mars?', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week16' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w16-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week16' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w16-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w16-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week16' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/conditionals-zero-first-second', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w16-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 17 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week17', 'B1 - الأسبوع 17: If Only I Had Followed My Dreams', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 29
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w17-grammar', 'Grammar: Wishes: ''wish'' and ''if only''', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/wishes-wish-if-only', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w17-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w17-vocab', 'Vocabulary (10 كلمة): Regret, Ambition, Opportunity, Sacrifice, Fulfillment, Passion, Determination, Hindsight, Pursue, Aspiration', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week17' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w17-reading', 'Reading: If Only I Had Followed My Dreams', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week17' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w17-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w17-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w17-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/wishes-wish-if-only', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w17-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 18 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week18', 'B1 - الأسبوع 18: Psychology: How to Read People’s Minds', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 30
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w18-grammar', 'Grammar: Question tags', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week18' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/question-tags', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w18-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w18-vocab', 'Vocabulary (10 كلمة): Perception, Instinct, Empathy, Body language, Intuition, Assumption, Observation, Behaviour, Insight, Judgement', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week18' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w18-reading', 'Reading: Psychology: How to Read People’s Minds', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week18' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w18-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week18' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w18-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w18-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week18' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/question-tags', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w18-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 19 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week19', 'B1 - الأسبوع 19: The Importance of Believing in Yourself', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 31
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w19-grammar', 'Grammar: Reflexive pronouns', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reflexive-pronouns', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w19-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w19-vocab', 'Vocabulary (10 كلمة): Self-worth, Doubt, Resilience, Encourage, Belief, Confidence, Setback, Persevere, Mindset, Growth', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week19' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w19-reading', 'Reading: The Importance of Believing in Yourself', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week19' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w19-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w19-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w19-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reflexive-pronouns', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w19-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 20 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week20', 'B1 - الأسبوع 20: The Secret Conversations of World Leaders', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 32
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w20-grammar', 'Grammar: Reported speech (basic statements & questions)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w20-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w20-vocab', 'Vocabulary (10 كلمة): Diplomacy, Negotiation, Confidential, Summit, Alliance, Tension, Statement, Leak, Strategy, Discretion', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week20' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w20-reading', 'Reading: The Secret Conversations of World Leaders', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week20' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w20-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w20-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w20-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-statements', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w20-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 21 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week21', 'B1 - الأسبوع 21: The Benefits of Learning New Skills', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 33
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w21-grammar', 'Grammar: Gerunds & infinitives', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week21' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/verbs-followed-ing-or-infinitive', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w21-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w21-vocab', 'Vocabulary (10 كلمة): Skillset, Adaptability, Curiosity, Progress, Challenge, Mastery, Consistency, Improvement, Discipline, Growth', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week21' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w21-reading', 'Reading: The Benefits of Learning New Skills', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week21' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w21-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week21' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w21-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w21-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week21' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/verbs-followed-ing-or-infinitive', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w21-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 22 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week22', 'B1 - الأسبوع 22: Why Do Celebrities Look Perfect?', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع', NULL, 34
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w22-grammar', 'Grammar: Causative form (have/get something done)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week22' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://test-english.com/grammar-points/b1-b2/have-something-done/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w22-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w22-vocab', 'Vocabulary (10 كلمة): Appearance, Cosmetic, Maintain, Image, Perfection, Pressure, Standard, Flawless, Scrutiny, Authenticity', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week22' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w22-reading', 'Reading: Why Do Celebrities Look Perfect?', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week22' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w22-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week22' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w22-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w22-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week22' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://test-english.com/grammar-points/b1-b2/have-something-done/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w22-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 2 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week2', 'B2 - الأسبوع 2: The Importance of Proper Punctuation in Writing', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 35
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w2-grammar', 'Grammar: Capital letters and apostrophes', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.youtube.com/watch?v=yNK5GRXsLJM', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w2-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w2-vocab', 'Vocabulary (11 كلمة): Clarity, Precision, Contraction, Possession, Ambiguity, Consistency, Emphasis, Legibility, Syntax, Misinterpretation, []()', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week2' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w2-reading', 'Reading: The Importance of Proper Punctuation in Writing', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week2' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w2-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://www.youtube.com/watch?v=KUKgJsvoDUk', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w2-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w2-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/capital-letters-apostrophes', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w2-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 3 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week3', 'B2 - الأسبوع 3: Describing Extreme Weather Conditions', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 36
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w3-grammar', 'Grammar: Adjectives: gradable and non-gradable', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/2zUMRoG9oa8?si=xrB3QI5UwD8FRa7r', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w3-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w3-vocab', 'Vocabulary (11 كلمة): Blizzard, Torrential, Gale, Hailstorm, Heatwave, Drought, Frostbite, Overcast, Landslide, Scorching, []()', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week3' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w3-reading', 'Reading: Describing Extreme Weather Conditions', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week3' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w3-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://youtu.be/P-QZ5Om9_20?si=tgu7JI6jsQauyQWQ', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w3-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w3-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week3' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/adjectives-gradable-non-gradable', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w3-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 4 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week4', 'B2 - الأسبوع 4: Comparing Lifestyles in Different Countries', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 37
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w4-grammar', 'Grammar: Modifying comparatives Modifying Comparative Adjectives – English Grammar lesson There are many situations when we want to emphasise how much (or little) one pe', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.youtube.com/watch?v=dJc0oRlIfoY&list=PLxSMFOK97J0MfJIcb60N__yBC05myTm-R&index=33', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w4-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w4-vocab', 'Vocabulary (10 كلمة): Custom, Urban, Rural, Diversity, Globalization, norms, Diffusion, Heritage, Ethic, Values', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w4-reading', 'Reading: Comparing Lifestyles in Different Countries', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w4-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://youtu.be/YMyofREc5Jk?si=VimtFSG4cSWsfC0D', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w4-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w4-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.linkedin.com/pulse/global-living-exploring-richness-worldwide-lifestyles-straukiene-2z2ce/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w4-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 5 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week5', 'B2 - الأسبوع 5: The Role of Metaphors in Language', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 38
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w5-grammar', 'Grammar: Using ''as'' and ''like'' Using ''as'' and ''like'' Do you know how to use like and as? Test what you know with interactive exercises and read the explanation to help y', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/using-as-like', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w5-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w5-vocab', 'Vocabulary (1 كلمة): list', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w5-reading', 'Reading: The Role of Metaphors in Language', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w5-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w5-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w5-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/using-as-like', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w5-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 6 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week6', 'B2 - الأسبوع 6: Historical Events and Their Consequences', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 39
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w6-grammar', 'Grammar: Past perfect', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w6-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w6-vocab', 'Vocabulary (10 كلمة): Consequence, Turning point, Legacy, Uprising, Milestone, Aftermath, Significance, Reform, Outcome, Impact', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w6-reading', 'Reading: Historical Events and Their Consequences', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w6-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w6-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w6-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-perfect', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w6-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 7 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week7', 'B2 - الأسبوع 7: Predictions for the World in 2050', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 40
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w7-grammar', 'Grammar: Future continuous and future perfect Future Continuous and Future Perfect Explained | Advanced English Grammar Do you feel unsure about when to use future conti', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.speakconfidentenglish.com/future-continuous-future-perfect', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w7-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w7-vocab', 'Vocabulary (10 كلمة): automation, bold, core, extraterrestrial, fiction, forecast, rapid, scarce, surgery, urban', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w7-reading', 'Reading: Predictions for the World in 2050', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w7-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://www.youtube.com/watch?v=6_q_LHq85Cs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w7-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w7-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.speakconfidentenglish.com/future-continuous-future-perfect', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w7-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 8 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week8', 'B2 - الأسبوع 8: Unfinished Plans and Missed Opportunities', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 41
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w8-grammar', 'Grammar: Future in the past (was going to / would / was about to) Grammar: Talking about the future in the past - BBC English Masterclass Improve your English grammar wi', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'http://www.bbc.co.uk/learningenglish/english/course/towards-advanced/unit-15/session-1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w8-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w8-vocab', 'Vocabulary (13 كلمة): protest, boarding pass, launch, investor, viral, passed away, put off, rehearsal, venue, fell apart, hire, priority, vacation spot', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w8-reading', 'Reading: Unfinished Plans and Missed Opportunities', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w8-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'http://kickanxietycourse.com', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w8-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w8-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'http://www.bbc.co.uk/learningenglish/english/course/towards-advanced/unit-15/session-1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w8-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 9 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week9', 'B2 - الأسبوع 9: How Products Are Made – A Look Inside Factories', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 42
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w9-grammar', 'Grammar: Passives PASSIVE VOICE - English Grammar step-by-step English Grammar | Passive Voice | Active Voice Let''s learn about the PASSIVE VOICE step-by-step! In four e', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/-o4ngM0Hyaw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w9-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w9-vocab', 'Vocabulary (10 كلمة): Harvest, Roast, Alkali, Saponification, Mold, Assemble, Durability, Ingredient, Seal, Label', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week9' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w9-reading', 'Reading: How Products Are Made – A Look Inside Factories', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week9' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w9-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://www.youtube.com/@NicksKitchen', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w9-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w9-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week9' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://youtu.be/-o4ngM0Hyaw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w9-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 10 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week10', 'B2 - الأسبوع 10: Understanding Body Language and What It Tells Us', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 43
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w10-grammar', 'Grammar: Modals: deductions about the present How to use MODALS of Deduction & Speculation in the PRESENT 🕵🏻‍♀️ The renowned detective Sherlock Holmes often uses modal v', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://talksmate.com', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w10-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w10-vocab', 'Vocabulary (10 كلمة): gestures, posture, defensiveness, aggressive, intimate, subtly, build rapport, manipulative, prolonged, politely', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w10-reading', 'Reading: Understanding Body Language and What It Tells Us', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w10-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://www.jnforensics.com/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w10-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w10-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://talksmate.com', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w10-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 11 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week11', 'B2 - الأسبوع 11: Investigating Mysterious Events in History', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 44
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w11-grammar', 'Grammar: Modals: deductions about the past Modals: deductions about the past Do you know how to use modal verbs to show how certain you are about past events? Test what ', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-deductions-about-past', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w11-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w11-vocab', 'Vocabulary (10 كلمة): Enigma, Uncover, Clue, Legend, Speculate, Authenticity, Disappear, Theory, Artifact, Evidence', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week11' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w11-reading', 'Reading: Investigating Mysterious Events in History', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week11' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w11-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'http://history.com/schedule.', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w11-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w11-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/modals-deductions-about-past', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w11-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 12 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week12', 'B2 - الأسبوع 12: What If? Exploring Alternate Histories', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 45
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w12-grammar', 'Grammar: Conditionals: third and mixed Conditionals: third and mixed Do you know how to use third conditionals and mixed conditionals? Test what you know with interactiv', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-third-mixed', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w12-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w12-vocab', 'Vocabulary (10 كلمة): Scenario, Hypothetical, Consequence, Uprising, Alliance, Domino effect, Outcome, Speculation, Turning point, Alternate', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w12-reading', 'Reading: What If? Exploring Alternate Histories', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w12-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://bit.ly/AlternateHistoryHub2', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w12-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w12-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/conditionals-third-mixed', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w12-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 13 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week13', 'B2 - الأسبوع 13: Famous Quotes and Their Meanings', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 46
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w13-grammar', 'Grammar: Reported speech: statements Reported speech: statements Do you know how to report what somebody else said? Test what you know with interactive exercises and rea', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-statements', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w13-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w13-vocab', 'Vocabulary (10 كلمة): Essence, Significance, Perspective, Insight, Legacy, Philosophy, Expression, Resonance, Broadcast, Influence', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w13-reading', 'Reading: Famous Quotes and Their Meanings', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w13-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://youtu.be/N5ERGH4XpjI?si=TZ09OXsT8IC6UMyD', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w13-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w13-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-statements', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w13-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 14 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week14', 'B2 - الأسبوع 14: Interviewing a Famous Person', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 47
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w14-grammar', 'Grammar: Reported speech: questions Reported speech: questions Do you know how to report a question that somebody asked? Test what you know with interactive exercises an', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-questions', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w14-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w14-vocab', 'Vocabulary (10 كلمة): Questionnaire, Exclusive, Publicist, Probing, Anecdote, Disclose, Noteworthy, Speculate, Impartial, Prompt', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w14-reading', 'Reading: Interviewing a Famous Person', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w14-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://bit.ly/3gZJaNy', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w14-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w14-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar/reported-speech-questions', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w14-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 15 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week15', 'B2 - الأسبوع 15: How Journalists Report the News', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 48
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w15-grammar', 'Grammar: Reported speech: reporting verbs', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-reporting-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w15-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w15-vocab', 'Vocabulary (10 كلمة): Journalist, Coverage, Headline, Investigate, Source, Bias, Credibility, Broadcast, Report, Objectivity', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week15' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w15-reading', 'Reading: How Journalists Report the News', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week15' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w15-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w15-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w15-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/reported-speech-reporting-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w15-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 17 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week17', 'B2 - الأسبوع 17: Common Phrasal Verbs in Everyday Conversations', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 49
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w17-grammar', 'Grammar: Phrasal verbs', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w17-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w17-vocab', 'Vocabulary (10 كلمة): Bring up, Carry on, Come across, Look into, Put off, Run into, Set up, Sort out, Take over, Turn down', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week17' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w17-reading', 'Reading: Common Phrasal Verbs in Everyday Conversations', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week17' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w17-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w17-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w17-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w17-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 18 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week18', 'B2 - الأسبوع 18: Why Phrasal Verbs Can Be Confusing', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 50
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w18-grammar', 'Grammar: Phrasal verbs with multiple meanings', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week18' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w18-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w18-vocab', 'Vocabulary (10 كلمة): Ambiguous, Context, Interpretation, Nuance, Confusion, Register, Idiomatic, Overlap, Meaning, Clarify', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week18' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w18-reading', 'Reading: Why Phrasal Verbs Can Be Confusing', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week18' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w18-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week18' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w18-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w18-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week18' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w18-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 19 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week19', 'B2 - الأسبوع 19: Emphasizing Important Moments in History', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 51
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w19-grammar', 'Grammar: Cleft sentences (It was... that / What... was)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w19-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w19-vocab', 'Vocabulary (10 كلمة): Emphasis, Highlight, Significant, Pivotal, Underline, Focal point, Momentous, Historic, Spotlight, Prominence', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week19' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w19-reading', 'Reading: Emphasizing Important Moments in History', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week19' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w19-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w19-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w19-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w19-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 20 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week20', 'B2 - الأسبوع 20: Extreme Sports and Daring Feats', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 52
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w20-grammar', 'Grammar: Inversion for emphasis (Not only... but also / Never have I...)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w20-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w20-vocab', 'Vocabulary (10 كلمة): Daring, Adrenaline, Extreme, Risk-taking, Endurance, Feat, Courageous, Reckless, Thrill, Stamina', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week20' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w20-reading', 'Reading: Extreme Sports and Daring Feats', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week20' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w20-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w20-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w20-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w20-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 22 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week22', 'B2 - الأسبوع 22: Time-Saving Techniques for Busy People', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 53
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w22-grammar', 'Grammar: Participle clauses (Having finished, he left...)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week22' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/participle-clauses', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w22-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w22-vocab', 'Vocabulary (10 كلمة): Efficiency, Productivity, Prioritize, Multitask, Streamline, Deadline, Shortcut, Workflow, Delegate, Optimize', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week22' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w22-reading', 'Reading: Time-Saving Techniques for Busy People', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week22' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w22-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week22' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w22-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w22-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week22' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/participle-clauses', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w22-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 23 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week23', 'B2 - الأسبوع 23: How Accurate Are Future Predictions?', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 54
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w23-grammar', 'Grammar: The future: degrees of certainty', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week23' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-degrees-certainty', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w23-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w23-vocab', 'Vocabulary (10 كلمة): Forecast, Prediction, Speculation, Trend, Accuracy, Projection, Uncertainty, Estimate, Probability, Outlook', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week23' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w23-reading', 'Reading: How Accurate Are Future Predictions?', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week23' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w23-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week23' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w23-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w23-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week23' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/future-degrees-certainty', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w23-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 24 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week24', 'B2 - الأسبوع 24: The Greatest Athletes and Their Abilities', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 55
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w24-grammar', 'Grammar: Past ability', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week24' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-ability', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w24-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w24-vocab', 'Vocabulary (10 كلمة): Achievement, Endurance, Talent, Record-breaking, Discipline, Peak performance, Stamina, Competitive, Legacy, Dedication', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week24' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w24-reading', 'Reading: The Greatest Athletes and Their Abilities', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week24' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w24-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week24' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w24-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w24-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week24' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/past-ability', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w24-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B2 - الأسبوع 25 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b2-week25', 'B2 - الأسبوع 25: Common Mistakes in Learning English', NULL, 'core_skills'::roadmap_stage_type, 'B2', 'أسبوع', NULL, 56
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w25-grammar', 'Grammar: Verbs followed by ''-ing'' or infinitive to change meaning', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week25' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-followed-ing-or-infinitive-change-meaning', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w25-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w25-vocab', 'Vocabulary (10 كلمة): Misconception, Fluency, Fossilize, Overgeneralize, Correction, Practice, Consistency, Frustration, Progress, Persistence', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week25' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w25-reading', 'Reading: Common Mistakes in Learning English', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week25' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w25-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week25' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/b2-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w25-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b2-w25-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b2-week25' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/verbs-followed-ing-or-infinitive-change-meaning', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b2-w25-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 2 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week2', 'C1 - الأسبوع 2: The Passive Voice in Scientific Writing Social Media', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 57
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w2-grammar', 'Grammar: Advanced passives review', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'شرح ومصدر القاعدة', 'https://youtu.be/8x4K9INW2Zg?si=0Q1157bH8crC1pAT', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w2-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w2-vocab', 'Vocabulary (1 كلمة): Idioms', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week2' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w2-reading', 'Reading: The Passive Voice in Scientific Writing Social Media', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week2' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w2-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'تدريب استماع', 'https://youtu.be/ImdtZKSdPuc?si=s8Zyf5H9xERcInPo', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w2-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w2-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week2' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://file.notion.so/f/f/29c22782-a59b-4e99-95ac-19846f3dc9c6/7be57d3e-5b3b-46a5-a3c1-69fa2588d045/CAT_C1_ToungeTwister_Jasmine.pdf?table=block&id=1b18f916-0372-8188-8e87-ee339eb04d05&spaceId=29c22782-a59b-4e99-95ac-19846f3dc9c6&expirationTimestamp=1784282400000&signature=4pTBigMlqhb0Lr-o_CUBUIGTp_8EZX5_K14tBuSpMpQ&downloadName=CAT_C1_ToungeTwister_Jasmine.pdf', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w2-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 4 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week4', 'C1 - الأسبوع 4: Mastering Phrasal Verbs in Business English', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 58
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w4-grammar', 'Grammar: Word order in phrasal verbs', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/word-order-phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w4-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w4-vocab', 'Vocabulary (10 كلمة): Negotiation, Correspondence, Follow up, Draw up, Set out, Carry out, Point out, Bring forward, Deal with, Account for', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w4-reading', 'Reading: Mastering Phrasal Verbs in Business English', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week4' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w4-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w4-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w4-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week4' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/word-order-phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w4-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 5 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week5', 'C1 - الأسبوع 5: Famous Cities That Have Changed Over Time', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 59
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w5-grammar', 'Grammar: Advanced relative clauses (reduced relative clauses)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-defining-relative-clauses', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w5-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w5-vocab', 'Vocabulary (10 كلمة): Landmark, Heritage, Transformation, Urbanization, Renovation, Preservation, Skyline, Redevelopment, Legacy, Evolution', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w5-reading', 'Reading: Famous Cities That Have Changed Over Time', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week5' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w5-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w5-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w5-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week5' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/relative-clauses-defining-relative-clauses', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w5-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 6 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week6', 'C1 - الأسبوع 6: A Day in the Life of a Journalist', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 60
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w6-grammar', 'Grammar: Advanced Participle clauses', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/participle-clauses', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w6-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w6-vocab', 'Vocabulary (10 كلمة): Deadline, Assignment, Investigate, Interview, Draft, Publish, Editor, Coverage, Byline, Source', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w6-reading', 'Reading: A Day in the Life of a Journalist', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week6' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w6-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w6-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w6-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week6' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/participle-clauses', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w6-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 7 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week7', 'C1 - الأسبوع 7: The Power of Minimalism in Writing', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 61
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w7-grammar', 'Grammar: Ellipsis', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/ellipsis', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w7-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w7-vocab', 'Vocabulary (10 كلمة): Concise, Redundant, Economy of words, Superfluous, Streamlined, Precision, Clarity, Brevity, Wordiness, Efficient', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w7-reading', 'Reading: The Power of Minimalism in Writing', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week7' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w7-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w7-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w7-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week7' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/ellipsis', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w7-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 8 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week8', 'C1 - الأسبوع 8: Editing Techniques for Concise Writing', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 62
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w8-grammar', 'Grammar: Avoiding repetition in a text', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/avoiding-repetition-text', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w8-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w8-vocab', 'Vocabulary (10 كلمة): Redundancy, Revise, Cohesion, Substitution, Refine, Draft, Coherence, Conciseness, Editing, Polish', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w8-reading', 'Reading: Editing Techniques for Concise Writing', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week8' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w8-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w8-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w8-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week8' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/avoiding-repetition-text', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w8-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 10 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week10', 'C1 - الأسبوع 10: Mysteries of the Universe', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 63
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w10-grammar', 'Grammar: Inversion after negative adverbials', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w10-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w10-vocab', 'Vocabulary (10 كلمة): Cosmos, Enigma, Phenomenon, Speculation, Infinite, Celestial, Anomaly, Theoretical, Unexplained, Vast', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w10-reading', 'Reading: Mysteries of the Universe', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week10' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w10-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w10-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w10-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week10' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-after-negative-adverbials', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w10-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 11 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week11', 'C1 - الأسبوع 11: Alternative Histories: What If Events Had Turned Out Differently', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 64
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w11-grammar', 'Grammar: Inversion and conditionals', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-conditionals', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w11-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w11-vocab', 'Vocabulary (10 كلمة): Alternate reality, Speculation, Divergence, Hypothetical, Pivotal moment, Consequence, Trajectory, Counterfactual, Outcome, Turning point', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week11' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w11-reading', 'Reading: Alternative Histories: What If Events Had Turned Out Differently', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week11' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w11-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w11-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w11-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week11' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/inversion-conditionals', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w11-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 12 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week12', 'C1 - الأسبوع 12: Theories About Extraterrestrial Life', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 65
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w12-grammar', 'Grammar: Modals: probability', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/modals-probability', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w12-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w12-vocab', 'Vocabulary (10 كلمة): Extraterrestrial, Hypothesis, Plausible, Speculative, Evidence, Civilization, Cosmic, Theoretical, Probability, Existence', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w12-reading', 'Reading: Theories About Extraterrestrial Life', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week12' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w12-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w12-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w12-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week12' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/modals-probability', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w12-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 13 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week13', 'C1 - الأسبوع 13: Time Travel in Science Fiction', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 66
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w13-grammar', 'Grammar: Unreal time', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/unreal-time', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w13-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w13-vocab', 'Vocabulary (10 كلمة): Paradox, Continuum, Alter, Trajectory, Hypothetical, Consequence, Dimension, Anomaly, Causality, Speculative', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w13-reading', 'Reading: Time Travel in Science Fiction', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week13' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w13-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w13-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w13-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week13' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/unreal-time', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w13-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 14 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week14', 'C1 - الأسبوع 14: The Role of Formal Language in Academic Writing', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 67
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w14-grammar', 'Grammar: Nominalization', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://www.esl-tests.com/grammar/c1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w14-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w14-vocab', 'Vocabulary (10 كلمة): Formality, Register, Objectivity, Terminology, Precision, Convention, Abstraction, Structure, Coherence, Rigor', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w14-reading', 'Reading: The Role of Formal Language in Academic Writing', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week14' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w14-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w14-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w14-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week14' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://www.esl-tests.com/grammar/c1', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w14-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 15 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week15', 'C1 - الأسبوع 15: Legal Language and Formal Requests', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 68
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w15-grammar', 'Grammar: Subjunctive mood', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://test-english.com/grammar-points/c1/the-subjunctive-in-english-present-and-past/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w15-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w15-vocab', 'Vocabulary (10 كلمة): Statute, Formal request, Clause, Jurisdiction, Compliance, Obligation, Provision, Legislation, Petition, Formality', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week15' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w15-reading', 'Reading: Legal Language and Formal Requests', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week15' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w15-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w15-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w15-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week15' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://test-english.com/grammar-points/c1/the-subjunctive-in-english-present-and-past/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w15-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 16 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week16', 'C1 - الأسبوع 16: How News Agencies Report Global Events', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 69
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w16-grammar', 'Grammar: Patterns with reporting verbs', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week16' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/patterns-reporting-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w16-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w16-vocab', 'Vocabulary (10 كلمة): Correspondent, Coverage, Bulletin, Breaking news, Bias, Credible, Outlet, Dispatch, Bureau, Broadcast', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week16' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w16-reading', 'Reading: How News Agencies Report Global Events', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week16' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w16-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week16' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w16-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w16-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week16' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/patterns-reporting-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w16-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 17 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week17', 'C1 - الأسبوع 17: Interview with a Nobel Prize Winner', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 70
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w17-grammar', 'Grammar: Reported speech: cleft sentences, inversion and auxiliaries', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w17-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w17-vocab', 'Vocabulary (10 كلمة): Laureate, Achievement, Breakthrough, Recognition, Innovation, Dedication, Legacy, Milestone, Prestigious, Contribution', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week17' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w17-reading', 'Reading: Interview with a Nobel Prize Winner', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week17' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w17-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w17-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w17-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week17' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w17-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 19 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week19', 'C1 - الأسبوع 19: How to Write a Persuasive Argument', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 71
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w19-grammar', 'Grammar: Advanced discourse markers', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://test-english.com/grammar-points/b2/discourse-markers/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w19-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w19-vocab', 'Vocabulary (10 كلمة): Persuasive, Rhetoric, Counterargument, Evidence, Assertion, Compelling, Concede, Substantiate, Viewpoint, Conviction', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week19' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w19-reading', 'Reading: How to Write a Persuasive Argument', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week19' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w19-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w19-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w19-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week19' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://test-english.com/grammar-points/b2/discourse-markers/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w19-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 20 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week20', 'C1 - الأسبوع 20: The Art of Diplomatic Communication', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 72
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w20-grammar', 'Grammar: Hedging (softening statements)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://contextenglish.education/mastering-advanced-grammar-structures-nouns-pronouns-verbs-and-more/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w20-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w20-vocab', 'Vocabulary (10 كلمة): Diplomacy, Tact, Nuance, Discretion, Sensitivity, Negotiation, Compromise, Courteous, Ambiguity, Restraint', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week20' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w20-reading', 'Reading: The Art of Diplomatic Communication', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week20' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w20-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w20-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w20-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week20' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://contextenglish.education/mastering-advanced-grammar-structures-nouns-pronouns-verbs-and-more/', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w20-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع 21 ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week21', 'C1 - الأسبوع 21: The Impact of Social Media on Modern Communication', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 73
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w21-grammar', 'Grammar: Emphatic structures beyond inversion (e.g., fronting)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week21' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w21-grammar' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w21-vocab', 'Vocabulary (10 كلمة): Amplify, Discourse, Engagement, Virality, Perception, Influence, Connectivity, Platform, Narrative, Reach', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week21' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w21-reading', 'Reading: The Impact of Social Media on Modern Communication', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week21' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w21-listening', 'Listening Practice', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week21' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w21-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-w21-tasks', 'مهام ومصادر إضافية للأسبوع', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week21' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'مرجع/تدريب إضافي', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/emphasis-cleft-sentences-inversion-auxiliaries', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-w21-tasks' ON CONFLICT DO NOTHING;

-- ============ قسم: B1 - الأسبوع 2 (استماع إضافي تكميلي) ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-b1-week2-supp', 'B1 - استماع تكميلي (بديل الأسبوع 2)', NULL, 'core_skills'::roadmap_stage_type, 'B1', 'أسبوع قصير', NULL, 74
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w2supp-listening1', 'Listening Practice 1', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week2-supp' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'youtube'::resource_kind, 'فيديو استماع 1', 'https://www.youtube.com/watch?v=cCh0EDHKTcc', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w2supp-listening1' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-b1-w2supp-listening2', 'Listening Practice 2', 'video'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-b1-week2-supp' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'فيديو + PDF مرجعي Stative Verbs', 'https://www.youtube.com/watch?v=Zk9gtbykxiw', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-b1-w2supp-listening2' ON CONFLICT DO NOTHING;

-- ============ قسم: C1 - الأسبوع الختامي (مراجعة شاملة + مشروع تخرج) ============
INSERT INTO public.roadmap_sections (roadmap_id, slug, title, description, stage_type, difficulty_level, estimated_duration, icon, order_index)
SELECT id, 'eng-c1-week-final', 'C1 - الأسبوع الختامي: مراجعة شاملة ومشروع التخرج', NULL, 'advanced_topics'::roadmap_stage_type, 'C1', 'أسبوع', NULL, 75
FROM public.roadmaps WHERE slug = 'english-professional-track'
ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-final-idioms', 'Grammar: Advanced idiomatic expressions and phrasal verbs (مراجعة شاملة)', 'video'::roadmap_step_type, NULL, 1
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week-final' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'شرح ومصدر القاعدة', 'https://learnenglish.britishcouncil.org/free-resources/grammar/c1/word-order-phrasal-verbs', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-final-idioms' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-final-vocab', 'Vocabulary (10 كلمة): Proficient, Nuance, Articulate, Coherence, Eloquent, Fluency, Register, Command (of language), Versatile, Mastery', 'reading'::roadmap_step_type, NULL, 2
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week-final' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-final-review', 'Reading: Reviewing Your Journey from A1 to C1 — A Self-Assessment Guide', 'reading'::roadmap_step_type, NULL, 3
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week-final' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-final-listening', 'Listening Practice (C1 Advanced Hub)', 'video'::roadmap_step_type, NULL, 4
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week-final' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'تدريب استماع', 'https://learnenglish.britishcouncil.org/skills/listening/c1-listening', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-final-listening' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-final-speaking-test', 'اختبار المستوى: امتحان تحديد مستوى مجاني (British Council)', 'exercise'::roadmap_step_type, NULL, 5
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week-final' ON CONFLICT DO NOTHING;
INSERT INTO public.roadmap_resources (step_id, scope, kind, title, external_url, order_index)
SELECT st.id, 'external'::resource_scope, 'external_article'::resource_kind, 'رابط الاختبار', 'https://learnenglish.britishcouncil.org/english-levels/online-english-level-test', 1
FROM public.roadmap_steps st JOIN public.roadmap_sections s ON s.id = st.section_id JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND st.legacy_lesson_id = 'eng-c1-final-speaking-test' ON CONFLICT DO NOTHING;

INSERT INTO public.roadmap_steps (section_id, legacy_lesson_id, title, step_type, estimated_duration, order_index)
SELECT s.id, 'eng-c1-final-capstone', 'مشروع التخرج: سجّل فيديو 3 دقائق عن موضوع معقد من اختيارك مستخدماً 5 على الأقل من القواعد المتقدمة (inversion، cleft sentences، participle clauses، subjunctive، hedging...)', 'exercise'::roadmap_step_type, NULL, 6
FROM public.roadmap_sections s JOIN public.roadmaps r ON r.id = s.roadmap_id WHERE r.slug = 'english-professional-track' AND s.slug = 'eng-c1-week-final' ON CONFLICT DO NOTHING;

-- تحديث الوصف العام للمسار ليعكس المحتوى الكامل النهائي
UPDATE public.roadmaps
SET duration_label = '79 أسبوع محتوى كامل: A1 (4 أسابيع) وA2 وB1 وB2 وC1 + أسبوع ختامي'
WHERE slug = 'english-professional-track';

COMMIT;