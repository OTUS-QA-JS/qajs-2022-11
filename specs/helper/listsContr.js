import config from "../config.js";
import supertest from "supertest";

let trello = supertest(config.url);

export const postList = async () => {
    // const res = await trello.post('/1/lists').send({
    //     key: config.creds.key,
    //     token: config.creds.token,
    //     name: 'FOR OTUS TEST', idBoard: '642c84505fabca7f40106113'
    // });

    const res = await trello.post('/1/lists').send({
        ...config.creds,
        name: 'FOR OTUS TEST', idBoard: '642c84505fabca7f40106113'
    });

    return res;
}

