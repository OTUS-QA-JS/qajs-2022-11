// Вариант 1:
// Напишите 5 апи-тестов на сервис bookstore
// https://bookstore.demoqa.com/swagger/
// Напишите АПИ-тесты:

//     Создание пользователя c ошибкой, логин уже используется
//     Создание пользователя c ошибкой, пароль не подходит
//     Создание пользователя успешно
//     Генерация токена c ошибкой
//     Генерация токена успешно

async function createUser(userName, password) {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    return response
}

async function generateToken(userName, password) {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    })
    return response
}

function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min))
}


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