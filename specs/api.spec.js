import { createUser, generateToken, authorization, userDelete, userInfo } from '../helpers/apiHelpers'
import { getRandomArbitrary } from '../helpers/randomHelper'

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
        const data = await response.json()
        expect(response.status).toBe(406)
        expect(data.code).toBe('1204')
        expect(data.message).toBe('User exists!')
    }),

        test('Создание пользователя c ошибкой, пароль не подходит', async () => {
            const response = await createUser('test', 'Test')
            const data = await response.json()
            expect(response.status).toBe(400)
            expect(data.code).toBe('1300')
            expect(data.message).toBe("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
        }),

        test('Создание пользователя успешно', async () => {
            const userName = `test${getRandomArbitrary(100000, 100000000)}`
            const response = await createUser(userName, 'Test!0test')
            const data = await response.json()
            expect(response.status).toBe(201)
            expect(data.username).toBe(userName)
        }),

        test('Генерация токена c ошибкой', async () => {

            const response = await generateToken('test', `${getRandomArbitrary(1, 10000000000000)}`)
            const data = await response.json()
            expect(response.status).toBe(200)
            expect(data.status).toBe('Failed')
            expect(data.token).toBe(null)
        }),

        test('Генерация токена успешно', async () => {
            const userName = `test${getRandomArbitrary(100000, 100000000)}`
            createUser(userName, 'Test!0test')
            const response = await generateToken(userName, 'Test!0test')
            const data = await response.json()
            expect(response.status).toBe(200)
            expect(data.status).toBe('Success')
            expect(data.token).not.toBe(null)
        })
})

// Вариант 1:
// Напишите API тесты на следующие апи ручки (api endpoints)

    // Авторизация
    // Удаление пользователя
    // Получение информации о пользователе
    // При написании АПИ-тестов обязательно использовать контроллеры, так же вынести в конфиг данные для авторизации, базовый УРЛ.
    // Будет плюсом, если так же вы отрефакторите тесты написанные в рамках ДЗ АПИ тесты

describe('Домашнее задание 7', () => {
    test('Авторизация', async () => {
        
        const response = await authorization()
    }),

    test('Удаление пользователя', async () => {

    }),

    test('Получение информации о пользователе', async () => {

    })
})