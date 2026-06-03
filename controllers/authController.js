const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

// regex
const LOGIN_REGEX = /^[a-zA-Z0-9_]+$/;

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    // обязательные поля
    if (!login || !password) {
      throw ApiError.badRequest("Логин и пароль обязательны для заполнения");
    }

    // длина логина
    if (login.length < 3 || login.length > 20) {
      throw ApiError.badRequest("Логин должен быть от 3 до 20 символов");
    }

    // только латиница + цифры + _
    if (!LOGIN_REGEX.test(login)) {
      throw ApiError.badRequest(
        "Логин может содержать только латинские буквы, цифры и нижнее подчеркивание",
      );
    }

    // длина пароля
    if (password.length < 6) {
      throw ApiError.badRequest("Пароль должен быть не менее 6 символов");
    }

    // существует ли пользователь
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      throw ApiError.badRequest("Пользователь с таким логином уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ВАЖНО: роль никогда не берём из req.body
    const user = new User({
      login,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    res.json({ message: "Пользователь успешно зарегистрирован" });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      throw ApiError.badRequest("Неверный логин");
    }

    const user = await User.findOne({ login });
    if (!user) {
      throw ApiError.badRequest("Неверный пароль");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.badRequest("Invalid login or password");
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Вход выполнен успешно",
      token,
      user: {
        id: user._id,
        login: user.login,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
