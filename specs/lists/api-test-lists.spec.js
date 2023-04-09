import config from "../config.js";
import supertest from "supertest";
import * as trelloController from "../helper/listsContr.js"

let trello = supertest(config.url);
let idList;

describe('Post list', () => {
    test('Создание списка', async () => {
        const res = await trelloController.postList()
        expect(res.statusCode).not.toEqual(404);
        idList = res.body.id;
    }),

    test('Get list', async () => {
        const res = await trello
            .get('/1/lists')
            .send({...config.creds , id: idList});
            console.log(idList);
        console.log(res);
        console.log(res.statusCode);
        expect(res.statusCode).not.toEqual(404);
    })

    // test('Cтатус с кодом ошибки если токен неверный', async () => {
    //     const res = await supertest(config.url)
    //         .get('/1/members/me/boards')
    //         .set('Accept', 'application/json')
    //         .send({key: '25c3743b55c428cbc7684ebb469d9c12', token: 'demo3'})

    //     expect(res.status).toEqual(401);
    // }),

    // test('Проверка досок у юзера', async () => {
    //     const res = await trelloController.getBoards(config.creds)

    //     expect(res.body.length).not.toEqual(0);
    // }),

    // test('В объекте возвращается доска с названием FOR OTUS', async () => {
    //     const res = await trelloController.getBoards(config.creds)

    //     expect(res.body[0].name).toEqual('FOR OTUS');
    // })

    // test('В объекте не возвращаются несуществующие урлы', async() => {
    //     const res = await trelloController.getBoards(config.creds)

    //     expect(res.body[0].url).not.toEqual('https://trello.com/b/xZcfugabuga/for-otus');
    // })
});
