import { isEmail, isNumber } from "class-validator";
import { Request, Response } from "express";

import {
  addBookInService,
  deleteBookInService,
  getOrders,
} from "../service/order.service";

const errorResponse = (error: any) => {
  return {
    error: true,
    message: error.message,
    data: null,
    status: error.status ?? 400,
  };
};

export async function order(req: Request, res: Response) {
  try {
    const bookID = Number(req.params.bookID);
    const userID = req.user?.id!;

    console.log(bookID, userID);

    if (isNaN(bookID)) {
      return res.status(401).json({ message: "book id or user id" });
    }

    const orderRuslt = await addBookInService({ bookID, userID });

    res.status(200).json({ message: "order created", order: orderRuslt });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

export async function myOrders(req: Request, res: Response) {
  try {
    const userID = req.user?.id!;
    const page = Number(req.query.page) | 1;
    const limit = Number(req.query.limit) | 10;

    const orderRuslt = await getOrders(userID, page, limit);

    console.log(orderRuslt);

    res.status(200).json({ message: "success", order: orderRuslt });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

export async function cancelOrder(req: Request, res: Response) {
  try {
    const { bookID, userID } = req.body;

    if (!(typeof bookID === "number") || !(typeof userID !== "number")) {
      return res.status(401).json({ message: "book id or user id" });
    }

    const cancelOrder = await deleteBookInService({ bookID, userID });

    res.status(200).json({ message: "order canceled" });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}
