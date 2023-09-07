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
  const url=process.env.BASEURL;
  const links = await page.locator('a:visible');
  const linkcount = await links.count();
  console.log('total number of visible links ' + linkcount);

  for (var i =1 ; i < linkcount; i++) {
    const clickable = await links.nth(i).getAttribute('href');
    const targetvalue = await links.nth(i).getAttribute('target');
    console.log(i + ":" + clickable);
    
    if (clickable == null || clickable == 'tel:+448000119020' || clickable == 'https://anywhereworks.com/blue-dot') {
      console.log("the link is not clickable");
    }

    else if (targetvalue == "_blank") {
      console.log("Opening in new tab");
      const pagepromise = (await context).waitForEvent('page');
      await links.nth(i).click();
      const newpage = await pagepromise;
      await page.waitForTimeout(8000);
      await test.info().attach(newpage.url(), {
        body: await newpage.screenshot(),
        contentType: "image/png",
      })
    }

    else {
      await links.nth(i).click();
      await page.waitForTimeout(8000);
      await test.info().attach(page.url(), {
        body: await page.screenshot(),
        contentType: "image/png",
      })

    }
    await page.goto(url, { waitUntil: 'load' });
  }
})
