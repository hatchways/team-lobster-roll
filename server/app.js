const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const User = require("./models/User");

const indexRouter = require("./routes/index");
const pingRouter = require("./routes/ping");
const listRouter = require("./routes/list");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");
const uploadRouter = require("./routes/upload");
const boardRouter = require("./routes/board");

const { json, urlencoded } = express;

var app = express();

// database setup
require("./db")();

app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ping", pingRouter);
app.use("/upload", uploadRouter);
app.use("/api/board", boardRouter);
app.use("/list", listRouter);
app.use("/login", loginRouter);
app.use("/signup", signupRouter);
app.use("/user", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
