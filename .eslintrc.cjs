module.exports = {
  root: true,
  plugins: ['jest'],
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:jest/recommended'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
  }
}
