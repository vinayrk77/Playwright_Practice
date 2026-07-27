import {test, expect} from "@playwright/test";

test("get booking details by ID path parm", async({request})=>{

    const bookingId = 49;

    const response = await request.get(`https://petstore.swagger.io/v2/pet/${bookingId}`);

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    // add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // validation
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('status');

    expect(typeof responseBody.id).toBe("number");
    expect(typeof responseBody.name).toBe("string");
    expect(typeof responseBody.status).toBe("string");
});

test("get booking details by query params", async({request})=>{

    const petStatus = "available"
    const response = await request.get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${petStatus}`);

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    
    const firstPet = responseBody[0];
    expect(firstPet).toHaveProperty('id');
    expect(firstPet).toHaveProperty('name');
    expect(firstPet).toHaveProperty('status');
    expect(firstPet.status).toBe(petStatus);
});
