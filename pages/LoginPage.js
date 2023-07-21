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
}