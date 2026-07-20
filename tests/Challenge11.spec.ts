import { test, expect, chromium } from "@playwright/test";

test("Add and configure todo list", async ({ }) => {

    const browser = await chromium.launch();
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    await page.goto('https://demo.playwright.dev/todomvc/#/completed');
    await expect(page).toHaveTitle('React • TodoMVC');

    const todos = ["Wakeup at 6", "Exercise for 30 Mins", "Meditate for 10 mins", "Study playwright structure answers", "Do breakfast", "Practice playwright codes", "Have a lunch break and sleep", "Practice API testing", "Teal Breal", "Study manual notes and sleep"];
    
    for(let i=0; i<todos.length; i++)
    {
        await page.getByPlaceholder("What needs to be done?").fill(todos[i]);
        await page.keyboard.press('Enter');
    }
    await page.getByRole('link', {name: 'All'}).click();
    console.log("ToDo list is:",todos);
    expect(todos).toHaveLength(10);

    //Mark all as completed.
    const todoList = todos.map((_,index)=> page.locator('input.toggle').nth(index));
    for(let checkBox of todoList)
    {
        await checkBox.check();
        await expect(checkBox).toBeChecked();
    }
    //Clear completed.
    await page.locator('.clear-completed').click();
    //Verify the list is empty.
    await expect(page.locator('todo-list')).not.toBeVisible();

    //Add 5 new todos.
    const newtodos = ["wake up at 6", "Go to gym", "Study for interview", "Play Games", "Have Lunch"];
    for(let i=0; i<newtodos.length; i++)
    {
        await page.getByPlaceholder("What needs to be done?").fill(newtodos[i]);
        await page.keyboard.press('Enter');
    }
    //await page.getByRole('link', {name: 'All'}).click();
    console.log("New todo list is:", newtodos);
    expect(newtodos).toHaveLength(5);

    const editList = page.locator('[data-testid="todo-title"]').nth(2);
    await editList.dblclick();
    await page.keyboard.press("Control+A");
    await page.keyboard.press('Backspace');
    await editList.pressSequentially('Listen Music');
    await editList.press('Enter');
    //Complete only some of the todos.
    const newList = newtodos.map((_,index)=> page.locator('.toggle').nth(index));
    for(let checkbox of newList.slice(2))
    {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    //Verify Active filter.
    await page.getByRole('link', {name: 'Active'}).click();
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(2);
    //Verify Completed filter.
    await page.getByRole('link', {name: 'Completed'}).click();
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(3);
    //  Verify All filter.
    await page.getByRole('link', {name: 'All'}).click();
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(5);
    // Delete one todo using hover.
    await page.locator('.destroy').nth(3).hover();
    // Click the visible destroy button (force because it is only visible on hover)
    await page.locator('.destroy').nth(3).click({ force: true });
    // Verify the final count.
    await expect(page.locator('[data-testid="todo-title"]')).toHaveCount(4);
});
