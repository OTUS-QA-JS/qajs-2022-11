import { faker } from '@faker-js/faker';

export function createUser() {
    const user = {
        data: {
            userName: faker.internet.userName(),
            password: faker.internet.password(32, false, /[a-zA-Z0-9!@#$%^&*]/),
        },
        getData() {
            return this.data
        },
        generateShortPassword() {
            this.data.password = faker.internet.password(5, false, /[a-zA-Z0-9!@#$%^&*]/)
            return this;
        },
        generateWrongPassword() {
            this.data.password = faker.internet.password(32, false, /[a-zA-Z0-9]/)
            return this;
        }
    }
    return user;
}