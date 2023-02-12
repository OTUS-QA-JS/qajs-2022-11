import supertest from "supertest";
import config from "./config";

const {url} = config;

// Контроллер book
const book = {
    // Добавление новой книги
    add: (payload, authToken) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload)
    },

    // Получение списка книг
    booksCollection: () => {
        return supertest(url)
            .get('/BookStore/v1/Books')
            .set('Accept', 'application/json')
            .send()
    },

    bookUpdate: (payload, old_isbn, authToken) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${old_isbn}`)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload)
    },

    // Получении информации о книге
    getBookInfo: (isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            // .set('Authorization', `Bearer ${authToken}`)
            .send()
    },

    // Удаление книги
    deleteBook: (payload, authToken) => {
        return supertest(url)
            .del('/BookStore/v1/Book')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${authToken}`)
            .send(payload)
    }
}

export default book;