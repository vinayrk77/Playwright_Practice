import {test, expect} from "@playwright/test";

test("Start from basics again", async({page})=>{

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

test.only("verify login and check first product on page", async({page})=>{

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

    const cartProduct =  page.locator('.inventory_item_name');
    await expect(cartProduct).toHaveText('Sauce Labs Backpack');
});