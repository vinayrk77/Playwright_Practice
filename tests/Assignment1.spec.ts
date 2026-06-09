import {test, expect, Locator} from "@playwright/test";

test("Verify the given page", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/")
    const nameField:Locator = page.locator('#name');

    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();

    await expect(nameField).toHaveAttribute('required', '');
    await expect(nameField).toHaveAttribute('placeholder','Enter Name');



    const maxLength = await nameField.getAttribute("maxlength");
    console.log("max length is:",maxLength);
    expect(maxLength).toBe('15');

    await nameField.fill("vinay");
    const userName =await nameField.inputValue();
    console.log("Name entered is:",userName);
    expect(userName).toBe("vinay");
});