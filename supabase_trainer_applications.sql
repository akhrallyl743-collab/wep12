-- ============================================
-- START LINE — Trainer Applications Table
-- Run this in your Supabase SQL Editor
-- ============================================

-- جدول طلبات التسجيل كمدرّب (فورم "سجّل كمدرّب")
CREATE TABLE IF NOT EXISTS public.trainer_applications (
  id                BIGSERIAL PRIMARY KEY,
  user_id           UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name         TEXT NOT NULL,
  age               INTEGER,
  email             TEXT NOT NULL,
  phone             TEXT NOT NULL,
  profession        TEXT NOT NULL,
  years_experience  INTEGER,
  skills            JSONB DEFAULT '[]',
  bio               TEXT NOT NULL,
  portfolio_url     TEXT,
  availability      TEXT,
  motivation        TEXT,
  status            TEXT NOT NULL DEFAULT 'pending',   -- pending | approved | rejected
  submitted_at      TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at       TIMESTAMPTZ,
  reviewed_by       UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  admin_notes       TEXT
);

-- RLS: المستخدم يقدر يضيف طلبه ويشوف طلباته الخاصة بس.
-- مراجعة/تحديث الحالة (status/admin_notes) مسؤولية الإدارة فقط، تتم من
-- لوحة تحكم Supabase مباشرة (service role) أو عبر صلاحية مخصّصة لاحقاً —
-- لا توجد سياسة UPDATE هنا عمداً، فلا يقدر أي مستخدم يُعدّل حالة طلبه بنفسه.
ALTER TABLE public.trainer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "trainer_applications_insert_own"
  ON public.trainer_applications FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "trainer_applications_select_own"
  ON public.trainer_applications FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- Index للأداء (بحث الإدارة عن الطلبات المعلّقة)
-- ============================================
CREATE INDEX IF NOT EXISTS idx_trainer_applications_status ON public.trainer_applications(status);
CREATE INDEX IF NOT EXISTS idx_trainer_applications_user ON public.trainer_applications(user_id);

-- ============================================
-- Grant permissions
-- ============================================
GRANT SELECT, INSERT ON public.trainer_applications TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.trainer_applications_id_seq TO authenticated;

-- ملاحظة: بعد الموافقة على متقدّم، يدوياً من لوحة تحكم Supabase:
-- 1) حدّث status = 'approved' في هذا الجدول.
-- 2) فعّل profiles.is_trainer = true لنفس المستخدم (العمود ده موجود فعلاً
--    من supabase_profile_extend.sql) — يُستخدم لاحقاً لو حبيت تعرض
--    "مدرّب معتمد" في بروفايله أو تربطه ببطاقة حقيقية في صفحة المدربين
--    بدل القائمة الثابتة الحالية MENTORS_DATA في js/data.js.
