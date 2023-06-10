const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;
  console.log(pseudo, email, password);

  if (
    pseudo == "" ||
    email == "" ||
    password == "" ||
    pseudo == null ||
    email == null ||
    password == null
  ) {
    res.status(400).json({ error: "Il manque des données" });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        pseudo,
        email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "User crée" }))
        .catch((err) =>
          res.status(400).json({ error: "Problème d'enregistrement" + err })
        );
    })
    .catch((err) =>
      res.status(400).json({ error: "Impossible a enregistrer" + err })
    );
};

exports.logIn = (req, res) => {};
