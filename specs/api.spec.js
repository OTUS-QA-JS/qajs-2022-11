const { default: axios } = require("axios")

test('login already in use', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "string",
            "password": "string1A!"
        }
    }
    try {
        const resp = await axios(config);
    }
    catch (error) {
        expect(error.response.status).toEqual(406);
        expect(error.response.data.message).toEqual("User exists!");
    }
});

test('incorrect password', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "string",
            "password": "string"
        }
    };
    try {
        const resp = await axios(config);
    }
    catch (error) {
        expect(error.response.status).toEqual(400);
        expect(error.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
        expect(error.response.data.code).toEqual("1300");
    }
});

test('User successfully created', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/User',
        data: {
            "userName": "Aibulat96",
            "password": "string1A!"
        }
    }
    const resp = await axios(config);
    expect(resp.status).toEqual(201);
    expect(resp.data.username).toEqual("Aibulat96");
});

test('Incorrect token', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "Aibulat96",
            "password": "string1!"
        }
    }
    const resp = await axios(config);
    expect(resp.status).toEqual(200);
    expect(resp.data.status).toEqual("Failed");
    expect(resp.data.result).toEqual("User authorization failed.");
    expect(resp.data.token).toBeNull();
    expect(resp.data.expires).toBeNull();
});

test('Token successfully created', async () => {
    const config = {
        method: 'post',
        url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
        data: {
            "userName": "Aibulat96",
            "password": "string1A!"
        }
    }
    const resp = await axios(config);
    expect(resp.status).toEqual(200);
    expect(resp.data.status).toEqual("Success");
    expect(resp.data.result).toEqual("User authorized successfully.");
    expect(resp.data.token).toMatch(/^.*$/);
    expect(resp.data.expires).toMatch(/^.*$/);
});