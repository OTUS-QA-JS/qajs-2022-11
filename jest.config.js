/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
 
  coverageProvider: 'v8',
 "jest": {
  "reporters": [
    "default",
    "jest-html-reporters"
  ]
} 
  
};

module.exports = config;
