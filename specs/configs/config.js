//######################
// Endpoints
//######################
/* 
//old version with fill URLS
export let autorization_endPoint = 'https://bookstore.demoqa.com/Account/v1/Authorized';
export let account_endpoint = 'https://bookstore.demoqa.com/Account/v1/User';
export let deleteAccount_endpoint = 'https://bookstore.demoqa.com/Account/v1/User/';
export let generateToken_endpoint = 'https://bookstore.demoqa.com/Account/v1/GenerateToken';
 */

// my new version

export let BASE_URL = 'https://bookstore.demoqa.com' 

export const bookID = '9781449325862'



//######################
// auth data
//######################

import { faker } from '@faker-js/faker';
export const name = faker.name.fullName();
export const pass = "AAbb33^^af"




