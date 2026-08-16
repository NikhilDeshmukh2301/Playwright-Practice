import { expect } from "@playwright/test";
export class dashboardPage{
    constructor(page){
        this.page = page;
        this.allProducts = page.locator("div.card-body");
        this.viewproduct = page.locator("button.btn.w-40.rounded");
        this.AddTocartViewpage = page.getByRole('button', { name: 'Add to Cart' });

    }

    async ViewProduct(productname){
         await this.page.waitForSelector('div.card-body', { timeout: 10000 });
         const product = this.allProducts.filter({ hasText: productname }).first();
         await product.waitFor({ state: 'visible', timeout: 10000 });
         const viewButton = product.locator("button.btn.w-40.rounded").first();
         await viewButton.waitFor({ state: 'visible', timeout: 5000 });
         await viewButton.click();
         await expect(this.AddTocartViewpage).toBeVisible();
    }

    async placeOrder(){

    }
}