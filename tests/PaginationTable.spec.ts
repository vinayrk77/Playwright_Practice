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