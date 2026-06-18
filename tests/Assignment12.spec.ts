import {test, expect, Locator} from "@playwright/test";

test("verify checkbox radio buttons and tables", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const userName:Locator = page.locator("input#name");
    await expect(userName).toBeVisible();
    await expect(userName).toBeEnabled();
    // 'required' is a boolean attribute; its value is an empty string when present
    await expect(userName).toHaveAttribute('required', '');
    await expect(userName).toHaveAttribute('placeholder', 'Enter Name');

    const maxLength = await userName.getAttribute('maxLength');
    console.log("Maximum Length is:",maxLength);
    expect(maxLength).toBe('15');

    await userName.fill("Maxwell");

    const getUserName = await userName.inputValue();
    console.log("User Name is",getUserName);
    expect(getUserName).toBe("Maxwell");

    const userEmail:Locator = page.locator("input#email");
    await expect(userEmail).toBeVisible();
    await expect(userEmail).toBeEnabled();

    await userEmail.fill('ceyapob638@deposin.com');

    const getUserEmail = await userEmail.inputValue();
    console.log("User email is:",getUserEmail);
    expect(getUserEmail).toBe('ceyapob638@deposin.com');

    const userPhone:Locator = page.locator('input#phone');
    await expect(userPhone).toBeVisible();
    await expect(userPhone).toBeEnabled();

    await userPhone.fill('9896543456');

    const getUserPhone = await userPhone.inputValue();
    console.log("user phone number is:",getUserPhone);
    expect(getUserPhone).toBe('9896543456');

    const userAddress:Locator = page.locator("textarea#textarea");
    await expect(userAddress).toBeVisible();
    await expect(userAddress).toBeEnabled();

    await userAddress.fill("Khatra lane khau galli");

    const getuserAddress = await userAddress.inputValue();
    console.log("User address is:",getuserAddress);

    //Radio Button
    const femalebutton:Locator = page.locator("input#female");
    await expect(femalebutton).toBeVisible();
    await expect(femalebutton).toBeEnabled();

    const initialStatus = await femalebutton.check();
    console.log("initial status before check is:",initialStatus);

    await femalebutton.check();

    const finalStatus = await femalebutton.check();
    console.log("initial status before check is:",finalStatus);
    await expect(femalebutton).toBeChecked();

    const maleButton:Locator = page.locator("input#male");
    await expect(maleButton).not.toBeChecked();

    //check the tuesday box
    const tueBox: Locator = page.locator("input#tuesday");
    await expect(tueBox).toBeVisible();
    await expect(tueBox).toBeEnabled();
    await tueBox.check();
    await expect(tueBox).toBeChecked();

    //check all checkboxex
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays = days.map(day=> page.getByLabel(day));
    for(let allday of weekdays)
    {
        await allday.check();
        await expect(allday).toBeChecked();
    }

    //uncheck last 3
    for(let allday of weekdays.slice(-3))
    {
        await allday.uncheck();
        await expect(allday).not.toBeChecked();
    }

    //check the any given checkbox
    const name:string = "Friday";
    for(let lable of days)
    {
        if(lable == name)
        {
            const weekname = page.getByLabel(lable);
            await weekname.check();
            await expect(weekname).toBeChecked();
        }
    }

    //verify the dropdowns

    const animals:Locator = page.locator('#animals');
    await expect(animals).toBeVisible();
    //select any 3 colours
    await animals.selectOption(['lion','elephant','deer']);
    await expect(animals).toHaveValues(['deer', 'elephant', 'lion']);;

    // check the count
    const count:number = await page.locator('#animals>option').count();

    console.log("number of options are:",count);
    expect(count).toBe(10);

    //check if text exists
    const animalOptions:Locator = page.locator('#animals>option');
    const optiontext:string[] = (await animalOptions.allTextContents()).map(text=>text.trim());
    console.log("Options are:",optiontext);
    expect(optiontext).toContain('Giraffe');

    //check if sorted
    const originalList:string[] = [...optiontext];
    const sortedList:string[] = [...optiontext].sort();

    console.log("Original list is:", originalList);
    console.log("Sorted list is", sortedList);
    expect(sortedList).toEqual(originalList);

    //check if duplicates
    const myset = new Set<string>;
    const duplicates:string[] = [];

    for(let option of optiontext)
    {
        if(myset.has(option))
        {
            duplicates.push(option)
        }
        else
        {
            myset.add(option);
        }
    }
    console.log("Duplicate options are:",duplicates);

    //tables
    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //count number of rows in a table
    const tableRows:Locator = table.locator('tr');
    const rowcount = await tableRows.count();
    console.log("Number of rows are:",rowcount);
    expect(rowcount).toBe(7);

    //count the number of columns
    const tableCols: Locator = tableRows.locator('th');
    const colscount = await tableCols.count();
    console.log("Number of columns are:",colscount);
    expect(colscount).toBe(4);

    //Read all data from 4nd row
    const secondRowData:Locator = tableRows.nth(4).locator('td');
    const secondRowText:string[] = await secondRowData.allInnerTexts();
    console.log("Fourth row data is:",secondRowText);
    await expect(secondRowData).toHaveText([ 'Master In Selenium', 'Mukesh', 'Selenium', '3000' ]);

    for(let text of secondRowText)
    {
        console.log(text);
    }

    //read all data from table excluding header
    console.log("Read all table data.....");

    const alltabledata:Locator[] = await tableRows.all();
    for(let data of alltabledata)
    {
        const cols = await data.locator('td').allInnerTexts();
        console.log(cols.join('\t'));
    }
});