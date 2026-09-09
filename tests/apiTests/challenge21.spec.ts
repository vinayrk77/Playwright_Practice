import { test, expect, Page } from "@playwright/test";


async function addToCart(page: Page, productName: string): Promise<void> {
    const product = page.locator('.hrefch');
    if (await product.textContent() === productName) {
        await product.click();
    }
    await page.getByRole('link', { name: 'Add to cart' }).click();
}


test("Verify if user can add 2 products to cart", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle('STORE');

    await addToCart(page, 'Sony vaio i5');
    page.once('dialog', dialog => {
        console.log('Dialog type is:', dialog.type());
        expect(dialog.type()).toBe(alert);
        console.log('Dialog message is:', dialog.message());
        expect(dialog.message()).toBe('Product added');
        dialog.accept()
    });
});