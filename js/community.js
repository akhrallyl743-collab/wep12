'use strict';

/* =============================================
   Community
   ============================================= */
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

    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <div class="post-header">
        <div class="avatar" style="background:${color};color:#fff;">${sanitizeHTML(avatar)}</div>
        <div class="post-meta"><h4>${sanitizeHTML(name)}</h4><p>${timeAgo}</p></div>
      </div>
      <div class="post-body">${sanitizeHTML(p.content)}</div>
      ${tags ? `<div class="post-tags-row">${tags}</div>` : ''}
      <div class="post-footer">
        <button class="reaction-btn ${isLiked ? 'liked' : ''}" data-postid="${p.id}" aria-label="إعجاب" ${isLiked ? 'disabled' : ''}>
          ❤️ <span>${p.likes || 0}</span>
        </button>
        <button class="reaction-btn" aria-label="رد">💬 رد</button>
      </div>`;

    // Event delegation is cleaner but direct binding is fine here
    const likeBtn = card.querySelector('.reaction-btn');
    if (!isLiked) {
      likeBtn.addEventListener('click', () => likePost(p.id, likeBtn));
    }
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

async function likePost(postId, btn) {
  if (!STATE.user) { toast('🔒 سجّل دخولك للتفاعل'); openModal('login'); return; }
  if (STATE.likedPosts.has(postId)) { toast('لقد أعجبك هذا المنشور بالفعل'); return; }

  // Optimistic UI
  STATE.likedPosts.add(postId);
  const countEl = btn.querySelector('span');
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

async function addPost() {
  if (!STATE.user) { openModal('login'); toast('🔒 سجّل دخولك لترسل منشوراً'); return; }

  const txt = ($('new-post-text')?.value || '').trim();
  if (!txt) { toast('اكتب شيئاً أولاً 😊'); return; }

  const postBtn = document.querySelector('.post-btn');
  if (postBtn) { postBtn.disabled = true; postBtn.textContent = '⏳ جاري النشر...'; }

  const tags = txt.match(/#\S+/g) || [];
  const { data, error } = await CommunityService.publish(STATE.user.id, txt, tags);

  if (postBtn) { postBtn.disabled = false; postBtn.textContent = 'نشر ✨'; }

  if (error) { toast('⚠️ ' + error); return; }

  setValue('new-post-text', '');
  await addPoints(15, 'مشاركة في المجتمع');
  saveAchievement('badge', 'community_member');
  await renderCommunity();
  toast('✨ تم نشر منشورك!');
}

function addPostTag(tag) {
  const ta = $('new-post-text');
  if (!ta) return;
  if (!ta.value.includes(tag)) ta.value = (ta.value + ' ' + tag).trim();
  ta.focus();
}

