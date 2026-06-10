const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ApiError = require("../utils/api-error");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(
        ApiError.unauthorized("Доступ запрещен: отсутствует токен авторизации"),
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      return next(
        ApiError.unauthorized("Некорректный формат токена авторизации"),
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(ApiError.unauthorized("Токен авторизации не найден"));
    }

    // Верификация JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Проверка существования пользователя в базе данных
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(
        ApiError.unauthorized(
          "Пользователь, связанный с этим токеном, не найден",
        ),
      );
    }

    // Записываем в объект запроса только проверенные данные
    req.user = {
      userId: user._id,
      role: user.role,
    };

    next();
  } catch (err) {
    console.error("Ошибка аутентификации:", err);
    return next(
      ApiError.unauthorized("Предоставлен невалидный или просроченный токен"),
    );
  }
};

module.exports = authMiddleware;
