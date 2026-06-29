'use strict';

/* =============================================
   Career Library
   ============================================= */
function renderLibrary() {
  const lang = (typeof STATE !== 'undefined' && STATE.lang) || 'ar';
  const isEN = lang === 'en';
  const cats = [
    { ar: 'all',      en: 'all',         labelAr: 'الكل',          labelEn: 'All' },
    { ar: 'إبداعي',   en: 'إبداعي',      labelAr: 'إبداعي',        labelEn: 'Creative' },
    { ar: 'تقني',     en: 'تقني',        labelAr: 'تقني',          labelEn: 'Technical' },
    { ar: 'أعمال',    en: 'أعمال',       labelAr: 'أعمال',         labelEn: 'Business' },
    { ar: 'تواصل',    en: 'تواصل',       labelAr: 'تواصل',         labelEn: 'Communication' },
    { ar: 'عملي',     en: 'عملي',        labelAr: 'عملي',          labelEn: 'Practical' },
    { ar: 'أكاديمي',  en: 'أكاديمي',    labelAr: 'أكاديمي',       labelEn: 'Academic' },
    { ar: 'لغات',     en: 'لغات',        labelAr: 'اللغات',        labelEn: 'Languages' },
    { ar: 'حياتية',   en: 'حياتية',      labelAr: 'مهارات حياتية', labelEn: 'Life Skills' },
  ];
  setHTML('cat-pills', cats.map(c =>
    `<button class="pill${c.ar === STATE.currentCategory ? ' active' : ''}" data-action="setCat" data-cat="${c.ar}">${isEN ? c.labelEn : c.labelAr}</button>`
  ).join(''));
  filterCareers();
}

function setCat(c) {
  STATE.currentCategory = c;
  renderLibrary();
}

// Debounced search
let _searchTimer = null;
function filterCareers() {
  if (_searchTimer) clearTimeout(_searchTimer);
  _searchTimer = setTimeout(_doFilterCareers, 120);
}

function _doFilterCareers() {
  const q = ($('career-search') || {}).value?.toLowerCase() || '';
  const filtered = CAREERS_DATA.filter(c => {
    const matchCat = STATE.currentCategory === 'all' || c.cat === STATE.currentCategory;
    const matchQ = !q || c.name.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.cat.includes(q);
    return matchCat && matchQ;
  });

  const careersEl = $('careers-list');
  if (!careersEl) return;

  if (!filtered.length) {
    careersEl.innerHTML = ((typeof STATE !== 'undefined' && STATE.lang === 'en') ? '<div style="text-align:center;padding:60px;color:var(--muted);font-size:16px;grid-column:1/-1;">No results found 🔍</div>' : '<div style="text-align:center;padding:60px;color:var(--muted);font-size:16px;grid-column:1/-1;">لا توجد نتائج للبحث 🔍</div>');
    return;
  }

  const frag = document.createDocumentFragment();
  filtered.forEach(c => {
    const div = document.createElement('div');
   div.className = `career-card${c.disabled ? ' career-disabled' : ''}`;
   
    div.setAttribute('role', 'button');
    div.setAttribute('tabindex', '0');
    div.setAttribute('aria-label', `${c.name} — ${c.cat}`);
    div.innerHTML = `
      <div class="career-icon">${c.icon}</div>
      <div class="career-name">${sanitizeHTML(c.name)}</div>
      <div class="career-cat">${sanitizeHTML(c.cat)}</div>
      <div class="career-desc">${sanitizeHTML(c.desc)}</div>
      <div class="career-meta">
        <span class="meta-badge ${c.difficulty === 'سهل' ? 'diff-easy' : c.difficulty === 'متوسط' ? 'diff-medium' : 'diff-hard'}">${c.difficulty}</span>
        <span class="meta-badge">⏱️ ${c.time}</span>
      </div>`;
    div.setAttribute('data-action', 'showCareer');
    div.setAttribute('data-career-id', c.id);
    frag.appendChild(div);
  });
  careersEl.innerHTML = '';
  careersEl.appendChild(frag);
}

