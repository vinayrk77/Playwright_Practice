import {test, expect, Locator} from "@playwright/test";

test("Verify automation page", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const userName = page.locator('input#name');
    await expect(userName).toBeVisible();
    await expect(userName).toBeVisible();
    await expect(userName).toHaveAttribute('required', "");
    await expect(userName).toHaveAttribute('placeholder', "Enter Name");
    const maxlength = await userName.getAttribute("maxlength");
    console.log("Max length is:", maxlength);
    expect(maxlength).toBe('15');
    await userName.fill('Michele');
    const userText = await userName.inputValue();
    console.log("Name entered is:", userText);
    expect(userText).toBe("Michele");

    const userEmail = page.locator('input#email');
    await expect(userEmail).toBeVisible();
    await expect(userEmail).toBeEnabled();
    await userEmail.fill("validuser@example.com");
    const emailText = await userEmail.inputValue();
    console.log("Entered email is:", emailText);
    expect(emailText).toBe("validuser@example.com");

    const userPhone = page.locator('input#phone');
    await expect(userPhone).toBeVisible();
    await expect(userPhone).toBeEnabled();
    const phoneLength = await userPhone.getAttribute('maxlength');
    console.log("Maximum phone length is", phoneLength);
    expect(phoneLength).toBe('10');
    await userPhone.fill('9900909090');
    const phoneText = await userPhone.inputValue();
    console.log("User phone is:", phoneText);
    expect(phoneText).toBe('9900909090');

    const userAddress = page.locator('textarea#textarea');
    await expect(userAddress).toBeVisible();
    await expect(userAddress).toBeEnabled();
    await userAddress.fill('woodland garden baga beacg goa');

    //Radio button
    const maleRadio = page.locator('input#male');
    const initialStatus = await maleRadio.isChecked();
    console.log("Status before checking radio button is:", initialStatus);
    await maleRadio.check();
    const finalStatus = await maleRadio.isChecked();
    console.log("Status after checking radio button is:", finalStatus);
    expect(finalStatus).toBe(true);
    await expect(maleRadio).toBeChecked();

    const femaleRadio = page.locator('input#female');
    await expect(femaleRadio).not.toBeChecked();

    //Checkboxes
    //Check single checkbox
    const firdayBox = page.locator('input#friday');
    await expect(firdayBox).toBeVisible();
    await expect(firdayBox).toBeEnabled();
    await firdayBox.check();
    await expect(firdayBox).toBeChecked();

    //check all checkboxs
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const weekdays =  days.map(index=> page.getByLabel(index));
    expect(weekdays.length).toBe(7);

    for(let week of weekdays)
    {
        await week.check();
        await expect(week).toBeChecked();
    }

    //uncheck last 3
    for(let week of weekdays.slice(-3))
    {
        await week.uncheck();
        await expect(week).not.toBeChecked();
    }

    //check the given checkbox
    const dayName = "Saturday";
    for(let label of days)
    {
        if(label === dayName)
        {
            const name = page.getByLabel(label);
            await name.check();
            await expect(name).toBeChecked();
        }
    }

    //dropdowns
    const dropdown = page.locator('#country');
    await expect(dropdown).toBeVisible();
    await dropdown.selectOption('Germany');

    //verify number of options
    const dropdownOptions = page.locator('#country option');
    const count = await dropdownOptions.count();
    console.log("Number of dropdown options are:", count);
    expect(count).toBe(10);

    //verify option prestent
    const dropdownText = (await dropdownOptions.allTextContents()).map(text=>text.trim());
    console.log("all options are:",dropdownText);
    expect(dropdownText).toContain("Japan");
    //print all drop down
    for(let text of dropdownText)
    {
        console.log(text);
    }

    //Multi Select dropdown - select 3 options
    const colorsdropdown = page.locator('#colors');
    await expect(colorsdropdown).toBeVisible();
    await colorsdropdown.selectOption(['green', 'yellow', 'white']);
    await expect(colorsdropdown).toHaveValues(['green', 'yellow', 'white']);

    //count number of options
    const colorsOptions = page.locator('#colors option');
    const colorsCount = await colorsOptions.count();
    console.log("number of options are:", colorsCount);
    expect(colorsCount).toBe(7);
    // verify option present
    const colorsText = (await colorsOptions.allTextContents()).map(text=>text.trim());
    console.log(colorsText);
    expect(colorsText).toContain('Blue')

    for(let text of colorsText)
    {
        console.log(text);
    }
    //check if arrays are sorted or not
    const originalList:string[] = [...colorsText];
    const sortedList: string[] = [...colorsText].sort();
    console.log("original List is:", originalList);
    console.log("sorted List is:", sortedList);
    
    if(JSON.stringify(originalList) === JSON.stringify(sortedList))
    {
        console.log("Arrays are sorted");
    }
    else
    {
        console.log("arrays are not sorted");
    }

    //check if dropdown has duplicates
    const myset = new Set<string>;
    const duplicates: string[] = [];

    for(let text of colorsText)
    {
        if(myset.has(text))
        {
            duplicates.push(text);
        }
        else
        {
            myset.add(text);
        }
    }
    console.log("Duplicate options are:",duplicates);

    //select any options from animals dropdown 
    const animaldropdown = page.locator('select#animals');
    await expect(animaldropdown).toBeVisible();
    await animaldropdown.selectOption(['Cheetah', 'Deer', 'Dog']);

    const animalOptions = page.locator('select#animals option');
    const animalCount = await animalOptions.count();
    console.log("Animal Options count is:",animalCount);
    expect(animalCount).toBe(10);

    const animalText = await animalOptions.allInnerTexts();
    console.log(animalText);
    expect(animalText).toContain('Rabbit');

    //check if sorted
    const originalAnimal:string[] = [...animalText];
    const sortedAnimal:string[] = [...animalText].sort();
    expect(originalAnimal).toEqual(sortedAnimal);

    // select date Picker
    const datePicker = page.locator('input#datepicker');
    await expect(datePicker).toBeVisible();
    await expect(datePicker).toBeEnabled();
    await datePicker.click();

    const month:string = 'December';
    const year:string = '2027';
    const date:string = '31';
    

    while(true)
    {
        const currentMonth = await page.locator('.ui-datepicker-month').innerText();
        const currentYear = await page.locator('.ui-datepicker-year').innerText();

        if(currentMonth === month && currentYear === year)
        {
            break
        }
        else
        {
            page.locator('.ui-datepicker-next').click();
        }
    }
    const alldates = await page.locator('.ui-datepicker-calendar a').all();
   
    for(let dt of alldates)
    {
        const dateText = await dt.innerText()
        if(dateText === date)
        {
            await dt.click();
            break;
        }
    }
    const expectedDate = '12/31/2026';
    await expect(datePicker).toHaveValue(expectedDate);
    




    


});