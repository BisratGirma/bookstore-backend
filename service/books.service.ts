import { getBook } from "../repository/book.repository";

export function getSingleBook(id: string) {
  if (!id) throw new Error("id is required");

  if (isNaN(Number(id))) throw new Error("id must be a number");

  if (Number(id) < 0) throw new Error("id must be a positive number");

  if (Number(id) > 999999) throw new Error("id must be less than 1000000");

  return getBook(Number(id))
    .then((book) => {
      return book;
    })
    .catch((err) => {
      throw err;
    });
}
