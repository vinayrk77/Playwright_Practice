import {test, expect, Locator} from "@playwright/test";

test("Verify dynamic table", async({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    const table:Locator = page.locator('.table-responsive tbody');
    await expect(table).toBeVisible();

    //step 1 - For Chrome process get value of CPU load.
    // capture each row from table
    const tableRow:Locator = table.locator('tr');
    const count = await tableRow.count();
    console.log("number of rows are:",count);
    expect(count).toBe(4); 
    const rows = await tableRow.all();

    let cpuLoad = '';
    
    for(let row of rows )
    {
        const processName:string = await row.locator('td').nth(0).innerText();
        if(processName === 'Chrome')
        {
            cpuLoad = await row.locator('td', {hasText: '%'}).innerText();
            console.log("Cpu load of chrome is:",cpuLoad);
            break;
        }
    }

    //Compare it with value in the yellow label.
    let yellowboxtext:string = await page.locator('p#chrome-cpu').innerText();
    console.log("Cpu lod value inside yellow box is:",yellowboxtext);
    const yellowCpu = yellowboxtext.replace("Chrome CPU: ", "").trim();

    if(yellowboxtext.includes(cpuLoad))
    {
        console.log("CPU load of chrome is equal");
    }
    else
    {
        console.log("CPU load of chrome is not equal");
    }
    expect(yellowCpu).toContain(cpuLoad);
});