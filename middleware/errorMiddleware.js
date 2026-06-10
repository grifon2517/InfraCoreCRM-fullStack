const ApiError = require("../utils/api-error");
const multer = require("multer");

module.exports = (err, req, res, next) => {
  console.error("Глобальный перехват ошибки:", err);

  // Обработка кастомных ошибок нашего приложения
  if (err instanceof ApiError) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  // ОБРАБОТКА ОШИБОК MULTER: Если файл слишком большой или не того формата
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message:
          "Ошибка загрузки: Максимальный размер файла не должен превышать 5 МБ",
      });
    }
    return res
      .status(400)
      .json({ message: `Ошибка загрузки файлов: ${err.message}` });
  }

  // Если прилетела кастомная ошибка от фильтра файлов multer
  if (err.message && err.message.includes("Только изображения")) {
    return res.status(400).json({ message: err.message });
  }

  // Перехват непредвиденных системных сбоев
  return res.status(500).json({
    message: "Внутренняя ошибка сервера. Пожалуйста, повторите попытку позже.",
  });
};
