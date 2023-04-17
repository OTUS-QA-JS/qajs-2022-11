import config from "../config.js";
import supertest from "supertest";
import * as trelloController from "../helper/boardsContr.js"



describe('API boards', () => {
    test('Метод должен существовать', async () => {
        const res = await trelloController.getBoards(config.creds)

        expect(res.statusCode).not.toEqual(404);
    }),

    test('Метод должен существовать', async () => {
        const res = await trelloController.getBoards(config.creds)

        expect(res.statusCode).not.toEqual(404);
    }),

    test('Cтатус с кодом ошибки если токен неверный', async () => {
        const res = await supertest(config.url)
            .get('/1/members/me/boards')
            .set('Accept', 'application/json')
            .send({key: '25c3743b55c428cbc7684ebb469d9c12', token: 'demo3'})

        expect(res.status).toEqual(401);
    }),

    test('Проверка досок у юзера', async () => {
        const res = await trelloController.getBoards(config.creds)

        expect(res.body.length).not.toEqual(0);
    }),

    test('В объекте возвращается доска с названием FOR OTUS', async () => {
        const res = await trelloController.getBoards(config.creds)

        expect(res.body[0].name).toEqual('FOR OTUS');
    })

    test('В объекте не возвращаются несуществующие урлы', async() => {
        const res = await trelloController.getBoards(config.creds)

        expect(res.body[0].url).not.toEqual('https://trello.com/b/xZcfugabuga/for-otus');
    })
});
