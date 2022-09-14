const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

//CSRF
const csrf = require("csurf");
const fs = require("fs");

const csrfProtection = csrf({ cookie: true });

//expres app
const app = express();

//db connection

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Error : ", err));

//apply middlare
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

//route

fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);
//csrf protection
// app.use(csrfProtection);
// app.get("/api/csrf-token", (req, res) => {
//   res.json({ csrfToken: req.csrfToken });
// });

//port
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
