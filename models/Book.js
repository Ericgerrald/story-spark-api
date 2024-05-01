const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const BooksSchema = new mongoose.Schema({
//   name: String,
//   completed: Boolean,
// });

// Define sub-schema for texts
const TextSchema = new Schema({
  text: {
    type: String,
    required: [true, "must provide text"],
  },
});

// Define sub-schema for questions
const QuestionSchema = new Schema({
  question: {
    type: String,
    required: [true, "must provide a question"],
  },
  choice1: {
    type: String,
    required: [true, "must provide answer choice1"],
  },
  choice2: {
    type: String,
    required: [true, "must provide answer choice2"],
  },
  choice3: {
    type: String,
    required: [true, "must provide answer choice3"],
  },
  choice4: {
    type: String,
    required: [true, "must provide answer choice4"],
  },
  answer: {
    type: Number,
    required: [true, "must provide answer number"],
  },
});

// Define main schema for books
const BooksSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  title: {
    type: String,
    required: [true, "must provide a title"],
  },
  image: {
    type: String,
    required: [true, "must provide an image"],
  },
  texts: [TextSchema], // Array of text objects
  questions: [QuestionSchema], // Array of question objects
});

module.exports = mongoose.model("Book", BooksSchema);
