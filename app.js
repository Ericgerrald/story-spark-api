// extra security
const helmet = require("helmet");
const cors = require("cors");
const xxs = require("xss-clean");
// const rateLimiter = require("express-rate-limit");

const express = require("express");
const app = express();
const books = require("./router/books");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xxs());
// app.use(rateLimiter());

// routs
app.use("/api/v1/books", books);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`App is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
