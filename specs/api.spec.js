async function createUser(userName, password) {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    return response;
}

describe('5 api tests on bookstore service', () => { 
    test('Создание пользователя c ошибкой, логин уже используется', async () => { 
        const response = await createUser('test', 'Test123$'); 
        const data = await response.json(); 
        expect(response.status).toBe(406);
        expect(data.code).toBe('1204');
        expect(data.message).toBe('User exists!');
    });
});

describe('5 api tests on bookstore service', () => { 
    test('Создание пользователя c ошибкой, логин уже используется', async () => { 
        const response = await createUser('test', 'Test123$'); 
        const data = await response.json(); 
        expect(response.status).toBe(406);
        expect(data.code).toBe('1204');
        expect(data.message).toBe('User exists!');
    });
});

describe('5 api tests on bookstore service', () => { 
    test('Создание пользователя успешно', async () => { 
        const response = await createUser('ftyhrtyr', 'Test123$'); 
        const data = await response.json(); 
        expect(response.status).toBe(201);
        expect(data.userId).toBe();
        expect(data.userName).toBe();
        expect(data.books).toEqual([]);
    });
});

async function generateToken(userName, password) {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'post',
        body: JSON.stringify({
            'userName': userName,
            'password': password
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    return response;
}

describe('5 api tests on bookstore service', () => { 
    test('Генерация токена c ошибкой', async () => { 
        const response = await generateToken('', ''); 
        const data = await response.json();
        expect(response.status).toBe(400);
        expect(data.code).toBe('1200');
        expect(data.message).toBe('UserName and Password required.');
    });
});

describe('5 api tests on bookstore service', () => { 
    test('Генерация токена успешно', async () => { 
        const response = await generateToken('test', 'Test123$'); 
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(response.token).toBe();
        expect(data.code).toBe();
        expect(response.expires).toBe();
        expect(data.result).toBe('User authorized successfully.');
    });
});