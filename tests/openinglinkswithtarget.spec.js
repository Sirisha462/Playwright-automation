const { test, expect, chromium } = require('@playwright/test')

test('Opening all links and taking screenshot', async () => {
  let browser;
  if (process.env.BROWSER == 'chromium')
    browser = await chromium.launch();
  if (process.env.BROWSER == 'webkit')
    browser = await webkit.launch();
  if (process.env.BROWSER == 'firefox')
    browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(process.env.BASEURL);

  const links = page.locator("//a['href'][@target='_blank']");
  const linkcount = await links.count();
  for (var i = 0; i < linkcount; i++) {
    const pagepromise = (await context).waitForEvent('page');
    await links.nth(i).click();
    const newpage = await pagepromise;
    await newpage.waitForLoadState('networkidle');
    await newpage.screenshot({ path: 'tests/screenshots/' + Date.now() + 'test.png' });
    await newpage.close();
  }

})