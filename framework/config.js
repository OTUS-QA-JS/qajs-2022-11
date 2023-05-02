import {userId} from "../framework/fixtures";

const baseURL = "https://bookstore.demoqa.com/";
const userPath = "Account/v1/User";
const generateTokenPath = "Account/v1/GenerateToken";
const authorizedPath = "Account/v1/Authorized";
const getUserPath = `Account/v1/User/${userId}`;

export {baseURL, userPath, generateTokenPath, authorizedPath, getUserPath};