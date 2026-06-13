import { test, expect, Locator } from "@playwright/test";

test("verify checkboxes and dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //click  on single checkbox
    const sundayBox: Locator = page.locator('#sunday');
    await expect(sundayBox).toBeVisible();
    await expect(sundayBox).toBeEnabled();
    await sundayBox.check();
    await expect(sundayBox).toBeChecked();

    //click on all CheckBox

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays = days.map(index => page.getByLabel(index));
    for (const day of weekdays) {
        await day.check();
        await expect(day).toBeChecked();
    }

    //uncheck last 3 checkboxes

    for (const day of weekdays.slice(-3)) {
        await day.uncheck();
        await expect(day).not.toBeChecked();
    }

    //check given checkbox
    const dayname: string = "Saturday";
    for (const label of days) {
        if (dayname === label) {
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    //dropdowns
    const colorDropdown:Locator = page.locator('select#colors');
    await expect(colorDropdown).toBeVisible();
    await expect(colorDropdown).toBeEnabled();
    await colorDropdown.selectOption(['red', 'green', 'white']);
    await expect(colorDropdown).toHaveValues(['red', 'green', 'white']);

    //verify number of options
    const optionNumbers:Locator = page.locator('#colors>option');
    const optionCount = await optionNumbers.count();
    console.log("Number of option present in drop down is:",optionCount);
    expect(optionCount).toBe(7);

    //verify if text contain in dropdown
    const options: Locator = page.locator('#colors>option');
    const optionText = (await options.allTextContents()).map(text=>text.trim());
    console.log(optionText);
    expect(optionText).toContain('Green');

    //print all dropdowns
    for(const allOptions of optionText)
    {
        console.log(allOptions);
    }

    // check sorted dropdown
    const originalList:string[] = [...optionText];
    const sortedList:string[] = [...optionText].sort()

    console.log("Original list is:",originalList);
    console.log("Sorted List is:",sortedList);
    expect(originalList).not.toEqual(sortedList);
    
    //check duplicates
    const myset = new Set<string>();
    const duplicates:string[] =[];

    for(const text of optionText)
    {
        if(myset.has(text))
        {
            duplicates.push(text);
        }
        else
        {
            myset.add(text);
        }
    }
    console.log("Duplicate values are",duplicates);
});

test.only("Verify Product and Information Retrieval", async({page})=>{
    await page.goto("https://www.bstackdemo.com/");

    //Locate the "Order by" dropdown element.
    const orderBy:Locator = page.locator('.sort Select');
    //Verify the dropdown is displayed and enabled
    await expect(orderBy).toBeVisible();
    await expect(orderBy).toBeEnabled();
    //Select the option "Lowest to highest" from the dropdown
    await orderBy.selectOption('lowestprice');
    await page.waitForTimeout(2000);
    // assert the first matching locator contains expected text
    await expect(orderBy).toHaveValue('lowestprice');

    //Retrieve the list of product price elements.
    const product: Locator = page.locator('.shelf-item__price');
    const ProdctPrice = (await product.allTextContents()).map(text=>text.trim());
    console.log("All product prices are:",ProdctPrice);

    //Retrieve the list of product name elements
    const pName:Locator = page.locator('.shelf-item__title');
    const productName = (await pName.allTextContents()).map(text=>text.trim());
    console.log("All Product names are:", productName);

    //Verify Product names and their prices count are equal.
    expect(productName.length).toBe(ProdctPrice.length);

    //Print each product name along with its corresponding price in the console
    for(let i=0; i<productName.length; i++)
    {
        console.log(`Product Name: ${productName[i]} | Product Price: ${ProdctPrice[i]}`);
    }

    //Identify and Print the Lowest Priced Product:
    const lowestPrice = ProdctPrice[0];
    const lowestProduct = productName[0];

    console.log("Lowest Priced Product Name is:",lowestProduct);
    console.log("Lowest Price Product price is:",lowestPrice);

    //Identify and Print the Highest Priced Product:
    const higestPrice = ProdctPrice[ProdctPrice.length-1];
    const higestProduct = productName[productName.length-1];

    console.log("Higest Priced Product Name is:",higestProduct);
    console.log("Higest Price Product price is:",higestPrice);
});