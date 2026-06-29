'use strict';

/* =============================================
   Category Router — نظام التصفح بين الفئات
   يعمل بدون Framework — pure JS
   ============================================= */

/* ---- Helpers ---- */
// getCareersForCategory() is defined in data.js (unified data layer)

function getDifficultyClass(diff) {
  if (diff === 'سهل') return 'diff-easy';
  if (diff === 'متوسط') return 'diff-medium';
  return 'diff-hard';
}

/* =============================================
   صفحة الفئات الرئيسية (Categories Grid)
   ============================================= */
function renderCategoriesPage() {
  const wrap = document.getElementById('categories-page-inner');
  if (!wrap) return;

  const html = `
    <nav class="breadcrumb" aria-label="مسار التنقل">
      <span data-action="showPage" data-page="home" role="link" tabindex="0">🏠 الرئيسية</span>
      <span class="sep" aria-hidden="true">›</span>
      <span aria-current="page">الفئات</span>
    </nav>
    <div class="categories-hero">
      <span class="section-kicker">المسارات المهنية</span>
      <h1>اختر مجالك وابدأ رحلتك</h1>
      <p>+١٥٠ مسار مهني مُنظَّم في فئات واضحة. من التكنولوجيا إلى الأعمال — كل شيء هنا.</p>
    </div>
    <div class="cat-full-grid" id="cat-full-grid">
      ${CAREER_CATEGORIES.map(cat => {
        const count = getCareersForCategory(cat.id).length;
        return `
        <div class="cat-full-card" 
             data-action="showCategoryPage" 
             data-cat-id="${cat.id}"
             role="button" tabindex="0"
             aria-label="${cat.name} — ${count} مسار"
             style="--cat-color:${cat.color};--cat-light:${cat.colorLight}">
          <div class="cat-full-icon">${cat.icon}</div>
          <div class="cat-full-body">
            <h3 class="cat-full-name">${cat.name}</h3>
            <p class="cat-full-desc">${cat.desc}</p>
          </div>
          <div class="cat-full-meta">
            <span class="cat-count-badge">${count} مسار</span>
            <span class="cat-arrow">←</span>
          </div>
        </div>`;
      }).join('')}
    </div>
  `;
  wrap.innerHTML = html;

  // keyboard support
  wrap.querySelectorAll('.cat-full-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showCategoryPage(card.dataset.catId);
      }
    });
  });
}

/* =============================================
   صفحة الفئة الفردية (Single Category)
   ============================================= */
function showCategoryPage(categoryId) {
  const cat = CAREER_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return;

  const careers = getCareersForCategory(categoryId);
  const wrap = document.getElementById('single-category-inner');
  if (!wrap) return;

  // store current cat for back navigation
  AppState.currentViewedCategory = categoryId;

  const html = `
    <nav class="breadcrumb" aria-label="مسار التنقل">
      <span data-action="showPage" data-page="home" role="link" tabindex="0">🏠 الرئيسية</span>
      <span class="sep">›</span>
      <span data-action="showPage" data-page="categories" role="link" tabindex="0" style="cursor:pointer;">الفئات</span>
      <span class="sep">›</span>
      <span aria-current="page">${cat.name}</span>
    </nav>
    <button class="back-btn" data-action="showPage" data-page="categories">← العودة للفئات</button>

    <div class="cat-hero" style="--cat-color:${cat.color};--cat-light:${cat.colorLight}">
      <div class="cat-hero-icon">${cat.icon}</div>
      <div class="cat-hero-body">
        <h1 class="cat-hero-title">${cat.name}</h1>
        <p class="cat-hero-desc">${cat.desc}</p>
        ${cat.longDesc ? `<p class="cat-long-desc">${sanitizeHTML(cat.longDesc)}</p>` : ''}
        <span class="cat-count-badge" style="background:${cat.colorLight};color:${cat.color};">${careers.length} مسار متاح</span>
      </div>
    </div>

    <div class="cat-careers-grid" id="cat-careers-grid">
      ${careers.length === 0 
        ? '<p style="color:var(--muted);text-align:center;padding:40px;">لا توجد مسارات في هذه الفئة حالياً</p>'
        : careers.map(c => `
          <div class="career-card${c.disabled ? ' career-disabled' : ''} cat-career-card"
               data-action="showCareer"
               data-career-id="${c.id}"
               role="button" tabindex="0"
               aria-label="${c.name}"
               style="--cat-accent:${cat.color}">
            <div class="career-icon">${c.icon}</div>
            <div class="career-name">${sanitizeHTML(c.name)}</div>
            <div class="career-cat">${sanitizeHTML(c.cat)}</div>
            <div class="career-desc">${sanitizeHTML(c.desc)}</div>
            <div class="career-meta">
              <span class="meta-badge ${getDifficultyClass(c.difficulty)}">${c.difficulty}</span>
              <span class="meta-badge">⏱️ ${c.time}</span>
            </div>
          </div>
        `).join('')
      }
    </div>
  `;
  wrap.innerHTML = html;

  showPage('single-category');
}


/* =============================================
   Hook into existing event system
   All actions (showCareer, showCategoryPage, setCat) are handled
   by events.js ACTION_MAP via data-action delegation.
   No manual onclick wiring needed here.
   ============================================= */
