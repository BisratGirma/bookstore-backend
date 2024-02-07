import { Router } from "express";
import booksController from "./books.controller";

const router = Router();

// Get a single book by id
router.get("/:id", booksController.respondToGetSingleBook);

// Get multiple books with pagination
router.get("/", booksController.respondToGetBooks);

// Create a book
router.post("/", booksController.respondToCreateBook);

// Update a book by id
router.put("/:id", booksController.respondToUpdateBook);

// Delete a book by id
router.delete("/:id", booksController.respondToDeleteBook);

export default router;
