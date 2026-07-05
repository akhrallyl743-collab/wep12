/* =============================================
   نور طريقك — services.js
   كل عمليات Supabase تمر من هنا فقط
   app.js لا يستخدم supa مباشرة أبداً
   ============================================= */

/* =============================================
   إعداد Supabase Client
   ============================================= */
const SUPA_URL = 'https://hdqghyckazoaekrrpbny.supabase.co';
const SUPA_KEY = 'sb_publishable_baVprdbU2yDhw_p2OTMo2A_0PC1iKHJ';
// ⚠️ هذا publishable key — مقبول في الـ frontend
// لكن لازم RLS مفعّل على كل الجداول (راجع supabase_schema.sql)

const { createClient } = supabase;
const supa = createClient(SUPA_URL, SUPA_KEY);

/* =============================================
   Auth Services
   ============================================= */

// الـ URL الأساسي للموقع — يُستخدم في إعادة التوجيه
const SITE_URL = (() => {
  const { protocol, host } = window.location;
  // لو على localhost أو file:// نستخدم كما هو، وإلا نبني URL نظيف
  if (host.includes('localhost') || host.includes('127.0.0.1') || protocol === 'file:') {
    return window.location.href.split('#')[0].split('?')[0];
  }
  return `${protocol}//${host}/`;
})();

const AuthService = {
  async loginWithEmail(email, password) {
    const { data, error } = await supa.auth.signInWithPassword({ email, password });
    return { data, error };
  },

  // [إصلاح 1] منع التسجيل المكرر + إزالة emailRedirectTo من التسجيل العادي
  // Supabase بيبعت confirmation email تلقائياً لو Email Confirmations = ON في Dashboard
  // لو Email Confirmations = OFF → session بيرجع فوراً ويدخل مباشرة
  async registerWithEmail(email, password, fullName) {
    // أولاً: نتحقق لو الإيميل مسجل بالفعل بمحاولة login فاشلة
    // (Supabase مش بيكشف الإيميلات المكررة مباشرة لحماية الخصوصية)
    // الحل: نحاول signUp وإذا جه user بدون identities → الإيميل موجود
    const { data, error } = await supa.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        // لا نبعت emailRedirectTo هنا — التأكيد مش مطلوب للتسجيل العادي
        // لو Dashboard عنده Email Confirm مفعّل، Supabase بيبعت الإيميل تلقائياً
        // بدون emailRedirectTo فبيستخدم الـ Site URL المضبوط في Supabase Dashboard
      }
    });

    if (error) return { data, error };

    // [إصلاح 2] لو الإيميل موجود مسبقاً:
    // Supabase بيرجع user بـ identities فارغة ([] or null) بدون error
    if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
      return {
        data: { user: null, session: null },
        error: { message: 'هذا البريد الإلكتروني مسجّل بالفعل. جرّب تسجيل الدخول.' }
      };
    }

    return { data, error };
  },

  async logout() {
    return await supa.auth.signOut();
  },

  // [إصلاح 3] استخدام resetPasswordForEmail الصحيح بدل signInWithOtp
  // + إضافة redirectTo صحيح للـ PASSWORD_RECOVERY flow
  async sendPasswordReset(email) {
    return await supa.auth.resetPasswordForEmail(email, {
      redirectTo: SITE_URL
    });
  },

  async updatePassword(newPassword) {
    return await supa.auth.updateUser({ password: newPassword });
  },

  onAuthStateChange(callback) {
    return supa.auth.onAuthStateChange(callback);
  }
};

/* =============================================
   Profile Services
   ============================================= */

