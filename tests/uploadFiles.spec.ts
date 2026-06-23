import {test, expect} from "@playwright/test";

test("Upload single file", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#singleFileInput").setInputFiles('uploads/Day28-dialogs+and+frames.pdf');
    await page.getByRole('button', {name: 'Upload Single File'}).click();

    const status = page.locator('#singleFileStatus');
    const statusText = await status.textContent();
    console.log("Status of file is:",statusText);
    expect(statusText).toContain('Day28-dialogs+and+frames.pdf');
});

test.only("verify uploading multiple files", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#multipleFilesInput").setInputFiles(['uploads/Day28-dialogs+and+frames.pdf', 'uploads/SDET_Playwright_TypeScript_Foundation_Kit_2026.pdf']);
    await page.getByRole('button', {name: 'Upload Multiple Files'}).click();

    const msg = await page.locator('#multipleFilesStatus').textContent();
    expect(msg).toContain('Day28-dialogs+and+frames.pdf'); 
    expect(msg).toContain( 'SDET_Playwright_TypeScript_Foundation_Kit_2026.pdf');
    console.log("Files uploaded successfully");


});