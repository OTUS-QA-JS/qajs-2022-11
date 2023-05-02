let name = Date.now() 
let pass = "AAbb33^^af"

const createNewUser = async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": name,
            "password": pass
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
//export {name as createdNewUserName}
//export {pass as createdNewUserPass}


const generateUserToken = async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": name,
            "password": pass
        })
      })
    const data = await response.json();
    //console.log(data);
    //console.log(response.status);
    return data.token
};
export {generateUserToken}
