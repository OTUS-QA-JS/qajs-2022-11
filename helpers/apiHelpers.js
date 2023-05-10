import axios from 'axios'
import config from '../config.js'
import { getRandomArbitrary } from '../helpers/randomHelper'

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

async function createUser(userName, password) {
    const response = await axios.post(`${config.baseURL}/Account/v1/User`,
        {
            'userName': userName,
            'password': password
        },
        {
            validateStatus: false
        }
    )
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

async function generateToken(userName, password) {
    const response = await axios.post(`${config.baseURL}/Account/v1/GenerateToken`,
        {

            'userName': userName,
            'password': password
        },
        {
            validateStatus: false
        }
    )
    return response
}

/**
 * Авторизация
 *
 * @param {string} userName
 * @param {string} password
 */
async function authorization() {
    const getToken = await generateToken(config.credentials.userName, config.credentials.password)
    const response = await axios.post(`${config.baseURL}/Account/v1/Authorized`,
        {
            'userName': config.credentials.userName,
            'password': config.credentials.password
        },
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken.data.token
        },
        {
            validateStatus: false
        })
    return response
}

/**
 * Удаление пользователя
 *
 * @param {string} userID
 */
async function userDelete() {
    const userName = `test${getRandomArbitrary(100000, 10000000000000)}`
    createUser(userName, 'Test!0test')
    generateToken(userName, 'Test!0test')
    
    
    const response = await axios.delete(`${config.baseURL}/v1/User/` + userID)
    return response
}

/**
 * Получение информации о пользователе
 */
// async function userInfo() {
//     authorization(config.credentials.userName, config.credentials.password)
//     const response = await axios.get(`${config.baseURL}/Account/v1/User/` + config.credentials.userID,
//         {
//             'Authorization': 'Bearer ' + testUserToken
//         })
//     return response
// }

module.exports = {
    createUser,
    generateToken,
    authorization,
    userDelete,
    // userInfo
}