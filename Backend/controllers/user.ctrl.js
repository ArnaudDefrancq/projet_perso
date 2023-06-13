const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res) => {
  const { pseudo, email, password } = req.body;

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

exports.logIn = (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "" || email == null || password == null) {
    res.status(400).json({ error: "Il manque des données" });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(500).json({ error: "Aucun user trouvé" });
      }

      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "mauvais mot de passe" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              {
                userId: user._id,
              },
              process.env.TOKEN,
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
};
