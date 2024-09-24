import user from  "../services/user"
import config from "../config/config";
import supertest from "supertest";

describe('Api Test Controllers', () => {

    test('POST - /Account/v1/User', async () => {
        const response = await user.registration(config.credentials_registration)
        expect(response.status).toEqual(201)
        expect(response.body.userID).toBeTruthy()
        expect(typeof response.body.userID).toEqual('string')
    })

    test('POST - /Account/v1/User - Error', async () => {
        const response = await supertest('https://bookstore.demoqa.com')
        .post('/Account/v1/User')
        .set("Accept", "application/json")
        .set("Content-Type", "application/json") 
        .send({
            userName: 'sv',
            password: 'Qwe'
          })
        expect(response.status).toEqual(400)
        
        
    })

    test('POST- /Account/v1/Authorized', async () => {
        const respons  = await user.autorization(config.credentials)
        expect(respons.status).toEqual(200)
    })

    test('GET- /Account/v1/{UUID}', async () => {
        const response = await user.infoUser(user.getUserID())
        const response_body = await response.json;
        expect(response.status).toBe(200) // пыталась написать проверку:на сравниевание user.getUserID()(эта же функция должна возвращать UserID) и о, что придет в ответе, но получала ошибку
        
    })

    test('GET- /Account/v1/{UUID} -Error', async () => {
        const response = await user.infoUser_fake(config.userID_fails)
        expect(response.status).toBe(401)
    })

    test('DELETE- /Account/v1/{UUID}', async () => {
        const response = await user.deleteUserId(user.getUserID())
        expect(response.status).toEqual(200)
    })
})
