import {test, expect, Locator} from "@playwright/test";

test("Verify saucedemo products", async({page})=>{
    await page.goto("https://www.saucedemo.com/");

    //Login
    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.getByRole('button', { name: 'Login'}).click();
    await expect(page.locator('.title').filter({hasText: 'Products'})).toBeVisible();

    //Print all product names.
    const productNames = page.locator('.inventory_item_name');
    const allProducts = (await productNames.allTextContents()).map(text=>text.trim());
    for (let product of allProducts)
    {
        console.log(product);
    }

    //Print all product prices.
    console.log("Printing all product prices....");
    const productPrice = page.locator('.inventory_item_price');
    const allProductPrice = (await productPrice.allTextContents()).map(text=>text.trim());
    for(const price of allProductPrice)
    {
        console.log(price);
    }
    //Count total products.
    const productCount = await productNames.count();
    console.log("Product count is:",productCount);
    expect(productCount).toBe(6);
    //Verify every product has:Image,Price,Add to Cart button
    const allItems = await page.locator('.inventory_item').all();
    for(let items of allItems)
    {
        await expect(items.locator('img.inventory_item_img')).toBeVisible();
        await expect(items.locator('.inventory_item_price')).toBeVisible();
        await expect(items.locator('button.btn')).toBeVisible();
    }
    console.log("Image,Price,Add to Cart button all elements are visible");

    //Find the highest-priced product.
    const highPrices = allProductPrice.map(price => parseFloat(price.replace('$', '')));
    const highestPrice = Math.max(...highPrices);
    console.log('Highest price is:', highestPrice);
    for(let i =0; i<productCount; i++)
    {
        const product =
    }
    
    //Find the lowest-priced product.
    const lowPrices = allProductPrice.map(price => parseFloat(price.replace('$', '')));
    const lowestPrice = Math.min(...lowPrices);
    console.log("Lowesr priceis", lowestPrice);




});