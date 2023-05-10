import { createUser, generateToken, authorization, userDelete, userInfo } from '../helpers/apiHelpers'
import { getRandomArbitrary } from '../helpers/randomHelper'
import config from '../config.js'

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
        await createUser('test', 'Test!0test')
        const response = await createUser('test', 'Test!0test')
        expect(response.status).toBe(406)
        expect(response.data.code).toBe('1204')
        expect(response.data.message).toBe('User exists!')
    }),

        test('Создание пользователя c ошибкой, пароль не подходит', async () => {
            const response = await createUser('test', 'Test')
            expect(response.status).toBe(400)
            expect(response.data.code).toBe('1300')
            expect(response.data.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
        }),

        test('Создание пользователя успешно', async () => {
            const userName = `test${getRandomArbitrary(100000, 100000000)}`
            const response = await createUser(userName, 'Test!0test')
            expect(response.status).toBe(201)
            expect(response.data.username).toBe(userName)
        }),

        test('Генерация токена c ошибкой', async () => {

            const response = await generateToken('test', `${getRandomArbitrary(1, 10000000000000)}`)
            expect(response.status).toBe(200)
            expect(response.data.status).toBe('Failed')
            expect(response.data.token).toBe(null)
        }),

        test('Генерация токена успешно', async () => {
            const userName = `test${getRandomArbitrary(100000, 10000000000000)}`
            createUser(userName, 'Test!0test')
            const response = await generateToken(userName, 'Test!0test')
            expect(response.status).toBe(200)
            expect(response.data.status).toBe('Success')
            expect(response.data.token).not.toBe(null)
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
        const response = await authorization()
        expect(response.status).toBe(200)
        expect(response.data).toBe(true)
    })
})

describe('Удаление пользователя', () => {
    test('Успешное удаление', async () => {
        const userName = `test${getRandomArbitrary(100000, 100000000)}`
        const responseCreateUser = await createUser(userName, 'Test!0test')
        const dataCreateUser = await responseCreateUser.json()
        const userID = dataCreateUser.userID
        const responseUserDelete = await userDelete(userID)
        const dataUserDelete = await responseUserDelete.json()
        expect(responseUserDelete.status).toBe(200)

    })
})