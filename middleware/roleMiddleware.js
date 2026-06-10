const ApiError = require("../utils/api-error");

const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Безопасный разбор ролей через опциональную цепочку
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          "Доступ запрещен: недостаточно прав для этого действия",
        ),
      );
    }
    next();
  };
};

module.exports = roleMiddleware;
