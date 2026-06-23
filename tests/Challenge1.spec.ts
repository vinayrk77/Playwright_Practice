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
    const originalList = [...optionText];
    const sortedList = [...optionText].sort();

    console.log("Original list is:",originalList);
    console.log("Sorted list is:",sortedList);

    if(JSON.stringify(originalList)=== JSON.stringify(sortedList))
    {
        console.log("Options are sorted");
    }
    else
    {
        console.log("Options are not sorted");
    }

    //leaves
    const dashboard = page.locator('.oxd-topbar-header i').nth(0);
    await dashboard.click();
    const leaves = page.getByRole('link', {name: 'Leave'});
    await leaves.click();
    const year:string = '2026';
    const date:string = '31';
    const month = 'December';

    const fromDate = page.getByPlaceholder("yyyy-dd-mm").nth(0);
    await fromDate.click();

    const currentMonth = page.locator('oxd-calendar-selector-month-selected');
    const currentMonthText = await currentMonth.innerText();

    const currentYear = page.locator('oxd-calendar-selector-year-selected');
    const currentYearText = await currentYear.innerText();

    while(true)
    {
        if(currentMonthText === month  && currentYearText ===year)
        {
            break;
        }
        else
        {
            await page.locator('i.bi-chevron-right').click();
        }
    }

    //date 
    const alldates = await page.locator('div.oxd-calendar-date-wrapper').all();

    for(let dt of alldates)
    {
        const dateText = await dt.innerText();
        if(dateText === date)
        {
            await dt.click();
            break;
        }
    }
    const expectedDate = '2026-31-12';
    await expect(leaves).toHaveValue(expectedDate);

    //checkbox
    await page.locator('.oxd-topbar-header i').nth(0).click();
    const admin = page.getByRole('link', {name: 'Admin'});
    await admin.click();
})