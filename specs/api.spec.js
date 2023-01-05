import axios from "axios";
import { jest } from "@jest/globals";
import expect from "expect"; jest;

describe("API tests", function(){


    test('2. Создание пользователя c ошибкой, пароль не подходит', async() => {
        const config = {
            method: 'POST',
            url: 'https://dummyjson.com/users/add',
            body: JSON.stringify({
                firstName: 'sad',
                lastName: 'Ovi',
                age: 250
            })
        }
        const resp = await axios(config);
        expect(resp.status).toEqual(400);
        console.log("User " + config.body.name + " (" + config.body.job + ")" +  " with id = " + resp.data.id + ' created at ' + resp.data.createdAt);
    });




    test.skip('3. Создание пользователя успешно', async() => {
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

    test.skip('4. Генерация токена c ошибкой', async() => {
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

    test.skip('5. Генерация токена успешно', async() => {
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

