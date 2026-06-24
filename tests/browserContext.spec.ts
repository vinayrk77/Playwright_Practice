import {test, expect, chromium} from "@playwright/test";

test("verify browser context", async({})=>{

    const browser = await chromium.launch({headless:false}); //run in headed mode
    const context = await browser.newContext(
        {
            viewport: {width:1300, height:1300},
            //proxy: {server:"http://myproxy.com:3456"},
            ignoreHTTPSErrors:true

        }

    );


    const page = await context.newPage();
    //await page.goto("https://www.sreenidhirajakrishnan.com/practice");
    await page.goto('https://expired.badssl.com');
    console.log("Title of page is:", await page.title());


});