/* =============================================
   Career Detail
   ============================================= */
function showCareer(id) {
  const c = CAREERS_DATA.find(x => x.id === id);
  if (!c) return;

  // Find the category this career belongs to
  const catObj = typeof CAREER_CATEGORIES !== 'undefined'
    ? CAREER_CATEGORIES.find(cat => cat.catKeys.includes(c.cat))
    : null;

  const breadcrumbHtml = catObj
    ? `<nav class="breadcrumb" aria-label="مسار التنقل">
        <span data-action="showPage" data-page="home">🏠 الرئيسية</span>
        <span class="sep">›</span>
        <span data-action="showPage" data-page="categories">الفئات</span>
        <span class="sep">›</span>
        <span data-action="showCategoryPage" data-cat-id="${catObj.id}">${sanitizeHTML(catObj.name)}</span>
        <span class="sep">›</span>
        <span aria-current="page">${sanitizeHTML(c.name)}</span>
      </nav>`
    : `<nav class="breadcrumb" aria-label="مسار التنقل">
        <span data-action="showPage" data-page="home">🏠 الرئيسية</span>
        <span class="sep">›</span>
        <span data-action="showPage" data-page="library">المسارات</span>
        <span class="sep">›</span>
        <span aria-current="page">${sanitizeHTML(c.name)}</span>
      </nav>`;
  setHTML('career-detail-content', `
    ${breadcrumbHtml}
    <button class="back-btn" data-action="${catObj ? 'showCategoryPage' : 'showPage'}" ${catObj ? `data-cat-id="${catObj.id}"` : 'data-page="library"'}>← العودة${catObj ? ` إلى ${sanitizeHTML(catObj.name)}` : ' للمسارات'}</button>
    <div class="career-hero-card">
      <div style="font-size:56px;margin-bottom:14px;">${c.icon}</div>
      <h1>${sanitizeHTML(c.name)}</h1>
      <p>${sanitizeHTML(c.desc)}</p>
      ${c.longDesc ? `<p class="career-long-desc">${sanitizeHTML(c.longDesc)}</p>` : ''}
      <div class="career-hero-meta">
        <div class="hero-meta-item"><div class="hero-meta-val">${sanitizeHTML(c.difficulty)}</div><div class="hero-meta-key">مستوى الصعوبة</div></div>
        <div class="hero-meta-item"><div class="hero-meta-val">${sanitizeHTML(c.time)}</div><div class="hero-meta-key">وقت البدء</div></div>
      </div>
    </div>

    <div class="info-section">
      <h3>🗺️ خارطة الطريق خطوة بخطوة</h3>
      ${c.roadmap.map((s, i) => `
        <div class="roadmap-step">
          <div class="step-num">${i + 1}</div>
          <div class="step-content"><h4>${sanitizeHTML(s.t)}</h4><p>${sanitizeHTML(s.d)}</p></div>
        </div>`).join('')}
    </div>
    <div class="info-section">
      <h3>🛠️ الأدوات المستخدمة</h3>
      <div class="tools-flex">${c.tools.map(t => `<span class="tool-badge">${sanitizeHTML(t)}</span>`).join('')}</div>
      <div class="tools-download-section">
        <p class="tools-download-label">📥 روابط التحميل</p>
        <div class="tools-flex tools-download-flex">${c.tools.map(t => {
          const link = (c.toolLinks && c.toolLinks[t]) ? c.toolLinks[t] : getToolDownloadLink(t);
          return `<a class="tool-download-btn" href="${link}" target="_blank" rel="noopener noreferrer">⬇️ ${sanitizeHTML(t)}</a>`;
        }).join('')}</div>
      </div>
    </div>
    <div id="career-tracks-inject"></div>
    <div class="career-cta">
      <button class="cta-btn cta-secondary" data-action="showPage" data-page="mentors">🤝 تواصل مع مدرب</button>
    </div>`);

  // حقن المسارات التعليمية المرتبطة
  if (typeof renderCareerTracks === 'function') {
    const tracksEl = $('career-tracks-inject');
    if (tracksEl) tracksEl.innerHTML = renderCareerTracks(c.id);
  }
  showPage('career');
}

