import {test} from "@jest/globals";
import config from "../framework/config";
import user from "../framework/user";
import book from "../framework/book";
import expect from "expect";

let uuid = 'b6801de2-2798-4dab-a3ef-97deb9e5904a';
let token = '';
let isbn;
let new_isbn;


describe('Авторизация', () => {
    // Чтобы авторизоваться, сначала надо создать юзера:
    test('POST – /Account/v1/User – Создание нового пользователя.', async () => {
        const resAdd = await user.add(config.credentials);
        expect(resAdd.status).toEqual(201);
        // Запоминаем UUID для дальнейшей работы
        uuid = resAdd.body.userID;
        console.log('Создан пользователь с UserID = ' + uuid);
    })

    // Авторизуемся:
    test('POST – /Account/v1/Authorized – Авторизация с существующими и верными логином и паролем.', async () => {
        const res = await user.login(config.credentials);
        expect(res.status).toEqual(200);
    })

    // Генерируем токен
    test('POST – /Account/v1/GenerateToken – Генерация токена.', async () => {
        const resGenerateToken = await user.generateToken(config.credentials);
        expect(resGenerateToken.status).toEqual(200);
        // Запоминаем полученный токен
        token = resGenerateToken.body.token;
        console.log('Полученный токен = ' + token);
    })
});

describe('Получаем список книг, чтобы взять ISBN.', () => {

    // Чтобы привязать к пользователю книгу, сначала получаем имеющиеся ISBN
    test('Get – /BookStore/v1/Books – Получение списка книг.', async () => {
        const resBooksCollection = await book.booksCollection();

        console.log('Результат resBooksCollection = ' + JSON.stringify(resBooksCollection.body));
        console.log('Статус ответа Получения списка книг: код ' + resBooksCollection.status);
        expect(resBooksCollection.status).toEqual(200);

        // Фиксирует ISBN первой книги. Её будем привязывать к юзеру
        isbn = resBooksCollection.body.books[0].isbn;
        console.log('isbn = ' + resBooksCollection.body.books[0].isbn);
        // Фиксирует ISBN второй книги. На него будем апдейтить первый ISBN юзера.
        new_isbn = resBooksCollection.body.books[1].isbn;
        console.log('new_isbn = ' + resBooksCollection.body.books[1].isbn);
    })

});


describe('Создание (привязка) книги к пользователю.', () => {

    test('POST – /BookStore/v1/Books – Создание книги.', async () => {
        const resAddBook = await book.add({
            "userId": uuid,
            "collectionOfIsbns": [
                {
                    "isbn": isbn
                }
            ]
        }, token);

        console.log('Статус ответа Создания книги: код ' + resAddBook.status + ', сообщение: ' + resAddBook.body.message);
        expect(resAddBook.status).toEqual(201);
    })

});


describe('Обновление книги', () => {

    test('PUT – /BookStore/v1/Books/{ISBN} – Обновление книги.', async () => {
        const resBookUpdate = await book.bookUpdate({
            "userId": uuid,
            "isbn": new_isbn
        }, isbn, token);

        console.log('Тело ответа Обновления книги: ' +  JSON.stringify(resBookUpdate.body));
        console.log('Статус ответа Обновления книги: код ' + resBookUpdate.status + ', сообщение: ' + resBookUpdate.body.message);
        expect(resBookUpdate.status).toEqual(200);
        expect(resBookUpdate.body.books[0].isbn).toEqual(new_isbn);
    })

});


describe('Получение информации о книге.', () => {

    test('GET – /BookStore/v1/Book?ISBN={ISBN} – Инфо о книге.', async () => {
        const resBookInfo = await book.getBookInfo(new_isbn);

        console.log('Тело ответа Получения инфо о книге: ' +  JSON.stringify(resBookInfo.body));
        console.log('Статус ответа Получения инфо о книге: код ' + resBookInfo.status);
        expect(resBookInfo.status).toEqual(200);
        expect(resBookInfo.body.title).toEqual('Learning JavaScript Design Patterns');
        expect(resBookInfo.body.pages).toEqual(254);
    })

});


describe('Удаление привязки книги к пользователю.', () => {

    test('DELETE – /BookStore/v1/Book – Удаление книги.', async () => {
        const resBookDelete = await book.deleteBook({
            "isbn": new_isbn,
            "userId": uuid
        }, token);

        console.log('Статус ответа Удаления книги: код ' + resBookDelete.status);
        expect(resBookDelete.status).toEqual(204);
    })

});