const BookModel = require("./models/Book");
//const createBook  = require("controllers");
const express = require("express");
const router = express.Router();
const createBook = require("./controller");
const authController = require("./authController");
router.post("/register", authController.register);
router.post("/login", authController.login);

const authenticateToken  = require("./middleware");

router.use(authenticateToken);
// Handle the POST request to create a book.
router.post("/create-book", createBook.createBook);
router.get("/:id", createBook.getBook);
router.get("/", createBook.getAllBooks);
router.put("/:id", createBook.editBook);
router.delete("/:id", createBook.deleteBook);




module.exports = router;
