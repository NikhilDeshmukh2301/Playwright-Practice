import{test,expect} from '@playwright/test';
import { start } from 'node:repl';

test('file upoad', async ({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");
    const chooseSingleFile = await page.locator("input#singleFileInput");
    const chooseMultipleFile = await page.locator("input#multipleFilesInput");
    const uploadSingleFile = await page.getByText("Upload Single File");
    const uploadMultipleFile = await page.getByText("Upload Multiple Files");
    const fileStatus = await page.locator("p#singleFileStatus");
    const multiFileStatus = await page.locator("p#multipleFilesStatus");
    await chooseSingleFile.setInputFiles('C:/playwright/testData/data.json');
    await uploadSingleFile.click();
    await chooseMultipleFile.setInputFiles(['C:/playwright/testData/data.json','C:/playwright/testData/data1.json']);
    await uploadMultipleFile.click();
    await expect(fileStatus).toHaveText('Single file selected: data.json, Size: 0 bytes, Type: application/json');
    await expect(multiFileStatus).toHaveText("Multiple files selected: data.json, Size: 0 bytes, Type: application/json data1.json, Size: 0 bytes, Type: application/json ")

});

test('choose file from window', async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const chooseSingleFile = await page.locator("input#singleFileInput");
    const chooseMultipleFile = await page.locator("input#multipleFilesInput");
    const fileChooserPromise = await page.waitForEvent('filechooser');
    await chooseSingleFile.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles('C:/playwright/testData/data.json');
});

test('handles search Tab', async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const searchFeild = await page.locator("input#Wikipedia1_wikipedia-search-input");
    const searchButton = await page.locator("input.wikipedia-search-button");
    const searchResultText = await page.locator("div#Wikipedia1_wikipedia-search-results-header");
    const searchresult = await page.locator("div#wikipedia-search-result-link");
    const moreText = await page.locator("div#Wikipedia1_wikipedia-search-more a");
    const Data1="test";
    const data2="Search results";
    const data3="More »";
    await searchFeild.fill(Data1);
    await searchButton.click();
    await page.waitForTimeout(5000);
    await expect(searchResultText).toHaveText(data2);
    await expect(moreText).toHaveText(data3);
    //console.log(searchresult);
    for(let i=0;i<await searchresult.count();i++){
        let text = await searchresult.nth(i).textContent();
       if(!text.includes("Test")){
        console.log("Search result does not contain Test");
       }
    }
});

test.only('dynamic button', async ({page})=>{
 await page.goto("https://testautomationpractice.blogspot.com/");
 const dynamicButtonStart= await page.locator("button.start");
 const dynamicButtonStop= await page.locator("button.stop");
 await dynamicButtonStart.isVisible();
 await expect(dynamicButtonStart).toHaveAttribute('name','start');
 await dynamicButtonStart.click();
 await expect(dynamicButtonStop).toHaveAttribute('name','stop');
});