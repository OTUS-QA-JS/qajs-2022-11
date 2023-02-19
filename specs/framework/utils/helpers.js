function createBooksCollection(books) {
    return books.map(function (book) {
        return { isbn: book.isbn };
    });
};

export default createBooksCollection