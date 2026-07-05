import {test, expect, Locator} from "@playwright/test";
import {faker} from "@faker-js/faker";



test("Automate the given flow", async({page})=>{
    //Open the website.
    await page.goto('https://automationexercise.com/');
    //Verify the home page is visible.
    await expect(page).toHaveURL('https://automationexercise.com/');
    await expect(page).toHaveTitle('Automation Exercise');
    
    //Click Signup / Login.
    const login:Locator = page.getByRole('link', {name: 'Signup / Login'});
    await login.click();

    //Verify "New User Signup!" is visible.
    const newUser =  page.getByRole('heading', {name: 'New User Signup!'});
    await expect(newUser).toBeVisible();

    //Enter a random name.
    const userName = page.locator('input[data-qa="signup-name"]');
    await expect(userName).toBeVisible();
    const fullName = faker.person.fullName();
    await userName.fill(fullName);

    //Enter a random email every time the test runs.
    const userEmail = page.locator('input[data-qa="signup-email"]');
    const emailName = faker.internet.email();
    await userEmail.fill(emailName);

    //Click Signup.
    await page.getByRole('button', {name: 'Signup'}).click();

    //Fill all mandatory registration details.
    const titleMr = page.locator('#id_gender1');
    await expect(titleMr).toBeVisible();
    await expect(titleMr).toBeEnabled();
    await titleMr.check();
    await expect(titleMr).toBeChecked();
    const titleMrs = page.locator('#id_gender2');
    await expect(titleMrs).not.toBeChecked();

    const name = page.locator('input#name');
    await expect(name).toHaveValue(fullName);
    const email = page.locator('input#email');
    await expect(email).toHaveValue(emailName);

    const password = page.locator('input#password');
    await expect(password).toBeVisible();
    const pwd = faker.internet.password();
    await password.fill(pwd);

    const birthDate = page.locator('select#days');
    await expect(birthDate).toBeVisible();
    await expect(birthDate).toBeEnabled();
    await birthDate.selectOption('26');

    const birthMonth = page.locator('select#months');
    await expect(birthMonth).toBeVisible();
    await expect(birthMonth).toBeEnabled();
    await birthMonth.selectOption('April');

    const birthYear = page.locator('select#years');
    await expect(birthYear).toBeVisible();
    await expect(birthYear).toBeEnabled();
    await birthYear.selectOption('2001');

    const newsLetter = page.locator('#newsletter');
    await expect(newsLetter).toBeVisible();
    await expect(newsLetter).toBeEnabled();
    await newsLetter.check();
    await expect(newsLetter).toBeChecked();

    const specialOffers = page.locator('input#optin');
    await specialOffers.check();
    await expect(specialOffers).toBeChecked();

    const nameUser = page.locator('input#first_name');
    await nameUser.fill(faker.person.firstName());
    const lastName = page.locator('input#last_name');
    await lastName.fill(faker.person.lastName());
    const companyName = page.locator('input#company');
    await companyName.fill("Netflix");
    const adress1 = page.locator('input#address1');
    await adress1.fill(faker.location.streetAddress());
    const adress2 = page.locator('input#address2');
    await adress2.fill(faker.location.secondaryAddress());
    const country = page.locator('select#country');
    await expect(country).toBeVisible();
    await expect(country).toBeEnabled();
    await country.selectOption('Singapore');

    const state =  page.locator('input#state');
    await state.fill(faker.location.state());
    const city = page.locator('input#city');
    await city.fill(faker.location.city());
    const zip = page.locator('input#zipcode');
    await zip.fill(faker.location.zipCode());
    const phone = page.locator('input#mobile_number');
    await phone.fill(faker.phone.number());

    //Create the account.
    await page.getByRole('button', {name: 'Create Account'}).click();

    //Verify "ACCOUNT CREATED!" is displayed.
    await expect(page).toHaveURL('https://automationexercise.com/account_created');
    await expect(page).toHaveTitle('Automation Exercise - Account Created');
    await expect(page.getByRole('heading', {name: 'Account Created!'})).toBeVisible();
    //Click Continue.
    await page.getByRole('link', {name: 'Continue'}).click();
    //Verify the logged-in username is displayed.
    const loggedName = page.getByText(fullName);
    await expect(loggedName).toBeVisible();
    //Delete the account.
    await page.getByRole('link', {name: 'Delete Account'}).click();
    //Verify "ACCOUNT DELETED!" is displayed.
    await expect(page).toHaveURL('https://automationexercise.com/delete_account');
    await expect(page).toHaveTitle('Automation Exercise - Account Created');
    await expect(page.getByText('Account Deleted!')).toBeVisible();
});