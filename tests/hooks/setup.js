import { test as setup, expect } from '@playwright/test';
import creds from '../../testData/creds.json';
import { LoginPage } from '../../pages/loginpage.js';

setup('authenticate user', async ({ page }) => {

    await page.goto('client/#/auth/login');

    const login = new LoginPage(page);
    const user = creds.user ?? creds;
    await login.loginToApplication(
        user.email,
        user.password
    );

    // wait for navigation or a dashboard indicator to ensure token/localStorage is set
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/.*dashboard.*/,{ timeout: 10000 }).catch(()=>{});
    await expect(page).toHaveURL(/dashboard|dash/).catch(()=>{});

    await page.context().storageState({
        path: 'stateuser.json'
    });
});


setup('authenticate admin', async ({ page }) => {

    await page.goto('client/#/auth/login');

    const login = new LoginPage(page);
    const admin = creds.admin ?? creds;
    await login.loginToApplication(
        admin.email,
        admin.password
    );

    // wait for navigation or a dashboard indicator to ensure token/localStorage is set
    await page.waitForLoadState('networkidle');
    await page.waitForURL(/.*dashboard.*/,{ timeout: 10000 }).catch(()=>{});
    await expect(page).toHaveURL(/dashboard|dash/).catch(()=>{});

    await page.context().storageState({
        path: 'stateadmin.json'
    });
});