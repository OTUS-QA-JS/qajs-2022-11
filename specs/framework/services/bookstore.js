import supertest from "supertest";
import config from '../config';
const { baseUrl } = config;

const bookstore = {

    addBook: (payload, token) => {
        return supertest(baseUrl)
            .post('/bookstore/v1/books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },

    async addListOfBooks(uuid, token, booksCollection) {
        const payload = {
            userId: uuid,
            collectionOfIsbns: booksCollection
        }
        return await this.addBook(payload, token);
    },

    getBookInfo: (payload) => {
        return supertest(baseUrl)
            .get('/bookstore/v1/book')
            .set('Accept', 'application/json')
            .query({ ISBN: payload })
    },

    updateBook: (payload, token, bookToChange) => {
        return supertest(baseUrl)
            .put(`/bookstore/v1/books/${bookToChange}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },

    deleteBook: (payload, token) => {
        return supertest(baseUrl)
            .del(`/bookstore/v1/book`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
    },

    deleteBooksList: (uuid, token) => {
        return supertest(baseUrl)
            .del(`/bookstore/v1/books`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .query({ UserId: uuid })
    },

}

export default bookstore
