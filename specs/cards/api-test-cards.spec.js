import config from "../config.js";
import supertest from "supertest";

let idCard;
describe('API cards', () => {
    test('Создание карточки', async () => {
        const res = await supertest(config.url)
        .post('/1/cards')
        .set('Accept', 'application/json')
        .send({idList: '642c84505fabca7f4010611a', ...config.creds, name: 'Card for test'})

        expect(res.statusCode).not.toEqual(404);
        expect(res.body.name).toEqual('Card for test');
        idCard = res.body.id
    }),

    test('Создание описания', async () => {
        const res = await supertest(config.url)
            .put(`/1/cards/${idCard}`)
            .set('Accept', 'application/json')
            .send({idList: '642c84505fabca7f4010611a', ...config.creds, desc: 'New desc for card'})

        expect(res.status).toEqual(200);
        expect(res.body.badges.description).toEqual(true);
    }),

    test('Создание комментария', async() => {
        const res = await supertest(config.url)
        .post(`/1/cards/${idCard}/actions/comments`)
        .set('Accept', 'application/json')
        .send({text: 'Step 1 for SP', ...config.creds})
   
        expect(res.status).toEqual(200);
    }),

    test('Удаление карточки', async () => {
        const res = await supertest(config.url)
        .delete(`/1/cards/${idCard}`)
        .set('Accept', 'application/json')
        .send({...config.creds})
   
        expect(res.status).toEqual(200);
    }),

    test('Апдейт карточки', async () => {
        const res = await supertest(config.url)
            .put(`/1/cards/${idCard}`)
            .set('Accept', 'application/json')
            .send({idList: '642c84505fabca7f4010611a', ...config.creds, desc: 'New desc for card'})

        expect(res.status).toEqual(404);
    })

});
