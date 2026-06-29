-- ============================================================
-- Migration 002: Progress Tracking — نظام التقدم الإجباري
-- ============================================================
-- يضيف جداول وأعمدة لدعم:
--   • قفل الدروس (لا تُفتح إلا بعد إنهاء السابق)
--   • تتبع نسبة مشاهدة الفيديو (90% إلزامية)
--   • قفل المراحل (لا تُفتح المرحلة التالية إلا بإنهاء الحالية)
-- آمن لإعادة التشغيل — IF NOT EXISTS في كل مكان
-- ============================================================

-- ── 0) توحيد resource_kind مع المفردات الستة المطلوبة من المواصفات ──
-- video | article | repository | documentation | practice | exam
--
-- ملاحظة مهمة: فحصنا الـ enum الحالي (بعد migrations 001+003+004 في supabase_migrations/
-- القديم) ووجدنا أن أغلب المفردات الستة لها بالفعل قيمة مكافئة في enum القائم:
--   video          → موجودة فعلاً (أُضيفت في legacy migration 003)
--   article        → موجودة فعلاً (أصل الـ enum في 001)
--   repository     → نُعيد استخدام 'github_repo' الموجودة (GitHub/GitLab كلاهما "مستودع كود")
--   documentation  → نُعيد استخدام 'official_docs' الموجودة
--   exam           → نُعيد استخدام 'external_exam' الموجودة (أُضيفت في legacy migration 004)
--   practice       → غير موجودة إطلاقاً في الـ enum الحالي — هذه فقط نضيفها فعلياً
--
-- هذا يتفادى تكرار قيم شبه مطابقة في enum واحد (Postgres لا يسمح بحذف قيم enum مستخدمة،
-- فإضافة 'repository' الآن إلى جانب 'github_repo' الموجودة كانت ستُبقي الاثنتين للأبد).
-- جميع أكواد JS (roadmap-ui.js, normalize_resources.js, generate_resource_fix_migration.js)
-- تستخدم المسمّيات الموجودة فعلياً (github_repo/official_docs/external_exam) تبعاً لذلك.
DO $$ BEGIN
  ALTER TYPE public.resource_kind ADD VALUE IF NOT EXISTS 'practice';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── 1) نسبة مشاهدة كل فيديو لكل مستخدم ──
CREATE TABLE IF NOT EXISTS public.user_video_progress (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step_id         UUID NOT NULL REFERENCES public.roadmap_steps(id) ON DELETE CASCADE,
  resource_id     UUID REFERENCES public.roadmap_resources(id) ON DELETE SET NULL,
  watch_percent   SMALLINT NOT NULL DEFAULT 0 CHECK (watch_percent BETWEEN 0 AND 100),
  -- TRUE فقط لو المستخدم شاهد 90%+ من الفيديو
  threshold_met   BOOLEAN NOT NULL GENERATED ALWAYS AS (watch_percent >= 90) STORED,
  last_position_s INTEGER DEFAULT 0,   -- آخر موضع وصله بالثواني (للاستئناف)
  updated_at      TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, step_id)
);

-- ── Indexes ──
CREATE INDEX IF NOT EXISTS idx_uvp_user ON public.user_video_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_uvp_step ON public.user_video_progress(step_id);

-- ── Trigger: updated_at ──
DROP TRIGGER IF EXISTS trg_uvp_updated ON public.user_video_progress;
CREATE TRIGGER trg_uvp_updated
  BEFORE UPDATE ON public.user_video_progress
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ── RLS ──
ALTER TABLE public.user_video_progress ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_video_progress' AND policyname = 'uvp_self'
  ) THEN
    CREATE POLICY uvp_self ON public.user_video_progress
      FOR ALL USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;


-- ── 2) حالة قفل كل خطوة لكل مستخدم (view مُحسوبة) ──
-- بدل تخزين الحالة نحسبها ديناميكياً من user_completed_steps + user_video_progress
-- لكن نوفر VIEW محسوبة لتسهيل القراءة من الـ JS

CREATE OR REPLACE VIEW public.v_step_lock_status AS
SELECT
  s.id           AS step_id,
  s.section_id,
  s.order_index  AS step_order,
  sec.roadmap_id,
  sec.order_index AS section_order,
  -- هل هذه الخطوة مكتملة؟ (موجودة في user_completed_steps)
  ucs.user_id    AS completed_by_user,
  ucs.completed_at,
  -- هل هي أول خطوة في أول قسم؟ (مفتوحة دائماً)
  (s.order_index = 1 AND sec.order_index = 1) AS is_always_open
FROM public.roadmap_steps s
JOIN public.roadmap_sections sec ON sec.id = s.section_id
LEFT JOIN public.user_completed_steps ucs ON ucs.step_id = s.id;