const ProfileService = {
  // تحميل أو إنشاء ملف المستخدم
  async loadOrCreate(supaUser, guestStreak = 0) {
    try {
      const { data, error } = await supa
        .from('profiles')
        .select('*')
        .eq('id', supaUser.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // مستخدم جديد — أنشئ ملفه مع نقل streak من Guest
        const name = supaUser.user_metadata?.full_name
          || supaUser.email?.split('@')[0]
          || 'مستخدم';
        const { data: newProfile } = await supa
          .from('profiles')
          .insert({
            id: supaUser.id,
            username: name,
            points: 0,
            level: 1,
            streak: guestStreak,  // ← نقل streak من Guest
            last_active: new Date().toISOString().split('T')[0]
          })
          .select()
          .single();
        return newProfile;
      }
      return data;
    } catch(e) {
      console.warn('[Services] loadOrCreate error:', e);
      return null;
    }
  },

  // حفظ بيانات الملف الشخصي
  async update(userId, fields) {
    try {
      const { error } = await supa
        .from('profiles')
        .update(fields)
        .eq('id', userId);
      return !error;
    } catch(e) {
      return false;
    }
  },

  // تحديث الـ streak
  async updateStreak(userId, streak) {
    try {
      await supa.from('profiles').update({
        streak,
        last_active: new Date().toISOString().split('T')[0]
      }).eq('id', userId);
    } catch(e) { /* fail silently */ }
  },

  // رفع صورة البروفايل
  async uploadAvatar(userId, file) {
    try {
      const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
      const path = `${userId}/avatar.${ext}`;
      const { error: upErr } = await supa.storage
        .from('avatars')
        .upload(path, file, { upsert: true, cacheControl: '3600' });
      if (upErr) throw upErr;

      const { data: pub } = supa.storage.from('avatars').getPublicUrl(path);
      // كسر الكاش عشان الصورة الجديدة تظهر فوراً مش نسخة قديمة متخزنة
      const avatarUrl = `${pub.publicUrl}?v=${Date.now()}`;

      const { error: dbErr } = await supa
        .from('profiles')
        .update({ avatar_url: avatarUrl })
        .eq('id', userId);
      if (dbErr) throw dbErr;

      return avatarUrl;
    } catch (e) {
      console.warn('[Services] uploadAvatar error:', e);
      return null;
    }
  },

  // إحصائيات الصفحة الرئيسية
  async getHomeStats() {
    try {
      const [{ count: userCount }, { count: storyCount }] = await Promise.all([
        supa.from('profiles').select('*', { count: 'exact', head: true }),
        supa.from('profiles').select('*', { count: 'exact', head: true }).gt('points', 200)
      ]);
      return { userCount, storyCount };
    } catch(e) {
      return { userCount: 0, storyCount: 0 };
    }
  }
};

/* =============================================
   Points Services — Server-controlled
   ============================================= */

const PointsService = {
  // ← أضف نقاط عبر DB function (السيرفر هو اللي يعدّل)
  async addPoints(userId, points, reason = '') {
    try {
      const { data, error } = await supa.rpc('add_points', {
        p_user_id: userId,
        p_points: points,
        p_reason: reason
      });
      if (error) throw error;
      return data; // الرصيد الجديد من السيرفر
    } catch(e) {
      console.warn('[Points] Server add failed:', e);
      return null;
    }
  }
};

/* =============================================
   Quiz Services
   ============================================= */

const QuizService = {
  async saveResult(userId, answers, scores, topTracks) {
    try {
      await supa.from('quiz_results').insert({
        user_id: userId,
        answers,
        scores,
        top_tracks: topTracks
      });
    } catch(e) {
      console.warn('[Quiz] save error:', e);
    }
  }
};

/* =============================================
   Track Services
   ============================================= */

