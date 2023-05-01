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
    userName: "TestUser102",
    password: "k!NewUSer!10002"
};

const userId = "002a2424-10fa-4dca-a18a-014fb83b5a31";

export {newUser, userWithWrongPass, existUser, userId};
