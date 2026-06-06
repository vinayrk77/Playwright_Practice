import {test, expect, Locator} from "@playwright/test";

test("Test to verify url and title of page", async({page})=>{
    await page.goto("https://practicesoftwaretesting.com/");
    await expect(page).toHaveURL("https://practicesoftwaretesting.com/");
    await expect(page).toHaveTitle(/Practice Software Testing/);
    const getTitle = await page.title();
    console.log("The title of page is:",getTitle);


});