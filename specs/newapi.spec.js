import { login } from './helper.js';
import config from './config.js';
import { expect } from '@jest/globals';

describe('New API Tests', () => {
  let token;

  beforeAll(async () => {
    token = await login();
  });

  test('Task 1 - Authorized - Pozitive', async () => {
    const response = await fetch(`${config.baseUrl}/Account/v1/Authorized`, {
      method: 'POST',
      body: JSON.stringify(config.user),
      headers: { 
        'Content-Type': 'application/json', 
        Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    expect(data).toBe(true)
    expect(response.statusText).toBe('OK')
    expect(response.status).toBe(200)
  });

  test('Task 1 - Authorized - Negative - User not found', async () => {
    const response = await fetch(`${config.baseUrl}/Account/v1/Authorized`, {
      method: 'POST',
      body: JSON.stringify({userName: 'test', password: 'test'}),
      headers: { 
        'Content-Type': 'application/json', 
       },
    });

    const data = await response.json();
    expect(data.code).toBe('1207')
    expect(data.message).toBe('User not found!')
  });

  test('Task 2 - Delete user - Positive', async () => {
    // При выполнении этого теста необходимо поменять в helper.js config.user => config.deleteUser
    const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.userForDelete}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`
       },
    });
    expect(response.statusText).toBe('OK')
    expect(response.status).toBe(200)
  });

  test('Task 2 - Delete user - Negative - Wrong UUID', async () => {
    // При выполнении этого теста необходимо поменять в helper.js config.user => config.deleteUser
    config.userForDelete = '123'
    const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.userForDelete}`, {
      method: 'DELETE',
      headers: { 
        Authorization: `Bearer ${token}`
       },
    });
    const data = await response.json()
    console.log(data);
    expect(data.code).toBe('1207')
    expect(data.message).toBe('User Id not correct!')
  });

  test('Task 3 - Get user info - Positive', async () => {
    const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.testUserID}`, {
      method: 'GET',
      headers: { 
          Authorization: `Bearer ${token}`
       },
    });

    const data = await response.json();
    expect(data.username).toBe(config.user.userName)
    expect(data.userId).toBe(config.testUserID)
    expect(data).toHaveProperty('books')  
  });

  test('Task 3 - Get user info - Negative - wrong UUID ', async () => {
    config.testUserID = '123'
    const response = await fetch(`${config.baseUrl}/Account/v1/User/${config.testUserID}`, {
      method: 'GET',
      headers: { 
          Authorization: `Bearer ${token}`
       },
    });

    const data = await response.json();
    expect(data.code).toBe('1207')
    expect(data.message).toBe('User not found!')
    expect(response.status).toBe(401);
  });


});