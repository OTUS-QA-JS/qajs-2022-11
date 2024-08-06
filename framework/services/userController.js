const request = require("supertest");
const config = require("../config/config");

class UserController {
  async createUser(userData) {
    return await request(config.baseUrl)
      .post("/Account/v1/User")
      .send(userData);
  }

  async generateToken(credentials) {
    return await request(config.baseUrl)
      .post("/Account/v1/GenerateToken")
      .send(credentials);
  }
}

module.exports = UserController;
