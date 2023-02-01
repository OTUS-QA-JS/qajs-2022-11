import supertest from "supertest";
import config from "./config";

const {url} = config;

// Контроллер user
const user = {
    // Авторизация пользователя
    login: (payload) => {
        return supertest(url)
            .post('/Account/v1/Authorized')
            .set('Accept', 'application/json')
            .send(payload)
    },
    // Генерация токена
    generateToken: (payload) => {
        return supertest(url)
            .post('/Account/v1/GenerateToken')
            .set('Accept', 'application/json')
            .send(payload)
    },
    // Добавление нового пользователя
    add: (payload) => {
        return supertest(url)
            .post('/Account/v1/User')
            .set('Accept', 'application/json')
            .send(payload)
    },
    // Получение данных о пользователе
    getUserInfo: (uuid, authToken) => {
        return supertest(url)
            .get(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${authToken}`)
            .send()
    },
    // Удаление пользователя
    delete: (uuid, authToken) => {
        return supertest(url)
            .del(`/Account/v1/User/${uuid}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${authToken}`)
            .send()
    }
}

export default user;