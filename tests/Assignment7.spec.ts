import { test, expect, Locator } from "@playwright/test";

test("veryfy checkboxex and dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const femalebtn: Locator = page.locator('input#female');
    await expect(femalebtn).toBeVisible();
    await expect(femalebtn).toBeEnabled();
    const initialStatus = await femalebtn.isChecked();
    console.log("Status before checking is:", initialStatus);

    await femalebtn.check();

    const finalStatus = await femalebtn.isChecked();
    console.log("Status before checking is:", finalStatus);
    await expect(femalebtn).toBeChecked();

    //check single checkbox
    const mondaybox:Locator = page.locator('input#monday');
    await expect(mondaybox).toBeVisible();
    await expect(mondaybox).toBeEnabled();
    await mondaybox.check();
    await expect(mondaybox).toBeChecked();

    // check all checkboxes

    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays = days.map(index=>page.getByLabel(index));

    for(let alldays of weekdays)
    {
        await alldays.check();
        await expect(alldays).toBeChecked();
    }

    //uncheck last 3

    for(let alldays of weekdays.slice(-3))
    {
        await alldays.uncheck();
        await expect(alldays).not.toBeChecked();
    }

    //check specified checkbox
    const dayname: string = "Saturday";
    for(let label of days)
    {
        if(label === dayname)
        {
            const checkbox:Locator = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    //dropdowns
    const dropDown:Locator = page.locator('#country');
    await expect(dropDown).toBeVisible();
    await expect(dropDown).toBeEnabled();
    await dropDown.selectOption('Brazil');
    
    //verify number of options
    const options:Locator = page.locator('#country>option');
    expect(options).toHaveCount(10);
    
    //verify if text contain in dropdown
    const optionText = (await options.allTextContents()).map(text=>text.trim());
    console.log(optionText);
    expect(optionText).toContain('United Kingdom');

    //print all dropdowns
    for(const allText of optionText)
    {
        console.log(allText);
    }
    // check sorted dropdown

    const originalList:string[] = [...optionText];
    const sortedList:string[] = [...optionText].sort();

    console.log("Original list is:",originalList);
    console.log("sorted list is:",sortedList);
    expect(originalList).not.toEqual(sortedList);

    //check duplicates
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
            myset.add(text)
        }
    }
    console.log(duplicate);
    




});