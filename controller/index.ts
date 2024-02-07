import { Router } from "express";
import booksController from "./books.controller";

const router = Router();

router.get("/", booksController.respondToGetSingleBook);

export default router;
