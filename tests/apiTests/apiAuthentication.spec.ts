/*
No auth
basic auth(userName and passwors)
berear token
API key authentication
*/

import {test, expect} from "@playwright/test";

test("No auth api", async({request})=>{

    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    console.log(responseBody);
});

//Basic Auth

test("Basic Auth Api", async({request})=>{

    const response = await request.get('https://the-internet.herokuapp.com/basic_auth',{
        headers:{
            Authorization:`Basic ` +Buffer.from("admin:admin").toString('base64')
        }
    });
expect(response.ok()).toBeTruthy();
expect(response.status()).toBe(200);

const responseBody = await response.text();
console.log(responseBody);
expect(responseBody).toContain('Congratulations!');
});

test.only("Token Authentication", async({request})=>{

    const bearerToken = ''

    const response = await request.get('https://gorest.co.in/public/v2/users/1', {
        headers: {
            Authorization: `Bearer $(bearerToken)`

        }
    });


});
