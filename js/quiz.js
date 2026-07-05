'use strict';

/* =============================================
   Quiz
   ============================================= */
function initQuiz() {
  STATE.currentQ = 0;
  STATE.quizAnswers = [];
  STATE.selectedOpt = null;
  STATE.activeQuizQuestions = QUIZ_QUESTIONS; // عرض فوري بالبيانات المحلية أثناء التحميل
  renderQuestion();

  if (typeof QuizService !== 'undefined') {
    QuizService.getQuestions().then(list => {
      if (list && list.length) {
        STATE.activeQuizQuestions = list;
        if (STATE.currentPage === 'quiz') renderQuestion();
      }
    });
  }
}

function _quizQuestions() { return STATE.activeQuizQuestions || QUIZ_QUESTIONS; }

function renderQuestion() {
  const total = _quizQuestions().length;
  const q = _quizQuestions()[STATE.currentQ];
  if (!q) return;
  const pct = Math.round(((STATE.currentQ + 1) / total) * 100);

  setText('q-counter', `السؤال ${STATE.currentQ + 1} من ${total}`);
  setText('q-pct', `${pct}%`);
  setStyle('quiz-bar', 'width', `${pct}%`);
  setText('q-cat', q.cat);
  setText('q-text', q.q);

  setHTML('q-options', q.opts.map((o, i) =>
    `<button class="quiz-option${STATE.selectedOpt === i ? ' selected' : ''}" data-action="selectOpt" data-opt-index="${i}" role="radio" aria-checked="${STATE.selectedOpt === i}">${sanitizeHTML(o)}</button>`
  ).join(''));

  const nav = $('quiz-nav');
  if (nav) nav.style.display = STATE.selectedOpt !== null ? 'flex' : 'none';
  const prevBtn = $('prev-btn');
  if (prevBtn) prevBtn.style.display = STATE.currentQ > 0 ? 'inline-flex' : 'none';
  const isLast = STATE.currentQ === total - 1;
  setText('next-btn', isLast ? 'عرض نتائجي 🎯' : 'التالي ←');
}

function selectOpt(i) {
  STATE.selectedOpt = i;
  $$('.quiz-option').forEach((b, idx) => {
    b.classList.toggle('selected', idx === i);
    b.setAttribute('aria-checked', idx === i ? 'true' : 'false');
  });
  const nav = $('quiz-nav');
  if (nav) nav.style.display = 'flex';

  const feedbackMsgs = ['اختيار رائع! 👍', 'ممتاز! 🌟', 'مثالي! ✨', 'رائع! 💡', 'واضح جداً! 🎯'];
  const feedback = $('quiz-feedback');
  if (feedback) {
    feedback.textContent = feedbackMsgs[Math.floor(Math.random() * feedbackMsgs.length)];
    feedback.style.opacity = '1';
    setTimeout(() => { feedback.style.opacity = '0'; }, 1500);
  }
}

function prevQuestion() {
  if (STATE.currentQ > 0) {
    STATE.currentQ--;
    STATE.quizAnswers.pop();
    STATE.selectedOpt = null;
    renderQuestion();
  }
}

function nextQuestion() {
  if (STATE.selectedOpt === null) return;
  STATE.quizAnswers.push(STATE.selectedOpt);
  if (STATE.currentQ < _quizQuestions().length - 1) {
    STATE.currentQ++;
    STATE.selectedOpt = null;
    renderQuestion();
  } else {
    showResults();
  }
}

/* =============================================
   Quiz Results — Skills-Based System
   ============================================= */
function calcSkillScores(answers) {
  const scores = { creative: 0, technical: 0, social: 0, analytical: 0, entrepreneurial: 0 };
  const keys = ['creative', 'technical', 'social', 'analytical', 'entrepreneurial'];

  _quizQuestions().forEach((q, qIdx) => {
    if (answers[qIdx] === undefined || !q.weights) return;
    const optWeights = q.weights[answers[qIdx]];
    if (!optWeights) return;
    optWeights.forEach((w, sIdx) => { scores[keys[sIdx]] += w; });
  });

  const maxRaw = Math.max(...Object.values(scores), 1);
  const normalized = {};
  keys.forEach(k => {
    normalized[k] = Math.min(Math.round((scores[k] / maxRaw) * 75 + 20), 95);
  });
  return { raw: scores, normalized };
}

