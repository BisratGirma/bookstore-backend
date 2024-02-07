import { getSingleBook } from "../service/books.service";

export async function respondToGetSingleBook(req, res, next) {
  try {
    const book = await getSingleBook(req.params.id);
    console.log("book: ", book);
    res.send(book);
    return;
    return;
  } catch (error) {
    next(error);
  }
}

export default {
  respondToGetSingleBook,
};
