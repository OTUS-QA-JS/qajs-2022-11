import superagent from 'superagent'
import axios from 'axios'
import config from '../config.js'

/**
 * Создание нового ползователя
 *
 * @param {string} userName
 * @param {string} password
 */
async function createUser(userName, password) {
    const response = await fetch(`${config.baseURL}/Account/v1/User`, {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    return response
}

/**
 * Генерация токена
 *
 * @param {string} userName
 * @param {string} password
 */
async function generateToken(userName, password) {
    const response = await fetch(`${config.baseURL}/Account/v1/GenerateToken`, {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    return response
}

/**
 * Авторизация
 *
 * @param {string} userName
 * @param {string} password
 */
// async function authorization() {
//     const response = await superagent(config.baseURL)
//         .post('/Account/v1/Authorized')
//         .set('Content-Type', 'application/json')
//         .set('Authorization', 'Bearer ' + `${await generateToken(userName, password).json().token}`)
//         .send({
//             'userName': userName,
//             'password': userName
//         })
//     return response
// }


async function authorization(userName, password) {
    const response = await axios.post(`${config.baseURL}/Account/v1/Authorized`,
        {
            'userName': userName,
            'password': password
        },
        {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${generateToken(userName, password)}`
        })
    return response
}




/**
 * Удаление пользователя
 *
 * @param {string} userID
 */
async function userDelete(userID) {
    const response = await axios.delete(`${config.baseURL}/v1/User/` + userID)
    return response
}

/**
 * Получение информации о пользователе
 *
 * @param {string} userID
 */
async function userInfo(userName, password) {
    token = await generateToken(userName, password).json().token
    userID = await authorization(userName, password)
    const response = await axios.get(`${config.baseURL}/v1/User/` + userID,
    {
        'Authorization': 'Bearer ' + token
    })
    return response
}

module.exports = {
    createUser,
    generateToken,
    authorization,
    userDelete,
    userInfo
}