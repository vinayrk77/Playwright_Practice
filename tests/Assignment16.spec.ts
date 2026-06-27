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

test("Test pagination table", async({page})=>{
    await page.goto('https://datatables.net/');
    const table = page.locator('#example tbody');
    await expect(table).toBeVisible();

    let nextPage:boolean = true;
    while(nextPage)
        {
           const tableRows = await table.locator('tr').all();

           for(let rows of tableRows)
           {
            console.log(await rows.innerText());
           }

           const nextButton =  page.getByRole('link', {name: 'Next'});
           const isDisabled = await nextButton.getAttribute('class');

           if(isDisabled?.includes('disabled'))
           {
            nextPage = false;
           }
           else
           {
            await nextButton.click();
           }
        } 
});

test("Filter rows and check count", async({page})=>{
    await page.goto('https://datatables.net/');

    const filterRows = page.locator('#dt-length-0');
    await expect(filterRows).toBeVisible();
    await expect(filterRows).toBeEnabled();
    await filterRows.selectOption('50');

    const rows = page.locator('#example tbody tr');
    const count = await rows.count();
    console.log("Number of rows present are:",count);
    expect(count).toBe(50);
});

test("Verify search name prestent in table", async({page})=>{
    await page.goto('https://datatables.net/');
    const searchBox = page.locator('#dt-search-0');
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEnabled();

    await searchBox.fill('Shad Decker');

    const rows: Locator[]= await page.locator('#example tbody tr').all();

    if(rows.length >=1)
    {
        let matchFound = false;
        for(let row of rows)
        {
            const text = await row.innerText();
            if(text.includes('Shad Decker'))
            {
                console.log('Match Found');
                matchFound = true;
                break;
            }
            else
            {
                console.log("Match not found");
            }
        }
        expect(matchFound).toBeTruthy();
    }
});

test("Select the given date in date picker", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');
    const datePicker = page.locator('input#datepicker');
    await expect(datePicker).toBeVisible();
    await expect(datePicker).toBeEnabled();
    await datePicker.click();

    const year:string = '2027';
    const month: string = 'December';
    const date: string = '31';


    while(true)
    {
        const currentMonth:string = await page.locator('.ui-datepicker-month').innerText();
        const currentYear:string = await page.locator('.ui-datepicker-year').innerText();

        if(currentMonth === month && currentYear === year)
        {
            break;
        }
        await page.locator('.ui-datepicker-next').click();
    }
    const alldates = await page.locator('.ui-datepicker-calendar td a').all();

    for(let dt of alldates)
    {
        const dateText = await dt.innerText();
        if(dateText === date)
        {
            await dt.click();
            break;
        }
    }
    const expectedDate = '12/31/2027';
    await expect(datePicker).toHaveValue(expectedDate);
    await page.waitForTimeout(5000);
});


test("verify date on boooking.com site", async({page})=>{
    await page.goto('https://www.booking.com/');

    const dateBox = page.getByTestId('searchbox-dates-container');
    await expect(dateBox).toBeVisible();
    await expect(dateBox).toBeEnabled();

    await dateBox.click();

    let checkinYear:string = '2026';
    let checkinMonth: string = 'June';
    let checkinDay: string = '28';

    while(true)
    {
        const checkinMonthYear = await page.getByRole('heading', { name: 'June 2026', level: 3 }).innerText();
        const currentmonth = checkinMonthYear.split(" ")[0];
        const currentyear = checkinMonthYear.split(" ")[1];

        if(currentmonth === checkinMonth && currentyear === checkinYear)
        {
            break;
        }
        else
        {
            await page.getByRole('button', { name: 'Next month' }).click();
        }

        //select specific date
        const alldates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all();

        let checkinDate = false;
        for(let date of alldates)
        {
            const text = await date.innerText();
            if(text === checkinDay)
            {
                await date.click();
                checkinDate = true;
                break;
            }
        }

    }
    expect(checkinDay).toBeTruthy();

    let checkoutYear:string = '2026';
    let checkoutMonth: string = 'July';
    let checkoutDay: string = '15';

    while(true)
    {
        const checkinMonthYear = await page.getByRole('heading', { name: 'July 2026', level: 3 }).innerText();
        const currentmonth = checkinMonthYear.split(" ")[0];
        const currentyear = checkinMonthYear.split(" ")[1];

        if(currentmonth === checkoutMonth && currentyear === checkoutYear)
        {
            break;
        }
        else
        {
            await page.getByRole('button', { name: 'Next month' }).click();
        }

        //select specific date
        const alldates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();

        let checkoutDate = false;
        for(let date of alldates)
        {
            const text = await date.innerText();
            if(text === checkoutDay)
            {
                await date.click();
                checkoutDate = true;
                break;
            }
        }

    }
    expect(checkinDay).toBeTruthy();
});

test("Test and handel dialougs", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const simpleAlert = page.getByRole('button', {name:'Simple Alert'});
    await expect(simpleAlert).toBeVisible();
    
    page.on('dialog', async(dialog)=>{
        console.log("Dialogue type is", dialog.type());
        expect(dialog.type()).toContain('alert');
        console.log("Text in dialog", dialog.message());
        expect(dialog.message()).toContain('I am an alert box!');
        await dialog.accept()});
        await simpleAlert.click();
});

test("Test confirmation alert", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async(dialog)=>{
        console.log("The type of dialog is", dialog.type());
        expect(dialog.type()).toBe("confirm");
        console.log("Dialog text is:", dialog.message())
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept()});


    const cnfAlert:Locator = page.getByRole('button', {name: 'Confirmation Alert'});
    await expect(cnfAlert).toBeVisible();
    await cnfAlert.click();

    const message:string = await page.locator('p#demo').innerText();
    console.log("Optput text is", message);
    await expect(page.locator('p#demo')).toHaveText('You pressed OK!');
});

test.only("Test prompt alert", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    page.on('dialog', async(dialog)=>{
        console.log("Dialog type is", dialog.type());
        expect(dialog.type()).toBe('prompt');
        console.log("Test in dialog is:", dialog.message());
        expect(dialog.message()).toContain('Please enter your name:');
        console.log(dialog.defaultValue());
        expect(dialog.defaultValue()).toContain('Harry Potter');
        await dialog.accept('Vinay Karanjavkar')});


    const promptAlert = page.getByRole('button', {name: 'Prompt Alert'});
    await expect(promptAlert).toBeVisible();
    await promptAlert.click();

    const alertMsg:string = await page.locator('p#demo').innerText();
    console.log("Message displayed is:", alertMsg);
    await expect(page.locator('p#demo')).toHaveText('Hello Vinay Karanjavkar! How are you today?');

});