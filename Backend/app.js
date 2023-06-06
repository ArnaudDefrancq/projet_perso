const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Hello from the express server",
  });
});

module.exports = app;
