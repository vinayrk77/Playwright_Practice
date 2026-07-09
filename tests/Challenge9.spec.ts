import {test, expect, chromium} from "@playwright/test";

test('Student Registration', async({})=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.sreenidhirajakrishnan.com/practice');
    await expect(page).toHaveTitle('Free Automation Practice Playground — Selenium, Playwright, Cypress, Robot Framework | Sreenidhi Rajakrishnan');
    //Enter your name in the Name textbox.
    await page.getByPlaceholder("Enter your name").fill('Mark');
    await page.getByPlaceholder("Enter password").fill('Mark@1234');
    await page.getByPlaceholder("Enter email").fill('validuser@example.com');
    await page.getByPlaceholder("Enter phone").fill('8675432190');
    await page.getByPlaceholder("Tell us about yourself").fill('I am mark goldbridge and I am liverpool fan');
    await page.locator('button[data-testid="form-submit"]').click();
    await expect(page.locator('p[data-testid="form-result"]')).toContainText('Form submitted successfully');
    
    //Select checkbox.
    const optionA = page.locator('input[data-testid="check-a"]');
    await optionA.check();
    await expect(optionA).toBeChecked();
    const optionB = page.locator('input[data-testid="check-b"]');
    await optionB.check();
    await expect(optionB).toBeChecked();
    //Select radio.
    const radio1 = page.locator('#radio-1');
    await radio1.check();
    await expect(radio1).toBeChecked();
    await expect(page.locator('p[data-testid="radio-result"]')).toContainText(['Selected:','one']);
    //Select a value from the dropdown.
    const dropdown1 = page.locator('#standard-select');
    await dropdown1.selectOption('green');
    await expect(dropdown1).toHaveValue('green');
    //Multiselect
    const multidropdown = page.locator('#multi-select');
    await multidropdown.selectOption(['java', 'python', 'javascript']);
    await expect(multidropdown).toHaveValues(['java', 'python', 'javascript']);
    //custom
    await page.locator('#custom-dropdown-toggle').click();
    const customdropdown = page.locator('li[data-testid="custom-option-beta"]');
    await customdropdown.click();
    await expect(page.getByTestId('custom-dropdown-result')).toContainText(['Selected:', 'Beta']);
    //dynamic
    const dynamicdropdown = page.getByTestId('dynamic-select');
    await dynamicdropdown.selectOption('Playwright');
    await expect(dynamicdropdown).toHaveValue('Playwright');
    await expect(page.getByTestId('dynamic-select-result')).toContainText(['Selected:', 'Playwright']);
});

test.only("Verify alert popup", async({page})=>{
    await page.goto('https://www.sreenidhirajakrishnan.com/practice#section-9');

    page.once('dialog', async dialog =>{
        console.log("Type of dialog is", dialog.type());
        expect(dialog.type()).toBe('alert');
        console.log('Text on dialog is:', dialog.message());
        expect(dialog.message()).toBe('This is a practice alert');
        await dialog.accept();
    });
    await page.locator('button#alert-btn').click();
    await expect(page.locator('p[data-testid="alert-result"]')).toContainText('Alert was shown and dismissed');

    page.once('dialog', async dialog =>{
        console.log("dialog type is", dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log('Text on dialog is:', dialog.message());
        expect(dialog.message()).toBe('Do you confirm this action?');
        await dialog.dismiss();
    });
    await page.locator('button#confirm-btn').click();
    await expect(page.locator('p[data-testid="alert-result"]')).toContainText('Confirm result: Cancel');

    page.once('dialog', async dialog =>{
        console.log("Tye of dialog is:", dialog.type());
        expect(dialog.type()).toBe('prompt');
        console.log('Text on dialog is:', dialog.message());
        expect(dialog.message()).toBe('Enter a value:');
        await dialog.accept('Hi Vinay');
    });
    await page.locator('button#prompt-btn').click();
    await expect(page.locator('p[data-testid="alert-result"]')).toContainText('Prompt value: Hi Vinay');
});




