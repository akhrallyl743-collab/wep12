'use strict';

/* =============================================
   مركز الإشعارات — للمستخدم العادي
   يعرض إشعارات الأدمن (لكل المستخدمين/مجموعة محددة)
   القراءة تُحفظ محلياً (localStorage) لكل مستخدم
   ============================================= */

STATE.notifCenterItems = [];
STATE.notifCenterOpen = false;

function _notifReadKey() {
  const uid = STATE.user?.id || 'anon';
  return `noor_read_notifs_${uid}`;
}
function _notifReadIds() { return new Set(_ls(_notifReadKey(), [])); }
function _notifSaveReadIds(set) { _lsSet(_notifReadKey(), Array.from(set)); }

async function refreshNotifCenter() {
  if (typeof NotificationService === 'undefined' || typeof supa === 'undefined') return;
  const items = await NotificationService.loadForCurrentUser();
  STATE.notifCenterItems = items;
  _renderNotifBadge();
  if (STATE.notifCenterOpen) _renderNotifList();
  _subscribeNotifLive();
}

// اشتراك لحظي في جدول الإشعارات — أي إشعار جديد يوصل فوراً بدون Refresh
let _notifLiveChannel = null;
function _subscribeNotifLive() {
  if (_notifLiveChannel || typeof supa === 'undefined' || !supa.channel) return;
  _notifLiveChannel = supa
    .channel('user-notif-live')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
      const n = payload.new;
      // نتأكد إن الإشعار موجّه للجميع أو لهذا المستخدم تحديداً قبل عرضه
      const targetsMe = n.target_type === 'all' ||
        (n.target_type === 'users' && (n.target_user_ids || []).includes(STATE.user?.id));
      if (!targetsMe) return;
      STATE.notifCenterItems = [n, ...(STATE.notifCenterItems || [])];
      _renderNotifBadge();
      if (STATE.notifCenterOpen) _renderNotifList();
      if (typeof toast === 'function') toast(`🔔 ${n.title}`);
    })
    .subscribe();
}

function _renderNotifBadge() {
  const badge = $('notif-bell-badge');
  if (!badge) return;
  const read = _notifReadIds();
  const unread = (STATE.notifCenterItems || []).filter(n => !read.has(n.id)).length;
  if (unread > 0) {
    badge.textContent = unread > 9 ? '9+' : String(unread);
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

function _renderNotifList() {
  const list = $('notif-center-list');
  if (!list) return;
  const items = STATE.notifCenterItems || [];
  const read = _notifReadIds();

  if (!items.length) {
    list.innerHTML = `<p style="text-align:center;color:var(--muted);padding:20px 10px;">لا توجد إشعارات حالياً.</p>`;
    return;
  }

  list.innerHTML = items.map(n => `
    <div class="notif-item ${read.has(n.id) ? '' : 'unread'}">
      <strong>${sanitizeHTML(n.title)}</strong>
      <p>${sanitizeHTML(n.message)}</p>
      <span class="notif-time">${new Date(n.created_at).toLocaleString('ar-EG')}</span>
    </div>
  `).join('');
}

function toggleNotifCenter() {
  const panel = $('notif-center-panel');
  if (!panel) return;
  STATE.notifCenterOpen = !STATE.notifCenterOpen;
  panel.style.display = STATE.notifCenterOpen ? 'block' : 'none';
  if (STATE.notifCenterOpen) {
    _renderNotifList();
    // اعتبرهم مقروءين بعد ثانية من الفتح
    setTimeout(markAllNotifsRead, 1200);
  }
}

function markAllNotifsRead() {
  const read = _notifReadIds();
  (STATE.notifCenterItems || []).forEach(n => read.add(n.id));
  _notifSaveReadIds(read);
  _renderNotifBadge();
}

// إغلاق اللوحة عند الضغط خارجها
document.addEventListener('click', (e) => {
  const panel = $('notif-center-panel');
  const bell = $('notif-bell-btn');
  if (!panel || !bell || !STATE.notifCenterOpen) return;
  if (!panel.contains(e.target) && !bell.contains(e.target)) {
    STATE.notifCenterOpen = false;
    panel.style.display = 'none';
  }
});
