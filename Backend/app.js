const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const path = require("path");

const routesAuth = require("./router/auth.routes");
const routesPost = require("./router/post.routes");

connectDB();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

app.use("/api/auth", routesAuth);
app.use("/api/post", routesPost);

app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
