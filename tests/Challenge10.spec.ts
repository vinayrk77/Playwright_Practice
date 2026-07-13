import {test, expect, Locator} from "@playwright/test";

test("verify add to cart", async({page})=>{
    await page.goto("https://demo.owasp-juice.shop/#/");
    //await page.pause()

    await page.locator('hide-lt-sm').filter({hasText: 'Dismiss'}).click();




});
