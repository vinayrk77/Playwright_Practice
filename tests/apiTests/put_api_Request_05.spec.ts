import {test, expect} from "@playwright/test";
import fs from 'fs';

function readJson(filepath:string){
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
}

test("Creat a booking and update it using Post", async({request})=>{
    const jsonData = readJson('TestData/createBooking.json');
    const response = await request.post('https://restful-booker.herokuapp.com/booking', { data: jsonData });

    const responseBody = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const bookingId = responseBody.bookingid;
    console.log("Booking ID is:", bookingId);

    // create a token

    const jsonPath = readJson('TestData/token_request_body.json');
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth',{data: jsonPath});

    const tokenResponseBody = await tokenResponse.json();
    expect(tokenResponse.ok()).toBeTruthy();

    const token = tokenResponseBody.token;
    console.log("generated coken is", token);

    // send put request
    const updateRequestbody = readJson('TestData/put_createbooking.json');
    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingId}`, 
        {
        headers:{cookie: `token=${token}`},
        data: updateRequestbody}
    );
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponsebody = await updateResponse.json();
    console.log(updateResponsebody);
    console.log('Booking details updated successfully');

    //get request
    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingId}`);
    const getresponseBody = await getResponse.json();
    console.log(getresponseBody);

    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    expect(getresponseBody).toMatchObject(updateRequestbody);
    



});