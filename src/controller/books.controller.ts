import { getSingleBook } from "../service/books.service";

import { Request, Response, NextFunction } from "express";

export async function respondToGetSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
