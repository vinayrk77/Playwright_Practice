import { test, expect, Locator, Page, chromium } from "@playwright/test";


async function launchPage(page: Page) {
    await page.goto('https://the-internet.herokuapp.com/tables');
}

test("Create different functions and contexts", async ({ page }) => {

    async function printCount(rows: Locator) {
        const count = await rows.count();
        console.log(count);
    }
    await launchPage(page);
    const tableRows = page.locator('#table1 tbody tr');
    await printCount(tableRows);

    async function getRowCount(rows: Locator) {
        const rowCount = await rows.count();
        return rowCount;
    };
    const count = await getRowCount(tableRows);
    console.log(count);
    expect(count).toBe(4);

    async function printAllRows(rows: Locator) {
        const count = await rows.count();
        for (let i = 0; i < count; i++) {
            const text = await rows.nth(i).innerText();
            console.log(text)
        }
    }
    const allrowData = page.locator('#table1 tbody tr');
    await printAllRows(allrowData);

    async function getColumnIndex(header: Locator, columnName: string) {
        const count = await header.count();
        for (let i = 0; i < count; i++) {
            const text = await header.nth(i).innerText();

            if (text === columnName) {
                return i
            }
            else {
                return -1;
            }
        }
    }
    const tableCols = page.locator('#table1 thead th');
    const dueCol = await getColumnIndex(tableCols, 'due');
    console.log(dueCol);
});

test("create a borwser context", async ({ }) => {

    const browser = await chromium.launch();
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context2.newPage();

    await page1.goto('https://demo.playwright.dev/todomvc/');
    await page1.locator('.new-todo').fill('Learn Playwright');
    await page1.keyboard.press('Enter');
    await expect(page1.locator('.todo-list')).toBeVisible();

    await page2.goto('https://demo.playwright.dev/todomvc/');
    await page2.reload();
    await expect(page2.locator('.todo-list')).not.toBeVisible();
});


async function performLogin(page: Page, userName: string, password: string) {

    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('input#username').fill(userName);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Submit' }).click();

}
test("Create a login function", async ({ page }) => {
    await performLogin(page, 'student', 'Password123');
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(page.getByRole('heading', {name: 'Logged In Successfully'})).toBeVisible();
});
test("verify test using invalid user and password", async({page})=>{
    await performLogin(page, 'Vinay', 'Vinay Karanjavkar');
    await expect(page.locator('div#error')).toHaveText('Your username is invalid!');
});
test("verify test using invalid user and valid password", async({page})=>{
    await performLogin(page, 'Vinay', 'Password123');
    await expect(page.locator('div#error')).toHaveText('Your username is invalid!');
});

async function enterUsername(page: Page, username: string){
    await page.locator('#username').fill(username);
};
async function enterPassword(page: Page, password: string){
    await page.getByLabel('Password').fill(password);
};
async function clickSubmit(page: Page){
    await page.getByRole('button', { name: 'Submit' }).click();
};

async function testLogin(page: Page, username: string, password: string) {
    await enterUsername(page, username);
    await enterPassword(page, password);
    await clickSubmit(page);
}
test.only("verify login", async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    await testLogin(page, 'student', 'Password123');
    await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(page.getByRole('heading', {name: 'Logged In Successfully'})).toBeVisible();
});
