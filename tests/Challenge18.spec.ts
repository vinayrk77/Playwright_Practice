import {test, expect, Page} from "@playwright/test";

async function pageUrl(page:Page){
    await page.goto('https://ecommerce-playground.lambdatest.io/index.php?route=common/home');
}

async function login(page:Page, email:string, password:string){
    await page.getByRole('button', { name: ' My account' }).hover();
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByPlaceholder('E-Mail Address').fill(email);
    await page.getByPlaceholder('Password').fill(password);
    await page.locator('input[value="Login"]').click();
}

async function searchProduct(page: Page, productName: string){
    await page.getByPlaceholder('Search For Products').first().fill(productName);
    await page.locator('.search-button').first().click();
}

test("Verify login using valid password", async({page})=>{
    await pageUrl(page);
    await login(page, 'hasolev609@fivejm.com', 'Test@1234');
    await expect(page.getByRole('heading', {name: 'My Account'})).toBeVisible();
});
test("Verify invalid login", async({page})=>{
    await pageUrl(page);
    await login(page, 'invaliduser@example.com', 'Test@123');
    await expect(page.locator('.alert-dismissible')).toBeVisible();
});

//Challenge 2 — Search Product
test.only("Verify search products results", async({page})=>{
    await pageUrl(page);
    await login(page, 'hasolev609@fivejm.com', 'Test@1234');
    await expect(page.getByRole('heading', {name: 'My Account'})).toBeVisible({timeout:5000});
    await searchProduct(page, 'iphone');
    await expect(page.locator('div#entry_212456')).toHaveText('Search - iphone');
    await searchProduct(page, 'MacBook');
    await expect(page).toHaveURL('https://ecommerce-playground.lambdatest.io/index.php?route=product/product&product_id=45&search=MacBook');
    await expect(page.locator('div#entry_212456')).toHaveText('Search - MacBook');
});
