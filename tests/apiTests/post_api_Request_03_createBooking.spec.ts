import {test, expect} from "@playwright/test";
import {faker} from "@faker-js/faker";

//Using faker library
test("Create a post request using faker or random data", async({request})=>{

    //data generation
    const id = faker.number.int({min: 1, max: 100});
    const name = faker.animal.petName();
    const status = faker.helpers.arrayElement(["available", "unavailable"]);

    const requestBody = {
        "id": id,
        "category": {
            "id": id,
            "name": name
        },
        "name": name,
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": id,
                "name": name
            }
        ],
        "status": status
    }

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

    })



});