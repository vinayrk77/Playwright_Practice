import {test, expect, Locator, chromium} from "@playwright/test";

test("verify and handle popups", async({})=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const parentpage = await context.newPage();

    await parentpage.goto("https://testautomationpractice.blogspot.com/");

    await Promise.all([parentpage.waitForEvent('popup'), parentpage.getByRole('button', {name: 'Popup Windows'}).dblclick()]);
    await parentpage.waitForTimeout(2000);


    //await parentpage.getByRole('button', {name: 'Popup Windows'}).dblclick();

    const allPopup = context.pages();
    console.log("Number of popus are:", allPopup.length);

    console.log(allPopup[0].url());
    console.log(allPopup[1].url());
    console.log(allPopup[2].url());

    for(const pg of allPopup)
    {
        const title = await pg.title();
        if(title.includes('Playwright'))
        {
            await pg.getByRole('link', { name: 'Get started' }).click();
            await parentpage.waitForTimeout(5000);
    
            await pg.close();
        }
    }
    await parentpage.waitForTimeout(5000);
    


});