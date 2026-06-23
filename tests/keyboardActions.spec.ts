import {test, expect} from "@playwright/test";

test("verify keyboard actions", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    const input1 = page.locator("#input1");

    //1.Focus on input
    await input1.focus();

    //insert text
    await page.keyboard.insertText("Welcome Vinay");
     
    // seclect the text from input ctrl + A
    await page.keyboard.down('Control');
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    //Control+c - copy text from first input box
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');

    //press tab key 2 times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    //cntrl v paste in second input 
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    //press tab key 2 times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

     //cntrl v paste in second input 
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');

    await page.waitForTimeout(5000);
});

test.only("test keyboard with simple method", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const input1 = page.locator("#input1");

    await input1.focus();

    await page.keyboard.insertText("Welcome King");

    await page.keyboard.press('Control+A');
    await page.keyboard.press('Control+C');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Control+V');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Control+V');

    await page.waitForTimeout(5000);

});