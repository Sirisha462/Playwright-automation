const { test, expect, chromium,firefox,webkit } = require('@playwright/test');

test('checking images', async () => {
  var flag='';
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
   const numberofimages= await images.count();
   console.log("number of visible images: " + numberofimages);

  for(var i=0; i<numberofimages; i++){
    await images.nth(i).scrollIntoViewIfNeeded();
    
  }
  for(var i=0; i<numberofimages; i++){
    const srcvalue=await images.nth(i).getAttribute("src");
    console.log(i+ ":"+srcvalue+ "--" + await images.nth(i).getAttribute("alt"));
        //  await test.info().attach(page.url(), {
        //    body: await images.nth(i).screenshot(),
        //    contentType: "image/png",
        //  })
        //  if(srcvalue.startsWith("http")||srcvalue.startsWith("https"))
        //      url=srcvalue;
        //   else
        //    url="https://serviceforge-staging.appspot.com"+srcvalue;
        // const newpage = await context.newPage();
        //  const response=await newpage.goto(url);
        //  await newpage.waitForLoadState('load');
        //  const status=response.status();
        //  console.log("status:"+status);
        //  if(status==200||status==302)
        //     flag=true;
        //   else
        //    flag=false;
        //   await expect.soft(flag).toBe(true);
        //  await test.info().attach(newpage.url(), {
        //   body: await newpage.screenshot(),
        //   contentType: "image/png",
        // })
        // await newpage.close();
        // flag=false;
    
  }

})