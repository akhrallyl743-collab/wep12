# Handoff Status — AI Quiz Advisor + Publish Filter

## What changed and why

### 1. `api/quiz-advisor.js` — switched from Anthropic Claude to Google Gemini
- Same two modes as before: `analysis` (full personal analysis after the quiz) and `clarify_refine` (tie-break between close results). **No frontend changes needed** — request/response shape is identical.
- Reads `GEMINI_API_KEY` from Vercel Environment Variables (not `ANTHROPIC_API_KEY` anymore). **You need to add `GEMINI_API_KEY` in Vercel → Project Settings → Environment Variables**, or the endpoint will return a clear `missing_api_key` error.
- Optional `GEMINI_MODEL` env var to override the model (defaults to `gemini-2.5-flash`).
- Prompts explicitly tell Gemini not to invent or reorder tracks — it only writes copy around the tracks/scores you already computed and sent it.

### 2. `js/app.bundle.min.js` — quiz results can no longer recommend a "coming soon" career
Found that the project already has a `disabled: true` flag on ~47 of the 69 careers in `CAREERS_DATA` (used for the "قريباً" home-page chips), but this flag wasn't checked anywhere else. That meant:
- The quiz's top-3/top-8 recommendation scoring used **all** careers, disabled ones included.
- The library search/filter and category listing also included disabled careers.

Fix: added two helpers, `isPublishedCareer()` and `getPublishedCareers()`, and used them in:
- The quiz scoring step that builds `STATE.quizTraits.topTracks` (now only ranks published careers).
- `getAllTracks`, `getTrackById`, `getTracksForCareer`, `getCareersForCategory` (used by category pages, recommendations, and the learning-path engine).
- `_doFilterCareers` (library search page).

This is automatic going forward — flipping any career's `disabled` value later doesn't require touching any of these functions again.

**Left unchanged on purpose:** the home-page chip marquee (`renderHomeChips`) still shows disabled careers as grayed-out "قريباً" teasers — that's the existing, intentional design, not a bug. And `showCareer()` still opens disabled careers' info pages (they have real descriptive content + an external course link, just no built-in interactive track yet), which is also intentional, not a dead link.

## Files touched
- `api/quiz-advisor.js` — rewritten to call Gemini instead of Claude.
- `js/app.bundle.min.js` — added 2 helper functions + filtered 5 existing functions (see above). Verified with `node -c` for syntax validity.

## Nothing else was touched
Supabase-backed `is_published` fields (roadmaps/sections/quiz_questions) were already correct before this change and were left as-is.
