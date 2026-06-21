import { test, expect, Locator } from "@playwright/test";

test("Verify static tables", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //capture table and verify visibility
    const table: Locator = page.locator("table[name = 'BookTable'] tbody");
    await expect(table).toBeVisible();

    //capture and count all rows
    const tablerow: Locator = table.locator('tr');
    const rowCount: number = await tablerow.count();
    console.log("Number of rows in table:", rowCount);
    expect(rowCount).toBe(7);

    //capture and count all columns
    const tablecols: Locator = table.locator('th');
    const colsCount: number = await tablecols.count();
    console.log("Number of columns in table:", colsCount);
    expect(colsCount).toBe(4);

    // print all rows
    const allrowdata = await tablerow.all();

    for (let rowdata of allrowdata.slice(1)) {
        const cols = await rowdata.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    //Read all data from 3nd row
    const thirdrowdata: Locator = tablerow.nth(3).locator('td');
    const thirdrowtext: string[] = await thirdrowdata.allInnerTexts();
    console.log("Third row data is", thirdrowtext);
    await expect(thirdrowdata).toHaveText(['Learn JS', 'Animesh', 'Javascript', '300'])



    //print bookname where author is mukesh
    console.log("printing Mukesh books");

    let mukeshBooks: string[] = [];

    for (let rowdata of allrowdata.slice(1)) {
        const cells = await rowdata.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];

        if (author === 'Mukesh') {
            console.log(`${books} \t ${author}`);
            mukeshBooks.push(books);
        }
    }
    expect(mukeshBooks).toHaveLength(2);

    //calculate total price of books
    let totalPrice: number = 0;

    for (let rowdata of allrowdata.slice(1)) {
        const cells = await rowdata.locator('td').allInnerTexts();
        const price = cells[3];
        totalPrice = totalPrice + parseInt(price);
    }
    console.log("Total Price is:", totalPrice);
    expect(totalPrice).toBe(7100);
});

test("Verify Dynamic Web Table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //capture table and verify visibility
    const table: Locator = page.locator("table#taskTable tbody");
    await expect(table).toBeVisible();

    //capture all rows
    const allRows: Locator = table.locator('tr');
    const allRowCount = await allRows.count();
    console.log("Total number of rows are:", allRowCount);
    expect(allRowCount).toBe(4);

    const rows = await allRows.all();

    let cpuLoad = '';

    for (let row of rows) {
        const processName = await row.locator('td').nth(0).innerText();
        if (processName == "Chrome") {
            cpuLoad = await row.locator('td', { hasText: '%' }).innerText();
            console.log("Cpu load for Chrome is:", cpuLoad);
            break;
        }
    }

    //Compare it with value in the label.
    const lable: Locator = page.locator('#displayValues p', { hasText: 'CPU load of Chrome process:' });
    const lableText: string = await lable.innerText();
    console.log("Cpu Load inside Label is:", lableText);

    if (lableText.includes(cpuLoad)) {
        console.log("CPU load of chrome is equal");
    }
    else {
        console.log("CPU load of chrome is not equal");
    }
    expect(lableText).toContain(cpuLoad);

});

test("Verify Pagination Web Table", async ({ page }) => {
    await page.goto("https://datatables.net/");

    //read all the data from table pages
    let hasmorePages = true;

    while (hasmorePages) {
        const rows: Locator[] = await page.locator('#example tbody tr').all();

        for (let row of rows) {
            console.log(await row.innerText());
        }

        const nextButton = page.getByRole('link', { name: 'Next' });
        const isDisabled = await nextButton.getAttribute('class');

        if (isDisabled?.includes('disabled')) {
            hasmorePages = false;
        }
        else {
            await nextButton.click();
        }
    }
});

test("Filetr the rows and check count", async ({ page }) => {
    await page.goto("https://datatables.net/");

    const filter: Locator = page.locator('select.dt-input');
    await expect(filter).toBeVisible();
    await expect(filter).toBeEnabled();

    await filter.selectOption('50');

    const allrow: Locator = page.locator('#example tbody tr');
    const allrowCount = await allrow.count();
    console.log("Total number of rows are", allrowCount);
    expect(allrowCount).toBe(50);
});

test("Verify the search elemet present in a row", async ({ page }) => {
    await page.goto("https://datatables.net/");

    const searchBox: Locator = page.locator("input.dt-input");
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEnabled();

    await searchBox.fill('Thor Walton');

    const rows: Locator[] = await page.locator('#example tbody tr').all();

    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            const text = await row.innerText();
            if (text.includes('Thor Walton')) {
                console.log("Match found");
                matchFound = true;
                break;
            }
            else {
                console.log("Match not found");
            }
        }
    expect(matchFound).toBeTruthy();
}
});

test.only("Verify date pickers",async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datePicker:Locator = page.locator("input#datepicker");
    await expect(datePicker).toBeVisible();
    await expect(datePicker).toBeEnabled();

    await datePicker.click();

    const year:string = '2026';
    const month:string = 'December';
    const date: string = '31';

    while(true)
    {
        const currentMonth:string = await page.locator(".ui-datepicker-month").innerText();
        const currentYear:string = await page.locator(".ui-datepicker-year").innerText();

        if(currentMonth === month && currentYear === year)
        {
            break;
        }

        //Future
        await page.locator('.ui-datepicker-next').click();

    }

    const alldates: Locator[] = await page.locator('.ui-datepicker-calendar td a').all();
    for(let dt of alldates)
    {
        const dateText = await dt.innerText();
        if(dateText === date)
        {
            await dt.click();
            break;
        }
    }
    const expectedDate = '12/31/2026';
    await expect(datePicker).toHaveValue(expectedDate);

    await page.waitForTimeout(5000);


});