const User = require("../models/User");
const ApiError = require("../utils/api-error");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    res.json(users);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.userId === id) {
      return next(ApiError.badRequest("You cannot delete yourself"));
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(ApiError.badRequest("User not found"));
    }

    res.json({ message: "User deleted" });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};
