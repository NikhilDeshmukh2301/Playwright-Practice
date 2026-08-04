import{test,expect,request}from'@playwright/test';
let webContext;
test.beforeAll(async ({browser})=>
{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("#userEmail").fill("nikhil.deshmukh2301@gmail.com");
await page.locator("#userPassword").fill("Nikhil@2301");
await page.locator("input#login").click();
await page.waitForLoadState('networkidle');
await page.context().storageState({path:'state.json'});
webContext = await browser.newContext({storageState:'state.json'});
});

test('login test', async ()=>{
 const page = await webContext.newPage();
 await page.goto("https://rahulshettyacademy.com/client/");
  await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();
 await page.pause();
});