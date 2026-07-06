'use strict';

/* =============================================
   Community — فيد + صور/فيديو + تعليقات (زي فيسبوك)
   ============================================= */
STATE.pendingPostMedia = null; // { file, previewUrl, type }
STATE.openComments = new Set(); // postIds اللي فاتح فيها التعليقات
STATE.commentsCache = {}; // postId -> comments[]

async function renderCommunity() {
  const feed = $('community-feed');
  if (!feed) return;
  feed.innerHTML = `<div style="text-align:center;padding:40px;color:var(--muted);">
    <div class="spinner" style="margin:0 auto 10px;"></div>
    <p style="font-size:14px;">جاري تحميل المنشورات...</p>
  </div>`;

  const posts = await CommunityService.loadPosts();

  if (!posts.length) {
    feed.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--muted);">
      <div style="font-size:48px;margin-bottom:12px;">💬</div>
      <p style="font-size:15px;">لا توجد منشورات بعد. كن أول من يبدأ!</p></div>`;
    return;
  }

  const colors = ['#4f35e8','#0d8a5f','#e8a81a','#3d8ef5','#b83018','#1fbb85'];
  const frag = document.createDocumentFragment();
  posts.forEach(p => {
    const name = p.profiles?.username || 'مستخدم';
    const avatar = (name[0] || 'م').toUpperCase();
    const color = colors[name.charCodeAt(0) % colors.length];
    const timeAgo = getTimeAgo(p.created_at);
    const tags = (p.tags || []).map(t => `<span class="trending-tag">${sanitizeHTML(t)}</span>`).join(' ');
    const isLiked = STATE.likedPosts.has(p.id);
    const isOwner = STATE.user && STATE.user.id === p.user_id;

    let mediaHtml = '';
    if (p.media_url) {
      mediaHtml = p.media_type === 'video'
        ? `<div class="post-media"><video src="${sanitizeHTML(p.media_url)}" controls preload="metadata"></video></div>`
        : `<div class="post-media"><img src="${sanitizeHTML(p.media_url)}" alt="صورة منشور" loading="lazy"></div>`;
    }

    const avatarHtml = p.profiles?.avatar_url
      ? `<img src="${sanitizeHTML(p.profiles.avatar_url)}" alt="${sanitizeHTML(name)}" referrerpolicy="no-referrer" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`
      : sanitizeHTML(avatar);

    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.postId = p.id;
    card.innerHTML = `
      <div class="post-header">
        <div class="avatar" style="background:${color};color:#fff;overflow:hidden;">${avatarHtml}</div>
        <div class="post-meta"><h4>${sanitizeHTML(name)}</h4><p>${timeAgo}</p></div>
        ${isOwner ? `<button class="post-delete-btn" data-action="deletePost" data-id="${p.id}" aria-label="حذف المنشور" title="حذف المنشور">🗑️</button>` : ''}
      </div>
      ${p.content ? `<div class="post-body">${sanitizeHTML(p.content)}</div>` : ''}
      ${mediaHtml}
      ${tags ? `<div class="post-tags-row">${tags}</div>` : ''}
      <div class="post-footer">
        <button class="reaction-btn ${isLiked ? 'liked' : ''}" data-action="_likePostBtn" data-id="${p.id}" aria-label="إعجاب" ${isLiked ? 'disabled' : ''}>
          ❤️ <span class="like-count">${p.likes || 0}</span>
        </button>
        <button class="reaction-btn" data-action="toggleComments" data-id="${p.id}" aria-label="التعليقات">
          💬 <span class="comment-count">${p.comments_count || 0}</span>
        </button>
      </div>
      <div class="post-comments" id="comments-${p.id}" style="display:none;">
        <div class="comments-list" id="comments-list-${p.id}"></div>
        <div class="comment-composer">
          <input type="text" class="comment-input" id="comment-input-${p.id}" placeholder="اكتب تعليقاً..." maxlength="500" onkeydown="if(event.key==='Enter'){event.preventDefault();this.nextElementSibling.click();}">
          <button class="comment-send-btn" data-action="submitComment" data-id="${p.id}">إرسال</button>
        </div>
      </div>`;

    frag.appendChild(card);
  });

  feed.innerHTML = '';
  feed.appendChild(frag);
}

function getTimeAgo(isoStr) {
  if (!isoStr) return '';
  const diff = Date.now() - new Date(isoStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'الآن';
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `منذ ${hrs} ساعة`;
  return `منذ ${Math.floor(hrs / 24)} يوم`;
}

function _likePostBtn(el) { likePost(el.dataset.id, el); }

async function likePost(postId, btn) {
  if (!STATE.user) { toast('🔒 سجّل دخولك للتفاعل'); openModal('login'); return; }
  if (STATE.likedPosts.has(postId)) { toast('لقد أعجبك هذا المنشور بالفعل'); return; }

  // Optimistic UI
  STATE.likedPosts.add(postId);
  const countEl = btn.querySelector('.like-count');
  const prev = parseInt(countEl?.textContent || '0');
  if (countEl) countEl.textContent = prev + 1;
  btn.classList.add('liked');
  btn.disabled = true;

  const { newLikes, error } = await CommunityService.likePost(postId);
  if (error) {
    STATE.likedPosts.delete(postId);
    if (countEl) countEl.textContent = prev;
    btn.classList.remove('liked');
    btn.disabled = false;
    toast('⚠️ تعذّر إضافة الإعجاب');
  } else {
    if (countEl) countEl.textContent = newLikes;
    addPoints(2, 'تقييم إيجابي');
  }
}

/* ===================== المرفقات (صور/فيديو) ===================== */
function triggerMediaPicker() {
  if (!STATE.user) { openModal('login'); toast('🔒 سجّل دخولك أولاً'); return; }
  const input = $('post-media-input');
  if (input) input.click();
}

function onPostMediaSelected(inputEl) {
  const file = inputEl?.files?.[0];
  if (!file) return;

  const isImage = file.type.startsWith('image/');
  const isVideo = file.type.startsWith('video/');
  if (!isImage && !isVideo) { toast('⚠️ اختر صورة أو فيديو فقط'); inputEl.value = ''; return; }
  if (file.size > 15 * 1024 * 1024) { toast('⚠️ الحجم الأقصى 15MB'); inputEl.value = ''; return; }

  const previewUrl = URL.createObjectURL(file);
  STATE.pendingPostMedia = { file, previewUrl, type: isVideo ? 'video' : 'image' };
  _renderMediaPreview();
}

function _renderMediaPreview() {
  const box = $('post-media-preview');
  if (!box) return;
  const m = STATE.pendingPostMedia;
  if (!m) { box.style.display = 'none'; box.innerHTML = ''; return; }

  box.style.display = 'flex';
  box.innerHTML = m.type === 'video'
    ? `<video src="${m.previewUrl}" style="max-height:120px;border-radius:10px;"></video>`
    : `<img src="${m.previewUrl}" style="max-height:120px;border-radius:10px;object-fit:cover;">`;
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'post-media-remove';
  removeBtn.textContent = '✕';
  removeBtn.setAttribute('aria-label', 'إزالة المرفق');
  removeBtn.onclick = clearPendingMedia;
  box.appendChild(removeBtn);
}

function clearPendingMedia() {
  if (STATE.pendingPostMedia?.previewUrl) URL.revokeObjectURL(STATE.pendingPostMedia.previewUrl);
  STATE.pendingPostMedia = null;
  const input = $('post-media-input');
  if (input) input.value = '';
  _renderMediaPreview();
}

/* ===================== نشر منشور ===================== */
async function addPost() {
  if (!STATE.user) { openModal('login'); toast('🔒 سجّل دخولك لترسل منشوراً'); return; }

  const txt = ($('new-post-text')?.value || '').trim();
  const media = STATE.pendingPostMedia;
  if (!txt && !media) { toast('اكتب شيئاً أو أرفق صورة/فيديو 😊'); return; }

  const postBtn = document.querySelector('.post-btn');
  if (postBtn) { postBtn.disabled = true; postBtn.textContent = '⏳ جاري النشر...'; }

  let mediaUrl = null, mediaType = null;
  if (media) {
    if (postBtn) postBtn.textContent = '⏳ جاري رفع الملف...';
    const up = await CommunityService.uploadPostMedia(STATE.user.id, media.file);
    if (up.error) {
      if (postBtn) { postBtn.disabled = false; postBtn.textContent = 'نشر ✨'; }
      toast('⚠️ ' + up.error);
      return;
    }
    mediaUrl = up.url; mediaType = up.type;
    if (postBtn) postBtn.textContent = '⏳ جاري النشر...';
  }

  const tags = txt.match(/#\S+/g) || [];
  const { data, error } = await CommunityService.publish(STATE.user.id, txt, tags, mediaUrl, mediaType);

  if (postBtn) { postBtn.disabled = false; postBtn.textContent = 'نشر ✨'; }

  if (error) { toast('⚠️ ' + error); return; }

  setValue('new-post-text', '');
  clearPendingMedia();
  await addPoints(15, 'مشاركة في المجتمع');
  saveAchievement('badge', 'community_member');
  await renderCommunity();
  toast('✨ تم نشر منشورك!');
}

async function deletePost(postId) {
  if (!confirm('هل تريد حذف هذا المنشور؟')) return;
  const ok = await CommunityService.deletePost(postId);
  if (ok) { toast('🗑 تم حذف المنشور'); await renderCommunity(); }
  else toast('⚠️ حصل خطأ أثناء الحذف');
}

function addPostTag(tag) {
  const ta = $('new-post-text');
  if (!ta) return;
  if (!ta.value.includes(tag)) ta.value = (ta.value + ' ' + tag).trim();
  ta.focus();
}

/* ===================== التعليقات ===================== */
async function toggleComments(el) {
  const postId = el.dataset.id;
  const box = $('comments-' + postId);
  if (!box) return;

  const isOpen = STATE.openComments.has(postId);
  if (isOpen) {
    STATE.openComments.delete(postId);
    box.style.display = 'none';
    return;
  }

  STATE.openComments.add(postId);
  box.style.display = 'block';
  await _loadAndRenderComments(postId);
}

async function _loadAndRenderComments(postId) {
  const listEl = $('comments-list-' + postId);
  if (!listEl) return;
  listEl.innerHTML = `<p style="text-align:center;color:var(--muted);font-size:12px;padding:8px;">جاري التحميل...</p>`;

  const comments = await CommunityService.loadComments(postId);
  STATE.commentsCache[postId] = comments;
  _renderCommentsList(postId);
}

function _renderCommentsList(postId) {
  const listEl = $('comments-list-' + postId);
  if (!listEl) return;
  const comments = STATE.commentsCache[postId] || [];

  if (!comments.length) {
    listEl.innerHTML = `<p style="text-align:center;color:var(--muted);font-size:12.5px;padding:8px;">لا توجد تعليقات بعد — كن أول من يعلّق!</p>`;
    return;
  }

  listEl.innerHTML = comments.map(c => {
    const name = c.profiles?.username || 'مستخدم';
    const isOwner = STATE.user && STATE.user.id === c.user_id;
    return `
      <div class="comment-item">
        <div class="avatar" style="width:28px;height:28px;font-size:12px;background:var(--p100);color:var(--p600);">${sanitizeHTML((name[0] || 'م').toUpperCase())}</div>
        <div class="comment-body">
          <strong>${sanitizeHTML(name)}</strong>
          <p>${sanitizeHTML(c.content)}</p>
          <span class="comment-time">${getTimeAgo(c.created_at)}</span>
        </div>
        ${isOwner ? `<button class="comment-delete-btn" data-action="deleteComment" data-id="${c.id}" data-post-id="${postId}" aria-label="حذف التعليق">✕</button>` : ''}
      </div>`;
  }).join('');
}

async function submitComment(el) {
  const postId = el.dataset.id;
  if (!STATE.user) { openModal('login'); toast('🔒 سجّل دخولك للتعليق'); return; }

  const input = $('comment-input-' + postId);
  const txt = (input?.value || '').trim();
  if (!txt) { toast('اكتب تعليقاً أولاً'); return; }

  el.disabled = true;
  const { data, error } = await CommunityService.addComment(postId, STATE.user.id, txt);
  el.disabled = false;

  if (error) { toast('⚠️ ' + error); return; }

  if (input) input.value = '';
  if (!STATE.commentsCache[postId]) STATE.commentsCache[postId] = [];
  STATE.commentsCache[postId].push(data);
  _renderCommentsList(postId);

  // تحديث عداد التعليقات في الواجهة
  const card = document.querySelector(`.post-card[data-post-id="${postId}"]`);
  const countEl = card?.querySelector('.comment-count');
  if (countEl) countEl.textContent = parseInt(countEl.textContent || '0') + 1;

  addPoints(3, 'تعليق في المجتمع');
}

async function deleteComment(el) {
  const commentId = el.dataset.id;
  const postId = el.dataset.postId;
  if (!confirm('حذف هذا التعليق؟')) return;

  const ok = await CommunityService.deleteComment(commentId);
  if (!ok) { toast('⚠️ حصل خطأ أثناء الحذف'); return; }

  STATE.commentsCache[postId] = (STATE.commentsCache[postId] || []).filter(c => c.id !== commentId);
  _renderCommentsList(postId);

  const card = document.querySelector(`.post-card[data-post-id="${postId}"]`);
  const countEl = card?.querySelector('.comment-count');
  if (countEl) countEl.textContent = Math.max(0, parseInt(countEl.textContent || '0') - 1);
}
