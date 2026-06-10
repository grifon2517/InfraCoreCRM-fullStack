const ApiError = require("../utils/api-error");

module.exports = (req, res, next) => {
  // Безопасная проверка: предотвращаем падение, если authMiddleware не отработал ранее
  if (!req.user || req.user.role !== "admin") {
    return next(
      ApiError.forbidden("Доступ запрещен: требуются права администратора"),
    );
  }
  next();
};
