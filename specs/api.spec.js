import axios from "axios";
import { jest } from "@jest/globals";
import expect from "expect"; jest;

describe("API tests", function(){

    test('1. Создание пользователя c ошибкой, логин уже используется.', async() => {
        const config = {
            method: 'POST',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                "userName": "Dmitry.solodov",
                "password": "few3@fWw123Qwe.q#"
            }
        }
        try {
            const resp = await axios(config);
            console.log("Пользователь " + resp.data.userName + " создан");
        }
        catch (e) {
            console.log("Пользователь не создан по причине: " + e.response.statusText + " (" + e.response.status +  ")" + ": " + e.response.data.message);
            expect(e.response.status).toEqual(406);
            expect(e.response.statusText).toEqual("Not Acceptable");
        }
    });

    test('2. Создание пользователя c ошибкой, пароль не подходит.', async() => {
        const config = {
            method: 'POST',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                "userName": "Dmitry.solodov",
                "password": "12345qwe"
            }
        }
        try {
            const resp = await axios(config);
            console.log("Пользователь " + resp.data.userName + " создан");
        }
        catch (e) {
            console.log("Пользователь не создан по причине: " + e.response.statusText + " (" + e.response.status +  ")" + ": " + e.response.data.message);
            expect(e.response.status).toEqual(400);
            expect(e.response.statusText).toEqual("Bad Request");
        }
    });

    test('3. Создание пользователя успешно.', async() => {
        const config = {
            method: 'POST',
            url: 'https://reqres.in/api/users',
            body: {
                "name": "Dmitry",
                "job": "QA"
            }
        }
        const resp = await axios(config);
        expect(resp.status).toEqual(201);
        console.log("User " + config.body.name + " (" + config.body.job + ")" +  " with id = " + resp.data.id + ' created at ' + resp.data.createdAt);
    });

    test('4. Генерация токена c ошибкой.', async() => {
        const config = {
            method: 'POST',
            url: "https://dummyjson.com/auth/login",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                username: 'kminchelle',
                password: 'incorrect_pwd'
            })
        }

        try {
            const resp = await axios(config);
            expect(resp.status).toEqual(400);
            expect(resp.data.message).toEqual("Invalid credentials");
        }
        catch (e) {
            console.log(e.response.statusText + " (" + e.response.status +  ")" + ": " + e.response.data.message);
        }
    });

    test('5. Генерация токена успешно.', async() => {
        const config = {
            method: 'POST',
            url: "https://dummyjson.com/auth/login",
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                username: 'kminchelle',
                password: '0lelplR'
            })
        }
        const resp = await axios(config);
        expect(resp.status).toEqual(200);
        console.log("Полученный токен для пользователя " + resp.data.username + ": " + resp.data.token);
    });
});