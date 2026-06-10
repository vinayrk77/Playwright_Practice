import { test, expect, Locator } from "@playwright/test";

test("verify the given requirenments", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const nameField: Locator = page.locator("input#name");
    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();
    await expect(nameField).toHaveAttribute('required', '');
    await expect(nameField).toHaveAttribute('placeholder', 'Enter Name');

    const maxLength = await nameField.getAttribute('maxlength');
    console.log("Max length is:", maxLength);
    expect(maxLength).toBe('15');

    await nameField.fill("Baloon");
    const user = await nameField.inputValue();
    console.log("Userneme entered is:", user);
    expect(user).toBe("Baloon");
});





test("Verify the email entered", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const emailField: Locator = page.locator('input#email');

    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEnabled();

    await expect(emailField).toHaveAttribute('placeholder', 'Enter EMail');

    const maxLength = await emailField.getAttribute('maxlength');
    console.log("Max length is:", maxLength);
    expect(maxLength).toBe('25');

    await emailField.fill('robertflick@gmail.com');

    const userEmail = await (emailField).inputValue();
    console.log("User email is:", userEmail);
    expect(userEmail).toBe("robertflick@gmail.com")
});

test("verify radio button", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const malebtn:Locator = page.locator('input#male');
    await expect(malebtn).toBeVisible();
    await expect(malebtn).toBeEnabled();
    
    const initialStatus = await malebtn.isChecked();
    console.log("Status od button before clicking", initialStatus);

    await malebtn.click();
    
    const finalSts = await malebtn.isChecked();
    console.log("Status od button after clicking", finalSts);

    const femalebtn:Locator = page.locator('input#female');
    await expect(femalebtn).not.toBeChecked();
});

test.only("Verify the checkboxex", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const chkbx:Locator = page.locator('input#tuesday');
    expect(chkbx).toBeVisible();
    expect(chkbx).toBeEnabled();
    
    await chkbx.click();
    await expect(chkbx).toBeChecked();

    // check all boxes
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkBox: Locator[] = days.map(index => page.getByLabel(index));


});