const { test,expect } = require("@playwright/test");
export class applicationpage{
   
    constructor(browser,context,page,url){
        this.browser=browser;
        this.context=context;
        this.page = page;
        this.url=url;
        this.links= page.locator('a:visible');
        this.buttons= page.locator('button:visible');
        this.images=page.locator("img:visible");
    }
    
     async goToApplicationPage(){
        await this.page.goto(this.url);
     }

     async numberOfVisibleLinks(){
        const linkcount = await this.links.count();
        console.log('total number of visible links ' + linkcount);
        return linkcount;
     }

     async numberOfVisibleButtons(){
        const buttoncount = await this.buttons.count();
        console.log('total number of visible buttons ' + buttoncount);
        return buttoncount;
     }

     async numberOfVisibleImages(){
      const numberofimages= await this.images.count();
      console.log("Number of visible images: " + numberofimages);
      return numberofimages;
     }

     async takingScreenshot(element,page){
       await test.info().attach(page.url(), {
        body: await element.screenshot(),
        contentType: "image/png",
      })
     }

     async clickAction(locator){
        await locator.click();
     }


     async clickingLinks(linkcount){

        for (var i = 1; i < linkcount; i++) {
            const clickable = await this.links.nth(i).getAttribute('href');
            const targetvalue = await this.links.nth(i).getAttribute('target');
            console.log(i + ":" + clickable);
            
            if (clickable == null) {
              console.log("the link is not clickable");
            }
        
            else if (targetvalue == "_blank") {
              console.log("Opening in new tab");
              const pagepromise = (await this.context).waitForEvent('page');
              await this.clickAction(this.links.nth(i));
              const newpage = await pagepromise;
              await  newpage.waitForLoadState("load");
              await this.takingScreenshot(newpage,newpage);
              newpage.close();

            }
        
            else {
              await this.clickAction(this.links.nth(i));
               await this.page.waitForLoadState("load");
              await this.takingScreenshot(this.page,this.page);     
            }
            await this.page.goto(this.url, { waitUntil: 'load' });
          }
     }

     async clickingButtons(buttoncount){
        for (var i = 0; i < buttoncount; i++) {
            const clickable = await this.buttons.nth(i).textContent();
            console.log(i + ":" + clickable);
            await this.clickAction(this.buttons.nth(i));
            await this.page.waitForLoadState("load");
            await this.takingScreenshot(this.page,this.page);
            await this.page.goto(this.url, { waitUntil: 'load' });
     }
    }

     async scrollingDown(imagecount){
        for(var i=0; i<imagecount; i++){
         await this.images.nth(i).scrollIntoViewIfNeeded();
        }
      }

     async checkingImage(imagecount){
       
      for(var i=0; i<imagecount; i++){
        var imageurl='';
        const src=await this.images.nth(i).getAttribute("src");
        console.log(i+ ":"+src);
        await this.takingScreenshot(this.images.nth(i),this.page);
        const newpage = await this.context.newPage();
        if(src.startsWith("http")||src.startsWith("https"))
           imageurl=src;
        else
           imageurl=this.url+src;
        const response=await newpage.goto(imageurl);
        await newpage.waitForLoadState('load');
        const status=response.status();
        await expect.soft(status).toBe(200);
        await this.takingScreenshot(newpage,newpage); 
        await newpage.close();
        }

    }

 }