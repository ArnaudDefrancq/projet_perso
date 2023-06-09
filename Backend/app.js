const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();

connectDB();

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

module.exports = app;
