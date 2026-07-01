import {test, expect, Locator} from "@playwright/test";

const searchitems = ['gift card', 'camera', 'computer', 'laptop'];

for(const items of searchitems)
{
    test(`search test for ${items}`, async({page})=>{
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator('input#small-searchterms').fill(items);
        await page.getByRole('button', {name: 'Search'}).click();
        await expect(page.locator('h2 a').nth(0)).toContainText(items, {ignoreCase: true});


    });
}