// @ts-check
const { test, expect } = require('@playwright/test');

// ⚠️ ملاحظة مهمة: تسجيل الدخول الإجباري مفعّل على الموقع (auth.js/init.js) —
// يعني مودال #auth-modal المفروض يظهر تلقائياً لأي زائر مش عامل تسجيل دخول.
// الاختبار ده اتكتب بناءً على فحص الكود المصدري (id="auth-modal", id="login-email",
// id="login-password", id="login-btn", id="login-error") مش بتشغيل فعلي في متصفح —
// يُفضّل تتأكد بنفسك إن أسماء الـ selectors دي لسه مطابقة قبل ما تعتمد على النتيجة،
// خصوصاً لو حصل أي تعديل على auth.js بعد كتابة الاختبار ده.

test.describe('تسجيل الدخول الإجباري', () => {
  test('مودال تسجيل الدخول بيظهر تلقائياً لزائر غير مسجل', async ({ page }) => {
    await page.goto('/');
    const authModal = page.locator('#auth-modal');
    // بننتظر لحد ما الـ JS يشتغل ويقرر يفتح المودال أو لأ
    await expect(authModal).toHaveClass(/active/, { timeout: 10_000 });
  });

  test('محاولة دخول بحقول فاضية بتظهر رسالة خطأ ومتعديش', async ({ page }) => {
    await page.goto('/');
    const authModal = page.locator('#auth-modal');
    await expect(authModal).toHaveClass(/active/, { timeout: 10_000 });

    await page.locator('#login-btn').click();

    // المفروض إما رسالة خطأ تظهر، أو الـ HTML5 required يمنع الإرسال أصلاً
    const errorBox = page.locator('#login-error');
    const isErrorVisible = await errorBox.isVisible().catch(() => false);
    const emailInvalid = await page.locator('#login-email').evaluate(
      el => !(/** @type {HTMLInputElement} */ (el)).validity.valid
    );
    expect(isErrorVisible || emailInvalid).toBeTruthy();

    // وأهم حاجة: المودال لازم يفضل ظاهر (يعني مافيش تخطي لتسجيل دخول وهمي)
    await expect(authModal).toHaveClass(/active/);
  });

  test('محاولة دخول ببيانات خاطئة بتظهر رسالة خطأ واضحة', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#auth-modal')).toHaveClass(/active/, { timeout: 10_000 });

    await page.locator('#login-email').fill('nonexistent-test-user@example.com');
    await page.locator('#login-password').fill('wrong-password-123');
    await page.locator('#login-btn').click();

    // بنستنى استجابة من Supabase (قد تاخد لحظة) — رسالة خطأ لازم تظهر
    await expect(page.locator('#login-error')).toBeVisible({ timeout: 15_000 });
  });
});
