import {test, expect} from "@playwright/test";
import fs from 'fs';

function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

test("create a booking and update it using patch", async({request})=>{

    const jsondata = readJson('TestData/createBooking.json');
    const postResponse = await request.post('https://restful-booker.herokuapp.com/booking',{data: jsondata});
    
    const postResponseBody = await postResponse.json();
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    const BookingId = postResponseBody.bookingid;
    console.log("booking ID is:",BookingId);

    //genetate a token
    const jsonpath = readJson('TestData/token_request_body.json');
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', {data: jsonpath});
    
    const tokenResponseBody = await tokenResponse.json();
    expect(tokenResponse.ok()).toBeTruthy();
    expect(tokenResponse.status()).toBe(200);
    
    const token = tokenResponseBody.token;
    console.log("Genetared token is:", token);

    //patch request
    const updateRequestbody = readJson('TestData/patch_createbooking.json');
    const updateResponse = await request.patch(`https://restful-booker.herokuapp.com/booking/${BookingId}`, 
        {headers: {Cookie: `token=${token}`},
        data: updateRequestbody
        });

    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponsebody = await updateResponse.json();
    console.log(updateResponsebody);
    console.log("Bookiing details updated");

    //get
    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${BookingId}`);
    const getresponseBody = await getResponse.json();

    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    expect(getresponseBody).toMatchObject(updateRequestbody);

    
});