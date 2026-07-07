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
    
    //Select Male (or the appropriate gender option if present).
    
    //Select exactly two hobbies using checkboxes.
    //Select a value from the dropdown.
    //Click the Submit button.
    //Verify that a success message (or confirmation text) is displayed.
    //Take a screenshot after successful submission.







});