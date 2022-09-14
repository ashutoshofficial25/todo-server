const User = require("../modals/userModal");

exports.getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    res.status("404").json({ message: "error", data: error });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  if (!email) return res.status(400).json({ message: "Invalid email" });
  const checkEmail = await User.findOne({ email: email });

  const foundUser = await User.findById(userId);

  if (checkEmail && foundUser.email != email)
    return res.status(400).json({ message: "Email already exist" });

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name: name,
      email: email,
    },
    {
      new: true,
    }
  );
  return res.status(201).json({ message: "Updated successfully", data: user });
};
