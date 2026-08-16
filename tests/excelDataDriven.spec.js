import { test } from "@playwright/test";
import path from "path";
import { common } from '../helpers/common.js';


test("write data to excel", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");

    const com = new common();
    const filePath = path.join(process.cwd(), 'downloads', 'upload.xlsx');

    await com.writeExcelData("Mango", 400, { rowChange: 0, colChange: 2 }, filePath);

    const chooseFile = page.locator("input#fileinput");
    await chooseFile.click();
    await chooseFile.setInputFiles(filePath);
    await page.pause();
});