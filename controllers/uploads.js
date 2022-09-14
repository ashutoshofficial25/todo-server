const multer = require("multer");

//destination where multer will save files
const upload = multer({ dest: "avtar/" });

exports.uploadAvtar = (req, res) => {
  try {
    const { file } = req.body;
  } catch (error) {
    res.status(400).json({ message: "Please upload a file" });
  }
};
