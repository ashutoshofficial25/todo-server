//Auch controllers
const User = require("../modals/userModal");
const jwt = require("jsonwebtoken");

const { comparePassword, hashPassword } = require("../utils/auth");

// API for user Registation
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password is required & should be min 6 character long");
    }

    let userExist = await User.findOne({ email }).exec();
    if (userExist)
      return res.status(400).send("User already exists from this email");

    //hash Password
    const hashedPassWord = await hashPassword(password);

    //register
    const user = await User.create({
      name,
      email,
      password: hashedPassWord,
    });
    // console.log("user saved ", user);
    return res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send("Error Please Try again");
  }
};

exports.login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No user foud with this Email");
    const match = await comparePassword(password, user.password);
    //create jwt

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send user p
    user.password = undefined;
    //send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure :true //only workd in prod
    });

    //send user as json response
    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error!, Try again");
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "Signout Success" });
  } catch (error) {
    console.log(error);
  }
};

exports.currnetUser = async (req, res) => {
  try {
    const user = await User.findById(req.body._id).select("-password").exec();
    // console.log("currnet user", user);
    return res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
};
