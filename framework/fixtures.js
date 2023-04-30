import { faker } from '@faker-js/faker';

const newUser = {
    userName: `${faker.name.firstName()}`,
    password: `${faker.internet.password(10, false, /[A-Z]/, '#1x')}`
};

const userWithWrongPass = {
    userName: `${faker.name.firstName()}`,
    password: `${faker.internet.password(7)}`
};

const existUser = {
    userName: "NewUSer",
    password: "k!NewUSer!10002"
};

const userId = "8bb34e98-9496-4ddb-820c-7d573633ffd5";

export {newUser, userWithWrongPass, existUser, userId};
