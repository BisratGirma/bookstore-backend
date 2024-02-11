import { Router } from "express";
import booksController from "./books.controller";
import { login, register } from "./authentication.controller";
import { order, cancelOrder, myOrders } from "./order.controller";

const router = Router();

/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Register a new user
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: 'email'
 *                 description: User's email address
 *                 example: 'john.doe@example.com'
 *               password:
 *                 type: string
 *                 description: User's password
 *                 minLength: 6
 *                 example: 'strong_password'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User registered successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '409':
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post("/api/user/", register);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Register a new user
 *     tags: ['Auth']
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: 'email'
 *                 description: User's email address
 *                 example: 'john.doe@example.com'
 *               password:
 *                 type: string
 *                 description: User's password
 *                 minLength: 6
 *                 example: 'strong_password'
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "User registered successfully"
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '409':
 *         description: Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post("/api/user/login", login);

/**
 * @swagger
 * /api/books/paginate:
 *   get:
 *     summary: Search and paginate books
 *     description: Search for books with optional filters and pagination parameters.
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: minPrice
 *         description: Minimum price (optional)
 *         type: number
 *         format: float
 *       - in: query
 *         name: maxPrice
 *         description: Maximum price (optional)
 *         type: number
 *         format: float
 *       - in: query
 *         name: search
 *         description: Search term (optional)
 *         type: string
 *       - in: query
 *         name: page
 *         description: Page number (optional, default: 1)
 *         type: integer
 *         default: 1
 *       - in: query
 *         name: itemsPerPage
 *         description: Number of items per page (optional, default: 10)
 *         type: integer
 *         default: 10
 *     responses:
 *       '200':
 *         description: Successful search results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 documents:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 itemsPerPage:
 *                   type: integer
 *                   description: Number of items per page
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of results
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InternalError'
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the book
 *           example: 4
 *         title:
 *           type: string
 *           description: Title of the book
 *           example: "The New Order"
 *         writer:
 *           type: string
 *           description: Writer of the book
 *           example: "John Hopkins"
 *         coverimage:
 *           type: string
 *           description: URL of the cover image
 *           example: "https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg"
 *         point:
 *           type: integer
 *           description: Points associated with the book (optional)
 *           example: 500
 *         tag:
 *           type: string
 *           description: Tags associated with the book in JSON format (optional)
 *           example: "{\"history\",\"biography\"}"
 *     InternalError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Description of the internal server error
 *           example: "Internal server Error"
 */
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

// Order API's

/**
 * @swagger
 * /api/order/{orderId}:
 *   post:
 *     summary: Create a new order
 *     tags: ['Orders']
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         type: integer
 *         description: Unique identifier for the book to be ordered
 *         example: 10
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Replace with actual order properties (e.g., user_id, quantity)
 *             required:
 *               - # Your required properties here
 *     responses:
 *       '200':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: "Order created"
 *                 order:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Order ID
 *                       example: 7
 *                     bookid:
 *                       type: integer
 *                       description: Book ID
 *                       example: 10
 *                     userid:
 *                       type: integer
 *                       description: User ID
 *                       example: 3
 *       '400':
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */
router.post("/api/order/:bookID", order);

/**
 * @swagger
 * /api/order/paginate:
 *   get:
 *     summary: Get a paginated list of orders
 *     tags: [Order]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The bearer token for authentication
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *         description: The page number to fetch
 *       - in: query
 *         name: itemsPerPage
 *         schema:
 *           type: integer
 *         default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A successful response with the order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order created
 *                 order:
 *                   type: object
 *                   properties:
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 3
 *                           bookid:
 *                             type: integer
 *                             example: 7
 *                           userid:
 *                             type: integer
 *                             example: 3
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     itemsPerPage:
 *                       type: integer
 *                       example: 10
 *                     totalCount:
 *                       type: integer
 *                       example: 5
 *                     totalPages:
 *                       type: integer
 *                       example: 1
 *       500:
 *         description: An internal server error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: internal server error
 */
router.get("/api/order/paginate", myOrders);

/**
 * @swagger
 * /api/order/{id}:
 *   delete:
 *     summary: Cancel an order by id
 *     tags: [Order]
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: The bearer token for authentication
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the order to cancel
 *     responses:
 *       200:
 *         description: A successful response with the order cancellation message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order canceled
 *       404:
 *         description: An error occurred if the order id is not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: order not found
 */
router.delete("/api/order/:bookID", cancelOrder);

export default router;
