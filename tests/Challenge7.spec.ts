import {test, expect, Locator} from "@playwright/test";
import {faker} from "@faker-js/faker";

test("verify and peform login and product search", async({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    //Login
    const userEmail = page.locator("#userEmail");
    await userEmail.fill('vinayrk26@gmail.com');
    const userPaassword = page.locator('#userPassword');
    await userPaassword.fill('Vinay@123');
    await page.locator('input#login').click();


    //Find the product "ZARA COAT 3" from the product list.
    const product = page.locator('.card').filter({hasText: 'ZARA COAT 3'});
    await product.getByRole('button', {name: 'Add To Cart'}).click();
    await page.locator('button[routerlink="/dashboard/cart"]').click();
    await expect(page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
    await expect(page.locator('div.cartSection').filter({hasText: 'ZARA COAT 3'})).toBeVisible();
    await page.getByRole('button', {name: 'Checkout'}).click();
    await page.getByRole("textbox", {name: 'Select Country'}).pressSequentially('Ind');
    await expect(page.locator(".ta-results")).toBeVisible();
    await page.locator(".ta-results button").filter({ hasText: /^India$/ }).click();
    await page.getByText('Place Order').click();

    const orderID = await page.locator('label.ng-star-inserted').innerText();
    console.log('Order ID is:', orderID);
    await page.getByLabel('Orders History Page').click();
    await expect(page.getByRole('heading', {name: 'Your Orders'})).toBeVisible();
    const yourOrders = await page.locator('.table [scope="row"]').innerText();
    console.log("Order ID in history is", yourOrders);
    expect(yourOrders).toContain(orderID);
});