const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ApiError = require("../utils/api-error");

const LOGIN_REGEX = /^[a-zA-Z0-9_]+$/;

// Регистрация нового аккаунта
const register = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      throw ApiError.badRequest("Логин и пароль обязательны для заполнения");
    }

    if (login.length < 3 || login.length > 20) {
      throw ApiError.badRequest("Логин должен содержать от 3 до 20 символов");
    }

    if (!LOGIN_REGEX.test(login)) {
      throw ApiError.badRequest(
        "Логин может содержать только латинские буквы, цифры и нижнее подчеркивание",
      );
    }

    if (password.length < 6) {
      throw ApiError.badRequest("Пароль должен быть не менее 6 символов");
    }

    const existingUser = await User.findOne({ login });
    if (existingUser) {
      throw ApiError.badRequest("Пользователь с таким логином уже существует");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Безопасность: Роль принудительно выставляется сервером, игнорируя req.body
    const user = new User({
      login,
      password: hashedPassword,
      role: "user",
    });

    await user.save();
    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (err) {
    next(err);
  }
};

// Вход в систему (Аутентификация)
const login = async (req, res, next) => {
  try {
    const { login, password } = req.body;

    if (!login || !password) {
      throw ApiError.badRequest("Введите логин и пароль");
    }

    const user = await User.findOne({ login });
    // БЕЗОПАСНОСТЬ: Одинаковая ошибка для скрытия существования логина в бд
    if (!user) {
      throw ApiError.badRequest("Неверный логин или пароль");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw ApiError.badRequest("Неверный логин или пароль");
    }

    // Генерация JWT токена
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

module.exports = {
  register,
  login,
};