function showResults() {
  const a = STATE.quizAnswers;
  const { raw, normalized } = calcSkillScores(a);

  const traits = [
    { label: 'الإبداع والفن',       score: normalized.creative,       color: 'var(--p400)', key: 'creative' },
    { label: 'المهارة التقنية',     score: normalized.technical,      color: 'var(--c400)', key: 'technical' },
    { label: 'التواصل الاجتماعي',  score: normalized.social,         color: 'var(--t400)', key: 'social' },
    { label: 'التحليل والمنطق',    score: normalized.analytical,     color: 'var(--b400)', key: 'analytical' },
    { label: 'روح ريادة الأعمال', score: normalized.entrepreneurial, color: '#1fbb85',      key: 'entrepreneurial' },
  ];

  STATE.quizTraits = { ...raw, total: a.length, traits, normalized };

  setHTML('trait-bars', traits.map(t => `
    <div class="trait-row">
      <span class="trait-label">${t.label}</span>
      <div class="trait-bar"><div class="trait-fill" style="width:0%;background:${t.color}" data-w="${t.score}%"></div></div>
      <span class="trait-score">${t.score}%</span>
    </div>`).join(''));

  setTimeout(() => {
    $$('.trait-fill').forEach(b => { b.style.width = b.dataset.w; });
  }, 150);

  // Career matching
  const CAT_SKILL_MAP = {
    'إبداعي':  { creative: 3, technical: 0, social: 1, analytical: 0, entrepreneurial: 1 },
    'تقني':    { creative: 0, technical: 3, social: 0, analytical: 2, entrepreneurial: 0 },
    'أعمال':   { creative: 0, technical: 1, social: 1, analytical: 2, entrepreneurial: 3 },
    'تواصل':   { creative: 1, technical: 0, social: 3, analytical: 0, entrepreneurial: 1 },
    'عملي':    { creative: 1, technical: 2, social: 1, analytical: 1, entrepreneurial: 1 },
    'أكاديمي': { creative: 0, technical: 1, social: 0, analytical: 3, entrepreneurial: 0 },
  };

  const catScores = {};
  Object.entries(CAT_SKILL_MAP).forEach(([cat, weights]) => {
    catScores[cat] = Object.entries(weights).reduce((sum, [skill, w]) => sum + (normalized[skill] || 0) * w, 0);
  });

  const topTracks = CAREERS_DATA
    .map(c => ({ ...c, _score: (catScores[c.cat] || 0) + (c.match || 0) }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 8);

  STATE.quizTraits.topTracks = topTracks.map(c => c.id);

  setHTML('career-matches', `
    <div class="match-section">
      <h3>🌟 أفضل المسارات لك</h3>
      <div class="match-cards">
        ${topTracks.slice(0, 6).map(c => `
          <div class="match-card" data-action="showCareer" data-career-id="${c.id}">
            <div class="match-card-icon">${c.icon}</div>
            <div class="match-card-name">${sanitizeHTML(c.name)}</div>
            <div class="match-card-pct">${c.match}<small>%</small></div>
          </div>`).join('')}
      </div>
    </div>`);

  showPage('results');
  addPoints(50, 'اكتملت اختبار الشخصية');
  saveAchievement('badge', 'first_quiz');
  if (typeof saveQuizTraits === 'function') saveQuizTraits(STATE.quizTraits); // [S] centralized
  saveQuizResult(a, normalized, STATE.quizTraits.topTracks);

  // AI Analysis
  const aiBox = $('ai-analysis-box');
  if (aiBox) {
    aiBox.innerHTML = `
      <div style="background:var(--p50);border:1.5px solid var(--p100);border-radius:16px;padding:22px;text-align:center;">
        <p style="font-size:14.5px;font-weight:700;margin-bottom:14px;">🤖 احصل على تحليل شخصي بالذكاء الاصطناعي</p>
        <button class="btn btn-primary btn-sm" data-action="requestAIAnalysis">تحليلي بالذكاء الاصطناعي ✨</button>
      </div>`;
  }
}

/* =============================================
   AI Analysis
   ============================================= */
let _lastAIRequest = 0;
const AI_RATE_LIMIT_MS = 30000;

async function requestAIAnalysis() {
  const now = Date.now();
  if (now - _lastAIRequest < AI_RATE_LIMIT_MS) {
    toast('⏳ انتظر قليلاً قبل طلب تحليل جديد');
    return;
  }

  const t = STATE.quizTraits;
  if (!t) return;

  const box = $('ai-analysis-box');
  if (!box) return;

  box.innerHTML = `
    <div style="background:var(--p50);border:1.5px solid var(--p100);border-radius:16px;padding:28px;text-align:center;">
      <div class="spinner" style="margin:0 auto 14px;width:28px;height:28px;border-width:3px;"></div>
      <p style="font-size:14px;color:var(--muted);">🤖 الذكاء الاصطناعي يحلل شخصيتك...</p>
    </div>`;

  const n = t.normalized || {};
  const skills_text = [
    `الإبداع والفن: ${n.creative || 0}%`,
    `المهارة التقنية: ${n.technical || 0}%`,
    `التواصل الاجتماعي: ${n.social || 0}%`,
    `التحليل والمنطق: ${n.analytical || 0}%`,
    `روح ريادة الأعمال: ${n.entrepreneurial || 0}%`,
  ].join('\n');

  const allScores = [n.creative||0, n.technical||0, n.social||0, n.analytical||0, n.entrepreneurial||0];
  const skillNames = ['إبداعي/فني', 'تقني/تحليلي', 'اجتماعي/تواصلي', 'تحليلي/بحثي', 'ريادي/أعمال'];
  const maxIdx = allScores.indexOf(Math.max(...allScores));
  const dominantTrait = skillNames[maxIdx] || 'متعدد المواهب';

  const prompt = `أنت مستشار مهني خبير تتحدث بالعربية.
المستخدم أكمل اختبار الميول المهنية وهذه نتائجه الحقيقية:
${skills_text}
- الطابع المهيمن: ${dominantTrait}

اكتب تحليلاً شخصياً مشجعاً (150-200 كلمة) يشمل:
1. نقاط القوة الرئيسية لهذه الشخصية
2. المسار المهني الأنسب ولماذا
3. تحدٍّ واحد محتمل وكيف يتجاوزه
4. رسالة تحفيزية شخصية

اكتب بأسلوب دافئ وشخصي كأنك تتحدث مع صديق. لا تستخدم نقاطاً أو قوائم — اكتب فقرات متدفقة.`;

  try {
    // ⚠️ ضع مفتاح Anthropic API هنا — احصل عليه من console.anthropic.com
    // لا تنشر المفتاح في كود عام — استخدم متغيرات البيئة في الإنتاج
    const ANTHROPIC_API_KEY = window.ANTHROPIC_API_KEY || '';
    if (!ANTHROPIC_API_KEY) throw new Error('missing api key');

    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerously-allow-browser': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();
    const analysis = data.content?.[0]?.text || '';
    if (!analysis) throw new Error('no content');

    _lastAIRequest = Date.now();
    window._lastAIAnalysis = analysis;
    // نُنظّف ثم نحوّل الأسطر لفقرات HTML مقروءة
    const safeAnalysis = sanitizeHTML(analysis)
      .replace(/\n\n/g, '</p><p style="margin-top:12px;">')
      .replace(/\n/g, '<br>');
    box.innerHTML = `
      <div style="background:linear-gradient(135deg,var(--p50),var(--t50));border:1.5px solid var(--p100);border-radius:16px;padding:26px;">
        <div style="font-size:22px;margin-bottom:12px;">🤖 تحليلك الشخصي</div>
        <p style="font-size:15px;line-height:1.88;color:var(--text);">${safeAnalysis}</p>
        <button data-action="copyAIAnalysis" style="margin-top:18px;background:var(--p600);color:#fff;padding:10px 24px;border-radius:10px;border:none;font-family:var(--font);font-weight:700;cursor:pointer;font-size:14px;">
          📋 نسخ التحليل
        </button>
      </div>`;
  } catch(e) {
    const isKeyMissing = e.message === 'missing api key';
    box.innerHTML = `
      <div style="background:var(--p50);border-radius:14px;padding:20px;text-align:center;">
        <p style="color:var(--muted);font-size:14px;">
          ${isKeyMissing
            ? '🔑 لتفعيل التحليل بالذكاء الاصطناعي أضف مفتاح Anthropic API في المشروع (window.ANTHROPIC_API_KEY)'
            : '⚠️ تعذّر الاتصال بالذكاء الاصطناعي. جرّب مرة أخرى بعد قليل.'}
        </p>
        ${isKeyMissing ? '' : '<button data-action="requestAIAnalysis" class="btn btn-outline btn-sm" style="margin-top:12px;">🔄 إعادة المحاولة</button>'}
      </div>`;
  }
}

function copyAIAnalysis() {
  if (!window._lastAIAnalysis) return;
  navigator.clipboard.writeText(window._lastAIAnalysis)
    .then(() => toast('✅ تم نسخ التحليل!'))
    .catch(() => toast('⚠️ المتصفح لا يدعم النسخ التلقائي'));
}

/* =============================================
   Share Results Card
   ============================================= */
function copyResultsCard() {
  const t = STATE.quizTraits;
  if (!t) return;
  const n = t.normalized || {};
  const dominant = n.creative >= n.technical && n.creative >= n.social ? '🎨 إبداعي'
    : n.technical >= n.social ? '💻 تقني' : '🤝 اجتماعي';

  const topTracks = (t.topTracks || []).slice(0, 3);
  const tracksText = topTracks.length > 0
    ? topTracks.map((id, i) => {
        const c = CAREERS_DATA.find(x => x.id === id);
        return c ? `${i + 1}. ${c.icon} ${c.name}` : '';
      }).filter(Boolean).join('\n')
    : CAREERS_DATA.slice(0, 3).map((c, i) => `${i + 1}. ${c.icon} ${c.name}`).join('\n');

  const text = `🌟 أكملت اختبار START LINE — خط البداية!\n\nشخصيتي: ${dominant}\n\nأقوى مساراتي:\n${tracksText}\n\nاكتشف مسارك أنت ← start-line.vercel.app`;
  navigator.clipboard.writeText(text)
    .then(() => toast('✅ تم نسخ بطاقة نتيجتك! شاركها على WhatsApp'))
    .catch(() => toast('⚠️ المتصفح لا يدعم النسخ التلقائي'));
}

