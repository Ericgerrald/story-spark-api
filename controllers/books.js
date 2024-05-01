const asyncWrapper = require("../middleware/async");
const Book = require("../models/Book");

const { createCustomError } = require("../errors/custom-error");

const getAllBooks = asyncWrapper(async (req, res) => {
  const { title, sort, fields } = req.query;
  const queryObject = {};

  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  let result = Book.find(queryObject);
  if (sort) {
    result = result.sort("createdAt");
  }
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }
  const books = await result;
  res.status(200).json({ books, nbHits: books.length });
});

const createBook = asyncWrapper(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json({ book });
});

const getSingleBook = asyncWrapper(async (req, res, next) => {
  const { id: bookID } = req.params;
  const book = await Book.findOne({ _id: bookID });

  if (!book) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ book });
});

module.exports = {
  getAllBooks,
  createBook,
  getSingleBook,
};
