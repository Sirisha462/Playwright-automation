const { expect } = require("@playwright/test");

exports.HelperPage=class HelperPage{

constructor(page){
    this.page = page;
    this.links= page.locator('a');
    this.buttons= page.locator('button');
    this.images=page.locator("img");
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
}