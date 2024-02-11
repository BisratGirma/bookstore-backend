import {
  createOrder,
  deleteOrder,
  getPaginatedOrders,
} from "../repository/order.repository";

export async function addBookInService({
  userID,
  bookID,
}: {
  userID: number;
  bookID: number;
}) {
  if (isNaN(Number(userID)) || isNaN(Number(bookID)))
    throw new Error("id must be a number");

  try {
    const order = await createOrder({ userID, bookID });
    return order;
  } catch (err) {
    throw err;
  }
}

export async function deleteBookInService({
  userID,
  bookID,
}: {
  userID: number;
  bookID: number;
}) {
  if (isNaN(Number(userID)) || isNaN(Number(bookID)))
    throw new Error("id must be a number");

  try {
    const book = await deleteOrder({ userID, bookID });
    return book;
  } catch (err) {
    throw err;
  }
}

export async function getOrders(userID: number, page: number, limit: number) {
  try {
    const orders = await getPaginatedOrders(
      userID,
      Number(page),
      Number(limit)
    );
    return orders;
  } catch (err) {
    console.log("err: ", err);
    throw new Error("Internal server error");
  }
}
