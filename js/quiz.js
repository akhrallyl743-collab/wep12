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

  try {
    if (typeof QuizService !== 'undefined' && typeof QuizService.getQuestions === 'function') {
      QuizService.getQuestions().then(list => {
        if (list && list.length) {
          STATE.activeQuizQuestions = list;
          if (STATE.currentPage === 'quiz') renderQuestion();
        }
      }).catch(err => console.warn('[Quiz] QuizService.getQuestions failed:', err));
    }
  } catch (err) {
    console.warn('[Quiz] QuizService unavailable, using local questions:', err);
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
  _checkAmbiguityAndAskFollowUp(normalized);

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

  try {
    const resp = await fetch('/api/quiz-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'analysis',
        scores: n,
        dominantTrait,
        topTracksText: (STATE.quizTraits?.topTracks || []).slice(0, 3)
          .map(id => CAREERS_DATA.find(c => c.id === id)?.name).filter(Boolean).join('، ')
      })
    });
    const data = await resp.json();
    if (!resp.ok || !data.analysis) throw new Error(data.message || `HTTP ${resp.status}`);
    const analysis = data.analysis;

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
    const isKeyMissing = e.message && e.message.includes('ANTHROPIC_API_KEY');
    box.innerHTML = `
      <div style="background:var(--p50);border-radius:14px;padding:20px;text-align:center;">
        <p style="color:var(--muted);font-size:14px;">
          ${isKeyMissing
            ? '🔑 لتفعيل التحليل بالذكاء الاصطناعي، أضف ANTHROPIC_API_KEY في إعدادات البيئة على Vercel'
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

  const text = `🌟 أكملت اختبار START LINE — خط البداية!\n\nشخصيتي: ${dominant}\n\nأقوى مساراتي:\n${tracksText}\n\nاكتشف مسارك أنت ← start-line-eosin.vercel.app`;
  navigator.clipboard.writeText(text)
    .then(() => toast('✅ تم نسخ بطاقة نتيجتك! شاركها على WhatsApp'))
    .catch(() => toast('⚠️ المتصفح لا يدعم النسخ التلقائي'));
}


/* =============================================
   محرك التوضيح التكيّفي (Adaptive Clarification)
   ------------------------------------------------------------
   لو نتيجة السمتين الأعلى قريبة من بعض جداً (يعني الاختبار مش
   قادر يحدد مسارك بثقة كافية)، بنسأل سؤال توضيحي واحد مركّز
   على الفرق بين السمتين، وبعدين نبعت إجابته الحرة للذكاء
   الاصطناعي (عبر /api/quiz-advisor) عشان يفسّرها ويدّقق التوصية.
   ============================================= */
const _CLARIFY_QUESTIONS = {
  'creative|technical': 'لو طلبوا منك تعمل حاجة من الصفر بكرة الصبح، هتحب تصمم شكلها ومظهرها، ولا تبني الجزء اللي بيشغّلها من جوه؟',
  'creative|social': 'لو هتشتغل في مشروع، تفضّل تركّز في تطوير الفكرة والتصميم لوحدك، ولا التفاعل مع ناس وإقناعهم بيها؟',
  'creative|analytical': 'لما بتحل مشكلة، بتعتمد أكتر على حدسك وذوقك الفني، ولا على تحليل الأرقام والبيانات؟',
  'creative|entrepreneurial': 'حلمك الأكبر إنك تبدع في شغلك الفني، ولا إنك تبني مشروع/بيزنس تملكه وتديره؟',
  'technical|social': 'تفضّل تقضي يومك بتحل مشاكل تقنية لوحدك، ولا تتكلم مع ناس وتساعدهم وتبني علاقات؟',
  'technical|analytical': 'بتحب أكتر إنك تبني وتنفّذ حلول تقنية عملية، ولا تحلل البيانات وتوصل لاستنتاجات دقيقة؟',
  'technical|entrepreneurial': 'هدفك الأقرب إنك تبقى خبير تقني محترف، ولا تبني مشروعك التقني الخاص وتديره؟',
  'social|analytical': 'في القرارات المهمة، بتسأل رأي الناس اللي حواليك وتحس بمشاعرهم، ولا بتحلل الموقف بمنطق بحت؟',
  'social|entrepreneurial': 'بتحب أكتر إنك تساعد وتتواصل مع ناس كتير، ولا تقود مشروع وتدير فريق نحو هدف؟',
  'analytical|entrepreneurial': 'تفضّل تبحث وتحلل المعلومات بعمق قبل أي خطوة، ولا تاخد قرارات سريعة وتخاطر عشان تحقق نمو؟'
};

function _pairKey(a, b) { return [a, b].sort().join('|'); }

async function _checkAmbiguityAndAskFollowUp(normalized) {
  const box = $('quiz-clarify-box');
  if (!box) return;

  const entries = Object.entries(normalized || {}).sort((a, b) => b[1] - a[1]);
  if (entries.length < 2) return;
  const [topKey, topScore] = entries[0];
  const [secondKey, secondScore] = entries[1];

  // الفارق صغير (أقل من ١٢ نقطة) = ملفّ شخصية غير واضح، محتاج سؤال إضافي
  const gap = topScore - secondScore;
  if (gap >= 12) { box.innerHTML = ''; return; }

  const key = _pairKey(topKey, secondKey);
  const question = _CLARIFY_QUESTIONS[key];
  if (!question) { box.innerHTML = ''; return; }

  STATE._quizClarify = { topKey, secondKey, question, normalized };

  box.innerHTML = `
    <div style="background:var(--p50);border:1.5px solid var(--p100);border-radius:16px;padding:22px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
        <span style="font-size:20px;">🤔</span>
        <strong style="font-size:14.5px;">نتيجتك متقاربة بين مسارين — سؤال أخير عشان أدقّق توصيتك</strong>
      </div>
      <p style="font-size:14px;color:var(--text);margin-bottom:14px;">${sanitizeHTML(question)}</p>
      <textarea id="quiz-clarify-input" class="form-input" rows="2"
        placeholder="اكتب إجابتك بكلماتك الخاصة..." style="width:100%;resize:vertical;margin-bottom:10px;"></textarea>
      <button class="btn btn-primary btn-sm" data-action="submitQuizClarify">إرسال ودقّق توصيتي ✨</button>
      <div id="quiz-clarify-result" style="margin-top:14px;"></div>
    </div>`;
}

async function submitQuizClarify() {
  const input = $('quiz-clarify-input');
  const resultEl = $('quiz-clarify-result');
  const ctx = STATE._quizClarify;
  if (!input || !ctx) return;
  const answer = input.value.trim();
  if (!answer) { toast('اكتب إجابتك الأول 🙏'); return; }

  resultEl.innerHTML = `<div class="spinner" style="width:22px;height:22px;border-width:3px;margin:6px 0;"></div>`;

  try {
    const resp = await fetch('/api/quiz-advisor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'clarify_refine',
        scores: ctx.normalized,
        question: ctx.question,
        answer
      })
    });
    const data = await resp.json();
    if (!resp.ok || !data.refinement) throw new Error(data.message || `HTTP ${resp.status}`);
    resultEl.innerHTML = `
      <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px;">
        <strong style="font-size:13px;color:var(--p600);">🎯 توصيتنا المدقّقة:</strong>
        <p style="font-size:14px;margin-top:6px;line-height:1.8;">${sanitizeHTML(data.refinement)}</p>
      </div>`;
  } catch (e) {
    resultEl.innerHTML = `<p style="color:var(--muted);font-size:13px;">⚠️ تعذّر تدقيق التوصية الآن. توصياتك الأساسية بالأعلى تبقى صالحة.</p>`;
  }
}
