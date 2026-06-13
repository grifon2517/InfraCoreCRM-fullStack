class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }

  static unauthorized(message = "Доступ запрещен: требуется авторизация") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Доступ ограничен: недостаточно прав") {
    return new ApiError(403, message);
  }

  static notFound(message = "Запрашиваемый ресурс не найден") {
    return new ApiError(404, message);
  }

  static internal(message = "Внутренняя ошибка сервера") {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
