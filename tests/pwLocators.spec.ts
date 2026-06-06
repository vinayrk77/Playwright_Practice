import {test, expect, Locator} from "@playwright/test";

test("Verify playwright locators", async({page})=>{
    await page.goto("https://practicesoftwaretesting.com/");
    await page.getByRole('link', {name: 'Sign in'}).click();
    await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
    await page.getByRole('link', {name: 'Register your account'}).click();
    await expect(page.getByRole('heading', {name: 'Customer registration', level:3})).toBeVisible();
    await page.locator('[data-test="first-name"]').fill('Vinay');
    await page.locator('[data-test="last-name"]').fill('Karanjavkar');
    await page.locator('[data-test="dob"]').fill('2002-07-12');
    await page.locator('[data-test="country"]').selectOption({label: 'India'});
    await page.locator('[data-test="postal_code"]').fill('421503');
    await page.locator('[data-test="house_number"]').fill('503');
    await page.locator('[data-test="street"]').fill('paan gali');
    await page.locator('[data-test="city"]').fill('Badlapur');
    await page.locator('[data-test="state"]').fill('Maharashtra');
    await page.locator('[data-test="phone"]').fill('9564345678');
    await page.locator('[data-test="email"]').fill('robertflick@gmail.com');
    await page.locator('[data-test="password"]').fill('Karanjavkar@1234');
    await page.getByRole('button', {name: 'Register'}).click();
    await page.waitForTimeout(5000);

});