const https = require("https");

const BASE_URL = "bookstore.demoqa.com";

// Helper function to generate a valid username and password
const generateValidCredentials = () => {
  const randomString = Math.random().toString(36).substring(2, 8);
  const validUserName = `user_${randomString}`;
  const validPassword = `${randomString.toUpperCase()}!1a`;
  return { validUserName, validPassword };
};

// Helper function to make HTTP requests
const makeRequest = (method, path, data) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      port: 443,
      path,
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const req = https.request(options, (res) => {
      let responseBody = "";

      res.on("data", (chunk) => {
        responseBody += chunk;
      });

      res.on("end", () => {
        resolve({
          status: res.statusCode,
          data: JSON.parse(responseBody),
        });
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
};

describe("Bookstore API Tests", () => {
  let validUserName, validPassword, userId, authToken;

  beforeAll(() => {
    const credentials = generateValidCredentials();
    validUserName = credentials.validUserName;
    validPassword = credentials.validPassword;
  });

  test("1. Create user with error - username already exists", async () => {
    const response = await makeRequest("POST", "/Account/v1/User", {
      userName: "existingUser",
      password: "Password123!",
    });

    expect(response.status).toBe(406);
    expect(response.data.message).toBe("User exists!");
  });

  test("2. Create user with error - password does not meet requirements", async () => {
    const response = await makeRequest("POST", "/Account/v1/User", {
      userName: generateValidCredentials().validUserName,
      password: "weak",
    });

    expect(response.status).toBe(400);
    expect(response.data.message).toContain(
      "Passwords must have at least one non alphanumeric character",
    );
  });

  test("3. Create user successfully", async () => {
    const response = await makeRequest("POST", "/Account/v1/User", {
      userName: validUserName,
      password: validPassword,
    });

    expect(response.status).toBe(201);
    expect(response.data.username).toBe(validUserName);
    userId = response.data.userID;
  });

  test("4. Generate token with error", async () => {
    const response = await makeRequest("POST", "/Account/v1/GenerateToken", {
      userName: generateValidCredentials().validUserName,
      password: generateValidCredentials().validPassword,
    });

    expect(response.status).toBe(200);
    expect(response.data.token).toBeNull();
    expect(response.data.result).toBe("User authorization failed.");
  });

  test("5. Generate token successfully", async () => {
    const response = await makeRequest("POST", "/Account/v1/GenerateToken", {
      userName: validUserName,
      password: validPassword,
    });

    expect(response.status).toBe(200);
    expect(response.data.token).not.toBeNull();
    expect(response.data.result).toBe("User authorized successfully.");
    authToken = response.data.token;
  });
});
