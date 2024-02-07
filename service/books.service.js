"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBook = void 0;
var book_repository_1 = require("../repository/book.repository");
function getSingleBook(id) {
    if (!id)
        throw new Error("id is required");
    if (isNaN(Number(id)))
        throw new Error("id must be a number");
    if (Number(id) < 0)
        throw new Error("id must be a positive number");
    if (Number(id) > 999999)
        throw new Error("id must be less than 1000000");
    return (0, book_repository_1.getBook)(Number(id))
        .then(function (book) {
        return book;
    })
        .catch(function (err) {
        throw err;
    });
}
exports.getSingleBook = getSingleBook;
