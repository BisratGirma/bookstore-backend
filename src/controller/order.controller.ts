import { Request, Response } from "express";

import {
  addBookInService,
  deleteBookInService,
  getOrders,
} from "../service/order.service";
import { getPaginatedOrders } from "../repository/order.repository";

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

    if (isNaN(bookID)) {
      return res.status(401).json({ message: "not valid book id" });
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

    const orderRuslt = await getPaginatedOrders(userID);

    console.log(orderRuslt);

    res.status(200).json({ message: "success", order: orderRuslt });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}

export async function cancelOrder(req: Request, res: Response) {
  try {
    const bookID = Number(req.params.bookID);
    const userID = req.user?.id!;

    if (isNaN(bookID)) {
      return res.status(401).json({ message: "not valid book id" });
    }

    const cancelOrder = await deleteBookInService({ bookID, userID });

    console.log("canceled order: ", cancelOrder);

    res.status(200).json({ message: "order canceled" });
    return;
  } catch (error: any) {
    res.status(error.status ?? 400).json(errorResponse(error));
  }
}
