import {test, expect, Locator} from "@playwright/test";

test("verify dropdown if it sorted", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const optionColors:Locator = page.locator('#colors>option');

    const colorText = (await optionColors.allTextContents()).map(text=>text.trim());

    const originalList:string [] = [...colorText];
    const sortedlist:string [] = [...colorText].sort();

    console.log("Original list is:",originalList);
    console.log("sorted List is:",sortedlist);

    expect(originalList).not.toEqual(sortedlist);
});

test("Verify if dropdown has duplicates", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const option:Locator = page.locator('#colors>option');

    const optionText = (await option.allTextContents()).map(text=>text.trim());

    const myset = new Set<string>;
    const duplicate:string[] = [];

    for(const text of optionText)
    {
        if(myset.has(text))
        {
            duplicate.push(text);
        }
        else
        {
            myset.add(text);
        }
    }
    console.log(duplicate);

});