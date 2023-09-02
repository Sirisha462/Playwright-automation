const { test, expect } = require('@playwright/test')
import { Login } from '../pages/login-page'
import { HomePage } from "../pages/home-page"
let page;
let login;
let homePage
test.describe('login', () => {
    test.beforeEach(async({browser}) => {
        page=await browser.newPage();
         login = new Login(page);
         homePage = new HomePage(page);
        await login.goToLoginPage();

    });

    test.afterEach(async()=>{
        page.close();

    })

test('Valid Username and Password', async () => {
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.login();
    await homePage.ValidatingHomePage();
}
)

test('Invalid Username and Password', async () => {
    await login.enterUsername('sjshf');
    await login.enterPassword('secr');
    await login.login();
    await login.invalidUsernameAndPasswordText();
}
)

test('only username', async () => {
    await login.enterUsername('sjshf');
    await login.login();
   await login.withOnlyUsername();
}
)
test('only password', async () => {
    await login.enterPassword('secr');
    await login.login();
   await login.withOnlyPassword();
}
)
test('Without Username and Password', async () => {
    await login.login();
   await login.withOnlyPassword();
})
});


