import {test, expect, Locator} from "@playwright/test";

test("Verify single select dropdown", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const country:Locator = page.locator('#country');
    await country.selectOption('Japan');

    //verify number of dropdowns
    const options: Locator = page.locator("#country>option");
    expect(options).toHaveCount(10);

    //verify if text contain in dropdown

    const optionText = (await options.allTextContents()).map(text=>text.trim());
    console.log(optionText);
    expect(optionText).toContain('India');

    //print all options
    for(const option of optionText)
    {
        console.log(option);
    }
});