import {
  getBook,
  createBook,
  deleteBook,
  getPaginatedDocuments,
  updateBook,
} from "../repository/book.repository";

// Get a single book by id
export async function getSingleBook(id: string) {
  if (!id) throw new Error("id is required");

  if (isNaN(Number(id))) throw new Error("id must be a number");

  if (Number(id) < 0) throw new Error("id must be a positive number");

  if (Number(id) > 999999) throw new Error("id must be less than 1000000");

  try {
    const book = await getBook(Number(id));
    return book;
  } catch (err) {
    throw err;
  }
}

// Get multiple books with pagination
export async function getBooks(
  page: string,
  limit: string,
  search: string,
  minPrice: string,
  maxPrice: string
) {
  if (!page) throw new Error("page is required");

  if (!limit) throw new Error("limit is required");

  if (isNaN(Number(page))) throw new Error("page must be a number");

  if (isNaN(Number(limit))) throw new Error("limit must be a number");

  if (Number(page) < 1) throw new Error("page must be a positive number");

  if (Number(limit) < 1) throw new Error("limit must be a positive number");

  // Validate the search and filter parameters
  if (search && typeof search !== "string")
    throw new Error("search must be a string");

  if (minPrice && isNaN(Number(minPrice)))
    throw new Error("minPrice must be a number");

  if (maxPrice && isNaN(Number(maxPrice)))
    throw new Error("maxPrice must be a number");

  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice))
    throw new Error("minPrice must be less than or equal to maxPrice");

  try {
    const books = await getPaginatedDocuments(
      Number(page),
      Number(limit),
      search,
      Number(minPrice),
      Number(maxPrice)
    );
    return books;
  } catch (err) {
    console.log("err: ", err);
    throw new Error("Internal server error");
  }
}

// Create a book
export async function createBookInService(data: any): Promise<any> {
  if (!data) throw new Error("data is required");

  if (!data.title) throw new Error("title is required");

  if (!data.writer) throw new Error("writer is required");

  if (!data.coverImage) throw new Error("coverImage is required");

  if (!data.point) throw new Error("point is required");

  if (!data.tag) throw new Error("tag is required");

  if (isNaN(Number(data.point))) throw new Error("point must be a number");

  if (Number(data.point) < 0)
    throw new Error("point must be a positive number");

  try {
    const book = await createBook(data);
    return book;
  } catch (err) {
    throw err;
  }
}

// Update a book by id
export async function updateBookInService(id: string, data: any): Promise<any> {
  if (!id) throw new Error("id is required");

  if (!data) throw new Error("data is required");

  if (isNaN(Number(id))) throw new Error("id must be a number");

  if (Number(id) < 0) throw new Error("id must be a positive number");

  if (Number(id) > 999999) throw new Error("id must be less than 1000000");

  try {
    const book = await updateBook(Number(id), data);
    return book;
  } catch (err) {
    throw err;
  }
}

// Delete a book by id
export async function deleteBookInService(id: string) {
  if (!id) throw new Error("id is required");

  if (isNaN(Number(id))) throw new Error("id must be a number");

  if (Number(id) < 0) throw new Error("id must be a positive number");

  if (Number(id) > 999999) throw new Error("id must be less than 1000000");

  try {
    const book = await deleteBook(Number(id));
    return book;
  } catch (err) {
    throw err;
  }
}
