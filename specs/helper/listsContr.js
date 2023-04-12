import config from "../config.js";
import supertest from "supertest";

let trello = supertest(config.url);
let idList = 0;

export const postList = async () => {
    const res = await trello.post('/1/lists').send({
        ...config.creds,
        name: 'FOR OTUS TEST', idBoard: '642c84505fabca7f40106113'
    });


    return res;
}

export const getList = async () => {
    const res = await trello.get(`/1/lists/${idList}`).send({
        ...config.creds
    });

    return res;
}

export function setId(id) {
    idList = id;
}

export function getId(id) {
    return idList;
}

   // const res = await trello.post('/1/lists').send({
    //     key: config.creds.key,
    //     token: config.creds.token,
    //     name: 'FOR OTUS TEST', idBoard: '642c84505fabca7f40106113'
    // });