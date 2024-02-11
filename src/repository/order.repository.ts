import pool from "../repository/db";
import Order from "../entity/orders.model";

export async function createOrder(order: Omit<Order, "id">): Promise<Order> {
  await pool.query(`CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    bookID INT NOT NULL,
    userID INT NOT NULL,
    FOREIGN KEY (bookID) REFERENCES books (id),
    FOREIGN KEY (userID) REFERENCES users (id)
  )
  `);
  // Hash password before saving

  const { rows } = await pool.query(
    "INSERT INTO orders (bookID, userID) VALUES ($1, $2) RETURNING *",
    [order.bookID, order.userID]
  );

  return rows[0];
}

export async function deleteOrder(order: Omit<Order, "id">): Promise<any> {
  const result = await pool.query(
    "DELETE FROM orders WHERE bookID = $1 AND userID = $2",
    [order.bookID, order.userID]
  );

  if (result.rowCount && result.rowCount >= 1)
    return { message: "item deleted successfully" };
  else {
    throw new Error("item not found");
  }
}

export async function getPaginatedOrders(
  userID: number,
  page = 1,
  itemsPerPage = 10
) {
  const offset = (page - 1) * itemsPerPage;

  const client = await pool.connect();

  try {
    // Build the query and parameters based on the search and filter criteria
    let query = "SELECT * FROM orders WHERE userid = $1 LIMIT $2 OFFSET $3";
    let countQuery =
      "SELECT COUNT(*) FROM orders WHERE userid = $1 LIMIT $2 OFFSET $3";

    // Append the where clauses and the limit and offset clauses to the query

    const queryParams = [userID, itemsPerPage, offset];

    const [countResult, documentsResult] = await Promise.all([
      client.query(countQuery, queryParams),
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

export default { createOrder, deleteOrder, getPaginatedOrders };
