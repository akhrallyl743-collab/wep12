-- =====================================================================
-- إضافة 3 مشرفين جدد
-- شغّل هذا الملف في Supabase SQL Editor
-- ملحوظة: أي إيميل لسه معملش تسجيل حساب في الموقع، هيديك تنبيه (NOTICE)
-- بدل ما يفشل — سجّل دخول بيه مرة واحدة في الموقع الأول، وبعدين شغّل
-- السطر المخصص ليه بس من اللي هيظهرلك في التنبيه.
-- =====================================================================

do $$
declare
  emails text[] := array['tarektoaa7@gmail.com', 'Shrook1ahmed6@gmail.com', 'essmnadosh@gmail.com'];
  e text;
  target_id uuid;
begin
  foreach e in array emails
  loop
    select id into target_id from auth.users where lower(email) = lower(e);

    if target_id is null then
      raise notice 'تنبيه: % لسه معملش تسجيل حساب في الموقع. سجّل دخول بيه مرة واحدة، وبعدين شغّل السطر ده بس:', e;
      raise notice 'update public.profiles set is_admin = true where id = (select id from auth.users where lower(email) = lower(''%''));', e;
    else
      update public.profiles set is_admin = true where id = target_id;
      if not found then
        insert into public.profiles (id, username, points, level, streak, is_admin, last_active)
        values (target_id, split_part(e, '@', 1), 0, 1, 0, true, current_date);
      end if;
      raise notice 'تم تعيين % كأدمن بنجاح ✅', e;
    end if;
  end loop;
end $$;
