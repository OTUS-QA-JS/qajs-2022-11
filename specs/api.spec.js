import axios from "axios";
import {test, expect} from "@jest/globals";

test('Post request create user', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data:{
            "userName": "Use_rs22ests_test1",
            "password": "qw!22sSerty1"
        },
        headers: {},
    };
    const resp = await axios(config);
    console.log(resp.data);
    expect(resp.status).toEqual(201);
});


test('Post_login is already in use error', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data:{
            "userName": "testName_11",
            "password": "qw!22s_Serty"
        },
        headers: {},
    };
    try {
        const resp = await axios(config);
 }
    catch (e) {
        console.log(e);
       expect(e.response.status).toEqual(406);
        expect(e.response.data.message).toEqual("User exists!");
    }
});


test('Post_wrong password', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data:{
            "userName": "testName_11",
            "password": "qw22s_Serty"
        },
        headers: {},
    };
    try {
        const resp = await axios(config);
 }
    catch (e) {
        console.log(e);
        expect(e.response.status).toEqual(400);
        expect(e.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    }
});


test('Post auth token', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data:{
            "userName": "test1_user12",
            "password": "qw!22sSerty1"
        },
        headers: {},
    };

    const resp_token = await axios({
        method: 'get',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data:{
            "userName": "test1_user12",
            "password": "qw!22sS1erty21"
        },
        headers: {},
    })
    expect(resp_token.status).toEqual(200);
    
});

// Из-за того, что при ошибке в сваггере статус код 200, добавлено проверка message в  expect.
test('Post auth token error2', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data:{
            "userName": "test",
            "password": "qw!22sS1erty21"
        },
        headers: {},
    };
    try {
        const resp = await axios(config);
 }
    catch (e) {
        console.log(e);
       expect(e.response.status).toEqual(200);
        expect(e.response.data.message).toEqual("User authorization failed.");
    }
});
