// import { createUser, generateToken, authorization, userDelete, userInfo } from '../helpers/apiHelpers'
import { getRandomArbitrary } from '../helpers/randomHelper'
import * as apiHelpers from '../helpers/apiHelpers'
// import config from '../config.js'

// Вариант 1:
// Напишите 5 апи-тестов на сервис bookstore
// https://bookstore.demoqa.com/swagger/
// Напишите АПИ-тесты:

//     Создание пользователя c ошибкой, логин уже используется
//     Создание пользователя c ошибкой, пароль не подходит
//     Создание пользователя успешно
//     Генерация токена c ошибкой
//     Генерация токена успешно

describe('5 апи-тестов на сервис bookstore', () => {
    test('Создание пользователя c ошибкой, логин уже используется', async () => {
        await apiHelpers.createUser('test', 'Test!0test')
        const request = await apiHelpers.createUser('test', 'Test!0test')
        expect(request.status).toBe(406)
        expect(request.data.code).toBe('1204')
        expect(request.data.message).toBe('User exists!')
    }),

    test('Создание пользователя c ошибкой, пароль не подходит', async () => {
        const request = await apiHelpers.createUser('test', 'Test')
        expect(request.status).toBe(400)
        expect(request.data.code).toBe('1300')
        expect(request.data.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
    }),

    test('Создание пользователя успешно', async () => {
        const userName = `test${getRandomArbitrary(100000, 100000000)}`
        const request = await apiHelpers.createUser(userName, 'Test!0test')
        expect(request.status).toBe(201)
        expect(request.data.username).toBe(userName)
    }),

    test('Генерация токена c ошибкой', async () => {
        const request = await apiHelpers.generateToken('test', `${getRandomArbitrary(1, 10000000000000)}`)
        expect(request.response.status).toBe(200)
        expect(request.response.data.status).toBe('Failed')
        expect(request.response.data.token).toBe(null)
    })

    test('Генерация токена успешно', async () => {
        const userName = `test${getRandomArbitrary(100000, 10000000000000)}`
        await apiHelpers.createUser(userName, 'Test!0test')
        const request = await apiHelpers.generateToken(userName, 'Test!0test')
        expect(request.response.status).toBe(200)
        expect(request.response.data.status).toBe('Success')
        expect(request.response.data.token).not.toBe(null)
    })
})

// Вариант 1:
// Напишите API тесты на следующие апи ручки (api endpoints)

// Авторизация
// Удаление пользователя
// Получение информации о пользователе
// При написании АПИ-тестов обязательно использовать контроллеры, так же вынести в конфиг данные для авторизации, базовый УРЛ.
// Будет плюсом, если так же вы отрефакторите тесты написанные в рамках ДЗ АПИ тесты

describe('Авторизация', () => {
    test('Успешная авторизация', async () => {
        const userName = `test${getRandomArbitrary(100000, 10000000000000)}`
        await apiHelpers.createUser(userName, 'Test!0test')
        const request = await apiHelpers.authorization(userName, 'Test!0test')
        expect(request.response.status).toBe(200)
        expect(request.response.data).toBe(true)
    })
})

describe('Удаление пользователя', () => {
    test('Успешное удаление', async () => {
        const response = await apiHelpers.userDelete()
        expect(response.status).toBe(204)

    })
})

describe('Получение информации о пользователе', () => {
    test('Получение информации о пользователе', async () => {
        const request = await apiHelpers.userInfo()
        expect(request.status).toBe(200)
    })
})