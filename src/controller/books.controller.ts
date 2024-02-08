import {
  getSingleBook,
  createBookInService,
  deleteBookInService,
  getBooks,
  updateBookInService,
} from "../service/books.service";

import { Request, Response, NextFunction } from "express";

const errorResponse = (error: any) => {
  console.log("error: ", error);
  return {
    error: true,
    message: error.message,
    data: null,
    status: error.status ?? 400,
  };
};

export async function respondToGetSingleBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const book = await getSingleBook(req.params.id);

    res.status(200).json(book);
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

// Respond to get multiple books with pagination
export async function respondToGetBooks(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the query parameters from the request
    const page = req.query.page?.toLocaleString() || "1";
    const limit = req.query.limit?.toLocaleString() || "10";
    const search = req.query.search?.toLocaleString() || "";
    const minPrice = req.query.minPrice?.toLocaleString() || "0";
    const maxPrice = req.query.maxPrice?.toLocaleString() || "Infinity";

    // Call the service function with the query parameters
    const books = await getBooks(page, limit, search, minPrice, maxPrice);

    // Send the response with the books data
    res.status(200).json(books);
    return;
  } catch (error) {
    next(error);
  }
}

// Respond to create a book
export async function respondToCreateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.body;
    const book = await createBookInService(data);

    res.status(201).json(book);
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

// Respond to update a book by id
export async function respondToUpdateBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const data = req.body;
    const book = await updateBookInService(id, data);

    res.status(200).json(book);
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

// Respond to delete a book by id
export async function respondToDeleteBook(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const book = await deleteBookInService(id);

    res.status(200).json(book);
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

export default {
  respondToGetSingleBook,
  respondToGetBooks,
  respondToCreateBook,
  respondToUpdateBook,
  respondToDeleteBook,
};
