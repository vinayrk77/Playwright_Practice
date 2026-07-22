import {test, expect} from "@playwright/test";
import { json } from "node:stream/consumers";

test("Verify and assert data tables", async({page})=>{

    await page.goto("https://the-internet.herokuapp.com/tables");
    await expect(page).toHaveTitle('The Internet');

    //Verify there are 4 rows.
    const tableRows = page.locator('#table1 tbody tr');
    const rowCount = await tableRows.count();
    console.log("Number of rows are", rowCount);
    expect(rowCount).toBe(4);

    //Find the person with the highest due amount.
    const tableHeader = page.locator('#table1 th');
    const headerCount = await tableHeader.count();
    console.log("Number of headers are:", headerCount);
    expect(headerCount).toBe(6);
    let dueHeader = -1;
    for(let i=0; i<headerCount; i++)
    {
        const name = await tableHeader.nth(i).innerText();
        if(name ===('Due'))
        {
            dueHeader = i;
            break;
        }
    }
    expect(dueHeader).not.toBe(-1);

    const alltabledata = await tableRows.all();
    let maxDue = 0;
    let personWithMaxDue = '';
    for (let data of alltabledata) {
        const amount = await data.locator('td').nth(dueHeader).innerText();
        const person = await data.locator('td').nth(1).innerText();
        const value = parseFloat(amount.replace('$', ''));
        console.log(value);
        console.log(person);
        if(value > maxDue)
        {
            maxDue = value;
            personWithMaxDue = person;
        }
    }
    console.log("Maximum value is:", maxDue);
    // Print their name.
    console.log("Person with maximum due is:", personWithMaxDue);
    // Verify the email contains @.
    for(let data of alltabledata)
    {
        const userEmail = await data.locator('td').nth(2).innerText();
        console.log(userEmail);
        expect(userEmail).toContain('@');
    }
    // Verify the last names are sorted alphabetically.
    let originalList = [];
    for(let data of alltabledata)
    {
        const lastName = await data.locator('td').nth(0).innerText();
        console.log(lastName);
        originalList.push(lastName);
    }
    const sortedList = [...originalList].sort();
    if(JSON.stringify(originalList) === JSON.stringify(sortedList))
        {
            console.log("The last names are sorted");
        }
        else{
            console.log("The Last names are not sorted");
        }
    // Click the Edit link for a specific person.
   
    for(let data of alltabledata)
    {
        const text = await data.locator('td').nth(1).innerText();
        if(text === ('Frank'))
        {
            const edit =  data.locator('td').nth(5);
            const editLink =  edit.getByRole('link', {name: 'edit'});
            await expect(editLink).toBeVisible();
            await editLink.click();
        }
    }


});