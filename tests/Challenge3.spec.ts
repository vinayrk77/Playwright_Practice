import {test, expect, Locator} from "@playwright/test";

test('Extract Data from a Paginated Table', async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const table = page.locator("#productTable tbody");
    await expect(table).toBeVisible();

    const pages:Locator = page.locator('#pagination li');
    const pageCount = await pages.count();
    console.log("Number of pages are", pageCount);
    expect(pageCount).toBe(4);    

    for(let p=0; p<pageCount; p++)
    {
        await pages.nth(p).click();

        const tableRows = table.locator('tr');
        const rowCount = await tableRows.count();
    
        console.log(`pages ${p+1}`);

        for(let i=0; i<rowCount; i++)
        {
            const text = await tableRows.nth(i).innerText();
            console.log(text);
        }
    }
});

test("Retrieve the Network Speed value for the Chrome", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const table = page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    const tableRows = table.locator('tr');
    const rowCount = await tableRows.count();
    console.log("Number of rows are", rowCount);
    expect(rowCount).toBe(4);

    const tableHeader = page.locator('#taskTable thead th');
    const headerCount = await tableHeader.count();
    console.log("Number of headers are:", headerCount);
    expect(headerCount).toBe(5);
    let networkSpeed = -1;
    for(let i=0; i<headerCount; i++)
    {
        const speed = await tableHeader.nth(i).innerText();
        if(speed ===('Network (Mbps)'))
        {
            networkSpeed = i;
            break;
        }
    }
    expect(networkSpeed).not.toBe(-1);

    const alltabledata = await tableRows.all();
    let chromeProcess = '';
    for(let data of alltabledata)
    {
        const text = await data.locator('td').nth(0).innerText();
        if(text === 'Chrome')
        {
            chromeProcess = await data.locator('td').nth(networkSpeed).innerText();
            console.log("Network speed of chrome is:",chromeProcess);
            break;
        }
    }
    const yellowBox = page.locator('#displayValues p', {hasText: 'Network speed of Chrome process:'});
    const YellowText = await yellowBox.innerText();
    console.log(YellowText);
    expect(YellowText).toContain(chromeProcess);
    console.log("Speed are equal");
});

test("test BlazeDemo Flight Booking Automation", async({page})=>{
    //Step 1: Launch the Website
    await page.goto('https://blazedemo.com/');
    await expect(page).toHaveURL('https://blazedemo.com/');
    await expect(page).toHaveTitle('BlazeDemo');

    //Step 2: Select Departure and Destination
    const departure = page.locator('select[name="fromPort"]');
    await expect(departure).toBeVisible();
    await expect(departure).toBeEnabled();
    await departure.selectOption('Boston');

    const destination = page.locator('select[name="toPort"]');
    await expect(destination).toBeVisible();
    await expect(destination).toBeEnabled();
    await destination.selectOption('London');

    //Step 3: Search for Flights
    await page.getByRole('button', {name: 'Find Flights'}).click();

    //Step 4: Capture Flight Prices
    const tablerows = page.locator('.table tbody tr');
    const rowCount = await tablerows.count();
    console.log("Number of rows are:",rowCount);
    expect(rowCount).toBe(5);
    let price:number[] = [];
    const alltabledata = await tablerows.all();

    for(let data of alltabledata)
    {
        const cellText = await data.locator('td').nth(5).innerText();
        const priveValue =  Number(cellText.replace('$', ''));
        price.push(priveValue);
        console.log(priveValue);
    }
    //Step 5: Identify the Lowest Price
   let lowestPrice = Math.min(...price)
   console.log(lowestPrice);

    //Find total flights available and click on lowest price flight
    const totalFlights = page.locator('.table tbody tr');
    const flightCount = await totalFlights.count();
    console.log("Total number of flights are:", flightCount);
    
    for(let i=0; i<flightCount; i++)
    {
        const row = totalFlights.nth(i);
        const rowPrice = Number((await row.locator('td').nth(5).innerText()).replace('$', ''));
        if(rowPrice === lowestPrice)
        {
            await row.getByRole('button', {name: 'Choose This Flight'}).click();
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
    const purchaseLocator = page.getByRole('heading', {name: 'Thank you for your purchase today!'});
    await expect(purchaseLocator).toBeVisible();
    if (await purchaseLocator.isVisible()) {
        console.log('Success');
    } else {
        console.log('Faliure');
    }
});

test.only('Drang and Drop', async({page})=>{
    await page.goto('https://demo.guru99.com/test/drag_drop.html');
    const bank = page.locator('#credit2');
    const cart = page.locator('#bank');
    await bank.dragTo(cart);

    const price1 = page.locator('#fourth').nth(0);
    const ammount1 = page.locator('.field13 li.placeholder').nth(0);
    await price1.dragTo(ammount1);

    const sales = page.locator('#credit1');
    const account = page.locator('.field15');
    await sales.dragTo(account);

     const price2 = page.locator('#fourth').nth(1);
    const ammount2 = page.locator('#amt8');
    await price2.dragTo(ammount2);



    await expect(page.locator('div #bal3')).toBeVisible();
    await expect(page.locator('.table4_result')).toContainText('Perfect!');

    await page.waitForTimeout(5000);


});