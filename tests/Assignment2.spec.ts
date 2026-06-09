import {test, expect, Locator} from "@playwright/test";

test("Verify radio button", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Verify Male radio button is visible.
    const malebutton:Locator = page.locator('#male');
    await expect(malebutton).toBeVisible();
    await expect(malebutton).toBeEnabled();

    await expect(malebutton).not.toBeChecked();

    await malebutton.check();
    await expect(malebutton).toBeChecked();

    const femaleButton: Locator = page.locator('#female');
    await expect(femaleButton).not.toBeChecked();

});