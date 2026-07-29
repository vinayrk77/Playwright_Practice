import { test, expect } from "@playwright/test";
import Ajv from 'ajv'

test("Verif that product api is working correctly", async ({ request }) => {

    const response = await request.get('https://fakestoreapi.com/products');

    const responseBody = await response.json();
    console.log(responseBody);

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //Verify the response is an array.
    expect(Array.isArray(responseBody)).toBeTruthy();
    //Verify the array is not empty.
    expect(responseBody.length).toBeGreaterThan(0);
    //Verify the first product contains these fields:
    const firstProduct = responseBody[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('title');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('description');
    expect(firstProduct).toHaveProperty('category');
    expect(firstProduct).toHaveProperty('image');
    expect(firstProduct).toHaveProperty('rating');

    //Verify the data types.
    const schema = {
        "type": "object",
        "properties": {
            "id": {
                "type": "integer"
            },
            "title": {
                "type": "string"
            },
            "price": {
                "type": "number"
            },
            "description": {
                "type": "string"
            },
            "category": {
                "type": "string"
            },
            "image": {
                "type": "string"
            },
            "rating": {
                "type": "object",
                "properties": {
                    "rate": {
                        "type": "number"
                    },
                    "count": {
                        "type": "integer"
                    }
                },
                "required": [
                    "rate",
                    "count"
                ]
            }
        },
        "required": [
            "id",
            "title",
            "price",
            "description",
            "category",
            "image",
            "rating"
        ]
    }
    const ajv = new Ajv();
    const validate = ajv.compile(schema);
    const isValid = validate(firstProduct);
    expect(isValid).toBeTruthy();
    //Verify the nested rating object contains:
    expect(typeof firstProduct.rating.rate).toBe("number");
    expect(typeof firstProduct.rating.count).toBe("number");

    //Find the most expensive product in the response.
    let maxProduct = responseBody[0];
    for(let i=1; i<responseBody.length; i++)
    {
        const currentProduct = responseBody[i];
        const currentPrice = currentProduct.price;
        let maxPrice = maxProduct.price;
        if(currentPrice > maxPrice)
        {
            maxPrice = currentPrice;
        }
    }
    console.log(maxProduct.title);
    console.log(maxProduct.price);

});