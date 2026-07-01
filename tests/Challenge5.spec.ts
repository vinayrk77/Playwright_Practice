import {test, expect, Locator} from "@playwright/test";

test("Verify automation page", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const userName = page.locator('input#name');
    await expect(userName).toBeVisible();
    await expect(userName).toBeVisible();
    await expect(userName).toHaveAttribute('required', "");
    await expect(userName).toHaveAttribute('placeholder', "Enter Name");
    const maxlength = await userName.getAttribute("maxlength");
    console.log("Max length is:", maxlength);
    expect(maxlength).toBe('15');
    await userName.fill('Michele');
    const userText = await userName.inputValue();
    console.log("Name entered is:", userText);
    expect(userText).toBe("Michele");

    const userEmail = page.locator('input#email');
    await expect(userEmail).toBeVisible();
    await expect(userEmail).toBeEnabled();
    await userEmail.fill("validuser@example.com");
    const emailText = await userEmail.inputValue();
    console.log("Entered email is:", emailText);
    expect(emailText).toBe("validuser@example.com");

    const userPhone = page.locator('input#phone');
    await expect(userPhone).toBeVisible();
    await expect(userPhone).toBeEnabled();
    const phoneLength = await userPhone.getAttribute('maxlength');
    console.log("Maximum phone length is", phoneLength);
    expect(phoneLength).toBe('10');
    await userPhone.fill('9900909090');
    const phoneText = await userPhone.inputValue();
    console.log("User phone is:", phoneText);
    expect(phoneText).toBe('9900909090');

    const userAddress = page.locator('textarea#textarea');
    await expect(userAddress).toBeVisible();
    await expect(userAddress).toBeEnabled();
    await userAddress.fill('woodland garden baga beacg goa');

    //Radio button
    const maleRadio = page.locator('input#male');
    const initialStatus = await maleRadio.isChecked();
    console.log("Status before checking radio button is:", initialStatus);
    await maleRadio.check();
    const finalStatus = await maleRadio.isChecked();
    console.log("Status after checking radio button is:", finalStatus);
    expect(finalStatus).toBe(true);
    await expect(maleRadio).toBeChecked();

    const femaleRadio = page.locator('input#female');
    await expect(femaleRadio).not.toBeChecked();

    //Checkboxes
    //Check single checkbox
    const firdayBox = page.locator('input#friday');
    await expect(firdayBox).toBeVisible();
    await expect(firdayBox).toBeEnabled();
    await firdayBox.check();
    await expect(firdayBox).toBeChecked();

    //check all checkboxs
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays =  days.map(index=> page.getByLabel(index));
    expect(weekdays.length).toBe(7);

    for(let week of weekdays)
    {
        await week.check();
        await expect(week).toBeChecked();
    }

    //uncheck last 3
    for(let week of weekdays.slice(-3))
    {
        await week.uncheck();
        await expect(week).not.toBeChecked();
    }

    //check the given checkbox
    const dayName = "Saturday";
    for(let label of days)
    {
        if(label === dayName)
        {
            const name = page.getByLabel(label);
            await name.check();
            await expect(name).toBeChecked();
        }
    }



});