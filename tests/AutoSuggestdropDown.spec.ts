import {test, expect, Locator} from "@playwright/test";

test("verify auto-suggested dropdowns", async({page})=>{
    await page.goto("https://www.amazon.com/");

    const searchBox = page.getByRole('searchbox', {name:'Search Amazon'});
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEnabled();

    await searchBox.fill('iphone');
    await page.waitForTimeout(3000);

    //count all suggested options
    const suggestion:Locator = page.locator('.s-suggestion-container');
    const count = await suggestion.count();
    console.log("Suggestions are",count);

    //print a specific option
    console.log("6th option is:", await suggestion.nth(6).innerText());

    //print all suggestion using for loop
    for(let i=0; i<count; i++)
    {
        console.log(await suggestion.nth(i).innerText());
    }

    //select a specific option
    for(let i=0; i<count; i++)
    {
        const text = await suggestion.nth(i).innerText();
        if (text.toLowerCase().includes('iphone 17 case')) {
            await suggestion.nth(i).click();
            break;
        }
    }



});