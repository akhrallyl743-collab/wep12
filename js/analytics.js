'use strict';

/* =============================================
   Analytics Service — تتبّع الزيارات + الأونلاين اللحظي
   لكل الزوار (مسجلين أو غير مسجلين) — يشبه Google Analytics
   يحتاج جداول: site_visits + active_sessions (راجع supabase_analytics_schema.sql)
   ============================================= */
const AnalyticsService = {
  _heartbeatTimer: null,

  // مُعرّف فريد لكل جلسة متصفح — يتجدد مع كل جلسة جديدة (مش دائم زي الكوكيز)
  getSessionId() {
    let sid = sessionStorage.getItem('sl_session_id');
    if (!sid) {
      sid = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
      sessionStorage.setItem('sl_session_id', sid);
    }
    return sid;
  },

  // تسجيل زيارة صفحة أو حدث دخول/تسجيل — صامت تماماً لو فشل (مش حرج لتجربة المستخدم)
  async logEvent(eventType, page) {
    try {
      if (typeof supa === 'undefined') return;
      await supa.from('site_visits').insert({
        session_id: this.getSessionId(),
        user_id: STATE?.user?.id || null,
        page: page || STATE?.currentPage || 'home',
        event_type: eventType || 'pageview',
        referrer: document.referrer || null,
        user_agent: navigator.userAgent || null
      });
    } catch (e) { /* صامت */ }
  },

  trackVisit(page) { this.logEvent('pageview', page); },
  trackLogin()      { this.logEvent('login', STATE?.currentPage); },
  trackSignup()     { this.logEvent('signup', STATE?.currentPage); },

  // نبضة حضور — بتتحدّث كل ٢٥ ثانية طول ما الصفحة مفتوحة (لأي زائر، مسجل أو لأ)
  async _ping() {
    try {
      if (typeof supa === 'undefined') return;
      await supa.from('active_sessions').upsert({
        session_id: this.getSessionId(),
        user_id: STATE?.user?.id || null,
        username: STATE?.user?.name || null,
        page: STATE?.currentPage || 'home',
        last_seen: new Date().toISOString(),
        user_agent: navigator.userAgent || null
      }, { onConflict: 'session_id' });
    } catch (e) { /* صامت */ }
  },

  start() {
    this._ping();
    if (this._heartbeatTimer) clearInterval(this._heartbeatTimer);
    this._heartbeatTimer = setInterval(() => {
      if (!document.hidden) this._ping();
    }, 25000);
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) this._ping();
    });
  },

  /* ===================== استعلامات لوحة الإدارة ===================== */

  // عدد الزوار الأونلاين الآن (كل الزوار — مسجلين أو لأ) خلال آخر دقيقتين
  async getOnlineNowCount() {
    try {
      const cutoff = new Date(Date.now() - 2 * 60 * 1000).toISOString();
      const { count, error } = await supa
        .from('active_sessions')
        .select('session_id', { count: 'exact', head: true })
        .gte('last_seen', cutoff);
      if (error) throw error;
      return count || 0;
    } catch (e) { console.warn('[Analytics] getOnlineNowCount error:', e); return 0; }
  },

  async _countSince(iso) {
    const { count, error } = await supa
      .from('site_visits')
      .select('id', { count: 'exact', head: true })
      .eq('event_type', 'pageview')
      .gte('created_at', iso);
    if (error) throw error;
    return count || 0;
  },

  // ملخص شامل: زيارات اليوم، إجمالي الزيارات، زوار فريدون اليوم، رسم بياني آخر ٧ أيام، أكثر الصفحات زيارة
  async getOverview() {
    const result = {
      onlineNow: 0, visitsToday: 0, visitsTotal: 0, uniqueVisitorsToday: 0,
      dailySeries: [], topPages: []
    };
    try { result.onlineNow = await this.getOnlineNowCount(); } catch (e) {}

    try {
      const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
      result.visitsToday = await this._countSince(startOfToday.toISOString());
    } catch (e) { console.warn('[Analytics] visitsToday error:', e); }

    try {
      const { count, error } = await supa
        .from('site_visits').select('id', { count: 'exact', head: true }).eq('event_type', 'pageview');
      if (error) throw error;
      result.visitsTotal = count || 0;
    } catch (e) { console.warn('[Analytics] visitsTotal error:', e); }

    try {
      const startOfToday = new Date(); startOfToday.setHours(0, 0, 0, 0);
      const { data, error } = await supa
        .from('site_visits').select('session_id')
        .eq('event_type', 'pageview')
        .gte('created_at', startOfToday.toISOString())
        .limit(5000);
      if (error) throw error;
      result.uniqueVisitorsToday = new Set((data || []).map(r => r.session_id)).size;
    } catch (e) { console.warn('[Analytics] uniqueVisitorsToday error:', e); }

    try {
      const start7 = new Date(); start7.setDate(start7.getDate() - 6); start7.setHours(0, 0, 0, 0);
      const { data, error } = await supa
        .from('site_visits').select('created_at, session_id')
        .eq('event_type', 'pageview')
        .gte('created_at', start7.toISOString())
        .limit(20000);
      if (error) throw error;

      const byDay = {};
      for (let i = 0; i < 7; i++) {
        const d = new Date(start7); d.setDate(start7.getDate() + i);
        byDay[d.toISOString().slice(0, 10)] = 0;
      }
      (data || []).forEach(r => {
        const day = (r.created_at || '').slice(0, 10);
        if (day in byDay) byDay[day]++;
      });
      result.dailySeries = Object.entries(byDay).map(([date, count]) => ({ date, count }));
    } catch (e) { console.warn('[Analytics] dailySeries error:', e); }

    try {
      const { data, error } = await supa
        .from('site_visits').select('page')
        .eq('event_type', 'pageview')
        .order('created_at', { ascending: false })
        .limit(3000);
      if (error) throw error;
      const counts = {};
      (data || []).forEach(r => { const p = r.page || 'home'; counts[p] = (counts[p] || 0) + 1; });
      result.topPages = Object.entries(counts)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8);
    } catch (e) { console.warn('[Analytics] topPages error:', e); }

    return result;
  }
};
window.AnalyticsService = AnalyticsService;
