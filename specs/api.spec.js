import axios from 'axios';
import { jest } from '@jest/globals';
import expect from 'expect';
jest;

// Напишите 5 апи-тестов на сервис bookstore https://bookstore.demoqa.com/swagger/
// Создание пользователя успешно
test('POST 200 create user', async () => {
  const config = {
    method: 'post',
    url: 'https://bookstore.demoqa.com/account/v1/user',
    data: {
      userName: 'admin',
      password: 'Administrator6666%!',
    },
  };
  const resp = await axios(config);
  console.log(resp.data);
  expect(resp.status).toEqual(201);
});

//Создание пользователя c ошибкой, пароль не подходит
test('POST 400 create user with wrong pswd', async () => {
  const config = {
    method: 'post',
    url: 'https://bookstore.demoqa.com/account/v1/user',
    data: {
      userName: 'admin',
      password: 'Admin',
    },
  };
  try {
    const resp = await axios(config);
    expect(resp.status).toEqual(400);
  } catch (error) {
    console.log(error.response.data.message);
    expect(error.response.status).toEqual(400);
  }
});

// Создание пользователя c ошибкой, логин уже используется
test('POST 406 create already exist user ', async () => {
  const config = {
    method: 'post',
    url: 'https://bookstore.demoqa.com/account/v1/user',
    data: {
      userName: 'admin',
      password: 'Administrator6666%!',
    },
  };
  try {
    const resp = await axios(config);
    expect(resp.status).toEqual(406);
  } catch (error) {
    console.log(error.response.data.message);
    expect(error.response.status).toEqual(406);
  }
});

// Генерация токена успешно
test('POST 200 create token', async () => {
  const config = {
    method: 'post',
    url: 'https://bookstore.demoqa.com/account/v1/generateToken',
    data: {
      userName: 'admin',
      password: 'Administrator6666%!',
    },
  };
  const resp = await axios(config);
  console.log(resp.data);
  expect(resp.status).toEqual(200);
});

// Генерация токена c ошибкой
test('POST 400 create token with error ', async () => {
  const config = {
    method: 'post',
    url: 'https://bookstore.demoqa.com/account/v1/generateToken',
    data: {
      userName: 'admin',
    },
  };
  try {
    const resp = await axios(config);
    expect(resp.status).toEqual(400);
  } catch (error) {
    console.log(error.response.data.message);
    expect(error.response.status).toEqual(400);
  }
});
