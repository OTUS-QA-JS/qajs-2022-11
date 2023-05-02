import {userId, existUser, userWithWrongPass, newUser} from "../framework/fixtures";
import {baseURL, userPath, generateTokenPath, authorizedPath, getUserPath} from "../framework/config";

let authToken = '';

describe('Bookstore tests', () => {
    test('сreating a user with an error, the login is already in use', async () => {
        const response = await fetch(baseURL + userPath, {
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
        const response = await fetch(baseURL + userPath, {
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
        const response = await fetch(baseURL + userPath, {
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
        const response = await fetch(baseURL + generateTokenPath, {
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
        const response = await fetch(baseURL + generateTokenPath, {
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
        authToken = data.token;
        console.log(authToken);
    });

    test('authorize user', async () => {
        const response = await fetch(baseURL + authorizedPath, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(existUser)
        });

        expect(response.status).toEqual(200);
    });

    test('get user', async () => {
        const response = await fetch(baseURL + getUserPath, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await response.json();
        console.log(data);

        expect(response.status).toEqual(200);
        expect(data.userId).toBe(userId);
        expect(data.username).toBe(existUser.userName);
    });

    test('delete user', async () => {
        // create a new user
        let deleteUser = newUser;

        const responseCreateUser = await fetch(baseURL + userPath, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(deleteUser)
        });
        const data = await responseCreateUser.json();
        const existUserId = data.userId;
        const specialUser = {
          email: deleteUser.userName,
          password: deleteUser.password
        };
        console.log(specialUser);

         // generate token for the new user
        const responseGenerateToken = await fetch(baseURL + generateTokenPath, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(specialUser)
        });
      
        // get the auth token from the response
        const { token } = await responseGenerateToken.json();
      
        // delete the new user
        const responseDeleteUser = await fetch(baseURL + `Account/v1/User/${existUserId}`, {
          method: 'DELETE',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });
      
        // check if user deletion was successful
        expect(responseDeleteUser.status).toBe(200);
      });
});

