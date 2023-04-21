test ('User already exists error', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb33^^99"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    expect(data.message).toBe('User exists!');
    expect(data.code).toBe('1204');
    expect(response.status).toEqual(406);
});


test ('password validation', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "???"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    expect(data.message).toContain('Passwords must have');
    expect(data.code).toBe('1300');
    expect(response.status).toEqual(400);
});



test ('Creating a new user', async () => {
    let name = Date.now() // обеспечивает создание уникального имени, т.к. для успешного создания пользователя нужен уникальный userName
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/User', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": name,
            "password": "AAbb33^^af"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    console.log(name);
    expect(data.username).toBe(name);
    expect(response.status).toBe(201);
});


test ('Token generation error', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb3"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    
    expect(data.token).toBeNull();
    expect(data.expires).toBeNull();
    expect(response.status).toBe(200);
    expect(data.result).toContain("User authorization failed");
});


test ('Token generation successful', async () => {
    const response = await fetch('https://bookstore.demoqa.com/Account/v1/GenerateToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "userName": "Totot",
            "password": "AAbb33^^99"
        })
      })
    const data = await response.json();
    console.log(data);
    console.log(response.status);
    
    expect(data.token.length).toBeGreaterThanOrEqual(120);
    expect(response.status).toBe(200);
    expect(data.status).toBe("Success");
});
