import { test, expect, Page } from "@playwright/test";


async function addToCart(page: Page, productName: string): Promise<void> {
    await page.getByRole('link', { name: productName }).click();
     page.on('dialog', async dialog => {
        console.log('Dialog:', dialog.message());
        await dialog.accept();
    });
    await page.getByRole('link', { name: 'Add to cart' }).click();
}
test("Verify if user can add 2 products to cart", async ({ page }) => {
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle('STORE');

    await addToCart(page, 'Sony vaio i5');
    await page.waitForTimeout(2000);
    
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page.getByRole('link', { name: 'CATEGORIES' })).toBeVisible();
    await addToCart(page, 'Samsung galaxy s6');

    await page.locator('#cartur').click();
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.getByText('Sony vaio i5')).toBeVisible();
    await expect(page.getByText('Samsung galaxy s6')).toBeVisible();
    const total = await page.locator('tr.success').count();
    console.log('Number of Products inside cart are:', total);
    expect(total).toBe(2);
});