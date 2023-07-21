const { test, expect } = require('@playwright/test')
import {LoginPage}  from '../pages/LoginPage'
import  {HomePage}  from "../pages/HomePage"


test('Swaglabs Login', async ({ page }) => {
 
    const login = new LoginPage(page);
    const homePage = new HomePage(page);
    await login.goToLoginPage();
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.login();
    await homePage.ValidatingHomePage();



}
)