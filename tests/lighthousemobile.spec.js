import { playAudit } from 'playwright-lighthouse'
import { test } from '@playwright/test'
test('Page speed in mobile device', async ({ playwright }) => {
  const browser = await playwright.chromium.launch({
    args: ['--remote-debugging-port=9222'],
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.answerforce.com/');

  await playAudit({
    page: page,
    thresholds: {
      performance: 10,
      accessibility: 10,
      'best-practices': 10,
      seo: 10
    },
    port: 9222,
    reports: {
      formats: {
        html: true,
      },
      name: `ligthouseMobile-${new Date().toISOString()}`,
      directory: `${process.cwd()}/lighthouse Mobile`,
    },
  });

  await browser.close();
});
