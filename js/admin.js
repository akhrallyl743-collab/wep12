'use strict';

/* =============================================
   Admin Dashboard — لوحة تحكم شاملة
   محمية بـ STATE.isAdmin (مبني على profiles.is_admin عبر RLS)
   ============================================= */

// إظهار/إخفاء زر "⚙️ الإدارة" في الناف بار حسب صلاحية المستخدم
function _updateAdminNavVisibility() {
  document.querySelectorAll('.admin-nav-link').forEach(el => {
    el.style.display = STATE.isAdmin ? '' : 'none';
  });
}
window._updateAdminNavVisibility = _updateAdminNavVisibility;

/* =============================================
   أدوات مساعدة عامة
   ============================================= */
function _adminVal(id) { const el = $(id); return el ? el.value : ''; }
function _adminChecked(id) { const el = $(id); return el ? !!el.checked : false; }
function _adminEsc(s) { return sanitizeHTML(s == null ? '' : String(s)); }

const AdminService = {
  /* ===================== المدربون ===================== */
  async loadAllTrainers() {
    try {
      const { data, error } = await supa
        .from('trainer_applications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[Admin] loadAllTrainers error:', e);
      return [];
    }
  },

  async setTrainerField(id, field, value) {
    try {
      const { error } = await supa.from('trainer_applications').update({ [field]: value }).eq('id', id);
      return !error;
    } catch (e) { return false; }
  },

  async deleteTrainer(id) {
    try {
      const { error } = await supa.from('trainer_applications').delete().eq('id', id);
      return !error;
    } catch (e) { return false; }
  },

  /* ===================== المستخدمون ===================== */
  async loadAllUsers() {
    try {
      const { data, error, count } = await supa
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('points', { ascending: false })
        .limit(1000);
      if (error) throw error;
      STATE.adminUsersTotalCount = count ?? (data || []).length;
      return data || [];
    } catch (e) {
      console.warn('[Admin] loadAllUsers error:', e);
      return [];
    }
  },

  // مين "أونلاين" دلوقتي — أي حساب نبض (heartbeat) خلال آخر دقيقتين
  async loadOnlineUsers() {
    try {
      const cutoff = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { data, error } = await supa
        .from('profiles')
        .select('id, username, avatar_url, last_seen_at')
        .gte('last_seen_at', cutoff)
        .order('last_seen_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('[Admin] loadOnlineUsers error:', e); return []; }
  },

  // آخر المستخدمين اللي انضموا فعلياً (بالترتيب الزمني للتسجيل)
  async loadRecentSignups(limitN = 8) {
    try {
      const { data, error } = await supa
        .from('profiles')
        .select('id, username, avatar_url, created_at')
        .order('created_at', { ascending: false })
        .limit(limitN);
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('[Admin] loadRecentSignups error:', e); return []; }
  },

  // اشتراك لحظي — يشتغل طول ما لوحة الإدارة مفتوحة
  // onNewUser: يتنفذ فور تسجيل مستخدم جديد | onPresence: يتنفذ عند أي تحديث نبضة حضور
  _liveChannel: null,
  subscribeLive(onNewUser, onPresence) {
    if (typeof supa === 'undefined' || !supa.channel) return null;
    this.unsubscribeLive();
    this._liveChannel = supa
      .channel('admin-live-profiles')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'profiles' }, (payload) => {
        if (typeof onNewUser === 'function') onNewUser(payload.new);
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'profiles' }, (payload) => {
        if (typeof onPresence === 'function') onPresence(payload.new);
      })
      .subscribe();
    return this._liveChannel;
  },
  unsubscribeLive() {
    if (this._liveChannel) { supa.removeChannel(this._liveChannel); this._liveChannel = null; }
  },

  async searchUsers(q) {
    try {
      const { data, error } = await supa
        .from('profiles')
        .select('*')
        .ilike('username', `%${q}%`)
        .limit(20);
      if (error) throw error;
      return data || [];
    } catch (e) { return []; }
  },

  async adjustUserPoints(userId, delta) {
    try {
      const { data: row } = await supa.from('profiles').select('points').eq('id', userId).single();
      const newPoints = Math.max(0, (row?.points || 0) + delta);
      const { error } = await supa.from('profiles').update({ points: newPoints }).eq('id', userId);
      return !error ? newPoints : null;
    } catch (e) { return null; }
  },

  async setUserAdmin(userId, value) {
    try {
      const { error } = await supa.from('profiles').update({ is_admin: value }).eq('id', userId);
      return !error;
    } catch (e) { return false; }
  },

  /* ===================== منشورات المجتمع ===================== */
  async loadAllPosts() {
    try {
      const { data, error } = await supa
        .from('community_posts')
        .select('*, profiles(username)')
        .order('created_at', { ascending: false })
        .limit(100);
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('[Admin] loadAllPosts error:', e);
      return [];
    }
  },

  async deletePost(id) {
    try {
      const { error } = await supa.from('community_posts').delete().eq('id', id);
      return !error;
    } catch (e) { return false; }
  },

  /* ===================== إشعار تلقائي عند إضافة محتوى جديد ===================== */
  // يُستدعى تلقائياً من دوال الإنشاء أدناه — مفيش تدخل يدوي مطلوب من الأدمن
  async _autoNotifyNewContent(title, message) {
    try { await this.sendNotification(title, message, 'all', []); }
    catch (e) { console.warn('[Admin] auto-notify failed:', e); }
  },

  /* ===================== المسارات التعليمية (Roadmaps) ===================== */
  async loadAllRoadmaps() {
    try {
      const { data, error } = await supa.from('roadmaps').select('*').order('order_index');
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('[Admin] loadAllRoadmaps error:', e); return []; }
  },

  async createRoadmap(fields) {
    try {
      const { data, error } = await supa.from('roadmaps').insert(fields).select().single();
      if (error) throw error;
      this._autoNotifyNewContent('📚 مسار جديد!', `أضفنا مسار "${fields.title || ''}" — جاهز تستكشفه دلوقتي؟`);
      return { data };
    } catch (e) { return { error: e.message || 'حصل خطأ' }; }
  },

  async updateRoadmap(id, fields) {
    try {
      const { error } = await supa.from('roadmaps').update(fields).eq('id', id);
      return !error;
    } catch (e) { return false; }
  },

  async deleteRoadmap(id) {
    try {
      const { error } = await supa.from('roadmaps').delete().eq('id', id);
      return !error;
    } catch (e) { return false; }
  },

  async loadRoadmapFull(roadmapId) {
    try {
      const { data: sections, error: e1 } = await supa.from('roadmap_sections').select('*').eq('roadmap_id', roadmapId).order('order_index');
      if (e1) throw e1;
      const sectionIds = (sections || []).map(s => s.id);
      let steps = [];
      if (sectionIds.length) {
        const { data: stepsData, error: e2 } = await supa.from('roadmap_steps').select('*').in('section_id', sectionIds).order('order_index');
        if (e2) throw e2;
        steps = stepsData || [];
      }
      const stepIds = steps.map(s => s.id);
      let resources = [];
      if (stepIds.length) {
        const { data: resData, error: e3 } = await supa.from('roadmap_resources').select('*').in('step_id', stepIds).order('order_index');
        if (e3) throw e3;
        resources = resData || [];
      }
      const resByStep = {};
      resources.forEach(r => { (resByStep[r.step_id] = resByStep[r.step_id] || []).push(r); });
      const stepsBySection = {};
      steps.forEach(st => { st.resources = resByStep[st.id] || []; (stepsBySection[st.section_id] = stepsBySection[st.section_id] || []).push(st); });
      (sections || []).forEach(sec => { sec.steps = stepsBySection[sec.id] || []; });
      return sections || [];
    } catch (e) { console.warn('[Admin] loadRoadmapFull error:', e); return []; }
  },

  async createSection(roadmapId, fields) {
    try {
      const { data, error } = await supa.from('roadmap_sections').insert({ ...fields, roadmap_id: roadmapId }).select().single();
      if (error) throw error;
      this._autoNotifyNewContent('🆕 محتوى جديد', `أضفنا "${fields.title || 'قسم جديد'}" لأحد مساراتك التعليمية`);
      return { data };
    } catch (e) { return { error: e.message || 'حصل خطأ' }; }
  },
  async updateSection(id, fields) {
    try { const { error } = await supa.from('roadmap_sections').update(fields).eq('id', id); return !error; }
    catch (e) { return false; }
  },
  async deleteSection(id) {
    try { const { error } = await supa.from('roadmap_sections').delete().eq('id', id); return !error; }
    catch (e) { return false; }
  },

  async createStep(sectionId, fields) {
    try {
      const { data, error } = await supa.from('roadmap_steps').insert({ ...fields, section_id: sectionId }).select().single();
      if (error) throw error;
      this._autoNotifyNewContent('🎬 درس جديد', `أضفنا "${fields.title || 'درس جديد'}" — كمّل تعلمك!`);
      return { data };
    } catch (e) { return { error: e.message || 'حصل خطأ' }; }
  },
  async updateStep(id, fields) {
    try { const { error } = await supa.from('roadmap_steps').update(fields).eq('id', id); return !error; }
    catch (e) { return false; }
  },
  async deleteStep(id) {
    try { const { error } = await supa.from('roadmap_steps').delete().eq('id', id); return !error; }
    catch (e) { return false; }
  },

  async createResource(stepId, fields) {
    try {
      const { data, error } = await supa.from('roadmap_resources').insert({ ...fields, step_id: stepId }).select().single();
      if (error) throw error;
      return { data };
    } catch (e) { return { error: e.message || 'حصل خطأ' }; }
  },
  async updateResource(id, fields) {
    try { const { error } = await supa.from('roadmap_resources').update(fields).eq('id', id); return !error; }
    catch (e) { return false; }
  },
  async deleteResource(id) {
    try { const { error } = await supa.from('roadmap_resources').delete().eq('id', id); return !error; }
    catch (e) { return false; }
  },

  /* ===================== أسئلة الاختبار ===================== */
  async loadAllQuizQuestions() {
    try {
      const { data, error } = await supa.from('quiz_questions').select('*').order('order_index');
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('[Admin] loadAllQuizQuestions error:', e); return []; }
  },
  async createQuizQuestion(fields) {
    try { const { data, error } = await supa.from('quiz_questions').insert(fields).select().single(); if (error) throw error; return { data }; }
    catch (e) { return { error: e.message || 'حصل خطأ' }; }
  },
  async updateQuizQuestion(id, fields) {
    try { const { error } = await supa.from('quiz_questions').update({ ...fields, updated_at: new Date().toISOString() }).eq('id', id); return !error; }
    catch (e) { return false; }
  },
  async deleteQuizQuestion(id) {
    try { const { error } = await supa.from('quiz_questions').delete().eq('id', id); return !error; }
    catch (e) { return false; }
  },

  /* ===================== الشهادات ===================== */
  async loadAllCertificates() {
    try {
      const { data, error } = await supa.from('certificates').select('*, profiles(username)').order('issued_at', { ascending: false }).limit(200);
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('[Admin] loadAllCertificates error:', e); return []; }
  },
  async issueCertificate(userId, roadmapId, roadmapSlug, roadmapTitle) {
    try {
      const { data: { user } } = await supa.auth.getUser();
      const { data, error } = await supa.from('certificates').insert({
        user_id: userId, roadmap_id: roadmapId || null, roadmap_slug: roadmapSlug || null,
        roadmap_title: roadmapTitle || null, issued_by: user?.id || null
      }).select().single();
      if (error) throw error;
      return { data };
    } catch (e) { return { error: e.message || 'حصل خطأ' }; }
  },
  async toggleCertificateRevoked(id, revoked) {
    try { const { error } = await supa.from('certificates').update({ revoked }).eq('id', id); return !error; }
    catch (e) { return false; }
  },
  async deleteCertificate(id) {
    try { const { error } = await supa.from('certificates').delete().eq('id', id); return !error; }
    catch (e) { return false; }
  },

  /* ===================== الإشعارات ===================== */
  async loadAllNotifications() {
    try {
      const { data, error } = await supa.from('notifications').select('*').order('created_at', { ascending: false }).limit(100);
      if (error) throw error;
      return data || [];
    } catch (e) { console.warn('[Admin] loadAllNotifications error:', e); return []; }
  },
  async sendNotification(title, message, targetType, targetUserIds) {
    try {
      const { data: { user } } = await supa.auth.getUser();
      const payload = { title, message, target_type: targetType, created_by: user?.id || null };
      if (targetType === 'users') payload.target_user_ids = targetUserIds || [];
      const { data, error } = await supa.from('notifications').insert(payload).select().single();
      if (error) throw error;
      return { data };
    } catch (e) { return { error: e.message || 'حصل خطأ أثناء الإرسال' }; }
  },
  async deleteNotification(id) {
    try { const { error } = await supa.from('notifications').delete().eq('id', id); return !error; }
    catch (e) { return false; }
  },

  /* ===================== إحصائيات تفصيلية ===================== */
  async loadDetailedStats() {
    const stats = { activeUsers7d: 0, totalUsers: 0, topRoadmaps: [], completionRates: [] };
    try {
      const { data: profiles } = await supa.from('profiles').select('id, last_active');
      stats.totalUsers = (profiles || []).length;
      const cutoff = new Date(); cutoff.setDate(cutoff.getDate() - 7);
      const cutoffStr = cutoff.toISOString().split('T')[0];
      stats.activeUsers7d = (profiles || []).filter(p => p.last_active && p.last_active >= cutoffStr).length;
    } catch (e) { console.warn('[Admin] stats profiles error:', e); }

    try {
      const { data: roadmaps } = await supa.from('roadmaps').select('id, title, slug, views_count').order('views_count', { ascending: false }).limit(8);
      stats.topRoadmaps = roadmaps || [];
    } catch (e) { console.warn('[Admin] stats roadmaps error:', e); }

    try {
      const { data: progressRows } = await supa.from('roadmap_progress').select('roadmap_id, percent_complete, completed_at');
      const byRoadmap = {};
      (progressRows || []).forEach(r => {
        const key = r.roadmap_id;
        if (!byRoadmap[key]) byRoadmap[key] = { started: 0, completed: 0, sumPct: 0 };
        byRoadmap[key].started++;
        byRoadmap[key].sumPct += (r.percent_complete || 0);
        if (r.completed_at) byRoadmap[key].completed++;
      });
      const titleMap = {};
      (stats.topRoadmaps || []).forEach(r => { titleMap[r.id] = r.title; });
      const missingIds = Object.keys(byRoadmap).filter(id => !titleMap[id]);
      if (missingIds.length) {
        const { data: extra } = await supa.from('roadmaps').select('id, title').in('id', missingIds);
        (extra || []).forEach(r => { titleMap[r.id] = r.title; });
      }
      stats.completionRates = Object.entries(byRoadmap).map(([roadmapId, v]) => ({
        roadmapId, title: titleMap[roadmapId] || 'مسار غير معروف',
        started: v.started, completed: v.completed,
        avgPercent: Math.round(v.sumPct / v.started),
        completionRate: Math.round((v.completed / v.started) * 100)
      })).sort((a, b) => b.started - a.started).slice(0, 10);
    } catch (e) { console.warn('[Admin] stats progress error:', e); }

    return stats;
  }
};
window.AdminService = AdminService;

