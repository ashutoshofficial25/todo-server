const express = require("express");
const router = express.Router();
const multer = require("multer");

//controller import
const authController = require("../controllers/authController");
const { requireSignIn } = require("../middlewares");

const uploads = require("../controllers/uploads");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/current-user", requireSignIn, authController.currnetUser);

//upload avtar

// SET STORAGE
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "avtar");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

let upload = multer({ storage: storage });

router.post("/uploadAvrar", upload.single("file"), uploads.uploadAvtar);

module.exports = router;
