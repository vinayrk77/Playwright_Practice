import {test, expect, chromium} from "@playwright/test";

test("Verify browser context", async({})=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();


    const page1 = await context.newPage();
    const page2 = await context.newPage();

    await page1.goto('https://testautomationpractice.blogspot.com/');
    await expect(page1).toHaveTitle('Automation Testing Practice');

    await page2.goto('https://playwright.dev/');
    await expect(page2).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');


});