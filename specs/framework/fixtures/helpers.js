function createBooksCollection(books) {
    return books.map(function (value) {
        return { isbn: value };
    });
};

export default createBooksCollection