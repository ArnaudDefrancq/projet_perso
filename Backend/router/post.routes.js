const express = require("express");
const router = express.Router();

const ctrlPost = require("../controllers/post.ctrl");
const authUser = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/create-post", authUser, ctrlPost.createPost);
router.get("/read-post", ctrlPost.readAllPost);
router.put("/update-post/:id", authUser, ctrlPost.updateOnePost);
router.delete("/delete-post", authUser, ctrlPost.deleteOnePost);

module.exports = router;
