import{test,expect} from "@playwright/test";

test("Create a Playwright test for SauceDemo.", async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('input[data-test="login-button"]').click();

    await expect(page.locator('span[data-test="title"]')).toHaveText('Products');
    
    const itemNames = page.locator('.inventory_item_name');
    const itemCount = await itemNames.count();
    console.log("Number of items are:",itemCount);
    expect(itemCount).toBe(6);

    const allItems = await itemNames.allInnerTexts();
    console.log('Item names:', allItems);

    expect(allItems).toContain('Sauce Labs Backpack');

    // Verify that the price of the Backpack is $29.99
    const backpackPrice = await page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('.inventory_item_price').textContent();
    console.log("Backpack Price is:", backpackPrice);
    expect(backpackPrice?.trim()).toBe('$29.99');
    await page.locator('button#react-burger-menu-btn').click();
    await page.getByRole('link', {name: 'Logout'}).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
});

test('Find the chepeast product and add to cart', async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('input[data-test="login-button"]').click();
    await expect(page.getByText('Products', {exact:true})).toBeVisible();

    const procuct = page.locator('.inventory_item_name');
    const productNames = (await procuct.allInnerTexts()).map(text=>text.trim());;
    for(let allProducts of productNames)
    {
        console.log(allProducts)
    }
    await expect(procuct).toHaveCount(6);

    const price = page.locator('.inventory_item_price');
    const productPrice = (await price.allTextContents()).map(text=>text.trim());
    for(let allPrice of productPrice)
    {
        console.log(allPrice)
    }
    const finalList = productNames.map((name, i) => ({ name, price: productPrice[i] }));
    console.log(finalList);
    //Find the cheapest product dynamically.
    const cheap = productPrice.map(price => parseFloat(price.replace('$', '')));
    let lowestPrice = cheap[0];
    let lowestIndex = 0;
    for(let i = 0; i < cheap.length; i++) {
        if(cheap[i] < lowestPrice) {
            lowestPrice = cheap[i];
            lowestIndex = i;
        }
    }
    console.log("chepeast Product:",productNames[lowestIndex],"price: $",lowestPrice);
    await page.locator('.inventory_item').nth(lowestIndex).getByRole("button", { name: "Add to cart" }).click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Your Cart')).toBeVisible();
    const cartProduct = page.locator('.inventory_item_name');
    await expect(cartProduct).toHaveText(productNames[lowestIndex]);
});

test.only("Find the Highest price product and add to cart", async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByRole('textbox', {name: 'Username'}).fill('standard_user');
    await page.getByRole('textbox', {name: 'Password'}).fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.getByText('Products', {exact:true})).toBeVisible();

    const allProducts = page.locator('.inventory_item_name');
    const allNames = await allProducts.allInnerTexts();
    const prices = page.locator('.inventory_item_price');
    const allPrices = await prices.allInnerTexts();

    const allItems = allNames.map((name,i)=>({name,price: allPrices[i]}));
    console.log(allItems);
    //find maximum
    let highest = allPrices.map(price => parseFloat(price.replace('$', '')));
    let highestPrice = 0;
    let highestIndex = 0;
    for(let i=0; i<highest.length; i++)
    {
        if(highest[i] > highestPrice){
            highestPrice = highest[i];
            highestIndex = i;
        }
    }
    console.log("Most expensive product:",allNames[highestIndex], "Price: $",highestPrice);

    await page.locator('.inventory_item').nth(highestIndex).getByRole('button', {name: 'Add to cart'}).click();
    await page.locator('.shopping_cart_link').click();
    await expect(page.getByText('Your Cart', {exact:true})).toBeVisible();

    const cartProduct = page.locator('.cart_item_label');
    await expect(cartProduct).toContainText(allItems[highestIndex].name);
    await expect(cartProduct).toContainText(allItems[highestIndex].price);
});