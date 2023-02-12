import config from "./framework/config";
import account from "./framework/services/user";

describe("bookstore user API tests", () => {
  const { credentials } = config;
  let user = {};
  let token = '';

  it("POST /account/v1/user - Create user, valid password(201)", async () => {
    const res = await account.user(credentials);
    expect(res.status).toEqual(201);
    user = res.body;
    token = await account.getAuthToken(credentials);
    console.log(user)
  });

  it("POST /account/v1/user - Create user, User exists(406)", async () => {
    const body = {
      "code": "1204",
      "message": "User exists!"
    };
    const res = await account.user(credentials);
    expect(res.status).toEqual(406);
    expect(res.body).toEqual(body);
  });

  it("POST /account/v1/user - Create user, Invalid password(400)", async () => {
    const body = {
      code: "1300",
      message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    }

    const res = await account.user({
      userName: 'demo_OL12',
      password: '123456'
    });

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(body);
  });

  it("POST /account/v1/generatetoken - New token, User exists(200)", async () => {
    const payload = {
      userName: 'tokenUser',
      password: '123456Qaz!'
    }
    const userData = await account.user(payload);
    const res = await account.generateToken(payload);
    await account.deleteUser(userData.body.userID, res.body.token);

    expect(res.status).toEqual(200);
    expect(res.body.token).not.toBe(null);
    expect(typeof res.body.token).toEqual('string')
  });

  it("POST /account/v1/generatetoken - New token, User doesn't exists(200)", async () => {
    const res = await account.generateToken({
      userName: 'test_001',
      password: '123456'
    });

    expect(res.status).toEqual(200);
    expect(res.body.token).toBe(null);
  });

  it("POST /account/v1/authorized - Auth user, valid credentials(200)", async () => {
    const res = await account.authorized(credentials);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(true);
  });

  it(`GET /account/v1/user/{uuid} - Get user info, valid credentials(200)`, async () => {
    const res = await account.userInfo(user.userID, token);
    console.log(user.userID, token)
    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual(user.username);
  });

  it(`GET /account/v1/user/{uuid}- Get user info, invalid userID(401)`, async () => {
    const res = await account.userInfo("123", token);
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1207", message: "User not found!" });
  });

  it(`GET /account/v1/user/{uuid}- Get user info, invalid token(401)`, async () => {
    const res = await account.userInfo(user.userID, "");
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1200", message: "User not authorized!" });
  });

  it(`DELETE /account/v1/user/{uuid} - Delete user,  invalid token(401)`, async () => {
    const res = await account.deleteUser(user.userID, "");

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1200", message: "User not authorized!" });
  });

  it(`DELETE /account/v1/user/{uuid} - Delete user,  invalid userID(200)`, async () => {
    const res = await account.deleteUser("123", token);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ code: "1207", message: "User Id not correct!" });
  });

  it(`DELETE /account/v1/user/{uuid} - Delete user, valid credentials(200)`, async () => {
    const res = await account.deleteUser(user.userID, token);
    expect(res.status).toEqual(204);
  });

  it("POST /account/v1/authorized - Auth user, user doesn't exists(404)", async () => {
    const res = await account.authorized({
      userName: 'demo_OL12',
      password: '123456'
    });

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ "code": "1207", "message": "User not found!" });
  });

  it("POST /account/v1/authorized - Auth user, empty payload(400)", async () => {
    const res = await account.authorized();

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ code: '1200', message: 'UserName and Password required.' });
  });

});
