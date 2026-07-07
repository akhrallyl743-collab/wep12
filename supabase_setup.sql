-- ============================================================
-- START LINE — إعدادات Supabase المطلوبة للتحديثات الجديدة
-- ------------------------------------------------------------
-- شغّل الملف ده مرة واحدة من: Supabase Dashboard → SQL Editor → New query
-- آمن تماماً إنك تشغله أكتر من مرة (كله IF NOT EXISTS / OR REPLACE)
-- ============================================================

-- 1) عمود تتبّع "آخر ظهور" للمستخدم — يُحدَّث كل ٢٥ ثانية من المتصفح
--    وعليه بيعتمد "أونلاين الآن" في لوحة الإدارة
alter table public.profiles
  add column if not exists last_seen_at timestamptz;

create index if not exists idx_profiles_last_seen_at on public.profiles (last_seen_at desc);
create index if not exists idx_profiles_created_at   on public.profiles (created_at desc);

-- ============================================================
-- 2) دالة is_admin() — تتأكد إن المستخدم الحالي أدمن بدون ما تعمل
--    recursion في الـ RLS (لازم SECURITY DEFINER عشان كده)
-- ============================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (select is_admin from public.profiles where id = auth.uid()),
    false
  );
$$;

-- ============================================================
-- 3) سياسات profiles: كل مستخدم يشوف نفسه + يحدّث نفسه،
--    والأدمن يشوف الجميع (وده اللي كان ناقص وبيمنع ظهور كل
--    المستخدمين المسجلين في لوحة الإدارة)
-- ============================================================
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_select_admin_all" on public.profiles;
create policy "profiles_select_admin_all" on public.profiles
  for select using (public.is_admin());

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_update_admin_all" on public.profiles;
create policy "profiles_update_admin_all" on public.profiles
  for update using (public.is_admin());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

alter table public.profiles enable row level security;

-- ============================================================
-- 4) سياسات notifications: الأدمن بس يقدر يضيف، وأي مستخدم
--    مسجّل يقدر يقرأ الإشعارات الموجّهة له (all / مستهدف باسمه)
-- ============================================================
drop policy if exists "notifications_select_all" on public.notifications;
create policy "notifications_select_all" on public.notifications
  for select using (
    target_type = 'all'
    or auth.uid() = any(coalesce(target_user_ids, '{}'::uuid[]))
    or public.is_admin()
  );

drop policy if exists "notifications_insert_admin" on public.notifications;
create policy "notifications_insert_admin" on public.notifications
  for insert with check (public.is_admin());

drop policy if exists "notifications_delete_admin" on public.notifications;
create policy "notifications_delete_admin" on public.notifications
  for delete using (public.is_admin());

alter table public.notifications enable row level security;

-- ============================================================
-- 5) تفعيل Realtime على الجداول المطلوبة (لو مش مفعّلة أصلاً)
--    ده اللي بيخلي لوحة الإدارة والإشعارات تتحدث لحظياً بدل ما
--    المستخدم يعمل Refresh يدوي
-- ============================================================
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;

  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'notifications'
  ) then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;

-- ============================================================
-- تم ✅
-- بعد التشغيل: روح Vercel Dashboard → Environment Variables وضيف
-- ANTHROPIC_API_KEY (مفتاحك من console.anthropic.com) عشان يشتغل
-- تحليل الذكاء الاصطناعي والسؤال التوضيحي في الاختبار بأمان
-- (الكود الجديد ما بيحطش المفتاح في المتصفح إطلاقاً).
-- ============================================================
