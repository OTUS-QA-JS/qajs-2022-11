//Вариант 1:
//Напишите 5 апи-тестов на сервис bookstore
//https://bookstore.demoqa.com/swagger/
//    Напишите АПИ-тесты:
//Создание пользователя c ошибкой, логин уже используется
//Создание пользователя c ошибкой, пароль не подходит
//Создание пользователя успешно
//Генерация токена c ошибкой
//Генерация токена успешно

async function createUser(userName, password) {
    const response = await fetch ('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: {'Content-Type': 'application/json'}
    })
    return response
}

describe('create user with Error: User exists', () => {
    test('Создание пользователя c ошибкой, логин уже используется', async () => {
        const response =  await createUser('test', 'test!12345678TO')
        const data = await response.json()
        expect(response.status).toBe(406)
        expect(data.code).toBe('1204')
        expect(data.message).toBe('User exists!')
    })
});

describe('create user with Error: wrong password', () => {
    test('Создание пользователя c ошибкой, пароль не подходит', async () => {
        const response =  await createUser('test', 'test')
        const data = await response.json()
        expect(response.status).toBe(400)
        expect(data.code).toBe('1300')
        expect(data.message).toBe('Passwords must have at least one non alphanumeric character, one digit (\'0\'-\'9\'), one uppercase (\'A\'-\'Z\'), one lowercase (\'a\'-\'z\'), one special character and Password must be eight characters or longer.')
    })
});

describe('create user success', () => {
    test('Создание пользователя успешно', async () => {
        const response =  await createUser('string3', 'string123456789Q!')
        const data = await response.json()
        expect(response.status).toBe(201)
        expect(data.username).toBe('string3')
    })
});

async function generateToken(userName, password) {
    const response = await fetch ('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: {'Content-Type': 'application/json'}
    })
    return response
}

describe('generate token with error', () => {
    test('generate token failed', async () => {
        const response =  await generateToken('string1', 'string1')
        const data = await response.json()
        expect(response.status).toBe(200)
        expect(data.token).toBe(null)
        expect(data.expires).toBe(null)
        expect(data.status).toBe('Failed')
        expect(data.result).toBe('User authorization failed.')
    })
});

describe('generate token', () => {
    test('generate token success', async () => {
        const response =  await generateToken('string1', 'string123456789Q!')
        const data = await response.json()
        expect(response.status).toBe(200)
        expect(data.status).toBe('Success')
        expect(data.result).toBe('User authorized successfully.')
    })
});
