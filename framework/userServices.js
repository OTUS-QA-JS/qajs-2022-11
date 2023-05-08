import { baseURL } from "./config";

const createUser = async (user) => {
  const response = await fetch(baseURL + 'Account/v1/User', {
    method: 'POST',
    headers: {
       'accept': 'application/json',
       'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  };
};

const getToken = async (user) => {
  const response = await fetch(baseURL + 'Account/v1/GenerateToken', {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  };
};

const authUser = async (user) => {
  const response = await fetch(baseURL + 'Account/v1/Authorized', {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  };  
};

const getUser = async (userId, authToken) => {
  const response = await fetch(baseURL + `Account/v1/User/${userId}`, {
    method: 'GET',
    headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}`
    }
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  }; 
};

const delUser = async (existUserId, token) => {
  const response = await fetch(baseURL + `Account/v1/User/${existUserId}`, {
    method: 'DELETE',
    headers: {
      'accept': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  }; 
};

export {createUser, getToken, authUser, getUser, delUser};