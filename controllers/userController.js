const User = require("../models/User");
const ApiError = require("../utils/api-error");

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.userId === id) {
      return next(
        ApiError.badRequest("Вы не можете удалить свой собственный аккаунт"),
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return next(ApiError.notFound("Пользователь не найден"));
    }

    if (user.role === "admin") {
      return next(
        ApiError.badRequest("Невозможно удалить аккаунт администратора"),
      );
    }

    await user.deleteOne();
    res.json({ message: "Пользователь успешно удален из системы" });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

module.exports = {
  getUsers,
  deleteUser,
};