/* =============================================
   حالة اللوحة
   ============================================= */
STATE.adminTab = 'overview';
STATE.adminCache = { trainers: [], users: [], posts: [], roadmaps: [], quizQuestions: [], certificates: [], notifications: [] };
STATE.adminEditingRoadmapId = null;
STATE.adminRoadmapTree = [];

/* =============================================
   حراسة الصفحة — لازم STATE.isAdmin = true
   ============================================= */
function renderAdminGuard() {
  const guard = $('admin-guard');
  const content = $('admin-content');
  if (!guard || !content) return;

  if (!STATE.isAdmin) {
    guard.style.display = 'block';
    content.style.display = 'none';
    return false;
  }
  guard.style.display = 'none';
  content.style.display = 'block';
  return true;
}

function initAdminPage() {
  if (!renderAdminGuard()) return;
  setAdminTab(STATE.adminTab || 'overview');
}

/* =============================================
   التبويبات
   ============================================= */
function setAdminTab(tab) {
  STATE.adminTab = tab;
  $$('.admin-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.adminTab === tab));
  $$('.admin-panel').forEach(p => { p.style.display = 'none'; p.classList.remove('active'); });
  const panel = $('admin-panel-' + tab);
  if (panel) { panel.style.display = 'block'; panel.classList.add('active'); }

  if (tab === 'overview')      renderAdminOverview();
  if (tab === 'trainers')      renderAdminTrainers();
  if (tab === 'users')         renderAdminUsers();
  if (tab === 'community')     renderAdminCommunity();
  if (tab === 'roadmaps')      renderAdminRoadmaps();
  if (tab === 'quizzes')       renderAdminQuizzes();
  if (tab === 'certificates')  renderAdminCertificates();
  if (tab === 'notifications') renderAdminNotifications();
  if (tab === 'stats')         renderAdminStats();
  if (tab === 'admins')        renderAdminAdmins();
}

/* =============================================
   نظرة عامة
   ============================================= */
async function renderAdminOverview() {
  const el = $('admin-overview-stats');
  if (!el) return;
  el.innerHTML = `<p style="text-align:center;color:var(--muted);grid-column:1/-1;">جاري تحميل الإحصائيات...</p>`;

  const [trainers, users, posts, roadmaps] = await Promise.all([
    AdminService.loadAllTrainers(),
    AdminService.loadAllUsers(),
    AdminService.loadAllPosts(),
    AdminService.loadAllRoadmaps()
  ]);

  STATE.adminCache.trainers = trainers;
  STATE.adminCache.users = users;
  STATE.adminCache.posts = posts;
  STATE.adminCache.roadmaps = roadmaps;

  const activeTrainers = trainers.filter(t => t.is_active && !t.is_blocked && t.status === 'approved').length;
  const pendingTrainers = trainers.filter(t => (t.status || 'pending') === 'pending').length;
  const blockedTrainers = trainers.filter(t => t.is_blocked).length;
  const adminsCount = users.filter(u => u.is_admin).length;

  el.innerHTML = `
    <div class="admin-stat-card"><span class="num">${STATE.adminUsersTotalCount ?? users.length}</span><span class="lbl">👥 إجمالي المستخدمين</span></div>
    <div class="admin-stat-card"><span class="num">${roadmaps.length}</span><span class="lbl">📚 المسارات التعليمية</span></div>
    <div class="admin-stat-card"><span class="num">${trainers.length}</span><span class="lbl">🤝 إجمالي المدربين</span></div>
    <div class="admin-stat-card"><span class="num">${pendingTrainers}</span><span class="lbl">📩 طلبات مدربين قيد المراجعة</span></div>
    <div class="admin-stat-card"><span class="num">${activeTrainers}</span><span class="lbl">🟢 مدربون ظاهرون الآن</span></div>
    <div class="admin-stat-card"><span class="num">${blockedTrainers}</span><span class="lbl">⛔ مدربون محظورون</span></div>
    <div class="admin-stat-card"><span class="num">${posts.length}</span><span class="lbl">💬 منشورات المجتمع</span></div>
    <div class="admin-stat-card"><span class="num">${adminsCount}</span><span class="lbl">⚙️ عدد المشرفين</span></div>
  `;

  if (pendingTrainers > 0) {
    const badge = $('admin-pending-badge');
    if (badge) { badge.style.display = 'inline-flex'; badge.textContent = pendingTrainers; }
  }

  _renderAdminLivePanels();
  AdminService.subscribeLive(
    (newUser) => { toast(`🆕 مستخدم جديد انضم: ${newUser.username || 'مستخدم'}`); _renderAdminLivePanels(); },
    () => { _renderAdminLivePanels(); }
  );
}

/* لوحة "أونلاين الآن" و"آخر المنضمين" — تتحدّث لحظياً عبر Supabase Realtime
   + تحديث احتياطي كل 20 ثانية لضمان الدقة حتى لو فاتت أي حدث */
let _adminLiveInterval = null;
async function _renderAdminLivePanels() {
  const [online, recent] = await Promise.all([
    AdminService.loadOnlineUsers(),
    AdminService.loadRecentSignups(8)
  ]);

  const countEl = $('admin-online-count');
  if (countEl) countEl.textContent = online.length;

  const onlineList = $('admin-online-list');
  if (onlineList) {
    onlineList.innerHTML = online.length
      ? online.map(u => `
        <div style="display:flex;align-items:center;gap:8px;font-size:13px;">
          <span style="width:7px;height:7px;border-radius:50%;background:#1fbb85;flex-shrink:0;"></span>
          <span style="font-weight:700;">${_adminEsc(u.username || 'مستخدم')}</span>
        </div>`).join('')
      : `<p style="color:var(--muted);font-size:12.5px;">محدش أونلاين دلوقتي</p>`;
  }

  const recentEl = $('admin-recent-signups');
  if (recentEl) {
    recentEl.innerHTML = recent.length
      ? recent.map(u => `
        <div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;">
          <span style="font-weight:700;">${_adminEsc(u.username || 'مستخدم')}</span>
          <span style="color:var(--muted);font-size:11px;">${_adminTimeAgo(u.created_at)}</span>
        </div>`).join('')
      : `<p style="color:var(--muted);font-size:12.5px;">لا يوجد تسجيلات بعد</p>`;
  }

  if (!_adminLiveInterval) {
    _adminLiveInterval = setInterval(() => {
      if (STATE.currentPage === 'admin' && STATE.adminTab === 'overview') _renderAdminLivePanels();
      else { clearInterval(_adminLiveInterval); _adminLiveInterval = null; AdminService.unsubscribeLive(); }
    }, 20000);
  }
}

function _adminTimeAgo(iso) {
  if (!iso) return '';
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} د`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `منذ ${hrs} س`;
  return `منذ ${Math.round(hrs / 24)} ي`;
}

/* =============================================
   المدربون — مراجعة الطلبات (قبول/رفض) + إدارة
   ============================================= */
STATE.adminTrainerFilter = 'all';

function _trainerStatusBadge(t) {
  const st = t.status || 'pending';
  if (st === 'pending')  return '<span class="admin-badge" style="background:color-mix(in srgb, #d9a441 15%, transparent);color:#a97a1a;">📩 قيد المراجعة</span>';
  if (st === 'rejected') return '<span class="admin-badge blocked">✖ مرفوض</span>';
  return '<span class="admin-badge on">✅ مقبول</span>';
}

async function renderAdminTrainers(forceReload) {
  const list = $('admin-trainers-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.trainers?.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.trainers = await AdminService.loadAllTrainers();
  }

  const q = ($('admin-trainers-search')?.value || '').trim().toLowerCase();
  let rows = STATE.adminCache.trainers || [];

  if (STATE.adminTrainerFilter === 'pending')  rows = rows.filter(t => (t.status || 'pending') === 'pending');
  if (STATE.adminTrainerFilter === 'approved') rows = rows.filter(t => t.status === 'approved');
  if (STATE.adminTrainerFilter === 'rejected') rows = rows.filter(t => t.status === 'rejected');

  if (q) {
    rows = rows.filter(t =>
      (t.full_name || '').toLowerCase().includes(q) ||
      (t.profession || '').toLowerCase().includes(q)
    );
  }

  const pendingCount = (STATE.adminCache.trainers || []).filter(t => (t.status || 'pending') === 'pending').length;
  const filterBar = $('admin-trainers-filterbar');
  if (filterBar) {
    filterBar.innerHTML = `
      <button class="admin-btn-xs ${STATE.adminTrainerFilter === 'all' ? 'success' : ''}" data-action="adminSetTrainerFilter" data-value="all">الكل (${STATE.adminCache.trainers.length})</button>
      <button class="admin-btn-xs ${STATE.adminTrainerFilter === 'pending' ? 'success' : ''}" data-action="adminSetTrainerFilter" data-value="pending">📩 قيد المراجعة (${pendingCount})</button>
      <button class="admin-btn-xs ${STATE.adminTrainerFilter === 'approved' ? 'success' : ''}" data-action="adminSetTrainerFilter" data-value="approved">✅ مقبولون</button>
      <button class="admin-btn-xs ${STATE.adminTrainerFilter === 'rejected' ? 'success' : ''}" data-action="adminSetTrainerFilter" data-value="rejected">✖ مرفوضون</button>
    `;
  }

  if (!rows.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">لا يوجد مدربون مطابقون.</p>`;
    return;
  }

  list.innerHTML = rows.map(t => `
    <div class="admin-row">
      <div class="admin-row-main">
        <strong>${_adminEsc(t.full_name || '')}</strong>
        <span>${_adminEsc(t.profession || '')} · ${_adminEsc(t.phone || '')} · ${_adminEsc(t.email || '')}</span>
        <span>
          ${_trainerStatusBadge(t)}
          ${t.is_active && !t.is_blocked ? '<span class="admin-badge on">ظاهر</span>' : '<span class="admin-badge off">مخفي</span>'}
          ${t.is_blocked ? '<span class="admin-badge blocked">محظور</span>' : ''}
        </span>
      </div>
      <div class="admin-row-actions">
        ${(t.status || 'pending') !== 'approved' ? `<button class="admin-btn-xs success" data-action="adminSetTrainerStatus" data-id="${t.id}" data-value="approved">✅ قبول</button>` : ''}
        ${(t.status || 'pending') !== 'rejected' ? `<button class="admin-btn-xs danger" data-action="adminSetTrainerStatus" data-id="${t.id}" data-value="rejected">✖ رفض</button>` : ''}
        <button class="admin-btn-xs" data-action="adminToggleTrainerActive" data-id="${t.id}" data-value="${!t.is_active}">
          ${t.is_active ? '🙈 إخفاء' : '👁 إظهار'}
        </button>
        <button class="admin-btn-xs ${t.is_blocked ? 'success' : 'danger'}" data-action="adminToggleTrainerBlocked" data-id="${t.id}" data-value="${!t.is_blocked}">
          ${t.is_blocked ? '✅ رفع الحظر' : '⛔ حظر'}
        </button>
        <button class="admin-btn-xs danger" data-action="adminDeleteTrainer" data-id="${t.id}">🗑 حذف</button>
      </div>
    </div>
  `).join('');
}

