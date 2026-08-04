import { test, expect, request } from '@playwright/test';
import {ApiUtils} from '../helpers/ApiUtils';

const loginPayload = { userEmail: "nikhil.deshmukh2301@gmail.com", userPassword: "Nikhil@2301" };
const orderPayload = { "orders": [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.placeOrder(orderPayload);
});

test('login with API', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    //await page.pause();
});

test.only('placed order by API', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard");
    
    console.log(response.orderId);
    await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();

    const rows = await page.locator("tbody tr");
 
for(let i =0; i<await rows.count(); ++i)
{
   const rowOrderId =await rows.nth(i).locator("th").textContent();
   if (response.orderId.includes(rowOrderId))
   {
       await rows.nth(i).locator("button").first().click();
       break;
   }
}
const orderIdDetails =await page.locator(".col-text").textContent();
await page.pause();
expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});