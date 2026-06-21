import {test, expect, Locator} from "@playwright/test";

test("Verify orange hrm", async({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    const userName:Locator = page.getByPlaceholder('Username');
    await expect(userName).toBeVisible();
    await expect(userName).toBeEnabled();
    await userName.fill('Admin');

    const userPassword:Locator = page.getByPlaceholder('Password');
    await expect(userPassword).toBeVisible();
    await expect(userPassword).toBeEnabled();
    await userPassword.fill('admin123');

    await page.getByRole('button', {name: 'Login'}).click();
    await expect(page.getByRole('heading', {name: 'Dashboard'})).toBeVisible();
    
    //Task 2: Search Employee
    await page.getByRole('link', {name: 'PIM'}).click();
    await expect(page.getByRole('heading', {name: 'PIM'})).toBeVisible();

    const empName:Locator = page.getByPlaceholder('Type for hints...');
    await expect(empName).toBeVisible();
    await expect(empName).toBeEnabled();
    await empName.fill('jobin Mathew');
    const empText = await empName.inputValue();
    console.log("Employee name enteres is:",empText);
    expect(empText).toContain('jobin Mathew');

    await page.getByRole('button', {name: 'Search'}).click();

    await expect(page.locator('.oxd-tex', {hasText: '(1) Record Found'})).toBeVisible();

    //Task 3: Table Validation
    // cannot do this there is no tr tbody hard to understand

    //Task 4: Dropdown Validation
    const empStatus:Locator =  page.locator('.oxd-select-text').nth(0);
    await empStatus.click();
    await page.waitForTimeout(3000);

    const options = page.locator("div[role = 'listbox'] span");
    const optionText = (await options.allInnerTexts()).map(text=>text.trim());
    console.log("All options are:",optionText);
    for(let text of optionText)
    {
        console.log(text);
    }

    expect(optionText).toContain('Full-Time Probation');
    await page.locator("div[role = 'listbox'] span", {hasText: 'Full-Time Probation'}).click();

    //Check whether options are sorted.
    const originalList = 

})