function adminSetTrainerFilter(v) { STATE.adminTrainerFilter = v; renderAdminTrainers(false); }
async function refreshAdminTrainers() { await renderAdminTrainers(true); }

async function adminSetTrainerStatus(id, value) {
  const ok = await AdminService.setTrainerField(id, 'status', value);
  if (ok) {
    toast(value === 'approved' ? '✅ تم قبول طلب المدرب' : '✖ تم رفض طلب المدرب');
    await renderAdminTrainers(true);
  } else toast('⚠️ حصل خطأ');
}

async function adminToggleTrainerActive(id, value) {
  const ok = await AdminService.setTrainerField(id, 'is_active', value);
  if (ok) { toast(value ? '✅ المدرب ظاهر الآن' : '🙈 تم إخفاء المدرب'); await renderAdminTrainers(true); }
  else toast('⚠️ حصل خطأ');
}

async function adminToggleTrainerBlocked(id, value) {
  const ok = await AdminService.setTrainerField(id, 'is_blocked', value);
  if (ok) { toast(value ? '⛔ تم حظر المدرب' : '✅ تم رفع الحظر'); await renderAdminTrainers(true); }
  else toast('⚠️ حصل خطأ');
}

async function adminDeleteTrainer(id) {
  if (!confirm('هل أنت متأكد من حذف هذا المدرب نهائياً؟')) return;
  const ok = await AdminService.deleteTrainer(id);
  if (ok) { toast('🗑 تم الحذف'); await renderAdminTrainers(true); }
  else toast('⚠️ حصل خطأ أثناء الحذف');
}

