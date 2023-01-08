import {jest} from "@jest/globals"; jest;
import {config} from "../framework/config.js";
import {account} from "../framework/services/account.js";

let userId;
let token;

describe('Testing bookstore API', () => {
    describe('Testing endpoint /Account/v1/User', () => {
        test('create user with user exists error', async () => {
            try {
                const response = await account.createUser(config.existedUser)
            }
            catch (e) {
                expect(e.response.status).toEqual(406);
                expect(e.response.data.code).toEqual('1204');
                expect(e.response.data.message).toEqual('User exists!');
            }
        });
        test('create user with bad password error', async () => {
            try {
                const response = await account.createUser(config.badPasswordUser)
            }
            catch (e) {
                expect(e.response.status).toEqual(400);
                expect(e.response.data.code).toEqual('1300');
                expect(e.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.");
            }
        });
        test('create user successfully', async () => {
            const response = await account.createUser(config.newUser)
            userId = response.data.userID;

            expect(response.status).toEqual(201);
            expect(response.data.username).toEqual(config.newUser.userName);
        });
    });
    describe('Testing endpoint /Account/v1/GenerateToken', () => {
        test('generate token with error', async () => {
            try {
                const response = await account.generateToken()
            }
            catch (e) {
                expect(e.response.status).toEqual(400);
                expect(e.response.data.code).toEqual('1200');
                expect(e.response.data.message).toEqual('UserName and Password required.');
            }
        });
        test('generate token successfully', async () => {
            const response = await account.generateToken(config.newUser);
            token = response.data.token;

            expect(response.status).toEqual(200);
            expect(response.data.status).toEqual('Success');
            expect(response.data.result).toEqual('User authorized successfully.');
        });
    });
    describe('Testing endpoint /Account/v1/Authorized', () => {
        test('authorized is true', async () => {
            const payload = config.existedUser;
            const authToken = await account.generateToken(payload);
            const response = await account.isAuthorized(payload, authToken);

            expect(response.status).toEqual(200);
            expect(response.data).toBeTruthy();
        });
        test('authorized is false', async () => {
            const response = await account.isAuthorized(config.notAuthUser);

            expect(response.status).toEqual(200);
            expect(response.data).toBeFalsy();
        });
        test('user not found', async () => {
            try {
                const response = await account.isAuthorized(config.notFoundUser);
            }
            catch (e) {
            expect(e.response.status).toEqual(404);
            expect(e.response.data.code).toEqual('1207');
            expect(e.response.data.message).toEqual('User not found!');
            }
        });
    });
    describe('Testing endpoint GET /Account/v1/User/{UUID}', () => {
        test('get user successfully', async () => {
            const response = await account.getUser(userId, token);

            expect(response.status).toEqual(200);
            expect(response.data.userId).toEqual(userId);
            expect(response.data.username).toEqual(config.newUser.userName);
        });
        test('get user without userId', async () => {
            try {
                const response = await account.getUser(token);
            }
            catch (e) {
                expect(e.response.status).toEqual(401);
                expect(e.response.data.code).toEqual('1207');
                expect(e.response.data.message).toEqual('User not found!');
            }
        });
        test('get user without token', async () => {
            try {
                const response = await account.getUser(userId);
            }
            catch (e) {
                expect(e.response.status).toEqual(401);
                expect(e.response.data.code).toEqual('1200');
                expect(e.response.data.message).toEqual('User not authorized!');
            }
        });
    });
    describe('Testing endpoint DELETE /Account/v1/User/{UUID}', () => {
        test('delete user successfully', async () => {
            const response = await account.deleteUser(userId, token);

            expect(response.status).toEqual(204);
        });
        test('delete user without userId', async () => {
            try {
                const response = await account.deleteUser(token);
            }
            catch (e) {
                expect(e.response.status).toEqual(401);
                expect(e.response.data.code).toEqual('1207');
                expect(e.response.data.message).toEqual('User not found!');
            }
        });
        test('delete user without token', async () => {
            try {
                const response = await account.deleteUser(userId);
            }
            catch (e) {
                expect(e.response.status).toEqual(401);
                expect(e.response.data.code).toEqual('1200');
                expect(e.response.data.message).toEqual('User not authorized!');
            }
        });
    });
})
