require('dotenv').config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI;

var app = express();

require('./src/database/db')()

// mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(
//   () => { /** ready o use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
//   console.log(`Mongoose connected to ${dbURI}`);
// },

//   err => {console.error(err); }
// );


mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Gracefully close the Mongoose connection when the Node.js process is terminated
process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("Mongoose disconnected through app termination");
    process.exit(0);
  });
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


var usersRouter = require("./src/routes/users.routes");
var productRoutes = require("./src/routes/product.routes");
var fetchExternalData = require("./src/routes/fetchExternalData.routes");

app.use("/users", usersRouter);
app.use("/items", productRoutes);
app.use("/fetchExternalData", fetchExternalData);


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
  res.render("error");
});

module.exports = app;
