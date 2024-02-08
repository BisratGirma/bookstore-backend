import pool from "./db";
import Book from "../entity/books.model";

// create book
export async function createBook(book: Book) {
  await executeQuery(`CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    writer VARCHAR(255) NOT NULL,
    coverImage VARCHAR(255),
    point INTEGER,
    tag VARCHAR(255)
  )`);

  const result = await executeQuery(
    `INSERT INTO books(title, writer, coverImage, point, tag) VALUES($1, $2, $3, $4, $5);`,
    [book.title, book.writer, book.coverImage, book.point, book.tag]
  );

  if (result.rowCount && result.rowCount >= 1)
    return { message: "item created!" };
  else {
    throw new Error("item not created");
  }
}

// get book by id
export async function getBook(id: number) {
  const result = await executeQuery("SELECT * FROM books WHERE id=$1", [id]);

  const book = result.rows[0];

  if (book) return book;
  else {
    throw new Error("no item found");
  }
}

// Delete a book by id
export async function deleteBook(id: number) {
  const result = await executeQuery("DELETE FROM books WHERE id=$1", [id]);

  if (result.rowCount && result.rowCount >= 1)
    return { message: "item deleted successfully" };
  else {
    throw new Error("item not found");
  }
}

// Update a book by id
export async function updateBook(id: number, book: Book) {
  const result = await executeQuery(
    "UPDATE books SET title=$1, writer=$2, coverImage=$3, point=$4, tag=$5 WHERE id=$6",
    [book.title, book.writer, book.coverImage, book.point, book.tag, id]
  );

  if (result.rowCount && result.rowCount >= 1)
    return { message: "item updated successfully" };
  else {
    throw new Error("item not found");
  }
}

// Helper function to execute a query and release the connection
async function executeQuery(query: any, params?: any) {
  const client = await pool.connect();

  try {
    return await client.query(query, params);
  } finally {
    client.release();
  }
}

// get paginate book
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
    let query = "SELECT * FROM books";
    let countQuery = "SELECT COUNT(*) FROM books";
    let queryNth = 0;
    let countQueryNth = 0;
    let queryParams = [];
    let countParams = [];
    let whereClause = "";
    let whereClauseCount = "";

    if (search) {
      whereClauseCount += ` WHERE (title ILIKE $${++countQueryNth} OR writer ILIKE $${++countQueryNth})`;
      whereClause += ` WHERE (title ILIKE $${++queryNth} OR writer ILIKE $${++queryNth})`;
      queryParams.push(`%${search}%`);
      countParams.push(`%${search}%`);
    }

    if (minPrice > 0) {
      // Use >= operator to filter by minimum price
      whereClauseCount += whereClauseCount
        ? ` AND (point >= $${++countQueryNth})`
        : ` WHERE (point >= $${++countQueryNth})`;
      whereClause += whereClause
        ? ` AND (point >= $${++queryNth})`
        : ` WHERE (point >= $${++queryNth})`;
      queryParams.push(minPrice);
      countParams.push(minPrice);
    }

    if (maxPrice < Infinity) {
      // Use <= operator to filter by maximum price
      whereClauseCount += whereClauseCount
        ? ` AND (point <= $${++countQueryNth})`
        : ` WHERE (point <= $${++countQueryNth})`;
      whereClause += whereClause
        ? ` AND (point <= $${++queryNth})`
        : ` WHERE (point <= $${++queryNth})`;
      queryParams.push(maxPrice);
      countParams.push(maxPrice);
    }

    // Append the where clauses and the limit and offset clauses to the query
    countQuery += whereClauseCount;
    query += whereClause + ` LIMIT $${++queryNth} OFFSET $${++queryNth}`;
    queryParams.push(itemsPerPage, offset);

    const [countResult, documentsResult] = await Promise.all([
      client.query(countQuery, countParams),
      client.query(query, queryParams),
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
    console.log(err.message);
    throw err.message;
  } finally {
    client.release();
  }
}
