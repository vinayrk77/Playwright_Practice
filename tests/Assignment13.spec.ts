import { test, expect, Locator } from "@playwright/test";

test("Verify static tables", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator('table[name="BookTable"] tbody');
    await expect(table).toBeVisible();

    //count number of rows in a table
    const tableRow: Locator = table.locator('tr');
    const rowCount = await tableRow.count();
    console.log("Number of rows in the able are:", rowCount);
    expect(rowCount).toBe(7);

    //count number of columns in a table
    const tableCols: Locator = tableRow.locator('th');
    const colsCount: number = await tableCols.count();
    console.log("Number of rows in the able are:", colsCount);
    expect(colsCount).toBe(4);

    //Read all data from 2nd row
    const secondRowData: Locator = tableRow.nth(5).locator('td');
    const secondRowText: string[] = await secondRowData.allInnerTexts();
    console.log("Second row data is:", secondRowText);
    await expect(secondRowData).toHaveText(['Master In Java', 'Amod', 'JAVA', '2000']);

    for (let text of secondRowText) {
        console.log(text);
    }

    //read all data from table excluding header
    console.log("Read all table data.....");

    const alltabledata: Locator[] = await tableRow.all();
    for (let data of alltabledata.slice(1)) {
        const cols = await data.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }

    //print bookname where author is mukesh
    console.log("Books writtern by mukesh....");

    const amitBooks:string[] = [];
    for(let data of alltabledata.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const author = cells[1];
        const books = cells[0];
        if(author === "Amit")
        {
            console.log(`${author} \t ${books}`);
            amitBooks.push(books);
        }
    }
    expect(amitBooks).toHaveLength(2);

    //calculate total price of books
    let totalPrice:number = 0;
    for(let data of alltabledata.slice(1))
    {
        const cells = await data.locator('td').allInnerTexts();
        const price = cells[3];

        totalPrice = totalPrice+parseInt(price);
    }
    console.log("Total Price is:", totalPrice);
    expect(totalPrice).toBe(7100);
});

test("Verify Product Sorting and Information Retrieval", async({page})=>{
    await page.goto("https://www.bstackdemo.com/");

    const orderBy:Locator = page.locator('.sort select');
    await expect(orderBy).toBeVisible();
    await expect(orderBy).toBeEnabled();
    await orderBy.selectOption('highestprice');
    await page.waitForTimeout(3000);

    //Retrieve the list of product price elements.
    const price:Locator = page.locator('.shelf-item__price');
    const productPrice:string[] = (await price.allTextContents()).map(text=>text.trim());
    console.log("Product price is:",productPrice);

    //Retrieve the list of product name elements
    const names:Locator = page.locator('.shelf-item__title');
    const productNames:string[] = await names.allTextContents();
    console.log("product names are:",productNames);

    //Verify Product names and their prices count are equal.
    expect(productPrice.length).toBe(productNames.length);

    //Print each product name along with its corresponding price in the console.
    for(let i=0; i<productNames.length; i++)
    {
        console.log(`product Name: ${productNames[i]} | Product Price: ${productPrice[i]}`);
    }

    //Identify and Print the Lowest Priced Product:
    const lowestPrice = productPrice[productPrice.length-1];
    const lowestProduct = productNames[productNames.length-1];
    console.log("Lowest priced product is:",lowestPrice);
    console.log("Lowest price product name is:",lowestProduct);

    //Identify and Print the Highest Priced Product:
    const highestPrice = productPrice[0];
    const higestProduct = productNames[0]
    console.log("Lowest priced product is:",highestPrice);
    console.log("Lowest price product name is:",higestProduct);
});

test.only("verify hidden dropdowns", async({page})=>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await page.locator("input[name='username']").fill('Admin');
    await page.locator("input[name='password']").fill('admin123');
    await page.getByRole('button', {name:'Login'}).click();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    await page.getByText('PIM').click();
    await expect(page.locator('text=Employee Information')).toBeVisible();

    const subUnit:Locator =  page.locator('.oxd-select-text').nth(3);
    await subUnit.click();
    await page.waitForTimeout(3000);

    //print options
    const options:Locator = page.locator("div[role='listbox'] span");
    const optionsText = (await options.allInnerTexts()).map(text=>text.trim());
    console.log("All options are:",optionsText);
    for(let text of optionsText)
    {
        console.log(text);
    }

    //count the number of options
    const count = await options.count();
    console.log("number of options are:",count);
    expect(count).toBe(16);



});

