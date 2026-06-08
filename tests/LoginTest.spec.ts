import {test, expect, Locator} from "@playwright/test";

test("Verify Login Functionality", async({page})=>{

    await page.goto("https://www.saucedemo.com/");
    const userName:Locator =  page.locator('[data-test="username"]');
    await expect(userName).toBeVisible();
    await expect(userName).toBeEnabled();
    await userName.fill("standard_user");
    const maxLength: string | null =await userName.getAttribute("maxlength");
    console.log("maximum length is:",maxLength);
    const enteredValue = await userName.inputValue();
    console.log("Username entered is:", enteredValue);
    expect(enteredValue).toBe("standard_user");

    const password:Locator = page.locator('[data-test="password"]');
    await expect(password).toBeVisible();
    await expect(password).toBeEnabled();
    await password.fill("secret_sauce");

    const entPass = await password.inputValue();
    console.log("Password entered is:", entPass);
    expect(entPass).toBe("secret_sauce")
});

//radio button actions

test("Radio Button Actions", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio = page.locator('#male');
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);
    await maleRadio.check();
    await expect(maleRadio).toBeChecked();
});

