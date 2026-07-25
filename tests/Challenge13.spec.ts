import {test, expect} from "@playwright/test";

test("Very and assert the given table", async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/challenging_dom");

    //Verify there are 3 buttons at the top.
    const buttons = page.locator('div.large-2 a');
    await expect(buttons).toHaveCount(3);
    //Print the text of each button.
    const count = await buttons.count();
    let buttonText = '';
    for (let i = 0; i < count; i++) {
        buttonText = await buttons.nth(i).innerText();
        console.log(buttonText);
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
    console.log("first column data .......");
    const dataText = [];
    for(let i=0; i<rowCount; i++)
    {
        const cols = await tableRows.nth(0).innerText();
        console.log(cols);
        dataText.push(cols);
    }
    
    let maxLength = '';
    for (const cellText of dataText) {
        if (cellText.length > maxLength.length) {
            maxLength = cellText;
        }
    }
    console.log('Longest text in first row:', maxLength);

    //Count "edit"
    const editLink = page.getByRole('link', {name: 'edit'});
    const editCount = await editLink.count();
    console.log(editCount);
    expect(editCount).toEqual(rowCount);

    //Click the Edit link of row 5.
    const fifthEditlink = editLink.nth(4);
    await expect(fifthEditlink).toBeVisible();
    await fifthEditlink.click();
    console.log("Edit link clicked successfully");

    //Click the Delete link of the last row.
    const deleteLink = page.getByRole('link', {name: 'delete'}).nth(9);
    await expect(deleteLink).toBeVisible();
    await deleteLink.click();
    console.log("Delete link clicked successfully")

    //The three colored buttons at the top change their text every time the page reloads.

    //Captures their text.
    console.log("Button names before reload");
    console.log(buttonText);
    //Reloads the page.
    await page.keyboard.press('Control+R');
    //Captures the text again.
    console.log("Button names after reload");
    let button2 = '';
    for (let i = 0; i < count; i++) {
        button2 = await buttons.nth(i).innerText();
        console.log(button2);
    }
    expect(button2).not.toContainEqual(buttonText);
});