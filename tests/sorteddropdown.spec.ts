import {test, expect, Locator} from "@playwright/test";

test("verify dropdowns", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const animalList:Locator = page.locator('#animals>option');

    const optionText = (await animalList.allTextContents()).map(text=>text.trim());
    
    const originalList: string[] = optionText;
    const sortedlist: string[] = optionText.sort();

    console.log("Original list is:",originalList);
    console.log("Sorted List is:",sortedlist);
});

test("verify if the dropdown is sorted", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const colorOptions:Locator = page.locator('#colors>option');

    const optionText = (await colorOptions.allTextContents()).map(text=>text.trim());

    const originalList:string[] = [...optionText];
    const sortedList:string[] = [...optionText].sort();

    console.log("Original array is:",originalList);
    console.log("Sorted list is:",sortedList);

    //expect(originalList).toEqual(sortedList);
});

test.only("Verify and print duplicates", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const colorList:Locator = page.locator('#colors>option');

    const optionText = (await colorList.allTextContents()).map(text=>text.trim());
    
    const myset = new Set<string>;
    const duplicate: string[] = [];

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