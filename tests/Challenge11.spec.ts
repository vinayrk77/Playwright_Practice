import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

test("Verify TodoMVC", async ({ page }) => {

    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await expect(page).toHaveTitle('React • TodoMVC');

    const todos = [
        "Buy milk",
        "Complete Playwright assignment",
        "Review pull request",
        "Pay internet bill",
        "Prepare interview notes",
        "Book doctor's appointment",
        "Exercise for 30 minutes",
        "Read Playwright docs",
        "Go to Swimming",
        "Read a book"
    ];

    for (let i = 0; i < todos.length; i++) {
        await page.getByPlaceholder('What needs to be done?').fill(todos[i]);
        await page.keyboard.press('Enter');
    }
    const todoList = todos.map((_, index) => page.locator('.toggle').nth(index));
    for (const checkbox of todoList) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }

    
    const todoCount = page.locator('[data-testid="todo-count"]');
    await expect(todoCount).toHaveText(['0 items left']);
    await page.locator('.clear-completed').click();
    await expect(page.locator('.todo-list')).not.toBeVisible();

    const nexttodos = [
        "Go to shopping",
        "Pay the light bill",
        "Watch Cricket Match",
        "Play Fifa",
        "Go to sleep",
    ];

    for(let i=0; i<nexttodos.length; i++)
    {
        await page.getByPlaceholder('What needs to be done?').fill(nexttodos[i]);
        await page.keyboard.press('Enter');
    }

    const nextList = nexttodos.map((_, index1) => page.locator('.toggle').nth(index1));
    for (const nextcheckBox of nextList) {
        await nextcheckBox.check();
        await expect(nextcheckBox).toBeChecked();
    }
    await nextList[2].locator('destroy').click();
    
});