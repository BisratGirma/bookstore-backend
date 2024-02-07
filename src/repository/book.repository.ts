import pool from "./db";
import Book from "../entity/books.model";

// create book
export async function createBook(book: Book) {
  await executeQuery(
    "INSERT INTO books(title, writer, coverImage, point, tag) VALUES($1, $2, $3, $4, $5)",
    [book.title, book.writer, book.coverImage, book.point, book.tag]
  );
}

// get book by id
export async function getBook(id: number) {
  const result = await executeQuery("SELECT * FROM books WHERE id=$1", [id]);

  const book = result.rows[0];

  return book;
}

// Delete a book by id
export async function deleteBook(id: number) {
  await executeQuery("DELETE FROM books WHERE id=$1", [id]);
}

// Update a book by id
export async function updateBook(id: number, book: Book) {
  await executeQuery(
    "UPDATE books SET title=$1, writer=$2, coverImage=$3, point=$4, tag=$5 WHERE id=$6",
    [book.title, book.writer, book.coverImage, book.point, book.tag, id]
  );
}

// Helper function to execute a query and release the connection
async function executeQuery(query: any, params: any) {
  const client = await pool.connect();

  try {
    return await client.query(query, params);
  } finally {
    client.release();
  }
}

// get paginated documnets from db
export async function getPaginatedDocuments(
  page = 1,
  itemsPerPage = 10,
  search = "",
  minPrice = 0,
  maxPrice = Infinity
) {
  const offset = (page - 1) * itemsPerPage;

  const client = await pool.connect();

  try {
    // Build the query and parameters based on the search and filter criteria
    let query = "SELECT * FROM documents";
    let countQuery = "SELECT COUNT(*) FROM documents";
    let params = [];
    let whereClause = "";

    if (search) {
      whereClause += " WHERE (title ILIKE $1 OR writer ILIKE $1)";
      params.push(`%${search}%`);
    }

    if (minPrice > 0) {
      // Use >= operator to filter by minimum price
      whereClause += whereClause
        ? " AND (price >= $2)"
        : " WHERE (price >= $1)";
      params.push(minPrice);
    }

    if (maxPrice < Infinity) {
      // Use <= operator to filter by maximum price
      whereClause += whereClause
        ? " AND (price <= $3)"
        : " WHERE (price <= $1)";
      params.push(maxPrice);
    }

    // Append the where clause and the limit and offset clauses to the query
    query += whereClause + " LIMIT $4 OFFSET $5";
    countQuery += whereClause;
    params.push(itemsPerPage, offset);

    const [countResult, documentsResult] = await Promise.all([
      client.query(countQuery, params),
      client.query(query, params),
    ]);

    const totalCount = parseInt(countResult.rows[0].count);

    const documents = documentsResult.rows;

    const totalPages = Math.ceil(totalCount / itemsPerPage);

    return {
      documents,
      page,
      itemsPerPage,
      totalCount,
      totalPages,
    };
  } catch (err: any) {
    throw err.message;
  } finally {
    client.release();
  }
}
