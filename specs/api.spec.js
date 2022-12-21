import axios from "axios";
import {jest} from "@jest/globals"; jest;

describe('Testing bookstore API', () => {
    test('create user with user exists error', async () => {
        const config ={
            method: "post",
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                "userName": "aizhan",
                "password": "Aizhan#123"
            }
        }
        try {
            const response = await axios(config);
        }
        catch (e) {
            expect(e.response.status).toEqual(406);
            expect(e.response.data.code).toEqual('1204');
            expect(e.response.data.message).toEqual('User exists!');
        }
    });
    test('create user with bad password error', async () => {
        const config ={
            method: "post",
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                "userName": "aizhan1",
                "password": "Aizhan123"
            }
        }
        try {
            const response = await axios(config);
        }
        catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.code).toEqual('1300');
            expect(e.response.data.message).toEqual(
                "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
        }
    });
    test.skip('create user successfully', async () => {
        const config ={
            method: "post",
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                "userName": "aizhan02", //зарандомизировать
                "password": "Aizhan#123"
            }
        }
        const response = await axios(config);
        expect(response.status).toEqual(201);
        expect(response.data.username).toEqual(config.data.userName);
    });
    test('generate token with error', async () => {
        const config ={
            method: "post",
            url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        }
        try {
            const response = await axios(config);
        }
        catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.code).toEqual('1200');
            expect(e.response.data.message).toEqual('UserName and Password required.');
        }
    });
    test('generate token with error', async () => {
        const config ={
            method: "post",
            url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
            data: {
                "userName": "aizhan",
                "password": "Aizhan#123"
            }
        }
        const response = await axios(config);
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual('Success');
        expect(response.data.result).toEqual('User authorized successfully.');
    });
})
