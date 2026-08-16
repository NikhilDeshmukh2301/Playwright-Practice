import{test, expect} from '@playwright/test';
import fs from "fs/promises";
import { PDFParse } from "pdf-parse";

test('download document validation', async ({page})=>{
    await page.goto('https://demo.automationtesting.in/FileDownload.html');
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('link', {name:'Download'}).click();
    const download = await downloadPromise;
    await download.saveAs('Downloads/testfiles.pdf');

    const buffer = await fs.readFile('Downloads/testfiles.pdf');
    const pdfData = new PDFParse({data: buffer});
    const result = await pdfData.getText();
    try{
        await expect(result.text).toContain('The Selenium Browser Automation Project');
    }catch(error){
        console.log("Error: text is not available ", error);
        throw error;
    }
    await pdfData.destroy();
    

});