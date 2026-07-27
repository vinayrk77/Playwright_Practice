import { test, expect } from "@playwright/test";
import Ajv from 'ajv';

test("Validate json schema", async ({ request }) => {

    const bookingId = 12;

    const response = await request.get(`https://petstore.swagger.io/v2/pet/${bookingId}`);

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //Define JSON schema
    const schema = {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "category": {
                "type": "object",
                "properties": {
                    "id": {
                        "type": "integer"
                    },
                    "name": {
                        "type": "string"
                    }
                },
                "required": [
                    "id",
                    "name"
                ]
            },
            "photoUrls": {
                "type": "array",
                "items": [
                    {
                        "type": "string"
                    }
                ]
            },
            "tags": {
                "type": "array",
                "items": [
                    {
                        "type": "object",
                        "properties": {
                            "id": {
                                "type": "integer"
                            },
                            "name": {
                                "type": "string"
                            }
                        },
                        "required": [
                            "id",
                            "name"
                        ]
                    }
                ]
            },
            "status": {
                "type": "string"
            }
        },
        "required": [
            "id",
            "category",
            "photoUrls",
            "tags",
            "status"
        ]
    };

    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(responseBody);
    expect(isValid).toBeTruthy();
});