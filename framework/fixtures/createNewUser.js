import { faker } from '@faker-js/faker';

export function getNewUser() {
    let regData = {
        userName: `${'test' + new Date().getTime()}`,
        password: `${faker.internet.password(30, false, /[a-zA-Z0-9!@#$%^&*]/)}`
    }
    return regData
}

export default getNewUser;

