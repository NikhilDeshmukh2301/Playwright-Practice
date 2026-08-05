export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async loginAndGoToEvents() {
    const email= await this.page.locator("input#email");
    const password= await this.page.locator("input#password");
    const loginButton= await this.page.locator("button#login-btn");
    
    await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
    await email.fill('nikhil.deshmukh2301@gmail.com');
    await password.fill('Nikhil@2301');
    await loginButton.click();
     await this.page.getByTestId("nav-events").click();
    
  }
}