import {name} from '../configs/config.js'
import {pass} from '../configs/config.js'
import { 
  BASE_URL, bookID, name_for_BookCollection, pass_for_BookCollection 
} from '../configs/config.js';


const createNewUser = async ( username, password ) => {
    const response = await fetch(`${BASE_URL}/Account/v1/User`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": username,
            "password": password
        })
      })
    const data = await response.json();
    //console.log(data);
    //console.log(response.status);
    //console.log(name);
    //console.log(data.userID);
    return data.userID
};

export {createNewUser}



const generateUserToken = async ( username, password ) => {
    const response = await fetch(`${BASE_URL}/Account/v1/GenerateToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": username,
            "password": password
        })
      })
    const data = await response.json();
    //console.log(data);
    //console.log(response.status);
    return data.token
};
export {generateUserToken}


const testUserAuthorization = async ( username, password ) => {
    const response = await fetch(`${BASE_URL}/Account/v1/Authorized`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": username,
            "password": password
        })
      })
    const data = await response.json();
    //console.log(data);
    //console.log(response.status);
    return data
};
export {testUserAuthorization}


const creatingBook = async (username, password) => {
    let newUserID = await createNewUser(username, password);
    let token = await generateUserToken(username, password);
    //let userAuth = await testUserAuthorization();
   
    const response = await fetch(`${BASE_URL}/BookStore/v1/Books`, {
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token},
        body: JSON.stringify({
            "userId": newUserID,
            "collectionOfIsbns": [
              {
                "isbn": bookID
              }
            ]
          })
      })
      
      const data = await response.json();  
      //console.log(response);
      console.log(data);
      console.log(token);
      return data
};
export {creatingBook}
