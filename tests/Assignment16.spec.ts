import {test, expect, Locator} from "@playwright/test";

test("verify and test static tables", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator('table[name="BookTable"] tbody');
    await expect(table).toBeVisible();

    //count table rows
    const tRows = table.locator('tr');
    const countRow = await tRows.count();
    console.log("Number of roes in table are:", countRow);
    expect(countRow).toBe(7);

    //count table cols
    const tCols = table.locator('th');
    const countCols = await tCols.count();
    console.log("Number of roes in table are:", countCols);
    expect(countCols).toBe(4);

    //Read all the data from third row
    const thirdrowdata = tRows.nth(3).locator('td');
    const thirdrowtext:string[] = await thirdrowdata.allInnerTexts();
    console.log("Third row data is:",thirdrowtext);
    expect(thirdrowdata).toHaveText(['Learn JS', 'Animesh', 'Javascript', '300']);

    console.log("Printing third row cells....");
    for(let text of thirdrowtext)
    {
        console.log(text);
    }

    //read all data from table excluding header
    console.log("Read all table data.....");

    const allTableData = await tRows.all();

    for(let data of allTableData.slice(1))
    {
        const cols = await data.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    //print bookname where author is Amit
    console.log("Books writtern by Amit....");

    let amitBooks:string[] = [];

    for(let data of allTableData.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];
        if(author === 'Amit')
        {
            console.log(`${books} \t ${author}`);
            amitBooks.push(books);
        }
    }
    expect(amitBooks).toHaveLength(2);

    //print Total price
    console.log("Printing total price....");

    let totalPrice:number = 0;

    for(const data of allTableData.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const price = cells[3];
        totalPrice = totalPrice+parseInt(price);
    }
    console.log("Total price is:", totalPrice);
    expect(totalPrice).toBe(7100);
});

test("Verify dynamic tables", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table:Locator = page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    //count table rows
    const tableRows = table.locator('tr');
    const rowCount = await tableRows.count();
    console.log("Number ow rows in table are:", rowCount);
    expect(rowCount).toBe(4);

    const rows = await tableRows.all();
    let cpuLoad: string = '';

    for(let row of rows)
    {
        const processName:string = await row.locator('td').nth(0).innerText();
        if(processName === 'chrome')
        {
            cpuLoad = await row.locator('td', {hasText: '%'}).innerText();
            console.log("CPU load of chrome is:",cpuLoad);
            break;
        }
    }
    //compare it with label value
    const label: Locator = page.locator('#displayValues p', { hasText: 'CPU load of Chrome process:' });
    const labelText = await label.innerText();
    console.log("Value of label:",labelText);

    if(labelText.includes(cpuLoad))
    {
        console.log("CPU load of chrome is equal");
    }
    else{
        console.log('CPU load of chrome is not equal');
    }
    expect(labelText).toContain(cpuLoad);
});

test.only("Test pagination table", async({page})=>{

    await page.goto("https://datatables.net/");

    //capture all data from table

    const hasmorePages:boolean = true;

    while(hasmorePages)
    {
        const rows:Locator[]= await page.locator('#example tbody tr').all();

        for(let row of rows)
        {
            console.log(await row.innerText());
        }
        const isDisabled = 
    }



});