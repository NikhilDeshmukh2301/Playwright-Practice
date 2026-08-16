import { expect } from "@playwright/test";

export class LoginPage{
    constructor(page){
        this.page = page;
        this.email = page.locator('input[type="email"]');
        this.password = page.locator('input[type="password"]');
        this.loginButton = page.getByRole("button", { name: "Login" });
    }

    async loginToApplication(email,password){
        await this.email.waitFor({ state: 'visible', timeout: 5000 });
        await this.email.fill(email);
        await this.password.waitFor({ state: 'visible', timeout: 5000 });
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async validateTitle(expectedTitle){
        await expect(this.page).toHaveTitle(expectedTitle);
    }
}