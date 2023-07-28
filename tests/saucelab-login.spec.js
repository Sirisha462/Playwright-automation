const { test, expect } = require('@playwright/test')
import { LoginPage } from '../pages/login-page'
import { HomePage } from "../pages/home-page"

test.describe('login', () => {
test('Valid Username and Password', async ({ page }) => {
    const login = new LoginPage(page);
    const homePage = new HomePage(page);
    await login.goToLoginPage();
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.login();
    await homePage.ValidatingHomePage();
}
)

test('Invalid Username and Password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await login.enterUsername('sjshf');
    await login.enterPassword('secr');
    await login.login();
    await login.invalidUsernameAndPasswordText();
}
)

test('only username', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await login.enterUsername('sjshf');
    await login.login();
   await login.withOnlyUsername();
}
)
test('only password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await login.enterPassword('secr');
    await login.login();
   await login.withOnlyPassword();
}
)
test('Without Username and Password', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goToLoginPage();
    await login.login();
   await login.withOnlyPassword();
}



)
});
