/* eslint-disable jest/no-conditional-expect */
import axios from "axios";

const baseUrl = "https://bookstore.demoqa.com";

describe("User Account API", () => {
  test("Создание пользователя успешно", async () => {
    const response = await axios.post(baseUrl + "/Account/v1/User", {
      userName: "daria",
      password: "Test123*334",
    });
    expect(response.status).toBe(201);
  });

  test("Создание пользователя c ошибкой, логин уже используется", async () => {
    try {
      await axios.post(baseUrl + "/Account/v1/User", {
        userName: "daria",
        password: "Test123*334",
      });
    } catch (error) {
      expect(error.response.data.message).toBe("User exists!");
    }
  });

  test("Создание пользователя c ошибкой, пароль не подходит", async () => {
    try {
      await axios.post(baseUrl + "/Account/v1/User", {
        userName: "daria",
        password: "12345",
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

  test("Генерация токена успешно", async () => {
    const response = await axios.post(baseUrl + "/Account/v1/GenerateToken", {
      userName: "daria",
      password: "Test123*334",
    });
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toContain("application/json");
  });

  test("Генерация токена c ошибкой", async () => {
    try {
      await axios.post(baseUrl + "/Account/v1/GenerateToken", {
        userName: "daria",
        password: "Test123*334",
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
      expect(error.response.data).toEqual({
        token: null,
        expires: null,
        status: "Failed",
        result: "User authorization failed.",
      });
    }
  });
});
