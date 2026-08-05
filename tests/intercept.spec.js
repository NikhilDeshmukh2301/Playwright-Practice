import { test, expect, request } from '@playwright/test';
import {ApiUtils} from '../helpers/ApiUtils';

const loginPayload = { userEmail: "nikhil.deshmukh2301@gmail.com", userPassword: "Nikhil@2301" };
const orderPayload = { "orders": [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
let response;
let fakeResponse = {data: [], message: "No Orders"};

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.placeOrder(orderPayload);
});

test.only('check for order page is empty', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard");

    page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route =>{
        const responsev= page.request.fetch(route.request());
        let body= JSON.stringify(fakeResponse);
        route.fulfill({
            response,
            body
        });
        });
    await page.pause();
    console.log(response.orderId);
    await page.locator("button[routerlink*='myorders']").click();
     await page.locator("tbody").waitFor();

});