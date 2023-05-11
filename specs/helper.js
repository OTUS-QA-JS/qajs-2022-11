const { BASE_URL, USER_DATA } = require('./config.js');

async function login() {
  const response = await fetch(`${BASE_URL}/Account/v1/GenerateToken`, {
    method: 'POST',
    body: JSON.stringify(USER_DATA),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data)
}

module.exports = {
  login,
};