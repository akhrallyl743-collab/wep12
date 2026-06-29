-- ============================================
-- START LINE — Progress Sync Table
-- Run this in your Supabase SQL Editor
-- ============================================

-- جدول مزامنة التقدم الكامل
CREATE TABLE IF NOT EXISTS public.user_progress_sync (
  user_id             UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  points              INTEGER DEFAULT 0,
  level               INTEGER DEFAULT 1,
  streak              INTEGER DEFAULT 0,
  badges              JSONB DEFAULT '[]',
  lesson_progress     JSONB DEFAULT '{}',
  track_progress      JSONB DEFAULT '{}',
  selected_tracks     JSONB DEFAULT '[]',
  completed_days      JSONB DEFAULT '[]',
  completed_challenges JSONB DEFAULT '[]',
  quiz_traits         JSONB DEFAULT NULL,
  last_lesson         JSONB DEFAULT NULL,
  synced_at           TIMESTAMPTZ DEFAULT NOW(),
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: كل مستخدم يشوف ويعدّل بياناته بس
ALTER TABLE public.user_progress_sync ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_progress_sync_select"
  ON public.user_progress_sync FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_progress_sync_upsert"
  ON public.user_progress_sync FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_progress_sync_update"
  ON public.user_progress_sync FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- جدول تسجيل الاهتمام بالدفع (للـ waitlist)
-- ============================================
CREATE TABLE IF NOT EXISTS public.payment_interest (
  id          BIGSERIAL PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL,
  feature     TEXT NOT NULL DEFAULT 'mentor_sessions',
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature)
);

ALTER TABLE public.payment_interest ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payment_interest_insert"
  ON public.payment_interest FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "payment_interest_select"
  ON public.payment_interest FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- Index للأداء
-- ============================================
CREATE INDEX IF NOT EXISTS idx_progress_sync_user ON public.user_progress_sync(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_interest_feature ON public.payment_interest(feature);

-- ============================================
-- Grant permissions
-- ============================================
GRANT ALL ON public.user_progress_sync TO authenticated;
GRANT ALL ON public.payment_interest TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.payment_interest_id_seq TO authenticated;
