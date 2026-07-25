import {test, expect} from "@playwright/test";
import {faker} from '@faker-js/faker';

test("Verify adding products to cart", async({page})=>{

    await page.goto('https://automationexercise.com/');
    await page.getByRole('link', {name: 'Signup / Login'}).click();

    const userName = page.locator('input[data-qa="signup-name"]');
    const name = faker.person.firstName();
    await userName.fill(name);

    const userEmail = page.locator('input[data-qa="signup-email"]');
    const email = faker.internet.email();
    await userEmail.fill(email);

    await page.getByRole('button', {name: 'Signup'}).click();

    const title = page.locator('input#id_gender1');
    await expect(title).toBeEnabled();
    await expect(title).toBeVisible();
    await title.check();
    expect(title).toBeChecked();

    const firstName = page.locator('[data-qa="name"]');
    await expect(firstName).toHaveValue(name);



});