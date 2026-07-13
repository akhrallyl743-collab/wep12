// @ts-check
const { test, expect } = require('@playwright/test');

// هذا الاختبار الأهم بعد عملية دمج CSS/JS — بيتأكد إن الصفحة بتحمّل من غير
// أخطاء JS، وإن حزمة app.bundle.min.js اشتغلت فعلاً وعملت render للصفحة الرئيسية.
test.describe('الصفحة الرئيسية والبنية الأساسية', () => {
  test('الصفحة تحمّل من غير أخطاء JS في الكونسول', async ({ page }) => {
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // مفيش أخطاء JS قاتلة (فلترنا رسائل شبكة/سوبابيز المتوقعة لو مفيش اتصال حقيقي بالباك إند وقت الاختبار)
    const criticalErrors = consoleErrors.filter(
      e => !e.includes('supabase') && !e.includes('Failed to fetch') && !e.includes('NetworkError')
    );
    expect(criticalErrors, `أخطاء JS غير متوقعة:\n${criticalErrors.join('\n')}`).toEqual([]);
  });

  test('حزمة app.bundle.min.js اتحمّلت ونفّذت (الصفحة الرئيسية ظاهرة)', async ({ page }) => {
    await page.goto('/');
    // page-home لازم يكون فيه class="page active" بعد ما init.js يشتغل
    const homePage = page.locator('#page-home');
    await expect(homePage).toBeVisible();
    await expect(homePage).toHaveClass(/active/);
  });

  test('الشعار الجديد (webp) بيظهر بدون كسر', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('.nav-logo-img').first();
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', /logo\.webp/);
    // نتأكد إن الصورة اتحمّلت فعلاً مش broken image
    const naturalWidth = await logo.evaluate(img => /** @type {HTMLImageElement} */(img).naturalWidth);
    expect(naturalWidth).toBeGreaterThan(0);
  });
});

test.describe('التنقل بين الصفحات (SPA navigation)', () => {
  const pages = [
    { navPage: 'quiz', containerId: '#page-quiz' },
    { navPage: 'categories', containerId: '#page-categories' },
    { navPage: 'library', containerId: '#page-library' },
  ];

  for (const { navPage, containerId } of pages) {
    test(`الانتقال لصفحة "${navPage}" بيشتغل`, async ({ page }) => {
      await page.goto('/');
      await page.locator(`[data-action="showPage"][data-page="${navPage}"]`).first().click();
      await expect(page.locator(containerId)).toHaveClass(/active/);
    });
  }
});
