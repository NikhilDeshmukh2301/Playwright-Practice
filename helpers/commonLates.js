import { expect } from "@playwright/test";

export class CommonLates{
    constructor(page){
        this.page = page

    }

    async validateUrl(expectedUrl){
        await expect(this.page).toHaveURL(expectedUrl);
    }
}