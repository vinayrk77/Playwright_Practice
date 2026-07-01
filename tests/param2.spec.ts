import {test, expect} from "@playwright/test";

const loginData: string[] [] = [
    ["vinayrk26@gmail.com", "vinay@123", "valid"],
    ["invaliduser@example.com", "Test123", "invalid"],
    ["validuser@example.com", "mark@123", "invalid"],
    ["","","invalid"]
];

for(const [email, password, validity] of loginData){

test(`Login test for ${email} and ${password}`, async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    await page.getByRole('link', {name: 'Log in'}).click();
    await page.locator('#Email').fill(email);
    await page.locator('#Password').fill(password);
    await page.getByRole('button', {name: 'Log in'}).click();

    if(validity.toLowerCase() === 'valid')
    {
        const logoutlink = page.locator('.ico-logout');
        await expect(logoutlink).toBeVisible({timeout: 3000});
    }
    else
    {
        const errorMessage = page.locator('.validation-summary-errors');
        await expect(errorMessage).toBeVisible({timeout: 3000});
        await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    }


});
}
