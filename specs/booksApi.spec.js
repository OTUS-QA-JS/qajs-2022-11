import bookstore from "./framework/services/bookstore";
import account from "./framework/services/user";
import config from "./framework/config";
import createBooksCollection from "./framework/fixtures/helpers";

describe("bookstore books API tests", () => {
    const { booksCredentials } = config;
    let userData;
    const ISBNs = ["9781593277574", "9781449337711", "a781449325862", ""];
    const books = [{ isbn: ISBNs[0], name: "Understanding ECMAScript 6" },
    { isbn: ISBNs[1], name: "Designing Evolvable Web APIs with ASP.NET" }];

    beforeAll(async () => {
        userData = await account.createUserWithToken(booksCredentials);
    });

    afterAll(async () => {
        await account.deleteUser(userData.uuid, userData.token);
    });

    it("POST /bookStore/v1/books - Create books list(201)", async () => {
        const booksCollection = createBooksCollection([ISBNs[0]])

        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        expect(res.status).toEqual(201);
        expect(res.body).toEqual({ books: booksCollection });

        await bookstore.deleteBooksList(userData.uuid, userData.token);
    });

    it("POST /bookStore/v1/books - Create books list, Unauthorized(401)", async () => {
        const booksCollection = createBooksCollection([ISBNs[0]])

        const res = await bookstore.addListOfBooks(userData.uuid, "", booksCollection);
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
            code: "1200",
            message: "User not authorized!"
        });
    });

    it("POST /bookStore/v1/books - Create books list, Empty list(400)", async () => {
        const booksCollection = [];
        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({ code: '1207', message: 'Collection of books required.' });
    });

    it("POST /bookStore/v1/books - Create books list, ISBN is already in the list(400)", async () => {
        const booksCollection = createBooksCollection([ISBNs[0]])

        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1210',
            message: "ISBN already present in the User's Collection!"
        });
    });

    it("POST /bookStore/v1/books - Create books list, ISBN not exists(400)", async () => {
        const booksCollection = createBooksCollection([ISBNs[2]])

        const res = await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1205',
            message: 'ISBN supplied is not available in Books Collection!'
        });
    });

    it("PUT /bookStore/v1/books/{ISBN} - Update book (200)", async () => {
        const booksCollection = createBooksCollection([ISBNs[1]])
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[0]
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.updateBook(payload, userData.token, ISBNs[1]);
        expect(res.status).toEqual(200);
        expect(res.body.books.find((book) => book.isbn === ISBNs[1])).toBeUndefined()
        expect(res.body.books.find((book) => book.isbn === ISBNs[0])).toBeTruthy();

        await bookstore.deleteBooksList(userData.uuid, userData.token);
    });

    it("PUT /bookStore/v1/books/{ISBN} - Can't update book (400)", async () => {
        const booksCollection = createBooksCollection([ISBNs[1]])
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[1]
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.updateBook(payload, userData.token, ISBNs[1]);
        console.log(res.status, res.body);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: "1206",
            message: "ISBN supplied is not available in User's Collection!"
        });
    });

    it("PUT /bookStore/v1/books/{ISBN} - User not authorized (401)", async () => {
        const booksCollection = createBooksCollection([ISBNs[1]])
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[1]
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.updateBook(payload, '', ISBNs[1]);
        console.log(res.status, res.body);
        expect(res.status).toEqual(401);
    });

    it("PUT /bookStore/v1/books/{ISBN} - ISBN not exists (400)", async () => {
        const booksCollection = createBooksCollection([ISBNs[1]])
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[2]
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.updateBook(payload, userData.token, ISBNs[1]);
        console.log(res.status, res.body);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1205',
            message: 'ISBN supplied is not available in Books Collection!'
        });
    });

    it("DELETE /bookStore/v1/book - Delete book (200)", async () => {
        const booksCollection = [
            {
                isbn: ISBNs[1]
            },
        ];
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[1]
        };
        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.deleteBook(payload, userData.token);
        expect(res.status).toEqual(204);
        expect(res.body).toEqual({});
    });

    it("DELETE /bookStore/v1/book - Book is not in the list (400)", async () => {
        const booksCollection = [
            {
                isbn: ISBNs[1]
            },
        ];
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[0]
        };
        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.deleteBook(payload, userData.token);
        // console.log(res);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1206',
            message: "ISBN supplied is not available in User's Collection!"
        });
    });

    it("DELETE /bookStore/v1/book - User not authorized (401)", async () => {
        const booksCollection = createBooksCollection([ISBNs[1]])
        const payload =
        {
            userId: userData.uuid,
            isbn: ISBNs[1]
        };

        await bookstore.addListOfBooks(userData.uuid, userData.token, booksCollection);
        const res = await bookstore.deleteBook(payload, "");
        expect(res.status).toEqual(401);
    });

    it.each(books)(`GET /bookStore/v1/book - Get book ($isbn) info (200)`, async ({ isbn, name }) => {
        const res = await bookstore.getBookInfo(isbn);
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual(name);
    });

    it("GET /bookStore/v1/book - ISBN not exists (400)", async () => {
        const res = await bookstore.getBookInfo(ISBNs[3]);
        expect(res.status).toEqual(400);
        expect(res.body).toEqual({
            code: '1205',
            message: 'ISBN supplied is not available in Books Collection!'
        });
    });
});