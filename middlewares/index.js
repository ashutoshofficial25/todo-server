const { expressjwt: jwt } = require("express-jwt");

exports.requireSignIn = jwt({
  getToken: (req, res) => req.cookies.token,
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
