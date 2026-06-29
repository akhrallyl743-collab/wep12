-- ============================================================
-- Migration 001: Learning Paths — نظام اختيار المسار النشط
-- ============================================================
-- جدول يحفظ المسار النشط للمستخدم (مسار واحد فقط في كل وقت)
-- آمن لإعادة التشغيل (IF NOT EXISTS في كل مكان)
-- لا يلمس أي جدول موجود مسبقاً
-- ============================================================

-- ── 1) جدول المسار النشط للمستخدم ──
CREATE TABLE IF NOT EXISTS public.user_active_roadmap (
  user_id         UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  roadmap_id      UUID NOT NULL REFERENCES public.roadmaps(id) ON DELETE CASCADE,
  roadmap_slug    TEXT NOT NULL,
  activated_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── Index ──
CREATE INDEX IF NOT EXISTS idx_user_active_roadmap_roadmap_id
  ON public.user_active_roadmap(roadmap_id);

-- ── RLS ──
ALTER TABLE public.user_active_roadmap ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  -- كل مستخدم يشوف ويعدّل سجله هو فقط
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'user_active_roadmap' AND policyname = 'user_active_roadmap_self'
  ) THEN
    CREATE POLICY user_active_roadmap_self ON public.user_active_roadmap
      FOR ALL USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- ── Trigger: updated_at تلقائي ──
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_user_active_roadmap_updated ON public.user_active_roadmap;
CREATE TRIGGER trg_user_active_roadmap_updated
  BEFORE UPDATE ON public.user_active_roadmap
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ── Comment ──
COMMENT ON TABLE public.user_active_roadmap IS
  'مسار تعلّم واحد نشط لكل مستخدم. تغيير المسار يُبقي التقدّم القديم محفوظاً لكنه يوقف القفل الإجباري.';