COMMENT ON VIEW public.v_step_lock_status IS
  'View مساعدة لحساب حالة قفل كل خطوة. الـ JS يقرر الحالة الفعلية (مكتمل/متاح/مقفل).';


-- ── 3) إضافة عمود requires_video_completion على roadmap_steps ──
-- يحدد هل يشترط الخطوة مشاهدة 90% قبل الإنهاء
ALTER TABLE public.roadmap_steps
  ADD COLUMN IF NOT EXISTS requires_video_completion BOOLEAN NOT NULL DEFAULT TRUE;

-- الخطوات من نوع video تشترط 90% بشكل افتراضي — باقي الأنواع لا تشترط
UPDATE public.roadmap_steps
SET requires_video_completion = (step_type = 'video'::roadmap_step_type)
WHERE requires_video_completion = TRUE; -- تحديث آمن (لا يُعيد تعيين من تم تغييرهم يدوياً)


-- ── 4) إضافة عمود is_locked_by_default على roadmap_sections ──
ALTER TABLE public.roadmap_sections
  ADD COLUMN IF NOT EXISTS is_locked_by_default BOOLEAN NOT NULL DEFAULT TRUE;

-- أول قسم في كل مسار يبقى مفتوحاً
UPDATE public.roadmap_sections
SET is_locked_by_default = FALSE
WHERE order_index = 1;


-- ── 5) Function: حساب حالة الخطوة لمستخدم معين ──
-- ترجع: 'completed' | 'available' | 'locked'
CREATE OR REPLACE FUNCTION public.get_step_status(
  p_user_id  UUID,
  p_step_id  UUID
) RETURNS TEXT LANGUAGE plpgsql STABLE SECURITY DEFINER AS $$
DECLARE
  v_section_id   UUID;
  v_step_order   INTEGER;
  v_section_order INTEGER;
  v_roadmap_id   UUID;
  v_prev_step_id UUID;
  v_prev_section_id UUID;
  v_last_step_in_prev_section UUID;
BEGIN
  -- جلب بيانات الخطوة
  SELECT s.section_id, s.order_index, sec.order_index, sec.roadmap_id
  INTO v_section_id, v_step_order, v_section_order, v_roadmap_id
  FROM public.roadmap_steps s
  JOIN public.roadmap_sections sec ON sec.id = s.section_id
  WHERE s.id = p_step_id;

  IF NOT FOUND THEN RETURN 'locked'; END IF;

  -- هل اكتملت الخطوة؟
  IF EXISTS (
    SELECT 1 FROM public.user_completed_steps
    WHERE user_id = p_user_id AND step_id = p_step_id
  ) THEN RETURN 'completed'; END IF;

  -- أول خطوة في أول قسم: متاحة دائماً
  IF v_step_order = 1 AND v_section_order = 1 THEN RETURN 'available'; END IF;

  -- إذا لم تكن الخطوة الأولى في القسم: يجب أن تكون الخطوة السابقة مكتملة
  IF v_step_order > 1 THEN
    SELECT id INTO v_prev_step_id
    FROM public.roadmap_steps
    WHERE section_id = v_section_id AND order_index = v_step_order - 1;

    IF v_prev_step_id IS NOT NULL AND NOT EXISTS (
      SELECT 1 FROM public.user_completed_steps
      WHERE user_id = p_user_id AND step_id = v_prev_step_id
    ) THEN RETURN 'locked'; END IF;

    RETURN 'available';
  END IF;

  -- أول خطوة في قسم غير أول: يجب أن ينتهي القسم السابق كله
  IF v_step_order = 1 AND v_section_order > 1 THEN
    SELECT id INTO v_prev_section_id
    FROM public.roadmap_sections
    WHERE roadmap_id = v_roadmap_id AND order_index = v_section_order - 1;

    IF v_prev_section_id IS NULL THEN RETURN 'available'; END IF;

    -- آخر خطوة في القسم السابق يجب أن تكون مكتملة
    SELECT id INTO v_last_step_in_prev_section
    FROM public.roadmap_steps
    WHERE section_id = v_prev_section_id
    ORDER BY order_index DESC LIMIT 1;

    IF v_last_step_in_prev_section IS NULL THEN RETURN 'available'; END IF;

    IF EXISTS (
      SELECT 1 FROM public.user_completed_steps
      WHERE user_id = p_user_id AND step_id = v_last_step_in_prev_section
    ) THEN RETURN 'available'; END IF;

    RETURN 'locked';
  END IF;

  RETURN 'locked';
END;
$$;

COMMENT ON FUNCTION public.get_step_status IS
  'يحسب حالة الخطوة (completed/available/locked) لمستخدم معين. يُستخدم كـ fallback سحابي — الـ JS يحسبها محلياً بنفس المنطق لتقليل الطلبات.';
