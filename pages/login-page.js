const { expect } = require("@playwright/test");

exports.LoginPage=class LoginPage{

constructor(page){
    this.page = page;
    this.username_textbox=page.locator('id=user-name');
    this.password_textbox=page.locator('id=password');
    this.loginButton=page.locator('id=login-button');
}

 async goToLoginPage(){
    await this.page.goto('https://www.saucedemo.com/');
 }
 
 async enterUsername(username){
    await this.username_textbox.click();
    await this.username_textbox.fill(username)
     
}

async enterPassword(password){
    await this.password_textbox.click();
    await this.password_textbox.fill(password)

}

async login(){
  await this.loginButton.click();
}

async invalidUsernameAndPasswordText(){
    const invalidText="Epic sadface: Username and password do not match any user in this service";
    await expect(this.page.getByText(invalidText)).toBeVisible();
}

async withOnlyUsername(){
    const passwordRequiredText="Epic sadface: Password is required";
    await expect(this.page.getByText(passwordRequiredText)).toBeVisible();
}

async withOnlyPassword(){
    const usernameRequiredText="Epic sadface: Username is required";
    await expect(this.page.getByText(usernameRequiredText)).toBeVisible();
}


}