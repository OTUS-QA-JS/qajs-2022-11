import {newUser, userWithWrongPass, existUser} from "../framework/fixtures";

const baseURL = 'https://bookstore.demoqa.com/Account/v1/User';

const option0 = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(existUser)
  };

const option1 = {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(userWithWrongPass)
};

const option2 = {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser)
};

const option3 = {
    method: 'POST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(existUser)
};

const option4= {
    method: 'GET',
    headers: {
        'accept': 'application/json',
    },
};


export {baseURL, option0, option1, option2, option3, option4};