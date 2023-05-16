/* 
//old version with fill URLS
import {account_endpoint} from './configs/config.js'
import {autorization_endPoint} from './configs/config.js'
import {deleteAccount_endpoint} from './configs/config.js'
import {generateToken_endpoint} from './configs/config.js'
 */

import { generateUserToken } from './controllers/controller.js'
import { createNewUser } from './controllers/controller.js'
import { testUserAuthorization } from './controllers/controller.js';
import { creatingBook } from './controllers/controller.js';

import {
  BASE_URL, name, pass, bookID, name_for_BookCollection, pass_for_BookCollection
} from './configs/config.js'


// ######################################################################
/* 
test ('User already exists error', async () => {
    const response = await fetch(`${BASE_URL}/Account/v1/User`, {
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
    const response = await fetch(`${BASE_URL}/Account/v1/User`, {
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
    let unicName = Date.now() // обеспечивает создание уникального имени, т.к. для успешного создания пользователя нужен уникальный userName
    const response = await fetch(`${BASE_URL}/Account/v1/User`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": unicName,
            "password": "AAbb33^^af"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    console.log(unicName);
    expect(data.username).toBe(unicName);
    expect(response.status).toBe(201);
});


test ('Token generation error', async () => {
    const response = await fetch(`${BASE_URL}/Account/v1/GenerateToken`, {
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
    const response = await fetch(`${BASE_URL}/Account/v1/GenerateToken`, {
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
 
 */

//######################################################################################################
//###### HomeWork of 'Библиотеки для тестирования API'
//######################################################################################################
/* 

test ('authorization', async () => {
    const response = await fetch(`${BASE_URL}/Account/v1/Authorized`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb33^^99"
        })
      })
    const data = await response.json();
    //console.log(data);
    //console.log(response.status);
    expect(data).toBe(true);
    expect(response.status).toEqual(200);
});


test ('deleting User', async () => {
    let newUserID = await createNewUser(name, pass)
    let token = await generateUserToken(name, pass)
    const response = await fetch(`${BASE_URL}/Account/v1/User/` + newUserID, {
        method: 'DELETE',
        headers: { 'Authorization': 'Bearer ' + token }
      })
    //console.log(response.status);
    
    expect(response.status).toEqual(204);
});

 
test ('getting information about user', async () => {
    let newUserID = await createNewUser(name, pass)
    let token = await generateUserToken(name, pass)
    const response = await fetch(`${BASE_URL}/Account/v1/User` + newUserID, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token }
      })
    //console.log(response.status);
    expect(response.status).toEqual(200);
});
  

 */

//######################################################################################################
//###### HomeWork of 'Шаблоны проектирования в тестировании API '
//######################################################################################################

 /* 
test ('Book_creating(add?)', async () => {
    let newUserID = await createNewUser(name_for_BookCollection, pass_for_BookCollection);
    let token = await generateUserToken(name_for_BookCollection, pass_for_BookCollection);
    //let userAuth = await testUserAuthorization();
   
    const response = await fetch(`${BASE_URL}/BookStore/v1/Books`, {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token},
        body: JSON.stringify({
            "userId": newUserID,
            "collectionOfIsbns": [
              {
                "isbn": bookID
              }
            ]
          })
      })
    const data = await response.json();  
    //console.log(response);
    //console.log(data);
    expect(data.books[0]).toEqual({ isbn: '9781449325862' });
    expect(response.status).toBe(201);
});
  */

test ('Book_updating', async () => {
    let newUserID = await createNewUser(name_for_BookCollection, pass_for_BookCollection);
    let token = await generateUserToken(name_for_BookCollection, pass_for_BookCollection);
    await testUserAuthorization(name_for_BookCollection, pass_for_BookCollection);
    await creatingBook(name_for_BookCollection, pass_for_BookCollection);
   
    const response = await fetch(`${BASE_URL}/BookStore/v1/Books/${bookID}`, {
        method: 'PUT',
        headers: {  'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token},
        body: JSON.stringify({
            "userId": newUserID,
            "isbn": bookID,
          })
      })
      
    const data = await response.json();  
    //console.log(response);
    console.log(data);
    console.log(data.code);
    console.log(data.message);
    //console.log(`${BASE_URL}/BookStore/v1/Books/${bookID}`)
    expect(response.status).toBe(201);
});

 

 


//###################################################
// My own sandbox
//###################################################
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

 /* 
console.log(await createNewUser());
console.log(await generateUserToken());
console.log(await testUserAuthorization());
 */

/* 
console.log(await creatingBook(name_for_BookCollection, pass_for_BookCollection));
console.log(await creatingBook(name_for_BookCollection, pass_for_BookCollection)+'blb');
*/

/* 
console.log(await createNewUser(name, pass) + ' first');
console.log(await createNewUser(name, pass) + ' second');
*/