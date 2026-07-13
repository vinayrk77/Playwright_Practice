import { test, expect } from "@playwright/test";

test("Create post request using static body", async ({ request }) => {

    const requestBody = {
        "id": 12,
        "category": {
            "id": 12,
            "name": "Rocky"
        },
        "name": "Rocky",
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 12,
                "name": "Rocky"
            }
        ],
        "status": "available"
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





});