/* =============================================
   المستخدمون
   ============================================= */
async function renderAdminUsers(forceReload) {
  const list = $('admin-users-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.users?.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.users = await AdminService.loadAllUsers();
  }

  const q = ($('admin-users-search')?.value || '').trim().toLowerCase();
  let rows = STATE.adminCache.users || [];
  if (q) rows = rows.filter(u => (u.username || '').toLowerCase().includes(q));

  if (!rows.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">لا يوجد مستخدمون مطابقون.</p>`;
    return;
  }

  list.innerHTML = rows.map(u => `
    <div class="admin-row">
      <div class="admin-row-main">
        <strong>${_adminEsc(u.username || 'مستخدم')} ${u.is_admin ? '⭐' : ''}</strong>
        <span>النقاط: ${u.points || 0} · المستوى: ${u.level || 1} · Streak: ${u.streak || 0}</span>
      </div>
      <div class="admin-row-actions">
        <button class="admin-btn-xs" data-action="adminAdjustPoints" data-id="${u.id}" data-delta="10">+10</button>
        <button class="admin-btn-xs" data-action="adminAdjustPoints" data-id="${u.id}" data-delta="-10">-10</button>
        <button class="admin-btn-xs" data-action="adminQuickNotifyUser" data-id="${u.id}" data-name="${_adminEsc(u.username || 'مستخدم')}">🔔 إشعار</button>
        <button class="admin-btn-xs" data-action="adminGoToAdminsTab">⚙️ الصلاحيات</button>
      </div>
    </div>
  `).join('');
}

async function refreshAdminUsers() { await renderAdminUsers(true); }

async function adminAdjustPoints(id, delta) {
  const newPoints = await AdminService.adjustUserPoints(id, delta);
  if (newPoints !== null) { toast(`✅ النقاط الجديدة: ${newPoints}`); await renderAdminUsers(true); }
  else toast('⚠️ حصل خطأ');
}

function adminGoToAdminsTab() { setAdminTab('admins'); }

/* =============================================
   منشورات المجتمع
   ============================================= */
async function renderAdminCommunity(forceReload) {
  const list = $('admin-community-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.posts?.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.posts = await AdminService.loadAllPosts();
  }

  const rows = STATE.adminCache.posts || [];
  if (!rows.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">لا توجد منشورات.</p>`;
    return;
  }

  list.innerHTML = rows.map(p => `
    <div class="admin-row">
      <div class="admin-row-main">
        <strong>${_adminEsc(p.profiles?.username || 'مستخدم')}</strong>
        <span>${_adminEsc((p.content || '').slice(0, 140))}${(p.content || '').length > 140 ? '…' : ''}</span>
      </div>
      <div class="admin-row-actions">
        <button class="admin-btn-xs danger" data-action="adminDeletePost" data-id="${p.id}">🗑 حذف</button>
      </div>
    </div>
  `).join('');
}

async function refreshAdminCommunity() { await renderAdminCommunity(true); }

async function adminDeletePost(id) {
  if (!confirm('حذف هذا المنشور نهائياً؟')) return;
  const ok = await AdminService.deletePost(id);
  if (ok) { toast('🗑 تم حذف المنشور'); await renderAdminCommunity(true); }
  else toast('⚠️ حصل خطأ أثناء الحذف');
}

/* =============================================
   المسارات التعليمية (Roadmaps) — إدارة كاملة
   مسار → أقسام (Sections) → خطوات (Steps) → فيديوهات/مصادر (Resources)
   ============================================= */

function _levelOptions(current) {
  return ['مبتدئ', 'متوسط', 'متقدم'].map(l =>
    `<option value="${l}" ${current === l ? 'selected' : ''}>${l}</option>`).join('');
}
function _stepTypeOptions(current) {
  const types = [['video', '🎥 فيديو'], ['reading', '📖 قراءة'], ['exercise', '✍️ تدريب'], ['project', '🛠 مشروع'], ['quiz', '❓ اختبار']];
  return types.map(([v, l]) => `<option value="${v}" ${current === v ? 'selected' : ''}>${l}</option>`).join('');
}
function _resourceKindOptions(current) {
  const kinds = [['youtube', '🎥 يوتيوب/فيديو'], ['external_article', '📄 مقال/رابط'], ['github_repo', '💻 GitHub']];
  return kinds.map(([v, l]) => `<option value="${v}" ${current === v ? 'selected' : ''}>${l}</option>`).join('');
}

