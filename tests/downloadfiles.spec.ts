import{test, expect} from "@playwright/test";
import fs from 'fs';

test("verify and downloads files", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");

    await page.locator('textarea#inputText').fill('Welcome Vinay');
    await page.getByRole('button', {name: 'Generate and Download Text File'}).click();

    const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('link', {name: 'Download Text File'}).click()]);
    //await page.waitForEvent('download');
    //await page.getByRole('button', {name: 'Download Text File'}).click();

    //Define the download path

    const coustomPath = 'downloads/testfile.txt';
    await download.saveAs(coustomPath);

    //check if file exists in the path
    const fileExists:boolean = fs.existsSync(coustomPath);
    expect(fileExists).toBeTruthy();

    //clean up downloaded files
    if(fileExists)
    {
        fs.unlinkSync(coustomPath);
    }

    await page.waitForTimeout(5000);

});