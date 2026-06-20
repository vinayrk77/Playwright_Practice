import { test, expect, Locator } from "@playwright/test";

test("Verify checkBoxes", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //select single checkbox

    const wednesdayBox: Locator = page.locator("input#wednesday");
    await expect(wednesdayBox).toBeVisible();
    await expect(wednesdayBox).toBeEnabled();
    await wednesdayBox.check();
    await expect(wednesdayBox).toBeChecked();

    // select all check box
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays = days.map(day => page.getByLabel(day));
    for (let weekday of weekdays) {
        await weekday.check();
        await expect(weekday).toBeChecked();
    }

    // uncheck last 3 checkboxes
    for (let weekday of weekdays.slice(-3)) {
        await weekday.uncheck();
        await expect(weekday).not.toBeChecked();
    }

    //check any given check box
    const name: string = "Saturday";
    for (let lable of days) {
        if (lable === name) {
            const weekname = page.getByLabel(lable);
            await weekname.check();
            await expect(weekname).toBeChecked();
        }
    }
});

test("Verify dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //capture dropdown and check visible and select any 3 options
    const colorsdropdown: Locator = page.locator('select#colors');
    await expect(colorsdropdown).toBeVisible();
    await colorsdropdown.selectOption(['yellow', 'white', 'green']);
    await expect(colorsdropdown).toHaveValues(['green', 'yellow', 'white']);

    //count number of options
    const coloroptions: Locator = page.locator("#colors option");
    const count = await coloroptions.count();
    expect(count).toBe(7);

    //check if colour exists and print all options
    const colorText = (await coloroptions.allTextContents()).map(text => text.trim());
    expect(colorText).toContain('Blue');
    for (let text of colorText) {
        console.log(text);
    }

    //check if dropdown is sorted
    const originalList: string[] = [...colorText];
    const sortedlist: string[] = [...colorText].sort();

    console.log("original List is", originalList);
    console.log("sorted list is:", sortedlist);

    if (JSON.stringify(originalList) === JSON.stringify(sortedlist)) {
        console.log("Dropdown is sorted");
    }
    else {
        console.log("Dropdown is NOT sorted");
    }

    //check if duplicates
    const myset = new Set<string>();
    const duplicates: string[] = [];

    for (const text of colorText) {
        if (myset.has(text)) {
            duplicates.push(text);
        }
        else {
            myset.add(text);
        }
    }
    console.log("Duplicate text are:", duplicates);
});

test("Verify static table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //count number of rows in a table
    const tablerows: Locator = table.locator('tr');
    const rowCount = await tablerows.count();
    console.log("Number of rows in table:", rowCount);
    expect(rowCount).toBe(7);

    //count the number of columns
    const tableCols: Locator = table.locator('th');
    const colsCount = await tableCols.count();
    console.log("Number of columns in table:", colsCount);
    expect(colsCount).toBe(4);

    //Read all data from 5th row
    const fifthRowCell: Locator = tablerows.nth(5).locator('td');
    const fifthRowtext = await fifthRowCell.allInnerTexts();
    console.log("5th row data is:", fifthRowtext);
    await expect(fifthRowCell).toHaveText(['Master In Java', 'Amod', 'JAVA', '2000']);

    //printing fifth row
    for (let text of fifthRowtext) {
        console.log(text);
    }

    //read all data from table excluding header
    let alldata: Locator[] = await tablerows.all();

    for (let data of alldata.slice(1)) {
        const cols = await data.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    //print bookname where author is Amit
    const amitBooks: string[] = [];
    for (let data of alldata.slice(1)) {
        const cells = await data.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];

        if (author === 'Amit') {
            console.log(`${author} \t ${books}`);
            amitBooks.push(books);

        }
    }
    expect(amitBooks).toHaveLength(2);

    //calculate total price of books
    let totalPrice: number = 0;
    for (let data of alldata.slice(1)) {
        const cells = await data.locator('td').allInnerTexts();
        const price = cells[3];
        totalPrice = totalPrice + parseInt(price);
    }
    console.log("Total price is:", totalPrice);
    expect(totalPrice).toBeGreaterThan(0);
});

test.only("Verify static tabe", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table");

    //For Chrome process get value of CPU load.
    //Locate the table and check visibility
    const table: Locator = page.locator("table[class='table table-striped'] tbody");
    await expect(table).toBeVisible();

    //capture all rows
    const tablerows: Locator = table.locator('tr');
    const rowCount = await tablerows.count();
    console.log("Number of tables are:", rowCount);
    expect(rowCount).toBe(4);

    const rows = await tablerows.all();

    let cpuLoad = '';
    for (let row of rows) {
        const processName = await row.locator('td').nth(0).innerText();
        if (processName === 'Chrome') {
            cpuLoad = await row.locator('td', { hasText: '%' }).innerText();
            console.log("CPU load is:", cpuLoad);
            break;
        }
    }

    //Compare it with value in the yellow label.
    let yellowboxtext: Locator = page.locator("#chrome-cpu");
    await expect(yellowboxtext).toBeVisible();
    const yellowBoxTextValue = await yellowboxtext.innerText();
    console.log("Cpu load value inside yellow box is:", yellowBoxTextValue);

    if (yellowBoxTextValue.includes(cpuLoad)) {
        console.log("CPU load of chrome is equal");
    }
    else {
        console.log("CPU load of chrome is not equal");
    }
    expect(yellowBoxTextValue).toContain(cpuLoad);



});