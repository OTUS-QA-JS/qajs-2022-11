import account from "../framework/services/account";
import {describe, it, expect} from '@jest/globals';
import getNewUser from "../framework/fixtures/createNewUser";


describe('Регистрация пользователя, POST "/Account/v1/User"',() => {
    it.only('Успешное создание пользователя', async () =>{
        // const resp = await account.createUser();
        // let req = JSON.parse(resp.config.data);
        // userId = account.getUserId(resp)

        // expect(resp.status).toEqual(201)
        // expect(resp.data.username).toEqual(req.userName)
        const resp = await account.createUser(getNewUser());
        let req = JSON.parse(resp.config.data);
        expect(resp.status).toEqual(201)
        expect(resp.data.username).toEqual(req.userName)
        await account.cleanUser(resp)
        // console.log(account.getAuthToken(resp));
    })

    it('Ошибка при создании пользователя с неправильным паролем', async () =>{
        try {
            await account.createUser({userName: `${getNewUser().userName}`, password: 'test'})
        }
        catch (err) {
               expect(err.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
        }
    })

    it('Ошибка при создании пользователя с неуникальным логином', async () =>{
        try {
            const resp = await account.createUser(getNewUser());
            await account.createUser({userName: `${resp.data.username}`, password: `${getNewUser().password}`})
            }
        catch (err) {
            expect(err.response.status).toEqual(406)
            expect(err.response.data).toEqual({
                "code": "1204",
                "message": "User exists!"
              });
        }
    })
})

describe ('Получение токена, POST "Account/v1/GenerateToken"', () => {
    it('Успешное получение токена', async () =>{
        const regData = getNewUser();
        await account.createUser(regData);
        const resp = await account.authorization(regData)
        expect(resp.status).toEqual(200)
        expect(resp.data.result).toEqual("User authorized successfully.")

    })

    it('Ошибка при генерации токена с несуществующим пользователем', async () =>{
        try {
            await account.authorization(getNewUser())
            }
        catch (err){
            expect(err.response.data.result).toEqual("User authorization failed.")
        }
    })
})

describe ('Удаление пользователя, DELETE "/Account/v1/User', () => {
    it('Успешное удаление пользователя', async () => {
        const regData = getNewUser();
        const resp = await account.createUser(regData);
        const userId = resp.data.userID;
        const respToken = await account.authorization(regData);
        const token = respToken.data.token;
        const respDel = await account.deleteUser(token, userId);
        expect(respDel.status).toEqual(204)
    })

    it('Нельзя удалить пользователя без токена авторизации', async () => {
        const regData = getNewUser();
        const resp = await account.createUser(regData);
        const userId = resp.data.userID;
        const token = ''
        try{
        await account.deleteUser(token, userId);
        }
        catch(err){
            expect(err.response.status).toEqual(401)
            expect(err.response.data).toEqual({"code": "1200", "message": "User not authorized!"})
        }
    })

    it('Ошибка при удалении без userId', async() => {
        const regData = getNewUser();
        await account.createUser(regData);
        const userId = ''
        const respToken = await account.authorization(regData);
        const token = respToken.data.token;
        try{
            await account.deleteUser(token, userId);
        }
        catch(err){
            expect(err.response.status).toEqual(200)
            expect(err.response.status).toEqual({ "code": "1207", "message": "User Id not correct!" })
        }
    })
})

describe('Получение информации о пользователе, GET "/Account/v1/User', () => {
    it('Успешное получение информации о пользователе', async () => {
        const regData = getNewUser();
        const resp = await account.createUser(regData);
        const userId = resp.data.userID;
        const respToken = await account.authorization(regData);
        const token = respToken.data.token;
        const respGet = await account.getUserInfo(token, userId);
        expect(respGet.status).toEqual(200);
        expect(respGet.data.userId).toEqual(userId)
    }),
    it('Нельзя получить информацю о пользователе без токена авторизации', async () => {
        const regData = getNewUser();
        const resp = await account.createUser(regData);
        const userId = resp.data.userID;
        const token = ''
        try{
        await account.getUserInfo(token, userId);
        }
        catch(err){
            expect(err.response.status).toEqual(401)
            expect(err.response.data).toEqual({"code": "1200", "message": "User not authorized!"})
        }
    }),
    it('Ошибка при запросе информации без userId', async() => {
        const regData = getNewUser();
        await account.createUser(regData);
        const userId = ''
        const respToken = await account.authorization(regData);
        const token = respToken.data.token;
        try{
            await account.getUserInfo(token, userId);
        }
        catch(err){
            expect(err.response.status).toEqual(200)
            expect(err.response.status).toEqual({ "code": "1207", "message": "User not found!" })
        }
    })
})
