import { test, expect, Locator } from "@playwright/test";

test("verify checknox and radio buttons", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const nameField: Locator = page.locator("#name");

    await expect(nameField).toBeVisible();
    await expect(nameField).toBeEnabled();
    await expect(nameField).toHaveAttribute('required', '');
    await expect(nameField).toHaveAttribute('placeholder', 'Enter Name');
    //Maximum length
    const maxLength = await nameField.getAttribute('maxlength');
    console.log("Maximum Length is:", maxLength);
    expect(maxLength).toBe('15');
    //retrive and print text
    await nameField.fill("Robert Jackson");
    const userName = await nameField.inputValue();
    console.log("Name entered is:", userName);
    expect(userName).toBe('Robert Jackson');

    //email
    const emailFeild: Locator = page.locator('#email');
    await emailFeild.fill('robertflick@gmail.com');
    const emailValue = await emailFeild.inputValue();
    expect(emailValue).toBe('robertflick@gmail.com');

    //phone
    const phoneField: Locator = page.locator('#phone');
    const phLen = await phoneField.getAttribute('maxlength');
    console.log("Phone no lenth is", phLen);
    expect(phLen).toBe('10');
    await phoneField.fill('7654321789');
    const phValue = await phoneField.inputValue();
    expect(phValue).toBe('7654321789');

    // address
    const addsField = page.locator('#textarea');
    await addsField.fill("Kachara seth danger area");
    const addsValue = await addsField.inputValue();
    expect(addsValue).toBe("Kachara seth danger area");

    //radio button
    const maleBtn = page.locator('#male');
    const initialStatus = await maleBtn.isChecked();
    console.log("Status before clicking:", initialStatus);

    await maleBtn.click();

    const finalStatus = await maleBtn.isChecked();
    console.log("Status after clicking:", finalStatus);
    expect(finalStatus).toBe(true);
    await expect(maleBtn).toBeChecked();

    const femaleBtn: Locator = page.locator('#female');
    await expect(femaleBtn).not.toBeChecked();

    //checkbox
    const tueBox: Locator = page.locator('input#tuesday');
    await expect(tueBox).toBeVisible();
    await expect(tueBox).toBeEnabled();
    //check if it is unchecked
    await expect(tueBox).not.toBeChecked();
    await tueBox.check();
    await expect(tueBox).toBeChecked();

    //click all checkBoxes

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkbx = days.map(index => page.getByLabel(index));
    expect(checkbx.length).toBe(7);

    for (let allchbx of checkbx) {
        await allchbx.check();
        await expect(allchbx).toBeChecked();
    }

    //uncheck last 3 checkboxes

    for (let allchbx of checkbx.slice(-3)) {
        await allchbx.uncheck();
        await expect(allchbx).not.toBeChecked();
    }

    const weekname:string = "Friday";

    for(const label of days)
    {
        if(label === weekname)
        {
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }
    await page.waitForTimeout(5000);


});