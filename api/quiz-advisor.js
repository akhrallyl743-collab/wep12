/**
 * api/quiz-advisor.js
 * ------------------------------------------------------------
 * Vercel Serverless Function — بروكسي آمن لـ Anthropic API.
 * المفتاح السري (ANTHROPIC_API_KEY) يتخزن كمتغير بيئة في Vercel
 * Dashboard ➜ Project Settings ➜ Environment Variables، ومايظهرش
 * أبداً في كود الواجهة الأمامية (خلافاً للنسخة القديمة اللي كانت
 * بتحط المفتاح في window.ANTHROPIC_API_KEY وده خطر أمني كبير).
 *
 * Modes:
 *  - "analysis"        : تحليل شخصي شامل بعد نتيجة الاختبار
 *  - "clarify_refine"   : تفسير إجابة نصية حرة لسؤال توضيحي وتحسين التوصية
 * ------------------------------------------------------------ */

const TRAIT_LABELS = {
  creative: 'الإبداع والفن',
  technical: 'المهارة التقنية',
  social: 'التواصل الاجتماعي',
  analytical: 'التحليل والمنطق',
  entrepreneurial: 'روح ريادة الأعمال'
};

function buildScoresText(scores) {
  return Object.entries(scores || {})
    .map(([k, v]) => `${TRAIT_LABELS[k] || k}: ${v}%`)
    .join('\n');
}

async function callClaude(apiKey, prompt, maxTokens) {
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: maxTokens || 900,
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!resp.ok) {
    const text = await resp.text().catch(() => '');
    throw new Error(`Anthropic API error ${resp.status}: ${text.slice(0, 200)}`);
  }
  const data = await resp.json();
  return (data.content || []).map(b => b.text || '').join('\n').trim();
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'missing_api_key', message: 'ANTHROPIC_API_KEY غير مضبوط في متغيرات البيئة على Vercel' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const { mode, scores, dominantTrait, question, answer, topTracksText } = body || {};

  try {
    if (mode === 'analysis') {
      const prompt = `أنت مستشار مهني خبير تتحدث بالعربية بأسلوب دافئ وشخصي.
المستخدم أكمل اختبار الميول المهنية وهذه نتائجه الحقيقية:
${buildScoresText(scores)}
- الطابع المهيمن: ${dominantTrait || 'متعدد المواهب'}
${topTracksText ? `- أفضل المسارات المقترحة حالياً: ${topTracksText}` : ''}

اكتب تحليلاً شخصياً مشجعاً (150-200 كلمة) يشمل:
1. نقاط القوة الرئيسية لهذه الشخصية
2. المسار المهني الأنسب من المقترحين ولماذا
3. تحدٍّ واحد محتمل وكيف يتجاوزه
4. رسالة تحفيزية شخصية

اكتب بأسلوب دافئ وشخصي كأنك تتحدث مع صديق. لا تستخدم نقاطاً أو قوائم — اكتب فقرات متدفقة.`;
      const analysis = await callClaude(apiKey, prompt, 900);
      res.status(200).json({ analysis });
      return;
    }

    if (mode === 'clarify_refine') {
      const prompt = `أنت مستشار مهني خبير للشباب العربي. نتائج اختبار الشخصية للمستخدم كانت متقاربة بين أكتر من مسار:
${buildScoresText(scores)}

سألناه سؤال توضيحي: "${question || ''}"
وكانت إجابته الحرة: "${answer || ''}"

بناءً على إجابته، حدد:
1. المسار الأنسب فعلياً من بين المسارات المتقاربة (اسم واحد واضح ومحدد)
2. سبب مختصر (جملتين بحد أقصى) ليه ده الأنسب استناداً لإجابته
3. نصيحة عملية واحدة للخطوة الجاية

اكتب بالعربية المصرية البسيطة، بشكل مباشر ومختصر جداً (٤٠-٦٠ كلمة إجمالاً)، بدون مقدمات.`;
      const refinement = await callClaude(apiKey, prompt, 400);
      res.status(200).json({ refinement });
      return;
    }

    res.status(400).json({ error: 'invalid_mode' });
  } catch (err) {
    res.status(502).json({ error: 'upstream_error', message: String(err && err.message || err) });
  }
}
