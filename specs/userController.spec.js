const UserController = require("../framework/services/userController.js");
const { expect } = require("@jest/globals");
const config = require("../framework/config/config.js");

describe("UserController Tests", () => {
  // eslint-disable-next-line no-unused-vars
  let validUserName, validPassword, userId, authToken;

  beforeAll(() => {
    const randomString = Math.random().toString(36).substring(2, 8);
    validUserName = `user_${randomString}`;
    validPassword = `${randomString.toUpperCase()}!1a`;
  });

  test("should create user with error - username already exists", async () => {
    const userController = new UserController();
    const response = await userController.createUser({
      userName: config.username,
      password: config.password,
    });

    expect(response.status).toBe(406);
    expect(response.body.message).toBe("User exists!");
  });

  test("should create user with error - password does not meet requirements", async () => {
    const userController = new UserController();
    const response = await userController.createUser({
      userName: `user_${Math.random().toString(36).substring(2, 8)}`,
      password: "weak",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      "Passwords must have at least one non alphanumeric character",
    );
  });

  test("should create user successfully", async () => {
    const userController = new UserController();
    const response = await userController.createUser({
      userName: validUserName,
      password: validPassword,
    });

    expect(response.status).toBe(201);
    expect(response.body.username).toBe(validUserName);
    userId = response.body.userID;
  });

  test("should generate token with error", async () => {
    const userController = new UserController();
    const response = await userController.generateToken({
      userName: `user_${Math.random().toString(36).substring(2, 8)}`,
      password: `${Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase()}!1a`,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeNull();
    expect(response.body.result).toBe("User authorization failed.");
  });

  test("should generate token successfully", async () => {
    const userController = new UserController();
    const response = await userController.generateToken({
      userName: validUserName,
      password: validPassword,
    });

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
    expect(response.body.result).toBe("User authorized successfully.");
    authToken = response.body.token;
  });
});
