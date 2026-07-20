import {test, expect} from "@playwright/test";
import fs from "fs"

test("Create a post request using JSON File body", async({request})=>{

    //read from json
    const jsonPath = "TestData/petRequest.json"
    const requestBody:any = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

    const response = await request.post("https://petstore.swagger.io/v2/pet", {data: requestBody});

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('category');
    expect(responseBody).toHaveProperty('name');
    expect(responseBody).toHaveProperty('photoUrls');
    expect(responseBody).toHaveProperty('tags');
    expect(responseBody).toHaveProperty('status');

    expect(responseBody).toMatchObject({
    "id": requestBody.id,
    "name": requestBody.name,
    "status": requestBody.status
    });
});