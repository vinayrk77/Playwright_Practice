import { test, expect, Locator } from "@playwright/test";

test("verify static table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //count number of rows in a table
    const tableRows: Locator = page.locator("table[name='BookTable'] tbody tr");
    const count: number = await tableRows.count();
    console.log("Number of rows in table are:", count);
    expect(count).toBe(7);

    //count the number of columns
    const tableColumns: Locator = tableRows.locator("th");
    const numcol: number = await tableColumns.count();
    console.log("Number of columns in table are:", numcol);
    expect(numcol).toBe(4);

    //Read all data from 2nd row

    const secondRowCell: Locator = tableRows.nth(2).locator('td');
    const secondRowText: string[] = await secondRowCell.allInnerTexts();
    console.log("2nd row data is:", secondRowText);

    await expect(secondRowCell).toHaveText(['Learn Java', 'Mukesh', 'Java', '500']);

    console.log("Printing 2nd roe text.....")
    for (const text of secondRowText) {
        console.log(text);
    }

    //read all data from table excluding header
    console.log("Read all table data.....");

    const allRowData: Locator[] = await tableRows.all();  // get all row locator
    for (let rows of allRowData.slice(1)) {
        const cols = await rows.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    //print bookname where author is mukesh
    console.log("Books writtern by mukesh....");
    const mukeshBooks: string[] = [];

    for (let rows of allRowData.slice(1)) {
        const cells = await rows.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];
        if (author === 'Mukesh') {
            console.log(`${author} \t ${books}`);
            mukeshBooks.push(books);
        }
    }
    expect(mukeshBooks).toHaveLength(2);

    //calculate total price of books
    let totalPrice:number = 0;
    for(let rows of allRowData.slice(1))
    {
        const cells = await rows.locator('td').allInnerTexts();
        const price = cells[3];
        totalPrice = totalPrice+parseInt(price);
    }
    console.log("Total price is:",totalPrice);
    expect(totalPrice).toBe(7100);
});