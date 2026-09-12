import { test, expect, Page } from "@playwright/test";


async function addToCart(page: Page, productName: string): Promise<void> {
    await page.getByRole('link', { name: productName }).click();
    page.on('dialog', async dialog => {
        console.log('Dialog:', dialog.message());
        await dialog.accept();
    });
    await page.getByRole('link', { name: 'Add to cart' }).click();
}
test("Verify if user can add 2 products to cart", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle('STORE');

    await addToCart(page, 'Sony vaio i5');
    await page.waitForTimeout(2000);

    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.getByRole('link', { name: 'CATEGORIES' })).toBeVisible();
    await addToCart(page, 'Samsung galaxy s6');

    await page.locator('#cartur').click();
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.getByText('Sony vaio i5')).toBeVisible();
    await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
    const total = await page.locator('tr.success').count();
    console.log('Number of Products inside cart are:', total);
    expect(total).toBe(2);
});

test("Verify and assert table", async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    await expect(page).toHaveTitle('demosite');

    const table = page.locator('table tbody');
    await expect(table).toBeVisible();

    const rows = page.locator('table tbody tr');
    const CierraRow = rows.filter({hasText: 'Cierra'});
    console.log(await CierraRow.count());
    console.log(await CierraRow.innerText());

    const cells = CierraRow.locator('td');
    const firstName = cells.nth(0);
    expect(firstName).toHaveText('Cierra');
    const lastName = cells.nth(1);
    expect(lastName).toHaveText('Vega');
    const age = cells.nth(2);
    expect(age).toHaveText('39');
    const email = cells.nth(3);
    expect(email).toHaveText('cierra@example.com');
});

test("Verify Alden Cantrell's row.", async({page})=>{
    await page.goto('https://demoqa.com/webtables');
    await expect(page).toHaveTitle('demosite');

    const table = page.locator('table tbody');
    await expect(table).toBeVisible();

    const rows = table.locator('tr');
    
    const aldenRow = rows.filter({hasText: 'Alden'});
    console.log(await aldenRow.count());
    console.log(await aldenRow.innerText());

    const cells = aldenRow.locator('td');
    const firstName = cells.nth(0);
    expect(firstName).toHaveText('Alden');

    const lastName = cells.nth(1);
    expect(lastName).toHaveText('Cantrell');
    const age = cells.nth(2);
    expect(age).toHaveText('45');
    const email = cells.nth(3);
    expect(email).toHaveText('alden@example.com');
});


test("Edit the age of person inside table", async({page})=>{

    await page.goto('https://demoqa.com/webtables');
    await expect(page).toHaveTitle('demosite');

    const table = page.locator('table tbody');
    await expect(table).toBeVisible();

    const rows = table.locator('tr');
    const cierraRow = rows.filter({hasText: 'Cierra'});
    console.log(await cierraRow.count());
    console.log(await cierraRow.innerText());
    const cells = cierraRow.locator('td');
    const originalAge = await cells.nth(2).innerText();
    console.log("Original Age is:", originalAge);
    expect(originalAge).toBe('39');

    await page.locator('#edit-record-1').click();
    await page.getByPlaceholder("Age").fill('40');
    await page.getByRole('button', {name: 'Submit'}).click();

    await expect(cierraRow).toBeVisible();
    const updatedAge = await cells.nth(2).innerText();
    console.log("Updated age is:", updatedAge);
    expect(updatedAge).toBe('40');
});

test.only("Add products to cart and checkout", async({page})=>{
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('.title')).toBeVisible();

    const products = page.locator('.inventory_item');

    const bagPack = products.filter({hasText: 'Sauce Labs Backpack'});
    await bagPack.getByRole('button', {name: 'Add to cart'}).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    const jacket = products.filter({hasText: 'Sauce Labs Fleece Jacket'});
    await jacket.getByRole('button', {name: 'Add to cart'}).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.title')).toBeVisible();

    const cartItems = await page.locator('.cart_item').count();
    expect(cartItems).toBe(2);

    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Fleece Jacket');

    await page.getByRole('button', {name: 'Checkout'}).click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByRole('textbox', {name: 'First Name'}).fill('Vinay');
    await page.getByRole('textbox', {name: 'Last Name'}).fill('Kumar');
    await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('421503');

    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
});

