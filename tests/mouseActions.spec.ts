import { test, expect } from "@playwright/test";

test("Verify mouse hover Actions", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const mouse = page.getByRole('button', { name: 'Point Me' });
    await mouse.hover();
    const laptops = page.locator('.dropdown-content a:nth-child(2)');
    await laptops.hover();
    await laptops.click();
    await page.waitForTimeout(5000);
});

test("Right click action", async ({ page }) => {
    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

    const button = page.locator('span.context-menu-one');
    await button.click({ button: 'right' });
    await page.waitForTimeout(5000);
});

test("Double click action", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const double = page.getByRole('button', {name: 'Copy Text'});
    await double.dblclick();
    const hello = page.locator('#field2');
    await expect(hello).toHaveValue('Hello World!');
    await page.waitForTimeout(5000);
});

test.only("Drag and drop", async({page})=>{
    await page.goto('https://testautomationpractice.blogspot.com/');

    const source = page.locator('div#draggable');
    const target = page.locator('div#droppable');

    await source.dragTo(target);

    const final = page.locator('#droppable p');
    await expect(final).toHaveText('Dropped!');
    await page.waitForTimeout(5000);
});