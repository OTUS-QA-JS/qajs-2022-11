import { Buffer } from 'node:buffer';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

const config = {
    baseUrl: process.env.BASE_URL ?? 'https://bookstore.demoqa.com',
    credentials: JSON.parse(Buffer.from(process.env.CREDENTIALS, 'base64')),
}

export default config;