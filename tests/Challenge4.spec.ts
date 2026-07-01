import {test, expect, Locator} from "@playwright/test";

test("verify Memory Size of Firefox", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    const tablerows = table.locator('tr');
    const rowCount = await tablerows.count();
    console.log("Number of rows are:", rowCount);
    expect(rowCount).toBe(4);
    
    const headers = page.locator('#taskTable th');
    const headerCount = await headers.count();
    console.log("Number of headers are:",headerCount);
    expect(headerCount).toBe(5);

    let memorySize = -1;
    for(let i=0; i<headerCount; i++)
    {
        const text = await headers.nth(i).innerText();
        if(text === 'Memory (MB)')
        {
            memorySize = i;
            break;
        }
    }
    expect(memorySize).not.toBe(-1);
    const alltabledata = await tablerows.all();
    let fireFoxprocess = '';
    for(let data of alltabledata)
    {
        const process = await data.locator('td').nth(0).innerText();
        if(process === 'Firefox')
        {
            fireFoxprocess = await data.locator('td').nth(memorySize).innerText();
            console.log("Memorysize of firefix is", fireFoxprocess);
            break;
        }
    }
    const bluelabel = page.locator('#displayValues p', {hasText: 'Memory Size of Firefox process:'});
    const blueText = await bluelabel.innerText();
    console.log("Memory size outside is:", blueText);
    expect(blueText).toContain(fireFoxprocess);
    console.log("Memory sizeare equal");
});

test.only("Test highest price flight", async({page})=>{
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');

    const departureCity:Locator = page.locator('select[name="fromPort"]');
    await expect(departureCity).toBeVisible();
    await expect(departureCity).toBeEnabled();
    await departureCity.selectOption('Mexico City');

    const destinationCity:Locator = page.locator('select[name="toPort"]');
    await expect(destinationCity).toBeVisible();
    await expect(destinationCity).toBeEnabled();
    await destinationCity.selectOption('New York');

    await page.getByRole('button', {name: 'Find Flights'}).click();

    const tableRows = page.locator('.table tbody tr');
    const rowCount = await tableRows.count();
    console.log("Number of flights are:",rowCount);
    expect(rowCount).toBe(5);

    const alldata = await tableRows.all();
    let price: number[] = [];
    for(let data of alldata)
    {
        const text = await data.locator('td').nth(5).innerText();
        const textValue = Number(text.replace('$', ''));
        price.push(textValue);
        console.log(textValue);
    }

    //Step 5: Identify the highest Price
    let highestPrice = Math.max(...price);
    console.log(highestPrice);

    //Find total flights available and click on lowest price flight
    for(let i=0; i<rowCount; i++)
    {
        const rows = tableRows.nth(i);
        const rowPrice = Number((await rows.locator('td').nth(5).innerText()).replace('$', ''));
        if(rowPrice === highestPrice)
        {
            await rows.getByRole('button', {name: 'Choose This Flight'}).click();
            break;
        }
    }
    //Step 7: Enter Passenger Information
    await expect(page).toHaveURL('https://blazedemo.com/purchase.php');
    await expect(page).toHaveTitle('BlazeDemo Purchase');

    await page.locator('#inputName').fill('Vinay');
    await page.locator('#address').fill('palm jumera beach dubai');
    await page.locator('#city').fill('Dubai City');
    await page.locator('#state').fill('Dubai');
    await page.locator('#zipCode').fill('421503');
    await page.locator('#cardType').selectOption('American Express');
    await page.locator('#creditCardNumber').fill('4214-5667-8899-1010');
    // clear() returns a Promise<void>, so call clear and fill separately
    const creditCardMonth = page.locator('#creditCardMonth');
    await creditCardMonth.clear();
    await creditCardMonth.fill('08');
    const creditCardYear = page.locator('#creditCardYear');
    await creditCardYear.clear();
    await creditCardYear.fill('2028');
    await page.locator('#nameOnCard').fill('Jack Hammer');
    await page.locator('#rememberMe').check();
    await page.getByRole('button', {name: 'Purchase Flight'}).click();
    
    //Step 8: Confirm Purchase
    const confirm = page.getByRole('heading', {name: 'Thank you for your purchase today!'});
    await expect(confirm).toBeVisible();
    if(await confirm.isVisible())
    {
        console.log("Success");
    }
    else
    {
        console.log("Faliure");
    }



});