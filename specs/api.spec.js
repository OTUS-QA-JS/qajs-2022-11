import {account_endpoint} from './configs/config.js'
import {autorization_endPoint} from './configs/config.js'
import {deleteAccount_endpoint} from './configs/config.js'
import {generateToken_endpoint} from './configs/config.js'


import {generateUserToken} from './controllers/controller.js'
import {createNewUser} from './controllers/controller.js'

// ######################################################################

test ('User already exists error', async () => {
    const response = await fetch(account_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb33^^99"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    expect(data.message).toBe('User exists!');
    expect(data.code).toBe('1204');
    expect(response.status).toEqual(406);
});


test ('password validation', async () => {
    const response = await fetch(account_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "???"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    expect(data.message).toContain('Passwords must have');
    expect(data.code).toBe('1300');
    expect(response.status).toEqual(400);
});



test ('Creating a new user', async () => {
    let name = Date.now() // обеспечивает создание уникального имени, т.к. для успешного создания пользователя нужен уникальный userName
    const response = await fetch(account_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": name,
            "password": "AAbb33^^af"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    console.log(name);
    expect(data.username).toBe(name);
    expect(response.status).toBe(201);
});


test ('Token generation error', async () => {
    const response = await fetch(generateToken_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb3"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    
    expect(data.token).toBeNull();
    expect(data.expires).toBeNull();
    expect(response.status).toBe(200);
    expect(data.result).toContain("User authorization failed");
});


test ('Token generation successful', async () => {
    const response = await fetch(generateToken_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb33^^99"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    
    expect(data.token.length).toBeGreaterThanOrEqual(120);
    expect(response.status).toBe(200);
    expect(data.status).toBe("Success");
});
 


//######################################################################################################
//###### HomeWork of 'Библиотеки для тестирования API'
//######################################################################################################


test ('authorization', async () => {
    const response = await fetch(autorization_endPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb33^^99"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    expect(data).toBe(true);
    expect(response.status).toEqual(200);
});


test ('deleting User', async () => {
    let newUserID = await createNewUser()
    let token = await generateUserToken()
    const response = await fetch(deleteAccount_endpoint + newUserID, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      })
    console.log(response.status);
    
    expect(response.status).toEqual(204);
});
 

test ('getting information about user', async () => {
    let newUserID = await createNewUser()
    let token = await generateUserToken()
    const response = await fetch(account_endpoint + newUserID, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
    console.log(response.status);
    expect(response.status).toEqual(200);
});
 


//####################
// My own sandbox
//#####################
/* 
console.log(await createNewUser())
// let ggg = await createNewUser();
// console.log(ggg)

let foo = 'https://bookstore.demoqa.com/Account/v1/User/'
console.log(foo)
let bar = foo + await createNewUser()
console.log(bar)
 */

/* 
console.log(await createNewUser());
console.log(await generateUserToken());
 */
