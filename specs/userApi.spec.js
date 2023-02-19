import config from "./framework/config";
import account from "./framework/services/user";
import { createUser } from "./framework/utils/generators";
import { Severity } from "jest-allure/dist/Reporter"

const { credentials } = config;

beforeEach(async () => {
  reporter
    .epic('User')
    .severity(Severity.Blocker);
});

describe.skip("POST /account/v1/user", () => {
  beforeEach(async () => {
    reporter.feature('New user registration')
  });

  let userData;
  const validUser = createUser().getData();
  const userShortPassword = createUser().generateShortPassword().getData();
  const userInvalidPassword = createUser().generateShortPassword().getData();
  console.log(validUser, userShortPassword, userInvalidPassword)

  afterAll(async () => {
    await account.deleteUser(userData.uuid, userData.token);
  });

  it(" Creates user, valid password(201)", async () => {
    const res = await account.user(validUser);
    const authToken = await account.getAuthToken(validUser);
    userData = { uuid: res.body.userID, token: authToken };

    expect(res.status).toEqual(201);
  });

  it(" Doesn't create user, User exists(406)", async () => {
    const body = {
      "code": "1204",
      "message": "User exists!"
    };
    const res = await account.user(validUser);

    expect(res.status).toEqual(406);
    expect(res.body).toEqual(body);
  });

  it(" Doesn't create user, Invalid password(400)", async () => {
    const body = {
      code: "1300",
      message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    }
    const res = await account.user(userInvalidPassword);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(body);
  });

  it(" Doesn't create user, Short password(400)", async () => {
    const body = {
      code: "1300",
      message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    }
    const res = await account.user(userShortPassword);

    expect(res.status).toEqual(400);
    expect(res.body).toEqual(body);
  });

});

describe("DELETE /account/v1/user/{uuid}", () => {
  beforeEach(async () => {
    reporter.feature('Delete user')
  });

  const user = createUser().getData();
  let userData;

  beforeAll(async () => {
    userData = await account.createUserWithToken(user);
  });

  //нужно ли здесь удаление после всех тестов? смущает оставление юзера в базе, если тест на удаление упадет

  it(" Doesn't delete user with invalid token(401)", async () => {
    const res = await account.deleteUser(userData.uuid, "");

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1200", message: "User not authorized!" });
  });

  it(" Doesn't delete user with invalid user UUID(200)", async () => {
    const res = await account.deleteUser("123", userData.token);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({ code: "1207", message: "User Id not correct!" });
  });

  it(" Deletes user with valid UUID & token(200)", async () => {
    const res = await account.deleteUser(userData.uuid, userData.token);

    expect(res.status).toEqual(204);
  });
})

describe("POST /account/v1/authorized", () => {
  beforeEach(async () => {
    reporter.feature('User authorization')
  });

  it(" Doesn't auth user if user doesn't exists(404)", async () => {
    const res = await account.authorized(createUser().getData());

    expect(res.status).toEqual(404);
    expect(res.body).toEqual({ "code": "1207", "message": "User not found!" });
  });

  it(" Doesn't auth user, empty payload(400)", async () => {
    const res = await account.authorized();

    expect(res.status).toEqual(400);
    expect(res.body).toEqual({ code: '1200', message: 'UserName and Password required.' });
  });

  it(" Authorizes user with valid credentials(200)", async () => {
    // console.log(credentials.toString('ascii'));
    const res = await account.authorized(credentials);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual(true);
  });

});

describe("POST /account/v1/generatetoken", () => {
  beforeEach(async () => {
    reporter.feature('User auth token generation')
  });

  it(" Generates new token, User exists(200)", async () => {
    const res = await account.generateToken(credentials);

    expect(res.status).toEqual(200);
    expect(res.body.token).not.toBe(null);
    expect(typeof res.body.token).toEqual('string')
  });

  it(" Doesn't generates token if user doesn't exists(200)", async () => {
    const res = await account.generateToken(createUser().getData());

    expect(res.status).toEqual(200);
    expect(res.body.token).toBe(null);
  });

});

describe("GET /account/v1/user/{ uuid }", () => {
  beforeEach(async () => {
    reporter.feature('Get user information')
  });

  const user = createUser().getData();
  let userData;

  beforeAll(async () => {
    userData = await account.createUserWithToken(user);
  });

  afterAll(async () => {
    await account.deleteUser(userData.uuid, userData.token);
  });

  it(" Gets user info if credentials are valid(200)", async () => {
    const res = await account.userInfo(userData.uuid, userData.token);

    expect(res.status).toEqual(200);
    expect(res.body.username).toEqual(user.userName);
  });

  it(" Doesn't get user info if used invalid UUID(401)", async () => {
    const res = await account.userInfo("123", userData.token);

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1207", message: "User not found!" });
  });

  it(" Doesn't get user info if used invalid token(401)", async () => {
    const res = await account.userInfo(userData.uuid, "");

    expect(res.status).toEqual(401);
    expect(res.body).toEqual({ code: "1200", message: "User not authorized!" });
  });
});
