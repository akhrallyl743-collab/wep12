// @ts-check
const { defineConfig, devices } = require('@playwright/test');

// شغّل الموقع محلياً الأول (مثلاً: npx serve . -l 5500) وحدّث الـ baseURL هنا،
// أو خلي webServer تشتغل تلقائياً لو مشروعك عنده سكريبت start.
module.exports = defineConfig({
  testDir: './specs',
  timeout: 30_000,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5500',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
});
