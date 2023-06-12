import { userId, existUser, userWithWrongPass, newUser, plUserID, randomTitle } from "../framework/fixtures";
import { createUser, getToken, authUser, getUser, delUser, createResource, patchResourse } from "../framework/userServices";

let authToken = '';

describe('Bookstore tests', () => {
    test('сreating a user with an error, the login is already in use', async () => {
      const {data, status} = await createUser(existUser);
      
      expect(status).toEqual(406);
      expect(data.code).toEqual('1204');
      expect(data.message).toEqual('User exists!');
    });

    test('сreate user with error, password does not match', async () => {
      const {data, status} = await createUser(userWithWrongPass);
  
      expect(status).toEqual(400);
      expect(data.code).toEqual('1300');
      expect(data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
    });

    test('user creation successful', async () => {
      const {status} = await createUser(newUser);
      
      expect(status).toEqual(201);
    });

    test('token generation with an error', async () => {
      const {data, status} = await getToken(userWithWrongPass);
      
      expect(status).toEqual(200);
      expect(data.status).toBe('Failed');
      expect(data.result).toEqual('User authorization failed.');
    });

    test('token generation successful', async () => {
      const {data, status} = await getToken(existUser);

      expect(status).toEqual(200);
      expect(data.status).not.toBe('Failed');
      expect(data.result).toEqual('User authorized successfully.');
      authToken = data.token;
    });

    test('authorize user', async () => {
      const {status} = await authUser(existUser);

      expect(status).toEqual(200);
    });

    test('get user', async () => {
      const {data, status} = await getUser(userId, authToken);
    
      expect(status).toEqual(200);
      expect(data.userId).toBe(userId);
      expect(data.username).toBe(existUser.userName);
    });

    test('delete user', async () => {
      // create a new user
      let deleteUser = newUser;
      const {data} = await createUser(deleteUser);
      const existUserId = data.userId;
      const specialUser = {
        email: deleteUser.userName,
        password: deleteUser.password
      };
      // generate token for the new user
      const responseGenerateToken = await getToken(specialUser);
      const token = await responseGenerateToken.token;
      const responseDeleteUser = await delUser(existUserId, token);
        
      expect(responseDeleteUser.status).toBe(200);
      });
});

describe('Playecholder service tests', () => {
    test('creating a resource', async () => {
      const {data, status} = await createResource(plUserID);
      
      expect(status).toEqual(201);
      expect(data.userId).toEqual(plUserID);
      expect(data.id).toEqual(101);
    });

    test('patching a resource', async () => {
      const {data, status} = await patchResourse(randomTitle);

      expect(status).toEqual(200);
      expect(data.title).toEqual(randomTitle);
      expect(data.userId).toEqual(1);
      expect(data.id).toEqual(1);
    })
});