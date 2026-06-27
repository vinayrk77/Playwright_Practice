import { test, expect, Locator } from "@playwright/test";

test("Handeling dynamic web tables", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table: Locator = page.locator('#taskTable tbody');
    await expect(table).toBeVisible();

    //capture tablerows
    const tableRows = table.locator('tr');
    const rowCount = await tableRows.count();
    console.log("Number of rows in table are:", rowCount)
    expect(rowCount).toBe(4);

    //Retrieve the CPU Load value for the Chrome process and compare it against the value displayed in the yellow label

    const alltabledata = await tableRows.all();
    let cpuLoad: string = '';

    for (let data of alltabledata) {
        const processName = await data.locator('td').nth(0).innerText();
        if (processName === 'Chrome') {
            cpuLoad = await data.locator('td', { hasText: '%' }).innerText();
            console.log("Cpu load of chrome is:", cpuLoad);
            break;
        }
    }
    const lable = page.locator('#displayValues p', {hasText: 'CPU load of Chrome process:'});
    const lableText = await lable.innerText();
    console.log("CPU load of chrome is:", lableText);
    if(lableText.includes(cpuLoad))
    {
        console.log("CPU load of chrome is equal");
    }
    else
    {
        console.log("CPU load of chrome is not equal");
    }
    expect(lableText).toContain(cpuLoad);

    //Retrieve the Memory Usage value for the Firefox process and compare it against the value displayed in the blue label.
    const headers = page.locator('#taskTable thead th');
    const headerCount = await headers.count();
    console.log("Number of headers are:", headerCount);
    expect(headerCount).toBe(5);
    let memoryIndex = -1;
    for(let i=0; i<headerCount; i++)
    {
        const header = await headers.nth(i).innerText();
        if(header === ('Memory (MB)'))
        {
            memoryIndex = i;
            break;
        }
    }
    expect(memoryIndex).not.toBe(-1);
    let memorySize:string = '';

    for(let data of alltabledata)
    {
        const mbProcess = await data.locator('td').nth(0).innerText();
        if(mbProcess === 'Firefox')
        {
            memorySize = await data.locator('td').nth(memoryIndex).innerText();
            console.log("Memory size is:", memorySize);
            break;
        }
    }
    const memoryLable = page.locator('#displayValues p', {hasText: 'Memory Size of Firefox process:'});
    const memoryText = await memoryLable.innerText();
    console.log("Memory sixe in blue lable is:",memoryText);
    if(memoryText.includes(memorySize))
    {
        console.log("Memory size are equal");
    }
    else{
        console.log("Memory size are not equal");
    }
    expect(memoryText).toContain(memorySize);

    //Retrieve the Network Speed value for the Chrome process and compare it against the value displayed in the orange label.

    let chromeIndex = -1;
    for(let i=0; i<headerCount; i++)
    {
        const chromeHeader = page.locator('#taskTable th');
        const processName = await chromeHeader.nth(i).innerText();
        if(processName === 'Network (Mbps)')
        {
            chromeIndex = i;
            break;
        }
    }
    expect(chromeIndex).not.toBe(-1);

    let chromeSpeed:string = '';
    for(let data of alltabledata)
    {
        const chromeProcess = await data.locator('td').nth(0).innerText();
        if(chromeProcess === 'Chrome')
        {
            chromeSpeed = await data.locator('td').nth(chromeIndex).innerText();
            console.log("Network speed of chrome is:",chromeSpeed);
        }
    }
    const labelChrome = page.locator('#displayValues p', {hasText: 'Network speed of Chrome process:'});
    const chrometext = await labelChrome.innerText();
    console.log("Network speed outside is:", chrometext);
    if(chrometext.includes(chromeSpeed))
    {
        console.log("Network speed of chrome is equal");
    }
    else
    {
        console.log("Network speed of chrome is not equal");
    }
    expect(chrometext).toContain(chromeSpeed);

    //Retrieve the Disk Space value for the Firefox process and compare it against the value displayed in the violet label.
    let firefoxindex = -1;
    for(let i=0; i<headerCount; i++)
    {
        const tableHeader = page.locator('#taskTable th');
        const headerValues = await tableHeader.nth(i).innerText();
        if(headerValues === 'Disk (MB/s)')
        {
            firefoxindex = i;
            break;
        }
    }
    let firefoxdisk:string = '';
    for(let data of alltabledata)
    {
        const firfoxProcess = await data.locator('td').nth(0).innerText();
        if(firfoxProcess === 'Firefox')
        {
            firefoxdisk = await data.locator('td').nth(firefoxindex).innerText();
            console.log("Disk space of fire fox is", firefoxdisk);
        }
    }
    const labelfire = page.locator('#displayValues p', {hasText: 'Disk space of Firefox process:'});
    const firetext = await labelfire.innerText();
    console.log("Network speed outside is:", firetext);
    if(firetext.includes(firefoxdisk))
    {
        console.log("Disk space is equal");
    }
    else
    {
        console.log("Disk space is not equal");
    }
    expect(firetext).toContain(firefoxdisk);



});