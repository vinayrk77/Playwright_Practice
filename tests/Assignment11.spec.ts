import {test, expect, Locator} from "@playwright/test";

test("Verify tables", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //capture table
    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible()

    //count number of rows in a table
    const trow:Locator = table.locator("tr");
    const tablerows = await trow.count();
    console.log("number of rows are:",tablerows);
    expect(tablerows).toBe(7);
    
    //count the number of columns
    const tcols:Locator = trow.locator("th");
    const tablecols = await tcols.count();
    console.log("Number of colums are:",tablecols);
    expect(tablecols).toBe(4);

    //Read all data from 2nd row
    const secondRowData:Locator = trow.nth(3).locator("td");
    const secondRowText: string[] = await secondRowData.allInnerTexts();
    console.log("second row data is:", secondRowText);
    await expect(secondRowData).toHaveText([ 'Learn JS', 'Animesh', 'Javascript', '300' ]);

    for(let text of secondRowText)
    {
        console.log(text);
    }

    //read all data from table excluding header
    console.log("Read all table data.....");

    const alldata:Locator[] = await trow.all();
    for(let data of alldata.slice(1))
    {
        const cols = await data.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }
    
    //print bookname where author is mukesh
    console.log("Books writtern by mukesh....");
    const mukeshBooks: string[] = [];
    for(let data of alldata.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];
        if(author === "Mukesh")
        {
            console.log(`${author} \t ${books}`)
            mukeshBooks.push(books);
        }
    }
    expect(mukeshBooks).toHaveLength(2);
    
    //calculate total price of books
    let totalPrice:number = 0;
    for(let data of alldata.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const price = cells[3];
        totalPrice = totalPrice+parseInt(price);
    }
    console.log("Total Price is:", totalPrice);
    expect(totalPrice).toBe(7100);



});