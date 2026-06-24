import {test, expect, chromium} from "@playwright/test";

test("verify and interact with cookies", async({})=>{
    const browser = await chromium.launch({headless:false});
    const context = await browser.newContext();

    context.addCookies([
        {name: 'mycookie', value:'1234', url:'https://testautomationpractice.blogspot.com/'},
        {name: 'mycookie2', value:'4567', url:'https://testautomationpractice.blogspot.com/'}
    ]);
    console.log('cookie added.....');

    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    //get details of cookie by name

    const allcookieadded = await context.cookies();

    const retrivecookies = allcookieadded.find( (i) => i.name==='mycookie');

    console.log("printing cookie dteails...", retrivecookies);
    expect(retrivecookies?.value).toBe('1234');
    expect(retrivecookies).toBeDefined();

    //get all the cookies
    console.log("all the cookies added", allcookieadded.length);
    expect(allcookieadded.length).toBeGreaterThan(0);

    //print all cookies
    console.log("printing all cookies...");

    for(let cookie of allcookieadded)
    {
        console.log(`${cookie.name} \t ${cookie.value}`);
    }

    //clear all cookies from browser
    await context.clearCookies();
    
    //verify number of cookies
    const allcookies = await context.cookies();
    console.log("Number of cookies after clearing are:", allcookies.length);
    expect(allcookies.length).toBe(0);



});