const express = require("express");
const {
  getAllBooks,
  createBook,
  getSingleBook,
} = require("../controllers/books");
const router = express.Router();

router.route("/").get(getAllBooks).post(createBook);
router.route("/:id").get(getSingleBook);

module.exports = router;
