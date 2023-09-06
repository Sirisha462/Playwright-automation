const { test, expect, chromium, firefox, webkit } = require('@playwright/test')

test('clicking buttons', async () => {
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
  const buttons = await page.locator('button:visible');
  const buttonscount = await buttons.count();
  console.log('total number of visible buttons ' + buttonscount);

  for (var i = 0; i < buttonscount; i++) {
    const clickable = await buttons.nth(i).textContent();
    const targetvalue = await buttons.nth(i).getAttribute('target');
    console.log(i + ":" + clickable);

    if (targetvalue == "_blank") {
      console.log("Opening in new tab");
      const pagepromise = (await context).waitForEvent('page');
      await buttons.nth(i).click();
      const newpage = await pagepromise;
      await page.waitForTimeout(8000);
      await test.info().attach(newpage.url(), {
        body: await newpage.screenshot(),
        contentType: "image/png",
      })
    }

    else {
      await buttons.nth(i).click();
      await page.waitForTimeout(8000);
      await test.info().attach(page.url(), {
        body: await page.screenshot(),
        contentType: "image/png",
      })

    }
    await page.goto(process.env.BASEURL, { waitUntil: 'load' });
  }
})

