import { test, expect, Locator } from "@playwright/test";

test("Verify the peganation table", async ({ page }) => {

    //read all the data from table pages
    await page.goto("https://datatables.net/");

    let hasmorePages = true;

    while (hasmorePages) {
        const rows: Locator[] = await page.locator('#example tbody tr').all();

        for (let row of rows) {
            console.log(await row.innerText());
        }

        const nextButton = page.locator('button[aria-label="Next"]');
        const isDisabled = await nextButton.getAttribute('class');

        if (isDisabled?.includes('disabled')) {
            hasmorePages = false;
        }
        else {
            await nextButton.click();
        }
    }
});

test("Filter the rows and check the row count", async({page})=>{
    await page.goto("https://datatables.net/");

    const selectrow: Locator = page.locator("select[class = 'dt-input']");
    await expect(selectrow).toBeVisible();

    await selectrow.selectOption('50');

    const rows:Locator[] = await page.locator('#example tbody tr').all();
    expect(rows.length).toBe(50);
});

test.only("Verify the serch element present in table", async({page})=>{
    await page.goto("https://datatables.net/");
    const searchBox:Locator = page.getByLabel('Search:');
    await expect(searchBox).toBeVisible();
    await expect(searchBox).toBeEnabled();

    await searchBox.fill('Sakura Yamamoto');

    const rows:Locator[] = await page.locator('#example tbody tr').all();

    if(rows.length>=1)
    {
        let matchFound = false;
        for(let row of rows)
        {
            const text = await row.innerText();
            if(text.includes('Sakura Yamamoto'))
            {
                console.log("Record found");
                matchFound = true;
                break;
            }
        }
        expect(matchFound).toBeTruthy();
    }
    else
    {
        console.log("No match found for search element");
    }






});