const TrackService = {
  async saveProgress(userId, trackId, progress) {
    try {
      await supa.from('user_tracks').upsert({
        user_id: userId,
        track_id: trackId,
        progress,
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id,track_id' });
    } catch(e) { /* fail silently */ }
  },

  // تحميل تقدم كل المسارات دفعة واحدة
  async loadAll(userId) {
    try {
      const { data } = await supa
        .from('user_tracks')
        .select('track_id, progress')
        .eq('user_id', userId);
      // تحويل لـ object { trackId: progress }
      return (data || []).reduce((acc, row) => {
        acc[row.track_id] = row.progress;
        return acc;
      }, {});
    } catch(e) {
      return {};
    }
  }
};

/* =============================================
   Achievement Services
   ============================================= */

const AchievementService = {
  async save(userId, type, key) {
    try {
      await supa.from('user_achievements').insert({
        user_id: userId,
        type,
        key
      });
    } catch(e) {
      // UNIQUE constraint يمنع التكرار تلقائياً — لا حاجة لمعالجة الخطأ
    }
  }
};

/* =============================================
   Community Services
   ============================================= */

// Rate limit بسيط: timestamp آخر منشور
let _lastPostTime = 0;
const POST_RATE_LIMIT_MS = 30000; // 30 ثانية

const CommunityService = {
  // تحميل المنشورات
  async loadPosts() {
    try {
      const { data } = await supa
        .from('community_posts')
        .select('*, profiles(username)')
        .order('created_at', { ascending: false })
        .limit(50);
      return data || [];
    } catch(e) {
      return [];
    }
  },

  // نشر منشور مع rate limit
  async publish(userId, content, tags) {
    // Rate limit check
    const now = Date.now();
    const remaining = Math.ceil((POST_RATE_LIMIT_MS - (now - _lastPostTime)) / 1000);
    if (_lastPostTime && now - _lastPostTime < POST_RATE_LIMIT_MS) {
      return { error: `انتظر ${remaining} ثانية قبل النشر مجدداً` };
    }

    // لا نرسل sanitizeHTML للـ DB — نحفظ النص الخام ونعرضه sanitized
    const trimmed = content.trim();
    if (!trimmed) return { error: 'لا يمكن نشر منشور فارغ' };
    if (trimmed.length > 1000) return { error: 'الحد الأقصى 1000 حرف' };

    try {
      const { data, error } = await supa
        .from('community_posts')
        .insert({ user_id: userId, content: trimmed, tags, likes: 0 })
        .select('*, profiles(username)')
        .single();

      if (error) return { error: error.message };
      _lastPostTime = now;
      return { data };
    } catch(e) {
      return { error: 'خطأ في الاتصال' };
    }
  },

  // إضافة لايك عبر DB function (تمنع التكرار)
  async likePost(postId) {
    try {
      const { data, error } = await supa.rpc('like_post', { p_post_id: postId });
      if (error) throw error;
      return { newLikes: data };
    } catch(e) {
      return { error: e.message };
    }
  },

  // Realtime subscription
  subscribeToNew(callback) {
    return supa
      .channel('community_posts_realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'community_posts'
      }, callback)
      .subscribe();
  }
};

/* =============================================
   Mentor Services — تسجيل ذاتي كمدرّب + قائمة حيّة
   الجدول: trainer_applications
   is_active   : المدرب نفسه بيتحكم فيه (يظهر/يختفي من القائمة)
   is_blocked  : أنت فقط بتتحكم فيه من Supabase Dashboard (حماية إضافية)
   ============================================= */
const MentorService = {
  // تحميل قائمة المدربين المعروضة للجميع
  async loadApproved() {
    try {
      const { data, error } = await supa
        .from('trainer_applications')
        .select('*')
        .eq('is_active', true)
        .eq('is_blocked', false)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[Mentor] loadApproved error:', e);
      return [];
    }
  },

  // هل عندي بروفايل مدرّب مسجّل بالفعل؟ (لو نعم — نعرض فورم التعديل بدل التسجيل من الصفر)
  async getMine(userId) {
    if (!userId) return null;
    try {
      const { data, error } = await supa
        .from('trainer_applications')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      if (error) throw error;
      return data || null;
    } catch (e) {
      console.warn('[Mentor] getMine error:', e);
      return null;
    }
  },

  // إنشاء أو تحديث بروفايل المدرّب (upsert بمفتاح user_id)
  async upsert(userId, fields) {
    try {
      const payload = { ...fields, user_id: userId, updated_at: new Date().toISOString() };
      const { data, error } = await supa
        .from('trainer_applications')
        .upsert(payload, { onConflict: 'user_id' })
        .select()
        .single();
      if (error) throw error;
      return { data };
    } catch (e) {
      console.warn('[Mentor] upsert error:', e);
      return { error: e.message || 'حدث خطأ أثناء الحفظ' };
    }
  }
};
window.MentorService = MentorService;

// expose supa لـ AuthService فقط — app.js لا يستخدمه مباشرة
window.supa = supa;

/* =============================================
   Progress Sync Service — Cloud ↔ localStorage
   يحل مشكلة: "لو المستخدم غيّر جهاز خسر كل حاجة"
   ============================================= */

const ProgressSyncService = {

  // رفع كل بيانات الـ progress للـ cloud
  async pushAll(userId, appState) {
    if (!userId) return false;
    try {
      const payload = {
        user_id: userId,
        points:             appState.points      || 0,
        level:              appState.level       || 1,
        streak:             appState.streak      || 0,
        badges:             Array.from(appState.badges || []),
        lesson_progress:    appState.progress    || {},
        track_progress:     appState.trackProgress || {},
        selected_tracks:    appState.selectedTracks || [],
        completed_days:     Array.from(appState.completedDays    || []),
        completed_challenges: Array.from(appState.completedChallenges || []),
        quiz_traits:        appState.quizTraits  || null,
        last_lesson:        (appState.currentTrack && appState.currentCourse && appState.currentLesson)
                              ? { trackId: appState.currentTrack, courseId: appState.currentCourse, lessonId: appState.currentLesson }
                              : null,
        synced_at: new Date().toISOString()
      };

      const { error } = await supa
        .from('user_progress_sync')
        .upsert(payload, { onConflict: 'user_id' });

      if (error) throw error;
      console.info('[Sync] Progress pushed to cloud ✅');
      return true;
    } catch(e) {
      console.warn('[Sync] Push failed:', e.message);
      return false;
    }
  },

  // سحب بيانات الـ progress من الـ cloud وتطبيقها على AppState
  async pullAndApply(userId, appState, saveProgressFn) {
    if (!userId) return false;
    try {
      const { data, error } = await supa
        .from('user_progress_sync')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error || !data) return false;

      // دمج: نختار الأعلى في النقاط والليفل (يمنع الفقدان)
      if ((data.points || 0) > (appState.points || 0)) {
        appState.points = data.points;
      }
      if ((data.level || 1) > (appState.level || 1)) {
        appState.level = data.level;
      }
      if ((data.streak || 0) > (appState.streak || 0)) {
        appState.streak = data.streak;
      }

      // Badges: دمج الاثنين
      if (data.badges && data.badges.length) {
        data.badges.forEach(b => appState.badges.add(b));
      }

      // Progress: دمج الـ lessons
      if (data.lesson_progress && Object.keys(data.lesson_progress).length) {
        const local = appState.progress || {};
        Object.entries(data.lesson_progress).forEach(([trackId, courses]) => {
          if (!local[trackId]) {
            local[trackId] = courses;
          } else {
            Object.entries(courses).forEach(([cId, lessons]) => {
              if (!local[trackId][cId]) {
                local[trackId][cId] = lessons;
              } else {
                const merged = new Set([...local[trackId][cId], ...lessons]);
                local[trackId][cId] = Array.from(merged);
              }
            });
          }
        });
        appState.progress = local;
      }

      // Track percentages: أعلى قيمة
      if (data.track_progress) {
        Object.entries(data.track_progress).forEach(([tid, pct]) => {
          if ((pct || 0) > (appState.trackProgress[tid] || 0)) {
            appState.trackProgress[tid] = pct;
          }
        });
      }

      // Selected tracks
      if (data.selected_tracks && data.selected_tracks.length && !appState.selectedTracks.length) {
        appState.selectedTracks = data.selected_tracks;
      }

      // Completed days & challenges
      if (data.completed_days) data.completed_days.forEach(d => appState.completedDays.add(d));
      if (data.completed_challenges) data.completed_challenges.forEach(c => appState.completedChallenges.add(c));

      // Quiz traits
      if (data.quiz_traits && !appState.quizTraits) {
        appState.quizTraits = data.quiz_traits;
      }

      // Last lesson
      if (data.last_lesson && !appState.currentTrack) {
        appState.currentTrack  = data.last_lesson.trackId;
        appState.currentCourse = data.last_lesson.courseId;
        appState.currentLesson = data.last_lesson.lessonId;
      }

      // حفظ كل حاجة في localStorage بعد الدمج
      if (typeof saveProgressFn === 'function') saveProgressFn();

      console.info('[Sync] Progress pulled from cloud ✅');
      return true;
    } catch(e) {
      console.warn('[Sync] Pull failed:', e.message);
      return false;
    }
  },

  // Debounced auto-push — بيتشغل بعد أي تغيير في الـ state
  _pushTimer: null,
  schedulePush(userId, appState) {
    if (!userId) return;
    clearTimeout(this._pushTimer);
    this._pushTimer = setTimeout(() => {
      this.pushAll(userId, appState);
    }, 3000); // 3 ثواني delay لتجميع التغييرات
  }
};

window.ProgressSyncService = ProgressSyncService;

/* =============================================
   NotificationService — إشعارات الأدمن للمستخدمين
   ============================================= */
const NotificationService = {
  async loadForCurrentUser() {
    try {
      const { data, error } = await supa
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[NotificationService] load error:', e);
      return [];
    }
  }
};
window.NotificationService = NotificationService;
