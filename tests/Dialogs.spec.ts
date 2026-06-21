import {test, expect, Locator} from "@playwright/test";

test("Verify simple dialouge boxes", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', dialog=>{
        console.log("Dialog type is:", dialog.type());
        expect(dialog.type()).toContain('alert');
        console.log("Dialog text:", dialog.message());
        expect(dialog.message()).toContain('I am an alert box!');
        
        dialog.accept()});

    await page.getByRole('button', {name: 'Simple Alert'}).click();
});

test("Verify confirmation alert", async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', dialog=>{
        console.log("Dialog type is:", dialog.type());
        expect(dialog.type()).toContain('confirm');
        console.log("Dialog text is:",dialog.message());
        expect(dialog.message()).toContain('Press a button!');

        //dialog.accept(); // accepts the value and closes
        dialog.dismiss(); // dismiss the value and closes
    });

    const confirmBox:Locator = page.getByRole('button', {name: 'Confirmation Alert'});
    await expect(confirmBox).toBeVisible();
    await confirmBox.click();

    const message:string = await page.locator('p#demo').innerText();
    console.log("Output Text:",message);
    await expect(page.locator('p#demo')).toHaveText('You pressed Cancel!');
});

test.only("Verify prompt dialog", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    page.on('dialog', dialog=>{
        console.log("Dialog type is:",dialog.type());
        expect(dialog.type()).toContain('prompt');
        console.log("Dialog text is:",dialog.message());
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        
        dialog.accept('Vinay Karanjavkar');
    })

    const promptBtn:Locator = page.getByRole('button', {name: 'Prompt Alert'});
    await expect(promptBtn).toBeVisible();
    await promptBtn.click();

    const promptmsg: string = await page.locator('p#demo').innerText();
    console.log("output text is:", promptmsg);

    await expect(page.locator('p#demo')).toHaveText('Hello Vinay Karanjavkar! How are you today?');
});

