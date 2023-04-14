module.exports = {
  root: true,
  env: {
    node: true,
    'jest/globals': true,
  },
  plugins: ['jest', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    quotes: [2, 'single', { avoidEscape: true }],
    semi: [2, 'always'],
  },
  parser: 'babel-eslint',
};
