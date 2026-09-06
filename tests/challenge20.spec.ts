import { test, expect, type Page } from "@playwright/test";

test("Start from basics again", async ({ page }) => {

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();

    await page.locator('button#react-burger-menu-btn').click();
    await page.locator('a[data-test="logout-sidebar-link"]').click();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
});

test("verify login and check first product on page", async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await expect(page.locator('.inventory_item').first()).toBeVisible();
    const name = page.locator('.inventory_item_name').first();
    await expect(name).toBeVisible();
    await expect(name).toHaveText('Sauce Labs Backpack');

    const price = page.locator('.inventory_item_price').first();
    await expect(price).toBeVisible();
    await expect(price).toHaveText('$29.99');

    const cart = page.locator('#add-to-cart-sauce-labs-backpack');
    await expect(cart).toBeVisible();
    await cart.click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('.shopping_cart_link').click();

    await expect(page.getByText('Your Cart')).toBeVisible();

    const cartProduct = page.locator('.inventory_item_name');
    await expect(cartProduct).toHaveText('Sauce Labs Backpack');
});

test("Find a specific product and add it to the cart", async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const item_names = page.locator('.inventory_item_name');
    const names = await item_names.allInnerTexts();
    console.log(names);

    const products = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Fleece Jacket' });
    const productName = await products.locator('.inventory_item_name').innerText();
    console.log(productName);
    const productPrice = await products.locator('.inventory_item_price').innerText();
    console.log(productPrice);
    const cart = products.getByRole('button', { name: 'Add to cart' });;
    await cart.click();
    await page.locator('.shopping_cart_badge').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.getByText('Your Cart')).toBeVisible();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Fleece Jacket');
    await expect(page.locator('.inventory_item_price')).toHaveText('$49.99');
});

test("ADD and verify TODO", async ({ page }) => {

    await page.goto("https://demo.playwright.dev/todomvc/#/");
    await expect(page).toHaveTitle('React • TodoMVC');
    const toDo = page.getByPlaceholder('What needs to be done?');
    await toDo.fill('Learn TypeScript');
    await page.keyboard.press('Enter');
    await toDo.fill('Practice Playwright');
    await page.keyboard.press('Enter');
    await toDo.fill('Become an SDET');
    await page.keyboard.press('Enter');
    await expect(page.locator('.todo-list')).toBeVisible();
    const list_items = page.locator('[data-testid="todo-item"]');
    const itemsCount = await list_items.count();
    expect(itemsCount).toBe(3);
    const checkBox = page.locator('.toggle').first();
    await checkBox.check();
    await expect(checkBox).toBeChecked();
    const delete_Item = list_items.filter({ hasText: 'Practice Playwright' });
    await delete_Item.hover();
    await delete_Item.locator('.destroy').click();
    await expect(delete_Item).not.toBeVisible();
    expect(await list_items.count()).toBe(2);
});

async function addtoDo(page: Page, toDo: string): Promise<void> {
    await page.getByPlaceholder('What needs to be done?').fill(toDo);
    await page.keyboard.press('Enter');
}

test("Add to do using resuable function", async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await addtoDo(page, 'Learn TypeScript');
    await addtoDo(page, 'Learn Playwright');
    await addtoDo(page, 'Learn API Testing');
    await addtoDo(page, 'Learn SQL');
    await addtoDo(page, 'Become an SDET');

    const items = await page.locator('[data-testid="todo-item"]').count();
    expect(items).toBe(5);

    const expectedTodos = ['Learn TypeScript','Learn Playwright','Learn API Testing','Learn SQL','Become an SDET'];

    const titles = await page.locator('[data-testid="todo-title"]').allTextContents();
    for(const names of titles)
    {
        console.log(names);
    }
    expect(titles).toEqual(expectedTodos);
    await expect(page.locator('[data-testid="todo-list"]')).toBeVisible();
});

test.only("Find a specific product and assert", async({page})=>{

    await page.goto("https://www.demoblaze.com/index.html");
    await expect(page).toHaveTitle('STORE');
    await expect(page.getByRole('link', {name:'Home'})).toBeVisible();
    await page.getByRole('link', {name: 'Laptops'}).click();
    await expect(page.locator('.card-block').first()).toBeVisible();
    await page.getByRole('link', {name: 'Sony vaio i5'}).click();
    await expect(page.getByRole('heading', {name: 'Sony vaio i5'})).toHaveText('Sony vaio i5');
    await expect(page.locator('.price-container').first()).toHaveText('$790 *includes tax');
    await expect(page.getByRole('link', {name: 'Add to cart'})).toBeVisible();
});