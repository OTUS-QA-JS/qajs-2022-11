import { describe, expect, test} from "@jest/globals";

//task 1 - bookstore tests
test('Create user - Login is already in use', async () => {
    const response  = await fetch('https://bookstore.demoqa.com/Account/v1/User',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: 'test',
            password: 'Test123456!'
        })
    })
    const data = await response.json();
    expect(data.message).toEqual('User exists!');
    expect(data.code).toEqual('1204');
    expect(response.status).toEqual(406);
    
})

test('Create user - Wrong password', async () => {
    const response  = await fetch('https://bookstore.demoqa.com/Account/v1/User',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: 'test',
            password: 'tww'
        })
    })
    const data = await response.json();
    expect(data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    expect(data.code).toEqual('1300');
    expect(response.status).toEqual(400);   
})

test('Create user - Succeeded', async () => {
    const response  = await fetch('https://bookstore.demoqa.com/Account/v1/User',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: 'test12',
            password: 'Testuser1!'
        })
    })
    const data = await response.json();
    expect(data).toHaveProperty('books');
    expect(response.status).toEqual(201);
    expect(data.username).toEqual('test12');
})

test('Generate a token - Succeeded', async () => {
    const response  = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: 'test',
            password: 'Testuser1!'
        })
    })
    const data = await response.json();
    expect(data).toHaveProperty('token');
    expect(data).toHaveProperty('expires');
    expect(response.status).toEqual(200);
    expect(data.status).toEqual('Success');
    expect(data.result).toEqual('User authorized successfully.');
})

test('Generate a token - With error', async () => {
    const response  = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName: '',
            password: ''
        })
    })
    const data = await response.json();
    expect(response.status).toEqual(400);
    expect(data.code).toEqual('1200');
    expect(data.message).toEqual('UserName and Password required.');
})

//task 2 - public api tests (https://swapi.dev/ and https://restful-api.dev/ )

test('List of all SW characters', async () => {
    const response  = await fetch('https://swapi.dev/api/people',{
        method: 'GET',
   })
    const data = await response.json();
    expect(response.status).toEqual(200);
    expect(data.count).toEqual(82);
    expect(Array.isArray(data.results)).toBe(true); //проверяю что в results получу массив 
})

test('Add new object - No errors', async () => {
    const response  = await fetch('https://api.restful-api.dev/objects',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'test',
        })
   })
    const data = await response.json();
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
    expect(data.name).toEqual('test');
})

test('Add new object - Post empty body', async () => {
    const response  = await fetch('https://api.restful-api.dev/objects',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
        })
   })
    const data = await response.json();
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
    expect(data.name).toEqual(null);
})

test('Check data in response object', async () => {
    const response  = await fetch('https://api.restful-api.dev/objects/7',{
        method: 'GET',
        
   })
    const data = await response.json();
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
    expect(data.data.year).toEqual(2019);
    expect(data.data['Hard disk size']).toEqual('1 TB')
})

test('Correct update', async () => {
    const response  = await fetch('https://api.restful-api.dev/objects/ff80818187f8fe360187fd3ec73600d9',{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: 'Super car',
            data:{'color':'black'}
        })
        
   })
    const data = await response.json();
    expect(response.status).toEqual(200);
    expect(response.statusText).toEqual('OK');
    expect(data).toHaveProperty('updatedAt');
    expect(data.name).toEqual('Super car')
})