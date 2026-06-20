import { test, expect, Locator, Page } from "@playwright/test";

async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {
    while (true) {
        const currentMonth = await page.locator('span.ui-datepicker-month').textContent();
        const currentYear = await page.locator('span.ui-datepicker-year').textContent();

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }

        if (isFuture) {
            await page.getByText('Next').click();
        } else {
            await page.locator('a.ui-datepicker-prev').click();
        }
    }

    const alldates: Locator[] = await page.locator('table.ui-datepicker-calendar td').all();

    for (const dt of alldates) {
        const dateText = await dt.innerText();
        if (dateText === targetDate) {
            await dt.click();
            break;
        }
    }
}


test("Validate dates", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datepicker: Locator = page.locator("input#datepicker");
    await expect(datepicker).toBeVisible();

    //Approach 1 using fill
    //await datepicker.fill('20/06/2026');

    //Approach 2 using datepicker

    await datepicker.click();

    const year = '2026';
    const month = 'December';
    const date = '31';

    selectDate(year, month, date, page, true);

    const expectedDate = '12/31/2026';
    await expect(datepicker).toHaveValue(expectedDate);

    await page.waitForTimeout(5000);

});