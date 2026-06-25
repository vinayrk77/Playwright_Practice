import {test, expect, Locator} from "@playwright/test";

test("verify scrooling to flooter", async({page})=>{
    await page.goto('https://demowebshop.tricentis.com/');
    const footerText:string = await page.locator('.footer-disclaimer').innerText();
    console.log("Footer text is:", footerText);
});

test.only("verify scrooling to dropdown", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    await page.locator('input#comboBox').click();
    const dropDown = page.locator('#dropdown div:nth-child(100)');
    const dropDownText = await dropDown.innerText();
    console.log("Option captured by dropdown", dropDownText);
    await dropDown.click();
});