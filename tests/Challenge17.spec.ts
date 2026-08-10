import {test, expect, Page} from "@playwright/test";
import {faker} from '@faker-js/faker';

let generatedUser = '';
let generatedPWD = '';

    async function pageUrl(page:Page){
        await page.goto('https://parabank.parasoft.com/parabank/index.htm');
    }

    async function UserRegister(page:Page){

        await pageUrl(page);

        await page.getByRole('link', {name: 'Register'}).click();
        const firstName = page.locator('input[name="customer.firstName"]');
        const generatedFirstName = faker.person.firstName();
        await firstName.fill(generatedFirstName);

        const lastName =  page.locator('input[name="customer.lastName"]');
        const generatedLastName = faker.person.lastName();
        await lastName.fill(generatedLastName);

        const address = page.locator('input[name="customer.address.street"]');
        const generatedAdress = faker.location.streetAddress();
        await address.fill(generatedAdress);

        const city = page.locator('input[name="customer.address.city"]');
        const generatedCity = faker.location.city();
        await city.fill(generatedCity);

        const state = page.locator('input[name="customer.address.state"]');
        const generatedState = faker.location.state();
        await state.fill(generatedState);

        const zipcode = page.locator('input[name="customer.address.zipCode"]');
        const generatedZip = faker.location.zipCode();
        await zipcode.fill(generatedZip);

        const phone = page.locator('input[name="customer.phoneNumber"]');
        const generatedPhone = faker.phone.number();
        await phone.fill(generatedPhone);

        await page.locator('input[name="customer.ssn"]').fill('33445566');

        const username = page.locator('input[name="customer.username"]');
        generatedUser = faker.internet.username();
        await username.fill(generatedUser);

        const pwd = page.locator('input[name="customer.password"]');
        generatedPWD = faker.internet.password();
        await pwd.fill(generatedPWD);

        const cnfPwd = page.locator('input[name="repeatedPassword"]');
        await cnfPwd.fill(generatedPWD);

        await page.locator('input[value="Register"]').click();

        return {username: generatedUser, password: generatedPWD}
}

async function logout(page:Page){
    await page.getByRole('link', {name: 'Log Out'}).click();
}
async function login(page:Page, username:string, password:string){
    await page.locator('input[name="username"]').fill(username);
    await page.locator('input[name="password"]').fill(password);

    await page.locator('input[value="Log In"]').click();
}

async function openAccount(page:Page, accountType:string){
    await page.getByRole('link', {name: 'Open New Account'}).click();
    
    await page.locator('form #type').selectOption(accountType);
    await page.locator('select#fromAccountId').selectOption({ index: 0 });
    await page.locator('input[value="Open New Account"]').click();
}


test("Verify login and signup using functions", async({page})=>{

    const creds = await UserRegister(page);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/register.htm');
    await logout(page);
    await expect(page).toHaveURL('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC');
    await login(page, creds.username, creds.password);
    await expect(page.getByRole('heading', {name: 'Accounts Overview'})).toBeVisible();
    await openAccount(page, 'SAVINGS');
    await expect(page.getByRole('heading', {name: 'Account Opened!'})).toBeVisible();
    //account overview
    await page.getByRole('link', {name: 'Accounts Overview'}).click();
    await page.pause();
});

