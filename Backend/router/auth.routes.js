const express = require("express");
const router = express.Router();

const ctrlUser = require("../controllers/user.ctrl");

router.post("/signup", ctrlUser.signUp);
router.post("/login", ctrlUser.logIn);

module.exports = router;
