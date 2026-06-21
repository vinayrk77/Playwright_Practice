import { test, expect, Locator } from "@playwright/test";

test("Verify frames", async ({ page }) => {

    await page.goto("https://demo.automationtesting.in/Frames.html");

    //total number of frames present on frames
    const frames = page.frames();
    console.log("Number of frames:", frames.length);

    const frame1 = page.frameLocator('#singleframe').locator('input[type="text"]');
    await frame1.fill('Vinay Karanjavkar');

    await page.waitForTimeout(5000);
});

test.only("Verify child frames", async ({ page }) => {
    await page.goto('https://demo.automationtesting.in/Frames.html');
    await page.locator('a[href="#Multiple"]').click();

    const Parentframe = page.frameLocator('iframe[src="MultipleFrames.html"]');
    const childframe = Parentframe.locator('iframe');
    await expect(childframe).toHaveCount(1);

    const childFrame = Parentframe.frameLocator('iframe');

    // Interact inside child frame
    await childFrame.locator('input[type="text"]').fill('Vinay');


});