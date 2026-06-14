import { test, expect, Locator } from "@playwright/test";

test("Verify checkboxes and dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //check a single check box
    const monCheckbox: Locator = page.locator('#monday');
    await expect(monCheckbox).toBeVisible();
    await expect(monCheckbox).toBeEnabled();
    await monCheckbox.check();
    await expect(monCheckbox).toBeChecked();

    //check all checkbox
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays = days.map(index => page.getByLabel(index));
    for (const day of weekdays) {
        await day.check();
        await expect(day).toBeChecked();
    }

    //uncheck last 3 checkbox
    for (const day of weekdays.slice(-3)) {
        await day.uncheck();
        await expect(day).not.toBeChecked();
    }

    //check a given check box
    const dayname: string = "Saturday";
    for (const label of days) {
        if (dayname === label) {
            const weekname = page.getByLabel(label);
            await weekname.check();
            await expect(weekname).toBeChecked();
        }
    }

    //select any 3 colours
    const colors: Locator = page.locator('#colors');
    await expect(colors).toBeVisible();
    await expect(colors).toBeEnabled();
    await colors.selectOption(['green', 'red', 'white']);
    await expect(colors).toHaveValues(['red', 'green', 'white']);

    // check the count
    const count = await page.locator('#colors option').count();
    console.log("Number of colours are:", count);
    expect(count).toBe(7);

    //check if text exists
    const colorOptions: Locator = page.locator('#colors>option');
    const optionText = (await colorOptions.allTextContents()).map(text => text.trim());
    expect(optionText).toContain('Blue');

    //check if sorted
    const originalList: string[] = [...optionText];
    const sortedList: string[] = [...optionText].sort();

    console.log("Original list is:", originalList);
    console.log("Sorted list is", sortedList);
    expect(sortedList).not.toEqual(originalList);

    //check if duplicates
    const myset = new Set<string>();
    const duplicates: string[] = [];

    for (const text of optionText) {
        if (myset.has(text)) {
            duplicates.push(text);
        }
        else {
            myset.add(text);
        }
    }
    console.log("Duplicate values are:", duplicates);
});

test("Verify Product Sort and Information Retrieval", async ({ page }) => {
    await page.goto("https://www.bstackdemo.com/");

    //Locate the "Order by" dropdown element.
    const orderBy: Locator = page.locator(".sort>select");
    //Verify the dropdown is displayed and enabled.
    await expect(orderBy).toBeVisible();
    await expect(orderBy).toBeEnabled();
    //Select the option "Lowest to highest" from the dropdown.
    await orderBy.selectOption('lowestprice');
    await page.waitForTimeout(3000);

    //Retrieve the list of product price elements.
    const price: Locator = page.locator('.shelf-item__price');
    const productprice = (await price.allTextContents()).map(text => text.trim());
    console.log("Product prices are:", productprice);

    //Retrieve the list of product name elements.
    const names: Locator = page.locator('.shelf-item__title');
    const productnames = await names.allTextContents();
    console.log("Product names are:", productnames);

    //Verify Product names and their prices count are equal.
    expect(productnames.length).toBe(productprice.length);

    //Print each product name along with its corresponding price in the console.
    for (let i = 0; i < productnames.length; i++) {
        console.log(`Product Name: ${productnames[i]} | Prodct Price: ${productprice[i]}`)
    }

    //Access the first element of the product prices list and the first element of the product names list.
    const lowestPrice = productprice[0];
    const lowestProduct = productnames[0];
    console.log("Lowest price Product Name is:", lowestProduct);
    console.log("Lowest price Product is:", lowestPrice);

    //Identify and Print the Highest Priced Product:
    const highPrice = productprice[productprice.length - 1];
    const highProduct = productnames[productnames.length - 1];
    console.log("Higest price Product Name is:", highProduct);
    console.log("Higest price Product is:", highPrice);
});

test.only("Verify basic orange HRM demo", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page.locator('text=Employee Information')).toBeVisible();

    //click subunit dropdown
    await page.locator('form i').nth(3).click();
    await page.waitForTimeout(2000);

    //capture all options in dropdown
    const options: Locator = page.locator("div[role='listbox'] span");
    const optionText = (await options.allTextContents()).map(text => text.trim());
    console.log("All dropdown list is", optionText);
    for (const text of optionText) {
        console.log("List of opion is:", text);
    }

    //count options
    const count = optionText.length;
    console.log("Number of options in dropdown are:", count);


    //verify option is present in list and select it
    expect(optionText).toContain('Quality Assurance');
    await page.locator("div[role='listbox'] span", { hasText: 'Quality Assurance' }).click();

    //sort the option list

    const originalList: string[] = [...optionText];
    const sortedList: string[] = [...optionText].sort();

    console.log("Original List is:", originalList);
    console.log("SortedList is:", sortedList);

    if (JSON.stringify(originalList) === JSON.stringify(sortedList)) {
        console.log("Dropdown is sorted");
    } else {
        console.log("Dropdown is not sorted");
    }


});
