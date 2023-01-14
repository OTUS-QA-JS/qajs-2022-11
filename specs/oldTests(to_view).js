import axios from "axios";
jest;

describe ('Bookstore registration',() => {
    it('Успешное создание пользователя', async () =>{
        const userName = 'test' + new Date().getTime()
        const config = {
            method: 'post',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                userName: `${userName}`,
                password: 'Anna1234!'
            }
        }
        try {
            const resp = await axios(config)
            console.log(resp.data);
            console.log(resp.status);
            expect(resp.status).toEqual(201)
        }
        catch (err) {
                console.log(err.response.status);
                console.log(err.response.data);
            }
    })
    it('Ошибка при создании пользователя с неправильным паролем', async () =>{
        const userName = 'test' + new Date().getTime()
        const config = {
            method: 'post',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
               userName: `${userName}`,
               password: 'test'
             }
        }
        try {
            await axios(config)
        }
        catch (err) {
               expect(err.response.data.message).toEqual("Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer.")
        }
    })
    it('Ошибка при создании пользователя с неуникальным логином', async () =>{
        const userName = 'test' + new Date().getTime()
        const config = {
            method: 'post',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                userName: `${userName}`,
                password: 'Test1234!'
             }
        }

        const resp = await axios(config)

        try {
            await axios({method: 'post',
              url: 'https://bookstore.demoqa.com/Account/v1/User',
              data: {
                userName: `${resp.data.username}`,
                password: 'Test1234!'
                }
          });
        }
        catch (err) {
            expect(err.response.data.message).toEqual('User exists!');
    }
    })

})

describe ('Bookstore authorized', () =>{
    it('Успешная генерация токена', async () =>{
        const userName = 'test' + new Date().getTime()
        const config = {
            method: 'post',
            url: 'https://bookstore.demoqa.com/Account/v1/User',
            data: {
                userName: `${userName}`,
                password: 'Test1234!'
             }
        }

        const resp = await axios(config)

        try {
           const getToken = await axios({method: 'post',
              url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
              data: {
                userName: `${resp.data.username}`,
                password: 'Test1234!'
                }
            });
          console.log(getToken.data)
          expect(getToken.data.result).toEqual("User authorized successfully.")
        }
        catch (err) {
            console.log(err.response.status);
            console.log(err.response.data);
        }
    });
    it('Ошибка при генерации токена с несуществующим пользователем', async () =>{
        const userName = 'test' + new Date().getTime()
        const config = {
            method: 'post',
            url: 'https://bookstore.demoqa.com/Account/v1/GenerateToken',
            data: {
                userName: `${userName}`,
                password: 'Test1234!'
             }
        }

        try {
          const failedGetToken = await axios(config);
          console.log(failedGetToken.data)
          expect(failedGetToken.data.result).toEqual("User authorization failed.")
        }
        catch (err) {
            console.log(err.response.status);
            console.log(err.response.data);
        }
    })
})


