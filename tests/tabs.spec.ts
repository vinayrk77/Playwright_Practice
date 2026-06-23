import {test, expect, chromium} from "@playwright/test";

test("Verify and handle tabs", async()=>{

    const browser = await chromium.launch();
    const context = await browser.newContext();

    const parentpage = await context.newPage();

    await parentpage.goto("https://testautomationpractice.blogspot.com/");
    
    //await parentpage.getByRole('button', {name: 'New Tab'}).click();

    // use promise.all() method to capture new page

    const [childpage] =await Promise.all([context.waitForEvent('page'),parentpage.getByRole('button', {name: 'New Tab'}).click()]);
    
    //switch between pages and get title
    const pages = context.pages();
    console.log("Number of pages created are:",pages.length);

    console.log("Title of parent page is:", await pages[0].title());
    console.log("Title of child page is:", await pages[1].title());


    

});