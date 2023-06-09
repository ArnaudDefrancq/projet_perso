const User = require("../models/Users");

exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;
  console.log(pseudo, email, password);
};

exports.logIn = (req, res) => {};
