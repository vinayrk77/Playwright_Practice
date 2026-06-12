import { test, expect, Locator } from "@playwright/test";

test("Verify Product Sorting and Information Retrieval", async ({ page }) => {

    await page.goto("https://www.bstackdemo.com/");

    const orderby: Locator = page.locator('.sort select');

    await expect(orderby).toBeVisible();
    await expect(orderby).toBeEnabled();
    await orderby.selectOption('lowestprice');
    await page.waitForTimeout(2000);

    //Retrieve the list of product price elements.
    const allPrice: Locator = page.locator('.shelf-item__price');
    //count
    const allCount = await allPrice.count();
    console.log("Count of all prices is:", allCount);
    expect(allCount).toBe(25);

    const allPriceText = (await allPrice.allTextContents()).map(text=>text.trim());
    console.log(allPriceText);

    //Retrieve the list of product name elements.
    const productName: Locator = page.locator('.shelf-item__title');
    //count
    const productCount = await productName.count();
    console.log("Product count is:", productCount);
    expect(productCount).toBe(25);
    //all product names
    const productList = (await productName.allTextContents()).map(text=>text.trim());
    console.log(productList);

    //Verify Product names and their prices count are equal.
    expect(allCount).toEqual(productCount);


    //sort product
    const originalList:string[] = [...productList];
    const sortedList:string[] = [...productList].sort();

    console.log("original List is:",originalList);
    console.log("SortedList is:",sortedList);
    

    //Print each product name along with its corresponding price in the console.
    for (let i = 0; i < productList.length; i++) {
        console.log(`Product Name: ${productList[i].trim()} | Price: ${allPriceText[i].trim()}`);
    }


    //print lowest price and product
    const lowestPrice = allPriceText[0];
    const lowestProduct = productList[0];
    console.log("Lowest priced product is:",lowestPrice);
    console.log("Lowest price product name is:",lowestProduct);

     //print Higest price and product
    const highestPrice = allPriceText[allPriceText.length-1];
    const higestProduct = productList[productList.length-1];
    console.log("Higest priced product is:",highestPrice);
    console.log("Higest price product name is:",higestProduct);


});