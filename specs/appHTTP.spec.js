/*import fetch from "node-fetch";
import {discribe, expect, test} from '@jest/globals';*/

// создание пользователя с ошибкой логин уже используется 

test.skip ( 'add user', async() => {
    const response = await fetch ('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
      
            userName: 'vasya',
            password: 'Vasya323#',
        })
    
    })
    
    const data = await response.json();
console.log(data);
console.log(data.status);    
    });


    // создание пользователя с ошибкой пароль не подходит 

    test.skip( 'add user', async() => {
        const response = await fetch ('https://bookstore.demoqa.com/Account/v1/User', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({
          
                userName: 'vasya',
                password: 'Vasya323',
            })
        
        })
        
        const data = await response.json();
    console.log(data);
    console.log(data.status);    
        });

        // создание пользователя успешно 

        test.skip( 'add user', async() => {
            const response = await fetch ('https://bookstore.demoqa.com/Account/v1/User', {
                method: 'POST',
                headers: { 'Content-Type' : 'application/json' },
                body: JSON.stringify({
              
                    userName: 'vasya1',
                    password: 'Vasya323#',
                })
            
            })
            
            const data = await response.json();
        console.log(data);
        console.log(data.status);    
            });

            // генерация токена с ошибкой 
            test ( 'generation token error ', async() => {
                const response = await fetch ('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify({
                  
                        userName: 'vasya1',
                        password: 'Vasya323',
                    })
                
                })
                
                const data = await response.json();
            console.log(data);
            console.log(data.status);    
                });

                // генерация токена успешно 

                test ( 'generation token error ', async() => {
                    const response = await fetch ('https://bookstore.demoqa.com/Account/v1/GenerateToken ', {
                        method: 'POST',
                    
                        headers: { 'Content-Type' : 'application/json' },
                        body: JSON.stringify({
                      
                            userName: 'vasya1',
                            password: 'Vasya323#',
                        })
                    
                    })
                    
                    const data = await response.json();
                console.log(data);
                console.log(data.status);    
                    });
    
