import {test, expect} from "@playwright/test";

test("Very and assert the given table", async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/challenging_dom");

    //Verify there are 3 buttons at the top.
    const buttons = page.locator('div.large-2 a');
    await expect(buttons).toHaveCount(3);
    //Print the text of each button.
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
        const text = await buttons.nth(i).innerText();
        console.log(text);
    }
    //Total number of rows.
    const tableRows = page.locator('.large-10 table tbody tr');
    const rowCount = await tableRows.count();
    console.log("number of tows are:", rowCount);
    expect(rowCount).toBe(10);

    //Total number of columns
    const tableCols = page.locator('.large-10 table th');
    const colsCount = await tableCols.count();
    console.log("Number of columns are", colsCount);
    expect(colsCount).toBe(7);
    //Print every row.
    for(let i=0; i<rowCount; i++)
    {
        const tableData = await tableRows.nth(i).innerText();
        console.log(tableData);
    }
    //Find the row where: Apeirian = Apeirian7 and print row
    console.log("Printing row where Apeirian = Apeirian7 ")
    for(let i=0; i<rowCount; i++)
    {
        const row = tableRows.nth(i);
        const rowText = await row.innerText();
        if(rowText.includes('Apeirian7'))
        {
            console.log(rowText);
            break;
        }
    }

    //Find Longest Text
    console.log("First row data .......")
    const firstrow = tableRows.nth(0);
    const data = firstrow.locator('td');
    const dataText = await data.allTextContents();
    console.log(dataText.join(', '));
    let maxLength = '';
    for (const cellText of dataText.slice(-1)) {
        if (cellText.length > maxLength.length) {
            maxLength = cellText;
        }
    }
    console.log('Longest text in first row:', maxLength);


});