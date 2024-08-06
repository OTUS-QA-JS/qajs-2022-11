const UserController = require("../framework/services/userController.js");
const { expect } = require("@jest/globals");
const config = require("../framework/config/config.js");

describe("Create User with Error - Username Already Exists", () => {
  test("should create user with error - username already exists", async () => {
    const userController = new UserController();
    const response = await userController.createUser({
      userName: config.username,
      password: config.password,
    });

    expect(response.status).toBe(406);
    expect(response.body.message).toBe("User exists!");
  });
});
