import creds from "../testData/creds.json";
import{test,expect} from "@playwright/test";
import { LoginPage } from "../pages/loginpage.js";
import { CommonLates } from "../helpers/commonLates.js";
import { dashboardPage } from "../pages/dashboardPage.js";

// let userwebContext;
 // let adminwebContext;

 /* test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
await page.goto('client/#/auth/login');
   const user = creds.user ?? creds;
  
   const login = new LoginPage(page);
   const common = new CommonLates(page);
   await login.validateTitle("Let's Shop");
   await login.loginToApplication(user.email, user.password);
   await page.waitForLoadState('networkidle');
   await page.context().storageState({path:'stateuser.json'});
   userwebContext = await browser.newContext({storageState:'stateuser.json'});

});

test.beforeAll(async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
await page.goto('client/#/auth/login');
   const admin = creds.admin ?? creds;
  
   const login = new LoginPage(page); 
   const common = new CommonLates(page);
   await login.validateTitle("Let's Shop");
   await login.loginToApplication(admin.email, admin.password);
   await page.waitForLoadState('networkidle');
   await page.context().storageState({path:'stateadmin.json'});
   adminwebContext = await browser.newContext({storageState:'stateadmin.json'});

});

test("login to the application with valid creds", async ({page})=>{
   await page.goto('client/#/auth/login');
   const user = creds.user ?? creds;
  
   const login = new LoginPage(page);
   const common = new CommonLates(page);
   await login.validateTitle("Let's Shop");
   await login.loginToApplication(user.email, user.password);
   await common.validateUrl(/dashboard/);

});

*/

test("place order", async ({page})=>{
   // const page = await webContext.newPage();
    await page.goto('client/#/dashboard/dash');
   const dashboard = new dashboardPage(page);
   await dashboard.ViewProduct("ADIDAS ORIGINAL");
});