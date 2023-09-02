const { test, expect } = require('@playwright/test')
import { Login } from '../pages/login-page'
import { HelperPage } from '../util/helper';

let page;
let login;
let helper;
test.describe('login', () => {
   test.beforeEach(async ({ browser }) => {
      page = await browser.newPage();
      login = new Login(page);
      helper = new HelperPage(page);
      await login.goToLoginPage();
      await login.enterUsername('standard_user');
      await login.enterPassword('secret_sauce');
      await login.login();

   });

   test.afterEach(async () => {
      await page.close();

   })

   test('validating number of links', async () => {
      const linkcount = await helper.numberOfVisibleLinks();
      await expect(linkcount).toBe(20);
   })

   test('validating number of buttons', async () => {
      const buttoncount = await helper.numberOfVisibleButtons();
      await expect(buttoncount).toBe(8);
   })

   test('validating number of images', async () => {
      const imagecount = await helper.numberOfVisibleImages();
      await expect(imagecount).toBe(8);
   })
});