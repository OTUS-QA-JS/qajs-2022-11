
const existUser = {
    userName: "Maksim",
    password: "k!Skdk12ksdksk"
};

const userWithWrongPass = {
    userName: "RandomUser",
    password: "1234password"
};

//генерирует случайные строки для нового пользователя
let r = (Math.random() + 1).toString(36).substring(7);

const newUser = {
    userName: `User${r}`,
    password: `1P345!${r}`
};


describe('Bookstore tests', () => {
    test('сreating a user with an error, the login is already in use', async () => {
        const response = await fetch('https://bookstore.demoqa.com/Account/v1/User',
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(existUser)
        });
        const data = await response.json();
        console.log(data);
        expect(data.code).toEqual('1204');
        expect(data.message).toEqual('User exists!');
    });

    test('сreate user with error, password does not match', async () => {
        const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', 
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userWithWrongPass)
        });
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(400);
        expect(data.code).toEqual('1300');
        expect(data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    });

    test('user creation successful', async () => {
        const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', 
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        expect(response.status).toEqual(201);
    });

    test('token generation with an error', async () => {
        const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', 
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userWithWrongPass)
        });
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(200);
        expect(data.status).toBe('Failed');
        expect(data.result).toEqual('User authorization failed.');
    });

    test('token generation successful', async () => {
        const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', 
        {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(existUser)
        });
        const data = await response.json();
        console.log(data);
        expect(response.status).toEqual(200);
        expect(data.status).not.toBe('Failed');
        expect(data.result).toEqual('User authorized successfully.');
    });
});


// Генерация токена c ошибкой
