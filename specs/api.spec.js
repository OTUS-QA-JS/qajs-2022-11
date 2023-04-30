import {baseURL, option0, option1, option2, option3} from "../framework/config";
import { userId } from "../framework/fixtures";

describe('Bookstore tests', () => {
    test('сreating a user with an error, the login is already in use', async () => {
        const response = await fetch(baseURL, option0);
        const data = await response.json();
        console.log(data);
        expect(data.code).toEqual('1204');
        expect(data.message).toEqual('User exists!');
    });

    test('сreate user with error, password does not match', async () => {
        const response = await fetch(baseURL, option1);
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(400);
        expect(data.code).toEqual('1300');
        expect(data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    });

    test('user creation successful', async () => {
        const response = await fetch(baseURL, option2);
        expect(response.status).toEqual(201);
    });

    test('token generation with an error', async () => {
        const response = await fetch(baseURL.replace('User', 'GenerateToken'), option1);
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(200);
        expect(data.status).toBe('Failed');
        expect(data.result).toEqual('User authorization failed.');
    });

    test('token generation successful', async () => {
        const response = await fetch(baseURL.replace('User', 'GenerateToken'), option0);
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(200);
        expect(data.status).not.toBe('Failed');
        expect(data.result).toEqual('User authorized successfully.');
    });

    test('authorize user', async () => {
        const response = await fetch(baseURL.replace('User', 'Authorized'), option0);
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(200);
    });

    test('get user', async () => {
        const response = await fetch(baseURL.concat('/', userId), option3);
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(200);
    });
});

