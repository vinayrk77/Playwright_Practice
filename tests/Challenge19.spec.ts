import{test,expect} from "@playwright/test";

test("Create a Playwright test for SauceDemo.", async({page})=>{

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveTitle('Swag Labs');

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('input[data-test="login-button"]').click();

    await expect(page.locator('span[data-test="title"]')).toHaveText('Products');
    


});