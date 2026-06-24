import {test, expect} from "@playwright/test";

test("verify and interact with shadow dom", async({page})=>{
    await page.goto("https://www.sreenidhirajakrishnan.com/practice#section-1");

    await page.locator('#shadow-input').fill('I am a playwright tester');
    await page.waitForTimeout(5000);

    await page.getByRole('button', {name: 'Shadow Submit'}).click();

    const msg = await page.locator('#shadow-result').innerText();
    console.log("Entered text is",msg);
    expect(msg).toContain('I am a playwright tester');
});

test.only("shadodom 2", async({page})=>{
    await page.goto('https://shop.polymer-project.org/');

    await page.getByRole('link', {name: 'Shop Now'}).nth(0).click();
    await page.waitForTimeout(5000);

    const allProducts = await page.locator('div.title').all();
    console.log("number of product found", allProducts.length);
    expect(allProducts.length).toBe(16);


});