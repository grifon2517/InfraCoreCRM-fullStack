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
      throw ApiError.badRequest("Login and password are required");
    }

    // длина логина
    if (login.length < 3 || login.length > 20) {
      throw ApiError.badRequest("Login must be 3-20 characters");
    }

    // только латиница + цифры + _
    if (!LOGIN_REGEX.test(login)) {
      throw ApiError.badRequest(
        "Login can contain only latin letters, numbers and underscore",
      );
    }

    // длина пароля
    if (password.length < 6) {
      throw ApiError.badRequest("Password must be at least 6 characters");
    }

    // существует ли пользователь
    const existingUser = await User.findOne({ login });
    if (existingUser) {
      throw ApiError.badRequest("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // ВАЖНО: роль никогда не берём из req.body
    const user = new User({
      login,
      password: hashedPassword,
      role: "user",
    });

    await user.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      throw ApiError.badRequest("Login and password are required");
    }

    const user = await User.findOne({ login });
    if (!user) {
      throw ApiError.badRequest("Invalid login or password");
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
      message: "Login successful",
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
