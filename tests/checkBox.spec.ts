import { test, expect, Locator } from "@playwright/test";

test("Verify checkbox actions", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const getName: Locator = page.locator('#name');
    await getName.fill('Mark');
    await expect(getName).toBeVisible();
    await expect(getName).toBeEnabled();

    const getEmail: Locator = page.locator('#email');
    await getEmail.fill('vinayrk26@gmail.com');
    await expect(getEmail).toBeVisible();
    await expect(getEmail).toBeEnabled();

    const getPhone: Locator = page.locator('#phone');
    await getPhone.fill('9875432345');
    await expect(getPhone).toBeVisible();
    await expect(getPhone).toBeEnabled();

    const getAddress: Locator = page.locator('#textarea');
    await getAddress.fill('Pappan paan wala danger gali kamra no 420');
    await expect(getAddress).toBeVisible();
    await expect(getAddress).toBeEnabled();

    const femaleButton: Locator = page.locator('#female');
    await femaleButton.check();
    await expect(femaleButton).toBeVisible();
    await expect(femaleButton).toBeEnabled();
    await expect(femaleButton).toBeChecked();
    //check single checkbox
    const checkBox: Locator = page.getByLabel('Monday');
    await checkBox.check();
    await expect(checkBox).toBeChecked();

    //select all checkboxes
    const days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

    for(const checkB of checkboxes)
    {
        await checkB.check();
        await expect(checkB).toBeChecked();
    }

    //uncheck last 3
    for(const checkB of checkboxes.slice(-3))
    {
        await checkB.uncheck();
        await expect(checkB).not.toBeChecked();
    }

    //select checkbox based on label
    const weekday:string = "Thursday";

    for(const label of days)
    {
        if(label.toLowerCase() === weekday.toLowerCase())
        {
        const checkBox = page.getByLabel(label);
        await checkBox.check();
        await expect(checkBox).toBeChecked();
        }

    }
});