import axios from 'axios';

describe("bookstore API tests", () => {
  const baseURL = 'https://bookstore.demoqa.com';

  it("201 Create user, valid password", async () => {
    const config = {
      method: 'post',
      url: `${baseURL}/account/v1/user`,
      data: {
        userName: "newUser001",
        password: "P@ssword12345"
      },
    };
    const response = await axios(config);
    expect(response.status).toEqual(201);
  });

  it("406 Create user, User exists", async () => {
    const config = {
      method: 'post',
      url: `${baseURL}/account/v1/user`,
      data: {
        userName: "newUser001",
        password: "P@ssword12345"
      },
    };
    const body = {
      "code": "1204",
      "message": "User exists!"
    };

    try {
      const response = await axios(config);
    } catch (error) {
      expect(error.response.status).toEqual(406);
      expect(error.response.data).toEqual(body);
    }
  });

  it("400 Create user, Invalid password", async () => {
    const config = {
      method: 'post',
      url: `${baseURL}/account/v1/user`,
      data: {
        userName: "user12345G8",
        password: "12345"
      },
    };
    const body = {
      code: "1300",
      message: "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    }

    try {
      const response = await axios(config);
    } catch (error) {
      expect(error.response.status).toEqual(400);
      expect(error.response.data).toEqual(body);
    }
  });

  it("200 Get token, User exists", async () => {
    const config = {
      method: 'post',
      url: `${baseURL}/account/v1/generatetoken`,
      data: {
        userName: "user12345G8",
        password: "P@ssword12345"
      },
    };

    const response = await axios(config);
    expect(response.status).toEqual(200);
    expect(response.data.token).not.toBe(null);
  });

  it("200(?) Get token, User doesn't exist", async () => {
    const config = {
      method: 'post',
      url: `${baseURL}/account/v1/generatetoken`,
      data: {
        userName: "user12345GG",
        password: "P@ssword12345"
      },
    };

    const response = await axios(config);
    expect(response.status).toEqual(200); //реализация api такая, что на ошибку отдается 200
    expect(response.data.token).toBe(null);
  });
});
