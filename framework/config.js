export const config = {
    baseUrl: 'https://bookstore.demoqa.com',
    existedUser: {
        "userName": "aizhan",
        "password": "Aizhan#123"
    },
    badPasswordUser: {
        "userName": "aizhan1",
        "password": "Aizhan123"
    },
    newUser: {
        "userName": Math.random().toString(36).slice(2, 7),
        "password": "Aizhan#123"
    },
    notAuthUser: {
        "userName": "Aizhana1222",
        "password": "Aizhan#123"
    },
    notFoundUser: {
        "userName": "Aizhana0",
        "password": "Aizhan#123"
    }
}
