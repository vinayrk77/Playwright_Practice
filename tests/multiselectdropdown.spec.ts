import { test, expect, Locator } from "@playwright/test";

test("Verify multi select dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#colors").selectOption(['Red', 'Blue', 'Yellow']);

    const optionText:Locator = page.locator("#colors>option");
    expect(optionText).toHaveCount(7);

    //print all options
    const options = (await optionText.allTextContents()).map(text=>text.trim());
    console.log(options);
    expect(options).toContain('White');

    for(const allOptions of options)
    {
        console.log(allOptions);
    }


});