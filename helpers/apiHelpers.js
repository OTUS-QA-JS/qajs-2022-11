import axios from 'axios'
import config from '../config.js'
import { faker } from '@faker-js/faker'

const client = axios.create({
    baseURL: config.baseURL,
    validateStatus: false
})

/**
 * Создание нового ползователя
 *
 * @param {string} userName
 * @param {string} password
 */
// async function createUser(userName, password) {
//     const response = await fetch(`${config.baseURL}/Account/v1/User`, {
//         method: 'post',
//         body: JSON.stringify({
//             'userName': userName,
//             'password': password
//         }),
//         headers: { 'Content-Type': 'application/json' }
//     })
//     return response
// }

export const createUser = async (userName, password) => {
    const response = await client.post('/Account/v1/User',
        {
            'userName': userName,
            'password': password
        })
    return response
}

/**
 * Генерация токена
 *
 * @param {string} userName
 * @param {string} password
 */
// async function generateToken(userName, password) {
//     const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
//         method: 'post',
//         body: JSON.stringify({
//             'userName': userName,
//             'password': password
//         }),
//         headers: { 'Content-Type': 'application/json' }
//     })
//     return response
// }

export const generateToken = async (userName, password) => {
    const response = await client.post('/Account/v1/GenerateToken',
        {
            'userName': userName,
            'password': password
        })
    return {
        response: response,
        token: response.data.token
    }
}

/**
 * Авторизация
 *
 * @param {string} userName
 * @param {string} password
 */
export const authorization = async (userName, password) => {
    const token = (await generateToken(userName, password)).token
    const response = await client.post('/Account/v1/Authorized',
        {
            'userName': userName,
            'password': password
        },
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        })
    return {
        response: response,
        token: token
    }
}

/**
 * Удаление пользователя
 *
 * @param {string} userID
 */
export const userDelete = async () => {
    const userID = (await createUser(config.credentials.userName, config.credentials.password)).data.userID
    const response = await client.delete('/Account/v1/User/' + userID,
        {
            headers:
            {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + (await authorization(config.credentials.userName, config.credentials.password)).token
            }
        })
    return response
}


/**
 * Получение информации о пользователе
 * @param {string} userID
 */
export const userInfo = async () => {
    const userName = faker.internet.userName()
    const userID = (await createUser(userName, config.credentials.password)).data.userID
    const response = await client.get('/Account/v1/User/' + userID,
        {
            headers:
            {
                'Authorization': 'Bearer ' + (await authorization(userName, config.credentials.password)).token
            }
        })
    await userDelete()
    return response
}
