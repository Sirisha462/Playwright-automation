exports.HomePage=class HomePage{

    constructor(page) {
        this.page = page;
        this.homePageLogo = page.locator('text=Swag Labs');
    }

    async ValidatingHomePage() {

        await this.homePageLogo.isVisible();
    }



}