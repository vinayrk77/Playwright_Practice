import { test, expect, Locator } from "@playwright/test";

test("Verify saucedemo products", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");

    //Login
    await page.getByRole('textbox', { name: 'Username' }).fill('standard_user');
    await page.getByRole('textbox', { name: 'Password' }).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('.title').filter({ hasText: 'Products' })).toBeVisible();

    //Print all product names.
    const productNames = page.locator('.inventory_item_name');
    const allProducts = (await productNames.allTextContents()).map(text => text.trim());
    for (let product of allProducts) {
        console.log(product);
    }

    //Print all product prices.
    console.log("Printing all product prices....");
    const productPrice = page.locator('.inventory_item_price');
    const allProductPrice = (await productPrice.allTextContents()).map(text => text.trim());
    for (const price of allProductPrice) {
        console.log(price);
    }
    //Count total products.
    const productCount = await productNames.count();
    console.log("Product count is:", productCount);
    expect(productCount).toBe(6);
    //Verify every product has:Image,Price,Add to Cart button
    const allItems = await page.locator('.inventory_item').all();
    for (let items of allItems) {
        await expect(items.locator('img.inventory_item_img')).toBeVisible();
        await expect(items.locator('.inventory_item_price')).toBeVisible();
        await expect(items.locator('button.btn')).toBeVisible();
    }
    console.log("Image,Price,Add to Cart button all elements are visible");

    //Find the highest-priced product.
    const highPrices = allProductPrice.map(price => parseFloat(price.replace('$', '')));
    let highestPrice = 0;
    let highestIndex = 0;
    for (let i = 0; i < highPrices.length; i++) {
        if (highPrices[i] > highestPrice) {
            highestPrice = highPrices[i];
            highestIndex = i;
        }
    }
    console.log(allProducts[highestIndex]);
    await page.locator(".inventory_item").nth(highestIndex).getByRole("button", { name: "Add to cart" }).click();

    //Find the lowest-priced product.
    const lowPrices = allProductPrice.map(price => parseFloat(price.replace('$', '')));
    let lowestPrice = highPrices[0];
    let lowestIndex = 0;

    for (let i = 1; i < highPrices.length; i++) {

        if (highPrices[i] < lowestPrice) {
            lowestPrice = highPrices[i];
            lowestIndex = i;
        }
    }
    console.log(allProducts[lowestIndex]);
    await page.locator(".inventory_item").nth(lowestIndex).getByRole("button", { name: "Add to cart" }).click();
    //Verify both products are present.
    await page.locator('.shopping_cart_link').click();
    await expect(page.locator('span.title')).toBeVisible();
    const cartNames = await page.locator(".inventory_item_name").allTextContents();

    expect(cartNames).toContain(allProducts[highestIndex]);
    expect(cartNames).toContain(allProducts[lowestIndex]);
    const cartPrices = await page.locator(".inventory_item_price").allTextContents();

    expect(cartPrices).toContain(`$${highestPrice}`);
    expect(cartPrices).toContain(`$${lowestPrice}`);

    await page.getByRole('button', {name: 'Checkout'}).click();
    await page.getByPlaceholder('First Name').fill('Cham');
    await page.getByPlaceholder('Last Name').fill('Ambhore');
    await page.getByPlaceholder('Zip/Postal Code').fill('421503');
    await page.locator('#continue').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await page.locator('button[data-test="finish"]').click();
    await expect(page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible();
});