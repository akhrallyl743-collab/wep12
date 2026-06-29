-- ============================================
-- START LINE — Profile Extension (صور + مهنة + هاتف)
-- Run this in your Supabase SQL Editor
-- ============================================

-- 1) أعمدة جديدة على جدول profiles الموجود
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS avatar_url  TEXT,
  ADD COLUMN IF NOT EXISTS profession  TEXT,
  ADD COLUMN IF NOT EXISTS phone       TEXT,
  ADD COLUMN IF NOT EXISTS is_trainer  BOOLEAN DEFAULT FALSE;

-- is_trainer: علم بسيط نستخدمه في المرحلة الجاية لما نبني
-- نظام المدربين والحجز (Phase 2) — بيحدد هل صاحب البروفايل ده ظاهر
-- كمان كـ "مدرّب" قابل للحجز ولا لأ.

-- ============================================
-- 2) Storage bucket لصور البروفايل
-- ============================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- أي حد يقدر يشوف الصور (بروفايل عام)
CREATE POLICY "avatars_public_read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

-- المستخدم يرفع/يعدّل بس داخل فولدر اسمه نفس الـ user id بتاعه
-- (الباث المتفق عليه في الكود: avatars/<user_id>/avatar.<ext>)
CREATE POLICY "avatars_owner_insert"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_owner_update"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "avatars_owner_delete"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================
-- ملاحظة: الكود في js/services.js و js/auth.js
-- محدّث بالفعل عشان يستخدم الأعمدة دي (uploadProfileAvatar, saveProfile)
-- مفيش حاجة تانية تعملها غير تشغيل السكريبت ده في Supabase.
-- ============================================
