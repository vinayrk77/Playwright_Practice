import { test, expect, chromium } from "@playwright/test";

test("Handel the windows in playwright", async ({ }) => {

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    //Part 1: Multiple Windows
    await page.goto("https://the-internet.herokuapp.com/windows");
    await expect(page).toHaveTitle('The Internet');

    await Promise.all([page.waitForEvent('popup'), page.getByRole('link', { name: 'Click Here' }).click()]);

    //Verify there are now 2 pages.
    const allPopups = context.pages();
    console.log("Number of pages are:", allPopups.length);
    expect(allPopups.length).toBe(2);

    //Switch to the child window.
    const heading = allPopups[1].getByRole('heading', { name: 'New Window' });
    await expect(heading).toBeVisible();
    const childUrl = allPopups[1].url();
    console.log("Url is:", childUrl);
    expect(childUrl).toBe('https://the-internet.herokuapp.com/windows/new');
    await allPopups[1].close();
    const parentHeading = allPopups[0].getByRole('heading', { name: 'Opening a new window' });
    expect(parentHeading).toBeVisible();
    const parenturl = allPopups[0].url();
    console.log("Parent url is:", parenturl);
    expect(parenturl).toBe('https://the-internet.herokuapp.com/windows');
});
////Part 2: Iframe
test("Test and verify the iframes", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await expect(page).toHaveTitle('The Internet');
    await page.locator('button.tox-notification__dismiss').click();

    const frames = page.frames();
    console.log("Number of frames are:", frames.length);

    const frame1 = page.frameLocator('#mce_0_ifr').locator('#tinymce p');
    await frame1.fill('I am learning Playwright for interviews.');
    await page.keyboard.press('Control+A'); // 
    await page.keyboard.press('Control+I');
    await expect(frame1).toHaveText('I am learning Playwright for interviews.');
});

//Part 3: Alerts
test("Verify Javascript popup simple alert", async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page).toHaveTitle('The Internet');

    //Handle the JS Alert.
    page.on('dialog', async dialog => {
        console.log("Type of dialog is:", dialog.type());
        expect(dialog.type()).toBe('alert');
        console.log("Text of dialog is:", dialog.message());
        expect(dialog.message()).toBe('I am a JS Alert');
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await expect(page.locator('p#result')).toContainText('You successfully clicked an alert');
});

test("verify confirm alert by acceptiong", async({ page }) => {
    //Handle the Confirm by accepting.
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page).toHaveTitle('The Internet');

    page.once('dialog', async dialog => {
        console.log("Type of dialog is:", dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log("Text on dialog is:", dialog.message());
        expect(dialog.message()).toBe('I am a JS Confirm');
        dialog.accept();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('p#result')).toContainText('You clicked: Ok');
});
test("verify confirm alert by dissming it", async({ page }) => {
    //Handle the Confirm by accepting.
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page).toHaveTitle('The Internet');

    page.once('dialog', async dialog => {
        console.log("Type of dialog is:", dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log("Text on dialog is:", dialog.message());
        expect(dialog.message()).toBe('I am a JS Confirm');
        dialog.dismiss();
    });
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await expect(page.locator('p#result')).toContainText('You clicked: Cancel');
});
test("Verify promt alert", async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    await expect(page).toHaveTitle('The Internet');

    page.once('dialog', async dialog =>{
        console.log("Type of dialog is", dialog.type());
        expect(dialog.type()).toBe('prompt');
        console.log("Dialog text is", dialog.message());
        expect(dialog.message()).toBe('I am a JS prompt');
        dialog.accept('I am Vinay');
    });
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    await expect(page.locator('p#result')).toContainText('You entered: I am Vinay');
});
//Part 4: Drag & Drop
test("Verify drag and drop", async({page})=>{
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    await expect(page.getByRole('heading', {name: 'Drag and Drop'})).toBeVisible();

    const optionA = page.locator('div#column-a');
    const optionB = page.locator('div#column-b');
    await optionA.dragTo(optionB);
    await expect(optionA).toContainText('B');
    await expect(optionB).toContainText('A');
});
//Part 5: File Upload
test("Verify the file upload", async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/upload');
    await expect(page.getByRole('heading', {name: 'File Uploader'})).toBeVisible();

    await page.locator('input#file-upload').setInputFiles('uploads/Vinay_Karanjavkar_Resume.pdf');
    await page.locator('input#file-submit').click();

    await page.waitForURL('https://the-internet.herokuapp.com/upload');
    await expect(page).toHaveURL('https://the-internet.herokuapp.com/upload');
    await expect(page.getByRole('heading', {name: 'File Uploaded!'})).toBeVisible();
});
//Part 6: Dynamic Table
test.only('Verify dynamic table', async({page})=>{

    await page.goto('https://the-internet.herokuapp.com/tables');
    await expect(page.getByRole('heading', {name: 'Data Tables'})).toBeVisible();

    const tableRows = page.locator('#table1 tbody tr');
    const rowCount = await tableRows.count();
    console.log("Number of rows are:", rowCount);
    expect(rowCount).toBe(4);

    const tableCols = page.locator('#table1 th');
    const colsCount = await tableCols.count();
    console.log("Number of columns are:", colsCount);
    expect(colsCount).toBe(6); 
    //Find the highest Due amount.
    let dueAmt = -1
    for(let i=0; i<colsCount; i++)
    {
        const name = await tableCols.nth(i).innerText();
        if(name == ('Due'))
        {
            dueAmt = i;
            break;
        }
    }
    expect(dueAmt).not.toBe(-1);
    console.log(dueAmt);
});