import config from './config.js';

const login = async () => {
  const response = await fetch(`${config.baseUrl}/Account/v1/GenerateToken`, {
    method: 'POST',
    body: JSON.stringify(config.user),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data.token;
};

module.exports = {
  login,
};