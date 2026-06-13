const ApiError = require("../utils/api-error");

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(
      ApiError.forbidden("Доступ запрещен: требуются права администратора"),
    );
  }
  next();
};
