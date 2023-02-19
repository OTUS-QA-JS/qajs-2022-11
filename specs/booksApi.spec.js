import bookstore from "./framework/services/bookstore";
import account from "./framework/services/user";
import createBooksCollection from "./framework/utils/helpers";
import { createUser } from "./framework/utils/generators";
import { books } from "./framework/resources/data/books";
import { matchers } from "jest-json-schema";
import { Severity } from "jest-allure/dist/Reporter";

expect.extend(matchers);

// можно так же использовать: 
// import Ajv from 'ajv'
// import addFormats from "ajv-formats"
// const ajv = new Ajv()
// addFormats(ajv)

let userData;
const booksCollection = createBooksCollection(books.books)

beforeAll(async () => {
    const user = createUser().getData();
    userData = await account.createUserWithToken(user);
});

afterAll(async () => {
    await account.deleteUser(userData.uuid, userData.token);
});

beforeEach(async () => {
    reporter.epic('Book Store');
});

describe("POST /bookStore/v1/books", () => {
    beforeEach(async () => {
        reporter
            .feature("Create new user's booklist")
            .severity(Severity.Critical);
    });

    it(" Creates books list(201)", async () => {
        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[0]])

        expect(res.status).toEqual(201);
        await bookstore.deleteBooksList(userData.uuid, userData.token);
    });

    it(" Doesn't create list if Unauthorized(401)", async () => {
        const res = await bookstore.addListOfBooks(userData.uuid, "", [booksCollection[0]]);

        expect(res.status).toEqual(401);
        // expect(res.body).toMatchSnapshot(); quick check, better use scheme
    });

    it(" Doesn't create list if list empty(400)", async () => {
        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, []);

        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ code: '1207', message: 'Collection of books required.' });
    });

    it(" Doesn't create list if ISBN is already in the list(400)", async () => {
        await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[0]]);
        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[0]]);

        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1210',
            message: "ISBN already present in the User's Collection!"
        });
    });

    it(" Doesn't create list if ISBN not exists(400)", async () => {
        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, ["isbn"]);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1205',
            message: 'ISBN supplied is not available in Books Collection!'
        });
    });
})

describe("PUT /bookStore/v1/books/{ISBN}", () => {
    beforeEach(async () => {
        reporter
            .feature("Update book in the booklist")
            .severity(Severity.Normal);
    });

    it(" Updates book (200)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: booksCollection[0].isbn
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[1]]);
        const res = await bookstore.updateBook(payload, userData.token, booksCollection[1].isbn);
        expect(res.status).toEqual(200);
        expect(res.body.books.find((book) => book.isbn === booksCollection[1].isbn)).toBeUndefined()
        expect(res.body.books.find((book) => book.isbn === booksCollection[0].isbn)).toBeTruthy();

        await bookstore.deleteBooksList(userData.uuid, userData.token);
    });

    it(" Doesn't update book if old == new ISBN (400)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: booksCollection[1].isbn
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[1]]);
        const res = await bookstore.updateBook(payload, userData.token, booksCollection[1].isbn);

        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: "1206",
            message: "ISBN supplied is not available in User's Collection!"
        });
    });

    it(" Doesn't update book if User not authorized (401)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: booksCollection[1].isbn
        };

        const res = await bookstore.updateBook(payload, '', booksCollection[1].isbn);

        expect(res.status).toEqual(401);
    });

    it(" Doesn't update book if ISBN not exists (400)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: "isbn"
        };

        const res = await bookstore.updateBook(payload, userData.token, booksCollection[1].isbn);

        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1205',
            message: 'ISBN supplied is not available in Books Collection!'
        });
    });
})

describe("DELETE /bookStore/v1/book", () => {

    beforeEach(async () => {
        reporter
            .feature("Delete book from user's booklist")
            .severity(Severity.Normal);
    });

    it(" Deletes book (200)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: booksCollection[1].isbn
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[1]]);
        const res = await bookstore.deleteBook(payload, userData.token);

        expect(res.status).toEqual(204);
        expect(res.body).toEqual({});
    });

    it(" Doesn't delete book if it is not in the list (400)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: booksCollection[0].isbn
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, [booksCollection[1]]);
        const res = await bookstore.deleteBook(payload, userData.token);

        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1206',
            message: "ISBN supplied is not available in User's Collection!"
        });
    });

    it("Doesn't delete book if User not authorized (401)", async () => {
        const payload =
        {
            userId: userData.uuid,
            isbn: booksCollection[1].isbn
        };

        const res = await bookstore.deleteBook(payload, "");
        expect(res.status).toEqual(401);
    });
})

describe("GET /bookStore/v1/book", () => {

    beforeEach(async () => {
        reporter
            .feature("Get book's information")
            .severity(Severity.Normal);
    });

    //декларативный подход с использованием схемы
    // все ключи обязательны
    // нет лишних ключей
    // все значения нужного типа данных
    //https://ajv.js.org/guide/formats.html
    //check joi?

    const schema = {
        type: "object",
        required: ["isbn", "title", "author", "publish_date", "publisher", "pages", "description", "website"],
        additionalProperties: false,
        properties: {
            isbn: { type: "string" },
            title: { type: "string" },
            subTitle: { type: "string" },
            author: { type: "string" },
            publish_date: { type: "string", format: "date-time" },
            publisher: { type: "string" },
            pages: { type: "number" },
            description: { type: "string" },
            website: { type: "string", format: "uri" }
        }
    }

    it.each(books.books)(`Gets book ($isbn) info (200)`, async ({ isbn, title, author }) => {
        const res = await bookstore.getBookInfo(isbn);

        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(title);
        expect(res.body.author).toEqual(author);

        expect(res.body).toMatchSchema(schema)
    });

    it("Doesn't get books info if ISBN not exists (400)", async () => {
        const res = await bookstore.getBookInfo("isbn");
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1205',
            message: 'ISBN supplied is not available in Books Collection!'
        });
    });
})
