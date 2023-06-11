import { baseURL, placeholderURL } from "./config";

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

/**
 * @todo
 */
const addListOfBooks = async (userId, book) => {
  const response = await fetch(baseURL + 'BookStore/v1/Books',{
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      'userId': `${userId}`,
      'collectionOfIsbns': [{
        'isbn': `${book}`
    }]
    }
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  };
};

//placeholders services
const createResource = async (plUserID) => {
  const response = await fetch(placeholderURL + 'posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({plUserID})
  });
  const data = await response.json();
  return {
    data,
    status: response.status
  }; 
};

export {createUser, getToken, authUser, getUser, delUser, addListOfBooks, createResource};