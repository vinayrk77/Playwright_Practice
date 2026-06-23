import {test, expect} from "@playwright/test";

test("verify and habndle auth popup", async({browser})=>{
    const context = await browser.newContext({httpCredentials: {username: 'admin', password: 'admin'}});
    const page = await context.newPage();

    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState();

    await expect(page.locator('text=Congratulations')).toBeVisible();


});