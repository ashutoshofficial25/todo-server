const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { requireSignIn } = require("../middlewares");

router.get("/getUserById/:userId", userController.getUser);
router.patch("/updateUser/:userId", requireSignIn, userController.updateUser);

module.exports = router;
