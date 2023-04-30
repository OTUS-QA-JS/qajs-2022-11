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
    userName: "Maksim",
    password: "k!Skdk12ksdksk"
};

const userId = "Maksim";

export {newUser, userWithWrongPass, existUser, userId};
