// @ts-check
const { test, expect } = require('@playwright/test');

// هذا الاختبار خاص بالتعديل الكبير: التحول من hash routing (#quiz) لـ
// path routing (/quiz) عبر History API. لازم يتشغّل بعد رفع الموقع على
// Vercel فعلياً (أو أي سيرفر بيطبّق rewrite في vercel.json) — تشغيله على
// static file server عادي (زي `npx serve`) من غير SPA fallback هيفشل
// في اختبار "زيارة مباشرة"/refresh لأن السيرفر مش هيلاقي فايل فعلي اسمه quiz.

test.describe('التنقل بمسارات نظيفة (بعد التحول من # لـ /)', () => {
  test('الانتقال للـ quiz بيغيّر الـ URL لـ /quiz من غير #', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-action="showPage"][data-page="quiz"]').first().click();
    await expect(page).toHaveURL(/\/quiz$/);
    expect(page.url()).not.toContain('#');
  });

  test('زيارة مباشرة لـ /library (زي ما جوجل أو مستخدم هيعمل) بترجع نفس الموقع مش 404', async ({ page }) => {
    const response = await page.goto('/library');
    expect(response?.status()).toBeLessThan(400);
    // المفروض showPage('library') تشتغل تلقائياً من init.js وتفتح الصفحة الصح
    await expect(page.locator('#page-library')).toHaveClass(/active/, { timeout: 5000 });
  });

  test('زر الرجوع في المتصفح (Back) بيرجّع للصفحة اللي قبلها صح', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-action="showPage"][data-page="quiz"]').first().click();
    await expect(page).toHaveURL(/\/quiz$/);

    await page.locator('[data-action="showPage"][data-page="library"]').first().click();
    await expect(page).toHaveURL(/\/library$/);

    await page.goBack();
    await expect(page).toHaveURL(/\/quiz$/);
    await expect(page.locator('#page-quiz')).toHaveClass(/active/);
  });

  test('رابط قديم بصيغة #quiz (توافق عكسي) لسه بيشتغل ويتحوّل لـ /quiz', async ({ page }) => {
    await page.goto('/#quiz');
    // المفروض init.js يحوّل الرابط تلقائياً لـ /quiz عبر history.replaceState
    await expect(page).toHaveURL(/\/quiz$/, { timeout: 5000 });
    await expect(page.locator('#page-quiz')).toHaveClass(/active/);
  });

  test('تحديث الصفحة (reload) وانت في /quiz بيفضل واقف في نفس الصفحة', async ({ page }) => {
    await page.goto('/quiz');
    await page.reload();
    await expect(page.locator('#page-quiz')).toHaveClass(/active/, { timeout: 5000 });
  });
});
