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
    const CierraRow = rows.filter({ hasText: 'Cierra' });
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

test("Verify Alden Cantrell's row.", async ({ page }) => {
    await page.goto('https://demoqa.com/webtables');
    await expect(page).toHaveTitle('demosite');

    const table = page.locator('table tbody');
    await expect(table).toBeVisible();

    const rows = table.locator('tr');

    const aldenRow = rows.filter({ hasText: 'Alden' });
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


test("Edit the age of person inside table", async ({ page }) => {

    await page.goto('https://demoqa.com/webtables');
    await expect(page).toHaveTitle('demosite');

    const table = page.locator('table tbody');
    await expect(table).toBeVisible();

    const rows = table.locator('tr');
    const cierraRow = rows.filter({ hasText: 'Cierra' });
    console.log(await cierraRow.count());
    console.log(await cierraRow.innerText());
    const cells = cierraRow.locator('td');
    const originalAge = await cells.nth(2).innerText();
    console.log("Original Age is:", originalAge);
    expect(originalAge).toBe('39');

    await page.locator('#edit-record-1').click();
    await page.getByPlaceholder("Age").fill('40');
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(cierraRow).toBeVisible();
    const updatedAge = await cells.nth(2).innerText();
    console.log("Updated age is:", updatedAge);
    expect(updatedAge).toBe('40');
});

test("Add products to cart and checkout", async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('.title')).toBeVisible();

    const products = page.locator('.inventory_item');

    const bagPack = products.filter({ hasText: 'Sauce Labs Backpack' });
    await bagPack.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    const jacket = products.filter({ hasText: 'Sauce Labs Fleece Jacket' });
    await jacket.getByRole('button', { name: 'Add to cart' }).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('.title')).toBeVisible();

    const cartItems = await page.locator('.cart_item').count();
    expect(cartItems).toBe(2);

    await expect(page.locator('.inventory_item_name').first()).toHaveText('Sauce Labs Backpack');
    await expect(page.locator('.inventory_item_name').nth(1)).toHaveText('Sauce Labs Fleece Jacket');

    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page.getByText('Checkout: Your Information')).toBeVisible();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Vinay');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Kumar');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('421503');

    await page.locator('[data-test="continue"]').click();
    await expect(page.getByText('Checkout: Overview')).toBeVisible();
});

test("find the produc name and add to cart", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.title')).toHaveText('Products');

    const productsToAdd = ['Sauce Labs Backpack',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt'];

    for (const productName of productsToAdd) {
        console.log(productName);
        const product = page.locator('.inventory_item');
        const givenProducts = product.filter({ hasText: productName });
        await givenProducts.getByRole('button', { name: 'Add to cart' }).click();
    }
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();

    const actualProducts = await page.locator('.inventory_item_name').allTextContents();
    console.log(actualProducts);
    expect(actualProducts).toEqual(productsToAdd);
});

async function addProductToCart(page: Page, productName: string): Promise<void> {
    const product = page.locator('.inventory_item');
    const searchProducts = product.filter({ hasText: productName });
    await searchProducts.getByRole('button', { name: 'Add to cart' }).click();
}
test("Use function to search product and add it to cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.title')).toHaveText('Products');

    const productsToAdd = ['Sauce Labs Backpack',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bolt T-Shirt'];

    for (const productName of productsToAdd) {
        await addProductToCart(page, productName);
    }
    await expect(page.locator('.shopping_cart_badge')).toHaveText('3');
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.getByText('Your Cart')).toBeVisible();

    const actualProducts = await page.locator('.inventory_item_name').allTextContents();
    console.log(actualProducts);
    expect(actualProducts).toEqual(productsToAdd);
});

test("Verify and print all product names", async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.locator('.title')).toHaveText('Products');

    const productNames = await page.locator('.inventory_item_name ').allTextContents();
    console.log(productNames);
    const productCount = productNames.length;
    console.log("Number of products are:", productCount);
    expect(productCount).toBe(6);

    const firstProduct = productNames[0];
    console.log(firstProduct);
    expect(firstProduct).toBe('Sauce Labs Backpack');
    const lastProduct = productNames[5];
    console.log(lastProduct);
    expect(lastProduct).toBe('Test.allTheThings() T-Shirt (Red)');
});

