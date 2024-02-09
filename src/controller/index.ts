import { Router } from "express";
import booksController from "./books.controller";

const router = Router();

// Get multiple books with pagination
router.get("/api/books/paginate", booksController.respondToGetBooks);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get item with ID {id}
 *     description: Returns the item with ID {number} if it exists, otherwise returns a 400 error.
 *     tags: [Items]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Item"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalError"
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the item
 *           example: 4
 *         title:
 *           type: string
 *           description: Title of the item
 *           example: "The New Order"
 *         writer:
 *           type: string
 *           description: Writer of the item
 *           example: "John Hopkins"
 *         coverimage:
 *           type: string
 *           description: URL of the cover image
 *           example: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
 *         point:
 *           type: integer
 *           description: Points associated with the item
 *           example: 500
 *         tag:
 *           type: string
 *           description: Tags associated with the item in JSON format
 *           example: "{\"history\",\"biography\"}"
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates whether there is an error
 *           example: true
 *         message:
 *           type: string
 *           description: Description of the error
 *           example: "no item found"
 *         data:
 *           type: object
 *           description: Additional data related to the error
 *           nullable: true
 *         status:
 *           type: integer
 *           description: HTTP status code
 *           example: 400
 *     InternalError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the internal server error
 *           example: "Internal server Error"
 */
router.get("/api/books/:id", booksController.respondToGetSingleBook);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new item
 *     description: Creates a new item with the provided details.
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ItemCreate"
 *     responses:
 *       '201':
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "item created!"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalError"
 * components:
 *   schemas:
 *     ItemCreate:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the item
 *           example: "Silicon Valley"
 *         writer:
 *           type: string
 *           description: Writer of the item
 *           example: "Peter Theil"
 *         coverImage:
 *           type: string
 *           description: URL of the cover image
 *           example: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
 *         point:
 *           type: integer
 *           description: Points associated with the item
 *           example: 500
 *         tag:
 *           type: array
 *           description: Tags associated with the item
 *           items:
 *             type: string
 *             enum: ["Business", "biography"]
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates whether there is an error
 *           example: true
 *         message:
 *           type: string
 *           description: Description of the error
 *           example: "title is required"
 *         data:
 *           type: object
 *           description: Additional data related to the error
 *           nullable: true
 *         status:
 *           type: integer
 *           description: HTTP status code
 *           example: 400
 *     InternalError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the internal server error
 *           example: "Internal server Error"
 */
router.post("/api/books", booksController.respondToCreateBook);

/**
 * @swagger
 * /3:
 *   put:
 *     summary: Update item with ID 3
 *     description: Updates the item with ID 3 with the provided details.
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ItemUpdate"
 *     responses:
 *       '200':
 *         description: Item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "item updated successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalError"
 * components:
 *   schemas:
 *     ItemUpdate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the item
 *           example: "The Lean Startup"
 *         writer:
 *           type: string
 *           description: Writer of the item
 *           example: "Eric Ries"
 *         coverImage:
 *           type: string
 *           description: URL of the cover image
 *           example: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
 *         point:
 *           type: integer
 *           description: Points associated with the item
 *           example: 200
 *         tag:
 *           type: string
 *           description: Tags associated with the item in JSON format
 *           example: ""
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates whether there is an error
 *           example: true
 *         message:
 *           type: string
 *           description: Description of the error
 *           example: "invalid input syntax for type integer: \"some thing\""
 *         data:
 *           type: object
 *           description: Additional data related to the error
 *           nullable: true
 *         status:
 *           type: integer
 *           description: HTTP status code
 *           example: 400
 *     InternalError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the internal server error
 *           example: "Internal server Error"
 */
router.put("/api/books/:id", booksController.respondToUpdateBook);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete item by ID
 *     description: Deletes the item with the specified ID.
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the item to delete.
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       '200':
 *         description: Item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "item deleted successfully"
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/InternalError"
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         error:
 *           type: boolean
 *           description: Indicates whether there is an error
 *           example: true
 *         message:
 *           type: string
 *           description: Description of the error
 *           example: "item not found"
 *         data:
 *           type: object
 *           description: Additional data related to the error
 *           nullable: true
 *         status:
 *           type: integer
 *           description: HTTP status code
 *           example: 400
 *     InternalError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the internal server error
 *           example: "Internal server Error"
 */
router.delete("/api/books/:id", booksController.respondToDeleteBook);

export default router;