function startPath(id) {
  const career = CAREERS_DATA.find(c => c.id === id);
  if (career && !STATE.selectedTracks.includes(career.name)) {
    STATE.selectedTracks.push(career.name);
    saveProgress() // centralized;
    saveTrackProgress(id, 0);
    saveAchievement('badge', 'first_track');
    addPoints(20, `بدء مسار ${career.name}`);
  }
  showPage('plan');
  toast('🎉 انطلقت في مسارك! فتحنا خطتك الأولى.');
}


/* =============================================
   Tool Download Links
   ============================================= */
function getToolDownloadLink(toolName) {
  const links = {
    // Design
    'Adobe Illustrator': 'https://www.adobe.com/products/illustrator.html',
    'Photoshop': 'https://www.adobe.com/products/photoshop.html',
    'Canva': 'https://www.canva.com/download/',
    'InDesign': 'https://www.adobe.com/products/indesign.html',
    'Affinity': 'https://affinity.serif.com/en-us/',
    'Figma': 'https://www.figma.com/downloads/',
    'Adobe XD': 'https://www.adobe.com/products/xd.html',
    'Maze': 'https://maze.co/',
    'Miro': 'https://miro.com/apps/',
    'Zeplin': 'https://zeplin.io/downloads/',
    'Procreate': 'https://procreate.com/',
    'Clip Studio Paint': 'https://www.clipstudio.net/en/dl/',
    'After Effects': 'https://www.adobe.com/products/aftereffects.html',
    'Adobe Animate': 'https://www.adobe.com/products/animate.html',
    'Adobe Premiere': 'https://www.adobe.com/products/premiere.html',
    'Adobe Lightroom': 'https://www.adobe.com/products/photoshop-lightroom.html',
    'Adobe Audition': 'https://www.adobe.com/products/audition.html',
    'DaVinci Resolve': 'https://www.blackmagicdesign.com/products/davinciresolve/',
    'CapCut': 'https://www.capcut.com/',
    'Sketch': 'https://www.sketch.com/downloads/',
    // Dev
    'Visual Studio Code': 'https://code.visualstudio.com/download',
    'CSS': 'https://code.visualstudio.com/download',
    'JavaScript': 'https://code.visualstudio.com/download',
    'React': 'https://react.dev/',
    'Next.js': 'https://nextjs.org/',
    'Git': 'https://git-scm.com/downloads',
    'Node.js': 'https://nodejs.org/en/download',
    'Python': 'https://www.python.org/downloads/',
    'PostgreSQL': 'https://www.postgresql.org/download/',
    'MongoDB': 'https://www.mongodb.com/try/download/community',
    'Redis': 'https://redis.io/downloads/',
    'Docker': 'https://www.docker.com/products/docker-desktop/',
    'React Native': 'https://reactnative.dev/',
    'Flutter': 'https://flutter.dev/docs/get-started/install',
    'Swift': 'https://swift.org/download/',
    'Kotlin': 'https://kotlinlang.org/',
    'Firebase': 'https://firebase.google.com/',
    'TensorFlow': 'https://www.tensorflow.org/install',
    'PyTorch': 'https://pytorch.org/get-started/locally/',
    'Hugging Face': 'https://huggingface.co/',
    'LangChain': 'https://python.langchain.com/',
    'Kali Linux': 'https://www.kali.org/get-kali/',
    'Wireshark': 'https://www.wireshark.org/download.html',
    'Metasploit': 'https://www.metasploit.com/',
    'Burp Suite': 'https://portswigger.net/burp/communitydownload',
    'Nmap': 'https://nmap.org/download.html',
    'Kubernetes': 'https://kubernetes.io/',
    'AWS': 'https://aws.amazon.com/free/',
    'GitHub Actions': 'https://github.com/features/actions',
    'Terraform': 'https://www.terraform.io/downloads',
    'Unity': 'https://unity.com/download',
    'Unreal Engine': 'https://www.unrealengine.com/en-US/download',
    'Blender': 'https://www.blender.org/download/',
    'Cinema 4D': 'https://www.maxon.net/cinema-4d/',
    'Maya': 'https://www.autodesk.com/products/maya/free-trial',
    'ZBrush': 'https://www.maxon.net/zbrush/',
    // Productivity / PM
    'Notion': 'https://www.notion.so/desktop',
    'Jira': 'https://www.atlassian.com/software/jira',
    'Trello': 'https://trello.com/platforms',
    'Asana': 'https://asana.com/apps',
    'Slack': 'https://slack.com/downloads/',
    'Zoom': 'https://zoom.us/download',
    'Meltwater': 'https://www.meltwater.com/',
    'Airtable': 'https://www.airtable.com/downloads',
    'Notion': 'https://www.notion.so/desktop',
    // Analytics / Data
    'Excel': 'https://www.microsoft.com/en/microsoft-365/excel',
    'Power BI': 'https://www.microsoft.com/en-us/power-platform/products/power-bi/downloads',
    'Tableau': 'https://www.tableau.com/products/desktop/download',
    'Pandas': 'https://pandas.pydata.org/',
    'NumPy': 'https://numpy.org/install/',
    'Matplotlib': 'https://matplotlib.org/',
    'SQL': 'https://www.mysql.com/downloads/',
    'Jupyter': 'https://jupyter.org/install',
    'SPSS': 'https://www.ibm.com/products/spss-statistics',
    'R': 'https://www.r-project.org/',
    'MATLAB': 'https://www.mathworks.com/products/matlab.html',
    // Marketing / Content
    'Google Ads': 'https://ads.google.com/',
    'Meta Ads': 'https://business.facebook.com/',
    'Google Analytics': 'https://analytics.google.com/',
    'Mailchimp': 'https://mailchimp.com/',
    'Buffer': 'https://buffer.com/',
    'Hootsuite': 'https://hootsuite.com/',
    'Ahrefs': 'https://ahrefs.com/',
    'SEMrush': 'https://www.semrush.com/',
    'Google Search Console': 'https://search.google.com/search-console',
    'Screaming Frog': 'https://www.screamingfrog.co.uk/seo-spider/',
    'Grammarly': 'https://www.grammarly.com/download',
    'ChatGPT': 'https://chat.openai.com/',
    'WordPress': 'https://wordpress.org/download/',
    'Elementor': 'https://elementor.com/get-started/',
    // Freelance platforms
    'Upwork': 'https://www.upwork.com/',
    'Fiverr': 'https://www.fiverr.com/',
    'Khamsat': 'https://khamsat.com/',
    'LinkedIn': 'https://www.linkedin.com/in/',
    // Audio
    'Audacity': 'https://www.audacityteam.org/download/',
    'GarageBand': 'https://apps.apple.com/us/app/garageband/id408709785',
    'Anchor': 'https://anchor.fm/',
    'Buzzsprout': 'https://www.buzzsprout.com/',
    'Descript': 'https://www.descript.com/download',
    // Other
    'Selenium': 'https://www.selenium.dev/downloads/',
    'Cypress': 'https://www.cypress.io/',
    'Postman': 'https://www.postman.com/downloads/',
    'TestRail': 'https://www.testrail.com/',
    'AutoCAD': 'https://www.autodesk.com/products/autocad/free-trial',
    'Revit': 'https://www.autodesk.com/products/revit/free-trial',
    'SketchUp': 'https://www.sketchup.com/plans-and-pricing/sketchup-free',
    'Scrivener': 'https://www.literatureandlatte.com/scrivener/download',
    'Make (Integromat)': 'https://www.make.com/',
    'Zapier': 'https://zapier.com/',
    'n8n': 'https://n8n.io/get-started/',
    'Solidity': 'https://soliditylang.org/',
    'MetaMask': 'https://metamask.io/download/',
    'Shopify': 'https://www.shopify.com/',
    'WooCommerce': 'https://woocommerce.com/',
  };
  return links[toolName] || `https://www.google.com/search?q=تحميل+${encodeURIComponent(toolName)}`;
}