test("Verify dynamic controls", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_controls');
    await expect(page.getByRole('heading', { name: 'Dynamic Controls' })).toBeVisible();

    const removeButton = page.getByRole('button', { name: 'Remove' });
    await expect(removeButton).toBeVisible();
    await removeButton.click();
    await expect(removeButton).not.toBeVisible();
    const checkBox = page.locator('#checkbox');
    await expect(checkBox).not.toBeVisible();
    await expect(page.locator('#message')).toHaveText("It's gone!");

    const addButton = page.getByRole('button', { name: 'Add' });
    await expect(addButton).toBeVisible();
    await addButton.click();
    await expect(checkBox).toBeVisible();
    await expect(page.locator('#message')).toHaveText("It's back!");
    await checkBox.check();
    await expect(checkBox).toBeChecked();
});

test("Verify dynamic controls for checkboxes", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/checkboxes");

    await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible();
    const checkboxes = page.getByRole('checkbox');
    console.log(await checkboxes.count());
    await expect(checkboxes).toHaveCount(2);

    await expect(checkboxes.nth(0)).not.toBeChecked();
    await expect(checkboxes.nth(1)).toBeChecked();

    await checkboxes.nth(0).check();
    await expect(checkboxes.nth(0)).toBeChecked();
    await checkboxes.nth(1).uncheck();
    await expect(checkboxes.nth(1)).not.toBeChecked();
});

test("Verify Dropdowns", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/dropdown");
    await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible();

    const dropDown = page.locator('select#dropdown');
    await expect(dropDown).toBeVisible();

    await dropDown.selectOption('Option 1');
    await expect(dropDown).toHaveValue('1');

    await dropDown.selectOption('Option 2');
    await expect(dropDown).toHaveValue('2');
});

test('verify Product Purchase Flow + Dialog', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/');
    await expect(page.getByRole('heading', { name: 'Welcome to the-internet' })).toBeVisible();
    await page.getByRole('link', { name: 'JavaScript Alerts' }).click();
    await expect(page.getByRole('heading', { name: 'JavaScript Alerts' })).toBeVisible();

    page.once('dialog', async dialog => {
        console.log("dialog type is:", dialog.type());
        expect(dialog.type()).toBe('alert');
        console.log("dialog message is:", dialog.message());
        expect(dialog.message()).toBe('I am a JS Alert');
        await dialog.accept()
    });
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.getByText('You successfully clicked an alert')).toBeVisible();

    page.once('dialog', async dialog => {
        console.log("Dialog type is:", dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log("dialog message is:", dialog.message());
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.accept()
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.getByText('You clicked: Ok')).toBeVisible();

    page.once('dialog', async dialog=>{
        console.log("Dialog type is:", dialog.type());
        expect(dialog.type()).toBe('confirm');
        await dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.getByText('You clicked: Cancel')).toBeVisible();

    page.once('dialog', async dialog=>{
        console.log('Dialog type is:', dialog.type());
        expect(dialog.type()).toBe('prompt');
        console.log("Dialog text is:", dialog.message());
        expect(dialog.message()).toBe('I am a JS prompt');
        await dialog.accept('Vinay will master Playwright and thats a promise to myself');
    });
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.getByText('You entered: Vinay will master Playwright and thats a promise to myself')).toBeVisible();
});

test.only('verify tables and rows', async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/tables');
    await expect(page.getByRole('heading', {name: 'Data Tables'})).toBeVisible();

    const table1 = page.locator('#table1 tbody');
    expect(table1).toBeVisible();
    const tableRow = table1.locator('tr');

    const jasonRow = tableRow.filter({ hasText: 'Jason' });
    const jasonRowText = await jasonRow.innerText();
    console.log(jasonRowText);
    const lastName = await jasonRow.locator('td').nth(0).innerText();
    console.log(lastName);
    expect(lastName).toBe('Doe');
    const firstName = await jasonRow.locator('td').nth(1).innerText();
    console.log(firstName);
    expect(firstName).toBe('Jason');
    const email = await jasonRow.locator('td').nth(2).innerText();
    console.log(email);
    expect(email).toBe('jdoe@hotmail.com');
    const due = await jasonRow.locator('td').nth(3).innerText();
    console.log(due);
    expect(due).toBe('$100.00');

    const allRow = await tableRow.all();
    for(let allData of allRow){
        const names = await allData.locator('td').nth(1).innerText();
        console.log(names);
    }
    

});

