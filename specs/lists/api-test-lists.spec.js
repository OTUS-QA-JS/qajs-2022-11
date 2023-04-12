import config from "../config.js";
import supertest from "supertest";
import * as trelloController from "../helper/listsContr.js"

describe('API lists', () => {
    test('Создание списка', async () => {
        const res = await trelloController.postList()
        expect(res.statusCode).not.toEqual(404);
        trelloController.setId(res.body.id);
    }),

    test('Получение инфы об списке', async () => {
        const res = await trelloController.getList()
        expect(res.statusCode).not.toEqual(404);
        expect(res.body.closed).toEqual(false);
    }),

    test('Апдейт списка', async () => {
        let idList = trelloController.getId();
        const res = await supertest(config.url)
            .put(`/1/lists/${idList}`)
            .send({...config.creds});
        expect(res.statusCode).toEqual(200);
    }),

    test('Архив списка', async () => {
        let idList = trelloController.getId();
        const res = await supertest(config.url)
        .put(`/1/lists/${idList}/closed`)
        .send({value: true, ...config.creds})
        expect(res.statusCode).toEqual(200);
    }),

    test('Проверка списка в архиве', async () => {
        const res = await trelloController.getList()
        expect(res.statusCode).toEqual(200);
        expect(res.body.closed).toEqual(true);
    })
});
