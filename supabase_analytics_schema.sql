-- =========================================================
-- START LINE — Analytics Schema (Visits + Real-time Presence)
-- شغّل هذا الملف مرة واحدة من Supabase Dashboard → SQL Editor
-- =========================================================

-- 1) جدول الزيارات — كل زيارة صفحة أو حدث تسجيل دخول/تسجيل جديد
create table if not exists public.site_visits (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  session_id    text not null,
  user_id       uuid references public.profiles(id) on delete set null,
  page          text,
  event_type    text not null default 'pageview', -- 'pageview' | 'login' | 'signup'
  referrer      text,
  user_agent    text
);

create index if not exists site_visits_created_at_idx on public.site_visits (created_at desc);
create index if not exists site_visits_session_idx    on public.site_visits (session_id);
create index if not exists site_visits_user_idx       on public.site_visits (user_id);

alter table public.site_visits enable row level security;

-- أي زائر (حتى غير مسجل) يقدر يسجّل زيارة — إدخال فقط، بدون قراءة
drop policy if exists site_visits_insert_anyone on public.site_visits;
create policy site_visits_insert_anyone
  on public.site_visits for insert
  to anon, authenticated
  with check (true);

-- القراءة مسموحة فقط للأدمن
drop policy if exists site_visits_select_admin on public.site_visits;
create policy site_visits_select_admin
  on public.site_visits for select
  to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- 2) جدول الجلسات الحيّة — نبضة كل ٢٥ ثانية لحساب "أونلاين الآن" لكل الزوار (مسجلين أو لأ)
create table if not exists public.active_sessions (
  session_id  text primary key,
  user_id     uuid references public.profiles(id) on delete set null,
  username    text,
  page        text,
  last_seen   timestamptz not null default now(),
  user_agent  text
);

create index if not exists active_sessions_last_seen_idx on public.active_sessions (last_seen desc);

alter table public.active_sessions enable row level security;

drop policy if exists active_sessions_upsert_anyone on public.active_sessions;
create policy active_sessions_upsert_anyone
  on public.active_sessions for insert
  to anon, authenticated
  with check (true);

drop policy if exists active_sessions_update_anyone on public.active_sessions;
create policy active_sessions_update_anyone
  on public.active_sessions for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists active_sessions_select_admin on public.active_sessions;
create policy active_sessions_select_admin
  on public.active_sessions for select
  to authenticated
  using (
    exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_admin = true)
  );

-- ملاحظة: نظّف الجلسات القديمة بين الحين والآخر (اختياري) —
-- ممكن تعمل cron job في Supabase يشغل الأمر ده كل ساعة:
-- delete from public.active_sessions where last_seen < now() - interval '30 minutes';
