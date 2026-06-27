import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeAll("Open app", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://demoblaze.com/');
});

test.afterAll("close app", async () => {
    page.close();
});

test.beforeEach("Perform Login", async () => {
    await page.goto("https://demoblaze.com/");
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});

test.afterEach("Perform Logout", async () => {
    await page.getByRole('link', { name: 'Log out' }).click();
});

test("Fins number of products", async () => {
    const products = page.locator('#tbodyid .hrefch');
    const count = await products.count();
    console.log("Number of products are:", count);
    expect(products).toHaveCount(9);
});

test.only("Add product to cart", async () => {
    await page.getByRole('link', { name: 'Samsung galaxy s7' }).click();
    await expect(page).toHaveURL(/prod.html/);

    const dialogPromise = page.waitForEvent('dialog');

    await page.getByRole('link', { name: 'Add to cart' }).click();

    const dialog = await dialogPromise;

    console.log("Dialog type:", dialog.type());
    console.log("Dialog message:", dialog.message());

    expect(dialog.type()).toBe('alert');
    expect(dialog.message()).toBe('Product added.');

    await dialog.accept();
});


