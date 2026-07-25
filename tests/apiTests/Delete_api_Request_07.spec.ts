import { test, expect } from "@playwright/test";
import fs from 'fs';

function readJson(filePath: string) {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

test("Delete the booking end to end flow", async ({ request }) => {

    //create booking
    const jsonfile = readJson('TestData/createBooking.json');
    const postResponse = await request.post('https://restful-booker.herokuapp.com/booking', { data: jsonfile });

    const postResponseBody = await postResponse.json();
    expect(postResponse.ok()).toBeTruthy();
    expect(postResponse.status()).toBe(200);

    const bookingID = postResponseBody.bookingid;
    console.log("Booking ID is:", bookingID);
    expect(bookingID).toBeGreaterThan(0);

    //get request
    const getResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
    const getresponseBody = await getResponse.json();
    console.log(getresponseBody);
    expect(getResponse.ok()).toBeTruthy();
    expect(getResponse.status()).toBe(200);
    console.log("Booking created successfully");

    //put request - first create a token

    const tokenPath = readJson('TestData/token_request_body.json');
    const tokenResponse = await request.post('https://restful-booker.herokuapp.com/auth', { data: tokenPath });
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Generated token is:", token);

    const updateRequest = readJson('TestData/put_createbooking.json');
    const updateResponse = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
        {
            headers: { Cookie: `token=${token}` },
            data: updateRequest
        });
    const updateResponsebody = await updateResponse.json();
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);
    console.log("Updated response is:", updateResponsebody);

    //anain get
    const updatedGetResponse = await request.get(
        `https://restful-booker.herokuapp.com/booking/${bookingID}`
    );

    const updatedGetResponseBody = await updatedGetResponse.json();

    expect(updatedGetResponse.ok()).toBeTruthy();
    expect(updatedGetResponse.status()).toBe(200);

    expect(updatedGetResponseBody).toMatchObject(updateRequest);

    //delete request
    const deleteResponse = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingID}`,
        {
            headers: { Cookie: `token=${token}` }
        });
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201);

    const verifyDeleteResponse = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingID}`);
    expect(verifyDeleteResponse.status()).toBe(404);
});