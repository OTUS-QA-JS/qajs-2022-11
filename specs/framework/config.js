import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const config = {
    baseUrl: process.env.BASE_URL ?? 'https://bookstore.demoqa.com',
    credentials: { "userName": process.env.TEST_LOGIN, "password": process.env.TEST_PASSWORD },
}

export default config;