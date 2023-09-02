const { test, expect, chromium } = require('@playwright/test');


test('checking images', async () => {
  var newpagelocator = '';
  var url='';
  let browser;
  if(process.env.BROWSER=='chromium')
     browser = await chromium.launch();
  if(process.env.BROWSER=='webkit')
     browser = await webkit.launch();
  if(process.env.BROWSER=='firefox')
    browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(process.env.BASEURL);
  const images = await page.locator("img:visible");
  const numberofimages = await images.count();
  console.log("number of visible images: " + numberofimages);
  for (var i = 0; i < numberofimages; i++) {
    await images.nth(i).scrollIntoViewIfNeeded();
  }

  for (var i = 0; i < numberofimages; i++) {
    var svgvalue = 0;
    var imgvalue = 0;
    const srcvalue = await images.nth(i).getAttribute("src");
    console.log(i + ":" + srcvalue + "--" + await images.nth(i).getAttribute("alt"));
    const format = srcvalue.slice(-4);

    if (srcvalue.startsWith("http") || srcvalue.startsWith("https"))
      url = srcvalue;
    else
      url = process.env.BASEURL + srcvalue;
    const newpage = await context.newPage();
    const response = await newpage.goto(url);
    await newpage.waitForLoadState('load');
    const status = response.status();
    console.log("status:" + status);
    await expect.soft(status).toBe(200);
    if (format == '.svg')
      svgvalue++;
    else if(format== '.png' || format=='.jpg')
      imgvalue++;
    else
      console.log("Not an image or svg fomat");

    if (svgvalue == 1 && imgvalue == 0){
      newpagelocator = '//*[name()="svg"]';
    }
    else if (svgvalue == 0 && imgvalue == 1){
      newpagelocator = '//img';
    }
    else
      console.log("Not able to get newpage locator");
      
      console.log("newpage locator:"+newpagelocator);
      const newpageelement = await newpage.locator(newpagelocator);
      
    
    await test.info().attach(newpage.url(), {
      body: await newpageelement.screenshot(),
      contentType: "image/png",
    })
    await newpage.close();
  }
}

)