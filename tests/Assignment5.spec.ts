import { test, expect, Locator } from "@playwright/test";

test("Verify the dropdowns", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const phField: Locator = page.locator('#phone');
    await expect(phField).toBeVisible();
    await expect(phField).toBeEnabled();
    await expect(phField).toHaveAttribute('placeholder', 'Enter Phone');

    const maxLength = await phField.getAttribute('maxlength');
    console.log("Max Length is:", maxLength);
    expect(maxLength).toBe('10');

    await phField.fill('8769554890');
    const userPh = await phField.inputValue();
    console.log("User phone number is:", userPh);
    expect(userPh).toBe('8769554890');

    //Radio Button
    const maleRadio: Locator = page.locator('#male');
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

    const initialStatus = await maleRadio.isChecked();
    console.log("status before checking:", initialStatus);
    await maleRadio.check();
    const finalStatus = await maleRadio.isChecked();
    console.log("status after checking:", finalStatus);
    await expect(maleRadio).toBeChecked();

    const femaleRadio: Locator = page.locator('#female');
    await expect(femaleRadio).not.toBeChecked();

    //checkboxes
    const sunBox: Locator = page.locator('input#sunday');
    await expect(sunBox).toBeVisible();
    await expect(sunBox).toBeEnabled();

    await sunBox.check();
    await expect(sunBox).toBeChecked();

    //check all boxes

    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekname = days.map(index => page.getByLabel(index));

    for (let checkbox of weekname) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    //uncheck last 3
    for (let checkbox of weekname.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }

    //check the given checkbox
    const givenVal: string = "Saturday";
    for (let label of days) {
        if (label === givenVal) {
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();

        }
    }

    //dropdowns
    const dropdown: Locator = page.locator('#country');
    await dropdown.selectOption('India');

    //verify number of options
    const allOptions:Locator = page.locator('#country>option');
    expect(allOptions).toHaveCount(10);
    
    //verify if text contain in dropdown
    const optionText = (await allOptions.allTextContents()).map(text=> text.trim());
    console.log(optionText);
    expect(optionText).toContain('Japan')

    //print all dropdowns
    for(const option of optionText)
    {
        console.log(option);
    }

    //multi select dropdown
    const multidrop:Locator = page.locator('#colors');
    await multidrop.selectOption(['Red', 'White', 'Green']);

    //verify number of options
    const allmulti: Locator = page.locator('#colors>option');
    await expect(allmulti).toHaveCount(7);

    //verify if text contain in dropdown
    const multiText = (await allmulti.allTextContents()).map(text=>text.trim());
    console.log(multiText);
    expect(multiText).toContain('White');

    //print all dropdowns
    for(const multi of multiText)
    {
        console.log(multi);
    }




    await page.waitForTimeout(3000);
});