async function renderAdminRoadmaps(forceReload) {
  const container = $('admin-roadmaps-container');
  if (!container) return;

  if (STATE.adminEditingRoadmapId) {
    await renderAdminRoadmapEditor(STATE.adminEditingRoadmapId, forceReload);
    return;
  }

  if (forceReload || !STATE.adminCache.roadmaps?.length) {
    container.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.roadmaps = await AdminService.loadAllRoadmaps();
  }

  const rows = STATE.adminCache.roadmaps || [];
  container.innerHTML = `
    <div class="admin-toolbar">
      <button class="btn btn-primary btn-sm" data-action="adminNewRoadmap">+ مسار جديد</button>
      <button class="btn btn-secondary btn-sm" data-action="refreshAdminRoadmaps">🔄 تحديث</button>
    </div>
    ${!rows.length ? '<p style="text-align:center;color:var(--muted);padding:24px;">لا توجد مسارات بعد.</p>' : rows.map(r => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>${r.icon || '📚'} ${_adminEsc(r.title || r.slug)}</strong>
          <span>${_adminEsc(r.level || '')} · ${_adminEsc(r.duration_label || '')} · 👁 ${r.views_count || 0} مشاهدة</span>
          <span>${r.is_published ? '<span class="admin-badge on">منشور</span>' : '<span class="admin-badge off">مسودة</span>'}</span>
        </div>
        <div class="admin-row-actions">
          <button class="admin-btn-xs" data-action="adminEditRoadmap" data-id="${r.id}">✏️ تعديل المحتوى</button>
          <button class="admin-btn-xs danger" data-action="adminDeleteRoadmap" data-id="${r.id}" data-standalone="true">🗑 حذف</button>
        </div>
      </div>
    `).join('')}
  `;
}

async function refreshAdminRoadmaps() { STATE.adminEditingRoadmapId = null; await renderAdminRoadmaps(true); }

async function adminNewRoadmap() {
  const slug = 'roadmap-' + Date.now();
  const { data, error } = await AdminService.createRoadmap({
    slug, title: 'مسار جديد', subtitle: '', level: 'مبتدئ',
    duration_label: '', icon: '📚', color: '#7c6dff', is_published: false, order_index: (STATE.adminCache.roadmaps?.length || 0)
  });
  if (error || !data) { toast('⚠️ حصل خطأ أثناء إنشاء المسار'); return; }
  toast('✅ تم إنشاء المسار — عدّل بياناته الآن');
  STATE.adminCache.roadmaps = null;
  STATE.adminEditingRoadmapId = data.id;
  await renderAdminRoadmaps(true);
}

async function adminEditRoadmap(id) {
  STATE.adminEditingRoadmapId = id;
  await renderAdminRoadmaps(true);
}

function adminBackToRoadmapList() {
  STATE.adminEditingRoadmapId = null;
  renderAdminRoadmaps(true);
}

async function adminDeleteRoadmap(id) {
  if (!confirm('هل أنت متأكد من حذف هذا المسار بالكامل؟ سيتم حذف كل الأقسام والخطوات والمصادر المرتبطة به.')) return;
  const ok = await AdminService.deleteRoadmap(id);
  if (ok) {
    toast('🗑 تم حذف المسار');
    STATE.adminEditingRoadmapId = null;
    STATE.adminCache.roadmaps = null;
    await renderAdminRoadmaps(true);
  } else toast('⚠️ حصل خطأ أثناء الحذف — قد يحتاج الأمر حذف المحتوى الداخلي أولاً');
}

async function renderAdminRoadmapEditor(roadmapId, forceReload) {
  const container = $('admin-roadmaps-container');
  if (!container) return;

  if (!STATE.adminCache.roadmaps?.length) STATE.adminCache.roadmaps = await AdminService.loadAllRoadmaps();
  const rm = (STATE.adminCache.roadmaps || []).find(r => r.id === roadmapId);
  if (!rm) { container.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">لم يتم العثور على المسار.</p>`; return; }

  if (forceReload || !STATE.adminRoadmapTree || STATE.adminRoadmapTree._forId !== roadmapId) {
    container.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    const sections = await AdminService.loadRoadmapFull(roadmapId);
    sections._forId = roadmapId;
    STATE.adminRoadmapTree = sections;
  }
  const sections = STATE.adminRoadmapTree;

  container.innerHTML = `
    <div class="admin-toolbar">
      <button class="btn btn-secondary btn-sm" data-action="adminBackToRoadmapList">← رجوع لكل المسارات</button>
    </div>

    <div class="admin-editor-card">
      <h3 style="margin-bottom:12px;">📚 بيانات المسار</h3>
      <div class="admin-form-grid">
        <label>العنوان <input class="form-input" id="rm-title-${rm.id}" value="${_adminEsc(rm.title)}"></label>
        <label>الوصف الفرعي <input class="form-input" id="rm-subtitle-${rm.id}" value="${_adminEsc(rm.subtitle)}"></label>
        <label>Slug (رابط) <input class="form-input" id="rm-slug-${rm.id}" value="${_adminEsc(rm.slug)}"></label>
        <label>المستوى <select class="form-input" id="rm-level-${rm.id}">${_levelOptions(rm.level)}</select></label>
        <label>المدة (نص) <input class="form-input" id="rm-duration-${rm.id}" value="${_adminEsc(rm.duration_label)}"></label>
        <label>أيقونة (إيموجي) <input class="form-input" id="rm-icon-${rm.id}" value="${_adminEsc(rm.icon)}"></label>
        <label>لون (hex) <input class="form-input" id="rm-color-${rm.id}" value="${_adminEsc(rm.color)}"></label>
        <label>ترتيب العرض <input class="form-input" type="number" id="rm-order-${rm.id}" value="${rm.order_index || 0}"></label>
      </div>
      <label style="display:block;margin:10px 0;">الوصف الكامل
        <textarea class="form-input" id="rm-longdesc-${rm.id}" rows="3">${_adminEsc(rm.long_desc)}</textarea>
      </label>
      <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
        <input type="checkbox" id="rm-published-${rm.id}" ${rm.is_published ? 'checked' : ''}> منشور (ظاهر للمستخدمين)
      </label>
      <div class="admin-row-actions">
        <button class="btn btn-primary btn-sm" data-action="adminSaveRoadmapMeta" data-id="${rm.id}">💾 حفظ بيانات المسار</button>
        <button class="admin-btn-xs danger" data-action="adminDeleteRoadmap" data-id="${rm.id}">🗑 حذف المسار بالكامل</button>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;align-items:center;margin:22px 0 10px;">
      <h3>🧩 الأقسام والخطوات والفيديوهات</h3>
      <button class="btn btn-secondary btn-sm" data-action="adminAddSection" data-roadmap-id="${rm.id}">+ قسم جديد</button>
    </div>

    ${!sections.length ? '<p style="text-align:center;color:var(--muted);padding:16px;">لا توجد أقسام بعد — أضف قسماً جديداً.</p>' : sections.map(sec => `
      <div class="admin-section-card">
        <div class="admin-form-grid">
          <label>عنوان القسم <input class="form-input" id="sec-title-${sec.id}" value="${_adminEsc(sec.title)}"></label>
          <label>Slug <input class="form-input" id="sec-slug-${sec.id}" value="${_adminEsc(sec.slug)}"></label>
          <label>الترتيب <input class="form-input" type="number" id="sec-order-${sec.id}" value="${sec.order_index || 0}"></label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="sec-published-${sec.id}" ${sec.is_published ? 'checked' : ''}> منشور
          </label>
        </div>
        <div class="admin-row-actions" style="margin:8px 0 14px;">
          <button class="admin-btn-xs" data-action="adminSaveSection" data-id="${sec.id}">💾 حفظ القسم</button>
          <button class="admin-btn-xs danger" data-action="adminDeleteSection" data-id="${sec.id}">🗑 حذف القسم</button>
          <button class="admin-btn-xs success" data-action="adminAddStep" data-section-id="${sec.id}">+ خطوة جديدة</button>
        </div>

        ${(sec.steps || []).map(st => `
          <div class="admin-step-card">
            <div class="admin-form-grid">
              <label>عنوان الخطوة/الدرس <input class="form-input" id="st-title-${st.id}" value="${_adminEsc(st.title)}"></label>
              <label>نوع الخطوة <select class="form-input" id="st-type-${st.id}">${_stepTypeOptions(st.step_type)}</select></label>
              <label>المدة المقدّرة <input class="form-input" id="st-duration-${st.id}" value="${_adminEsc(st.estimated_duration)}"></label>
              <label>الترتيب <input class="form-input" type="number" id="st-order-${st.id}" value="${st.order_index || 0}"></label>
              <label style="display:flex;align-items:center;gap:8px;">
                <input type="checkbox" id="st-required-${st.id}" ${st.is_required !== false ? 'checked' : ''}> إجبارية
              </label>
            </div>
            <div class="admin-row-actions" style="margin:8px 0 10px;">
              <button class="admin-btn-xs" data-action="adminSaveStep" data-id="${st.id}">💾 حفظ الخطوة</button>
              <button class="admin-btn-xs danger" data-action="adminDeleteStep" data-id="${st.id}">🗑 حذف الخطوة</button>
              <button class="admin-btn-xs success" data-action="adminAddResource" data-step-id="${st.id}">+ فيديو/مصدر جديد</button>
            </div>
            ${(st.resources || []).map(r => `
              <div class="admin-resource-row">
                <div class="admin-form-grid">
                  <label>عنوان المصدر <input class="form-input" id="res-title-${r.id}" value="${_adminEsc(r.title)}"></label>
                  <label>النوع <select class="form-input" id="res-kind-${r.id}">${_resourceKindOptions(r.kind)}</select></label>
                  <label>الرابط (URL) <input class="form-input" id="res-url-${r.id}" value="${_adminEsc(r.external_url)}"></label>
                  <label>الترتيب <input class="form-input" type="number" id="res-order-${r.id}" value="${r.order_index || 0}"></label>
                </div>
                <label style="display:block;margin:6px 0;">وصف مختصر <input class="form-input" id="res-desc-${r.id}" value="${_adminEsc(r.description)}"></label>
                <div class="admin-row-actions">
                  <button class="admin-btn-xs" data-action="adminSaveResource" data-id="${r.id}">💾 حفظ</button>
                  <button class="admin-btn-xs danger" data-action="adminDeleteResource" data-id="${r.id}">🗑 حذف</button>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

async function adminSaveRoadmapMeta(id) {
  const fields = {
    title: _adminVal(`rm-title-${id}`),
    subtitle: _adminVal(`rm-subtitle-${id}`),
    slug: _adminVal(`rm-slug-${id}`),
    level: _adminVal(`rm-level-${id}`),
    duration_label: _adminVal(`rm-duration-${id}`),
    icon: _adminVal(`rm-icon-${id}`),
    color: _adminVal(`rm-color-${id}`),
    order_index: parseInt(_adminVal(`rm-order-${id}`), 10) || 0,
    long_desc: _adminVal(`rm-longdesc-${id}`),
    is_published: _adminChecked(`rm-published-${id}`)
  };
  const ok = await AdminService.updateRoadmap(id, fields);
  if (ok) { toast('✅ تم حفظ بيانات المسار'); STATE.adminCache.roadmaps = null; await renderAdminRoadmaps(false); }
  else toast('⚠️ حصل خطأ أثناء الحفظ');
}

async function adminAddSection(roadmapId) {
  const order = (STATE.adminRoadmapTree || []).length;
  const { error } = await AdminService.createSection(roadmapId, {
    title: 'قسم جديد', slug: 'section-' + Date.now(), order_index: order, is_published: true
  });
  if (error) { toast('⚠️ حصل خطأ أثناء إضافة القسم'); return; }
  toast('✅ تم إضافة القسم');
  await renderAdminRoadmaps(true);
}

async function adminSaveSection(id) {
  const fields = {
    title: _adminVal(`sec-title-${id}`),
    slug: _adminVal(`sec-slug-${id}`),
    order_index: parseInt(_adminVal(`sec-order-${id}`), 10) || 0,
    is_published: _adminChecked(`sec-published-${id}`)
  };
  const ok = await AdminService.updateSection(id, fields);
  if (ok) toast('✅ تم حفظ القسم'); else toast('⚠️ حصل خطأ');
  await renderAdminRoadmaps(true);
}

async function adminDeleteSection(id) {
  if (!confirm('حذف هذا القسم وكل خطواته ومصادره؟')) return;
  const ok = await AdminService.deleteSection(id);
  if (ok) toast('🗑 تم حذف القسم'); else toast('⚠️ حصل خطأ');
  await renderAdminRoadmaps(true);
}

async function adminAddStep(sectionId) {
  const legacyId = 'admin-step-' + Date.now();
  const { error } = await AdminService.createStep(sectionId, {
    title: 'خطوة جديدة', step_type: 'video', order_index: 0, is_required: true, legacy_lesson_id: legacyId
  });
  if (error) { toast('⚠️ حصل خطأ أثناء إضافة الخطوة'); return; }
  toast('✅ تم إضافة الخطوة');
  await renderAdminRoadmaps(true);
}

async function adminSaveStep(id) {
  const fields = {
    title: _adminVal(`st-title-${id}`),
    step_type: _adminVal(`st-type-${id}`),
    estimated_duration: _adminVal(`st-duration-${id}`),
    order_index: parseInt(_adminVal(`st-order-${id}`), 10) || 0,
    is_required: _adminChecked(`st-required-${id}`)
  };
  const ok = await AdminService.updateStep(id, fields);
  if (ok) toast('✅ تم حفظ الخطوة'); else toast('⚠️ حصل خطأ');
  await renderAdminRoadmaps(true);
}

async function adminDeleteStep(id) {
  if (!confirm('حذف هذه الخطوة وكل مصادرها؟')) return;
  const ok = await AdminService.deleteStep(id);
  if (ok) toast('🗑 تم حذف الخطوة'); else toast('⚠️ حصل خطأ');
  await renderAdminRoadmaps(true);
}

async function adminAddResource(stepId) {
  const { error } = await AdminService.createResource(stepId, {
    scope: 'external', kind: 'youtube', title: 'فيديو/مصدر جديد', external_url: '', order_index: 0
  });
  if (error) { toast('⚠️ حصل خطأ أثناء إضافة المصدر'); return; }
  toast('✅ تم إضافة المصدر');
  await renderAdminRoadmaps(true);
}

async function adminSaveResource(id) {
  const fields = {
    title: _adminVal(`res-title-${id}`),
    kind: _adminVal(`res-kind-${id}`),
    external_url: _adminVal(`res-url-${id}`),
    description: _adminVal(`res-desc-${id}`),
    order_index: parseInt(_adminVal(`res-order-${id}`), 10) || 0
  };
  const ok = await AdminService.updateResource(id, fields);
  if (ok) toast('✅ تم حفظ المصدر'); else toast('⚠️ حصل خطأ');
  await renderAdminRoadmaps(true);
}

async function adminDeleteResource(id) {
  if (!confirm('حذف هذا المصدر/الفيديو؟')) return;
  const ok = await AdminService.deleteResource(id);
  if (ok) toast('🗑 تم الحذف'); else toast('⚠️ حصل خطأ');
  await renderAdminRoadmaps(true);
}

/* =============================================
   أسئلة اختبار الشخصية
   ============================================= */
async function renderAdminQuizzes(forceReload) {
  const list = $('admin-quizzes-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.quizQuestions?.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.quizQuestions = await AdminService.loadAllQuizQuestions();
  }

  const rows = STATE.adminCache.quizQuestions || [];
  list.innerHTML = `
    <div class="admin-toolbar">
      <button class="btn btn-primary btn-sm" data-action="adminAddQuizQuestion">+ سؤال جديد</button>
      <button class="btn btn-secondary btn-sm" data-action="refreshAdminQuizzes">🔄 تحديث</button>
    </div>
    ${!rows.length ? '<p style="text-align:center;color:var(--muted);padding:24px;">لا توجد أسئلة بعد.</p>' : rows.map(q => `
      <div class="admin-section-card">
        <div class="admin-form-grid">
          <label>الفئة <input class="form-input" id="qz-cat-${q.id}" value="${_adminEsc(q.category)}"></label>
          <label>الترتيب <input class="form-input" type="number" id="qz-order-${q.id}" value="${q.order_index || 0}"></label>
          <label style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="qz-published-${q.id}" ${q.is_published ? 'checked' : ''}> منشور
          </label>
        </div>
        <label style="display:block;margin:8px 0;">نص السؤال
          <input class="form-input" id="qz-question-${q.id}" value="${_adminEsc(q.question)}">
        </label>
        <label style="display:block;margin:8px 0;">الخيارات (كل خيار في سطر منفصل — بالترتيب)
          <textarea class="form-input" id="qz-options-${q.id}" rows="4">${_adminEsc((q.options || []).join('\n'))}</textarea>
        </label>
        <label style="display:block;margin:8px 0;">
          الأوزان (سطر لكل خيار، 5 أرقام مفصولة بفاصلة بنفس ترتيب: إبداع,تقني,اجتماعي,تحليلي,ريادي)
          <textarea class="form-input" id="qz-weights-${q.id}" rows="4">${_adminEsc((q.weights || []).map(w => w.join(',')).join('\n'))}</textarea>
        </label>
        <div class="admin-row-actions">
          <button class="admin-btn-xs" data-action="adminSaveQuizQuestion" data-id="${q.id}">💾 حفظ</button>
          <button class="admin-btn-xs danger" data-action="adminDeleteQuizQuestion" data-id="${q.id}">🗑 حذف</button>
        </div>
      </div>
    `).join('')}
  `;
}

async function refreshAdminQuizzes() { await renderAdminQuizzes(true); }

async function adminAddQuizQuestion() {
  const order = (STATE.adminCache.quizQuestions || []).length;
  const { error } = await AdminService.createQuizQuestion({
    category: 'فئة جديدة', question: 'اكتب نص السؤال هنا', options: ['خيار 1', 'خيار 2', 'خيار 3', 'خيار 4'],
    weights: [[1,0,0,0,0],[0,1,0,0,0],[0,0,1,0,0],[0,0,0,1,0]], order_index: order, is_published: false
  });
  if (error) { toast('⚠️ حصل خطأ أثناء إضافة السؤال'); return; }
  toast('✅ تم إضافة سؤال جديد — عدّله ثم فعّل النشر');
  if (typeof QuizService !== 'undefined') QuizService.clearCache();
  await renderAdminQuizzes(true);
}

function _parseQuizOptionsWeights(id) {
  const optionsRaw = _adminVal(`qz-options-${id}`).split('\n').map(s => s.trim()).filter(Boolean);
  const weightsRaw = _adminVal(`qz-weights-${id}`).split('\n').map(s => s.trim()).filter(Boolean)
    .map(line => line.split(',').map(n => parseInt(n.trim(), 10) || 0));
  return { options: optionsRaw, weights: weightsRaw };
}

async function adminSaveQuizQuestion(id) {
  const { options, weights } = _parseQuizOptionsWeights(id);
  if (options.length < 2) { toast('⚠️ لازم خيارين على الأقل'); return; }
  if (weights.length !== options.length) { toast('⚠️ عدد أسطر الأوزان لازم يساوي عدد الخيارات'); return; }

  const fields = {
    category: _adminVal(`qz-cat-${id}`),
    question: _adminVal(`qz-question-${id}`),
    order_index: parseInt(_adminVal(`qz-order-${id}`), 10) || 0,
    is_published: _adminChecked(`qz-published-${id}`),
    options, weights
  };
  const ok = await AdminService.updateQuizQuestion(id, fields);
  if (ok) {
    toast('✅ تم حفظ السؤال');
    if (typeof QuizService !== 'undefined') QuizService.clearCache();
    await renderAdminQuizzes(true);
  } else toast('⚠️ حصل خطأ أثناء الحفظ');
}

async function adminDeleteQuizQuestion(id) {
  if (!confirm('حذف هذا السؤال نهائياً؟')) return;
  const ok = await AdminService.deleteQuizQuestion(id);
  if (ok) {
    toast('🗑 تم الحذف');
    if (typeof QuizService !== 'undefined') QuizService.clearCache();
    await renderAdminQuizzes(true);
  } else toast('⚠️ حصل خطأ');
}

/* =============================================
   الشهادات (Certificates) والإنجازات
   ============================================= */
STATE.adminCertUserResult = null;

async function renderAdminCertificates(forceReload) {
  const list = $('admin-certificates-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.certificates?.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.certificates = await AdminService.loadAllCertificates();
  }
  if (!STATE.adminCache.roadmaps?.length) STATE.adminCache.roadmaps = await AdminService.loadAllRoadmaps();

  const rows = STATE.adminCache.certificates || [];
  const roadmapOptions = (STATE.adminCache.roadmaps || [])
    .map(r => `<option value="${r.id}" data-slug="${_adminEsc(r.slug)}" data-title="${_adminEsc(r.title)}">${_adminEsc(r.title)}</option>`).join('');

  list.innerHTML = `
    <div class="admin-editor-card">
      <h3 style="margin-bottom:10px;">🏆 إصدار شهادة يدوياً</h3>
      <div class="admin-form-grid">
        <label>اسم المستخدم <input class="form-input" id="cert-user-search" placeholder="اكتب اسم المستخدم..."></label>
        <label>المسار <select class="form-input" id="cert-roadmap-select">${roadmapOptions}</select></label>
      </div>
      <div class="admin-row-actions" style="margin-top:8px;">
        <button class="admin-btn-xs" data-action="adminSearchCertUser">🔍 بحث عن المستخدم</button>
        <button class="btn btn-primary btn-sm" data-action="adminIssueCertificate">🏆 إصدار الشهادة</button>
      </div>
      <div id="cert-user-result" style="margin-top:8px;font-size:13px;color:var(--muted);"></div>
    </div>

    <div class="admin-toolbar">
      <button class="btn btn-secondary btn-sm" data-action="refreshAdminCertificates">🔄 تحديث القائمة</button>
    </div>

    ${!rows.length ? '<p style="text-align:center;color:var(--muted);padding:24px;">لا توجد شهادات مُصدرة بعد.</p>' : rows.map(c => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>${_adminEsc(c.profiles?.username || 'مستخدم')}</strong>
          <span>${_adminEsc(c.roadmap_title || 'مسار')} · الكود: ${_adminEsc(c.certificate_code)}</span>
          <span>${c.revoked ? '<span class="admin-badge blocked">مسحوبة</span>' : '<span class="admin-badge on">سارية</span>'}</span>
        </div>
        <div class="admin-row-actions">
          <button class="admin-btn-xs ${c.revoked ? 'success' : 'danger'}" data-action="adminToggleCertRevoked" data-id="${c.id}" data-value="${!c.revoked}">
            ${c.revoked ? '✅ إعادة تفعيل' : '⛔ سحب الشهادة'}
          </button>
          <button class="admin-btn-xs danger" data-action="adminDeleteCertificate" data-id="${c.id}">🗑 حذف</button>
        </div>
      </div>
    `).join('')}
  `;
}

async function refreshAdminCertificates() { await renderAdminCertificates(true); }

async function adminSearchCertUser() {
  const q = _adminVal('cert-user-search').trim();
  const resultEl = $('cert-user-result');
  if (!q) { if (resultEl) resultEl.textContent = ''; STATE.adminCertUserResult = null; return; }
  const users = await AdminService.searchUsers(q);
  if (!users.length) {
    if (resultEl) resultEl.textContent = '⚠️ لم يتم العثور على مستخدم بهذا الاسم';
    STATE.adminCertUserResult = null;
    return;
  }
  STATE.adminCertUserResult = users[0];
  if (resultEl) resultEl.textContent = `✅ تم العثور على: ${users[0].username} (سيتم إصدار الشهادة له)`;
}

async function adminIssueCertificate() {
  if (!STATE.adminCertUserResult) { toast('⚠️ ابحث عن المستخدم أولاً'); return; }
  const select = $('cert-roadmap-select');
  const opt = select?.selectedOptions?.[0];
  if (!opt) { toast('⚠️ اختر مساراً'); return; }

  const { error } = await AdminService.issueCertificate(
    STATE.adminCertUserResult.id, opt.value, opt.dataset.slug, opt.dataset.title
  );
  if (error) { toast('⚠️ ' + (error.includes('duplicate') ? 'المستخدم عنده شهادة بالفعل لهذا المسار' : 'حصل خطأ أثناء الإصدار')); return; }
  toast('🏆 تم إصدار الشهادة بنجاح');
  await renderAdminCertificates(true);
}

async function adminToggleCertRevoked(id, value) {
  const ok = await AdminService.toggleCertificateRevoked(id, value);
  if (ok) { toast(value ? '⛔ تم سحب الشهادة' : '✅ تم تفعيلها مجدداً'); await renderAdminCertificates(true); }
  else toast('⚠️ حصل خطأ');
}

async function adminDeleteCertificate(id) {
  if (!confirm('حذف هذه الشهادة نهائياً؟')) return;
  const ok = await AdminService.deleteCertificate(id);
  if (ok) { toast('🗑 تم الحذف'); await renderAdminCertificates(true); }
  else toast('⚠️ حصل خطأ');
}

/* =============================================
   الإشعارات
   ============================================= */
async function renderAdminNotifications(forceReload) {
  const list = $('admin-notifications-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.notifications?.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري التحميل...</p>`;
    STATE.adminCache.notifications = await AdminService.loadAllNotifications();
  }

  const rows = STATE.adminCache.notifications || [];
  list.innerHTML = `
    <div class="admin-editor-card">
      <h3 style="margin-bottom:10px;">📢 إرسال إشعار جديد</h3>
      <label style="display:block;margin-bottom:8px;">العنوان <input class="form-input" id="notif-title"></label>
      <label style="display:block;margin-bottom:8px;">نص الرسالة <textarea class="form-input" id="notif-message" rows="3"></textarea></label>
      <div class="admin-form-grid">
        <label>الجمهور المستهدف
          <select class="form-input" id="notif-target" onchange="document.getElementById('notif-users-wrap').style.display = this.value === 'users' ? 'block' : 'none';">
            <option value="all">📢 كل المستخدمين</option>
            <option value="trainers">🤝 المدربون فقط</option>
            <option value="admins">⚙️ المشرفون فقط</option>
            <option value="users">🎯 مستخدمون محددون</option>
          </select>
        </label>
      </div>
      <div id="notif-users-wrap" style="display:none;margin-top:8px;">
        <label style="display:block;">أسماء المستخدمين (افصل بينهم بفاصلة)
          <input class="form-input" id="notif-usernames" placeholder="مثال: أحمد, سارة, محمد">
        </label>
      </div>
      <div class="admin-row-actions" style="margin-top:10px;">
        <button class="btn btn-primary btn-sm" data-action="adminSendNotification">📢 إرسال الإشعار</button>
      </div>
    </div>

    <div class="admin-toolbar">
      <button class="btn btn-secondary btn-sm" data-action="refreshAdminNotifications">🔄 تحديث</button>
    </div>

    <h4 style="margin:14px 0 6px;">الإشعارات المُرسلة سابقاً</h4>
    ${!rows.length ? '<p style="text-align:center;color:var(--muted);padding:16px;">لا توجد إشعارات مُرسلة بعد.</p>' : rows.map(n => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>${_adminEsc(n.title)}</strong>
          <span>${_adminEsc((n.message || '').slice(0, 120))}${(n.message || '').length > 120 ? '…' : ''}</span>
          <span>${_notifTargetLabel(n.target_type)} · ${new Date(n.created_at).toLocaleString('ar-EG')}</span>
        </div>
        <div class="admin-row-actions">
          <button class="admin-btn-xs danger" data-action="adminDeleteNotification" data-id="${n.id}">🗑 حذف</button>
        </div>
      </div>
    `).join('')}
  `;
}

function _notifTargetLabel(t) {
  return { all: '📢 الكل', trainers: '🤝 المدربون', admins: '⚙️ المشرفون', users: '🎯 مستخدمون محددون' }[t] || t;
}

async function refreshAdminNotifications() { await renderAdminNotifications(true); }

function adminQuickNotifyUser(userId, name) {
  setAdminTab('notifications');
  setTimeout(() => {
    const targetSel = $('notif-target');
    if (targetSel) { targetSel.value = 'users'; targetSel.dispatchEvent(new Event('change')); }
    const usernamesInput = $('notif-usernames');
    if (usernamesInput) usernamesInput.value = name;
    const titleInput = $('notif-title');
    if (titleInput) titleInput.focus();
  }, 50);
}

async function adminSendNotification() {
  const title = _adminVal('notif-title').trim();
  const message = _adminVal('notif-message').trim();
  const targetType = _adminVal('notif-target');
  if (!title || !message) { toast('⚠️ اكتب العنوان والرسالة'); return; }

  let targetUserIds = [];
  if (targetType === 'users') {
    const names = _adminVal('notif-usernames').split(/[,،]/).map(s => s.trim()).filter(Boolean);
    if (!names.length) { toast('⚠️ اكتب اسم مستخدم واحد على الأقل'); return; }
    for (const name of names) {
      const found = await AdminService.searchUsers(name);
      const exact = found.find(u => u.username === name) || found[0];
      if (exact) targetUserIds.push(exact.id);
    }
    if (!targetUserIds.length) { toast('⚠️ لم يتم العثور على أي مستخدم بهذه الأسماء'); return; }
  }

  const { error } = await AdminService.sendNotification(title, message, targetType, targetUserIds);
  if (error) { toast('⚠️ ' + error); return; }
  toast('📢 تم إرسال الإشعار بنجاح');
  $('notif-title').value = ''; $('notif-message').value = '';
  await renderAdminNotifications(true);
}

async function adminDeleteNotification(id) {
  if (!confirm('حذف هذا الإشعار؟ لن يظهر بعد الآن لمن لم يقرأه.')) return;
  const ok = await AdminService.deleteNotification(id);
  if (ok) { toast('🗑 تم الحذف'); await renderAdminNotifications(true); }
  else toast('⚠️ حصل خطأ');
}

/* =============================================
   إحصائيات تفصيلية
   ============================================= */
async function renderAdminStats() {
  const el = $('admin-stats-container');
  if (!el) return;
  el.innerHTML = `<p style="text-align:center;color:var(--muted);padding:24px;">جاري تحميل الإحصائيات التفصيلية...</p>`;

  const stats = await AdminService.loadDetailedStats();

  const topRoadmapsHtml = (stats.topRoadmaps || []).length
    ? stats.topRoadmaps.map((r, i) => `
        <div class="admin-row">
          <div class="admin-row-main">
            <strong>#${i + 1} ${_adminEsc(r.title || r.slug)}</strong>
          </div>
          <div class="admin-row-actions"><span class="admin-badge on">👁 ${r.views_count || 0} مشاهدة</span></div>
        </div>
      `).join('')
    : '<p style="color:var(--muted);text-align:center;padding:12px;">لا توجد بيانات مشاهدات بعد.</p>';

  const completionHtml = (stats.completionRates || []).length
    ? stats.completionRates.map(c => `
        <div class="admin-row">
          <div class="admin-row-main">
            <strong>${_adminEsc(c.title)}</strong>
            <span>بدأه ${c.started} مستخدم · أكمله ${c.completed} · متوسط التقدّم ${c.avgPercent}%</span>
          </div>
          <div class="admin-row-actions"><span class="admin-badge on">${c.completionRate}% نسبة إكمال</span></div>
        </div>
      `).join('')
    : '<p style="color:var(--muted);text-align:center;padding:12px;">لا توجد بيانات تقدّم بعد.</p>';

  el.innerHTML = `
    <div class="admin-stats-grid" style="margin-bottom:20px;">
      <div class="admin-stat-card"><span class="num">${stats.totalUsers}</span><span class="lbl">👥 إجمالي المستخدمين</span></div>
      <div class="admin-stat-card"><span class="num">${stats.activeUsers7d}</span><span class="lbl">🟢 نشطون آخر 7 أيام</span></div>
    </div>
    <h4 style="margin:16px 0 8px;">📈 أكثر المسارات زيارة</h4>
    ${topRoadmapsHtml}
    <h4 style="margin:20px 0 8px;">✅ نسب إكمال المسارات</h4>
    ${completionHtml}
  `;
}

/* =============================================
   إدارة صلاحيات المشرفين (Admins)
   ============================================= */
STATE.adminSearchResult = null;

async function renderAdminAdmins(forceReload) {
  const list = $('admin-admins-list');
  if (!list) return;

  if (forceReload || !STATE.adminCache.users?.length) {
    STATE.adminCache.users = await AdminService.loadAllUsers();
  }
  const admins = (STATE.adminCache.users || []).filter(u => u.is_admin);

  list.innerHTML = `
    <div class="admin-editor-card">
      <h3 style="margin-bottom:10px;">⭐ ترقية مستخدم إلى مشرف</h3>
      <div class="admin-form-grid">
        <label>اسم المستخدم <input class="form-input" id="admin-search-username" placeholder="اكتب اسم المستخدم..."></label>
      </div>
      <div class="admin-row-actions" style="margin-top:8px;">
        <button class="admin-btn-xs" data-action="adminSearchForPromotion">🔍 بحث</button>
        <button class="btn btn-primary btn-sm" data-action="adminPromoteFound">⭐ ترقية لمشرف</button>
      </div>
      <div id="admin-search-result" style="margin-top:8px;font-size:13px;color:var(--muted);"></div>
    </div>

    <h4 style="margin:16px 0 8px;">المشرفون الحاليون (${admins.length})</h4>
    ${!admins.length ? '<p style="text-align:center;color:var(--muted);padding:16px;">لا يوجد مشرفون بعد.</p>' : admins.map(u => `
      <div class="admin-row">
        <div class="admin-row-main">
          <strong>⭐ ${_adminEsc(u.username || 'مستخدم')}</strong>
          <span>${u.id === STATE.user?.id ? '(أنت)' : ''}</span>
        </div>
        <div class="admin-row-actions">
          ${u.id === STATE.user?.id
            ? '<span class="admin-badge on">حسابك الحالي</span>'
            : `<button class="admin-btn-xs danger" data-action="adminDemoteUser" data-id="${u.id}" data-name="${_adminEsc(u.username)}">إزالة صلاحية الإدارة</button>`}
        </div>
      </div>
    `).join('')}
  `;
}

async function adminSearchForPromotion() {
  const q = _adminVal('admin-search-username').trim();
  const resultEl = $('admin-search-result');
  if (!q) { STATE.adminSearchResult = null; if (resultEl) resultEl.textContent = ''; return; }
  const users = await AdminService.searchUsers(q);
  if (!users.length) { STATE.adminSearchResult = null; if (resultEl) resultEl.textContent = '⚠️ لم يتم العثور على مستخدم بهذا الاسم'; return; }
  STATE.adminSearchResult = users[0];
  if (resultEl) resultEl.textContent = users[0].is_admin
    ? `ℹ️ ${users[0].username} مشرف بالفعل`
    : `✅ تم العثور على: ${users[0].username}`;
}

async function adminPromoteFound() {
  if (!STATE.adminSearchResult) { toast('⚠️ ابحث عن المستخدم أولاً'); return; }
  const ok = await AdminService.setUserAdmin(STATE.adminSearchResult.id, true);
  if (ok) {
    toast(`⭐ تم ترقية ${STATE.adminSearchResult.username} إلى مشرف`);
    STATE.adminCache.users = null;
    await renderAdminAdmins(true);
  } else toast('⚠️ حصل خطأ');
}

async function adminDemoteUser(id, name) {
  if (!confirm(`هل أنت متأكد من إزالة صلاحية الإدارة من "${name}"؟`)) return;
  const ok = await AdminService.setUserAdmin(id, false);
  if (ok) {
    toast(`✅ تمت إزالة صلاحية الإدارة من ${name}`);
    STATE.adminCache.users = null;
    await renderAdminAdmins(true);
  } else toast('⚠️ حصل خطأ');
}

