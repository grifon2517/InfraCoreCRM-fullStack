class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;

    // 🌟 ИНДУСТРИАЛЬНЫЙ СТАНДАРТ: Изолируем конструктор из стека вызовов.
    // Теперь логи сервера будут указывать на точную строку контроллера, где был вызван метод.
    Error.captureStackTrace(this, this.constructor);
  }

  // 400 Ошибка валидации или некорректных данных запроса
  static badRequest(message) {
    return new ApiError(400, message);
  }

  // 401 Отсутствие или невалидность JWT токена
  static unauthorized(message = "Доступ запрещен: требуется авторизация") {
    return new ApiError(401, message);
  }

  // 403 Недостаточно прав (например, обычный юзер лезет в админку)
  static forbidden(message = "Доступ ограничен: недостаточно прав") {
    return new ApiError(403, message);
  }

  // 404 Запрашиваемый документ или роут не найден в системе
  static notFound(message = "Запрашиваемый ресурс не найден") {
    return new ApiError(404, message);
  }

  // 500 Непредвиденный критический сбой базы данных или рантайма
  static internal(message = "Внутренняя ошибка сервера") {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
