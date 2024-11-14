// require dotenv to access environmental variables.
require("dotenv").config();

// require dbconn for mongodb connection.
require("./db/dbconn");

// require express to make express app.
const express = require("express");

// app contains all express stuff.
const app = express();

// getting port and host from .env file by using dotenv.
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

// require router file for route related stuff.
const router = require("./router/router.js");

// require cookieParser to collect cookies.
const cookieParser = require("cookie-parser");

// require fileupload to collect uploaded files.
const fileupload = require("express-fileupload");

// using middleware for parsing cookie, file, urlencoded, json data and to use public folder for static files. router to handle api request.
app.use(cookieParser());
app.use(fileupload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public/"));
app.use(router);

// listening all binded connection on port and host.
app.listen(port, host, () => {
  // log this to console when connected successfully
  console.log(`The server is successfully running on http://${host}:${port}/`);
});
