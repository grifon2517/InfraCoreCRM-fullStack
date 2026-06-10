const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Директория для хранения медиафайлов
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Конфигурация дискового пространства
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ИСПРАВЛЕНО: Безопасный абсолютный путь к папке uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// Фильтрация входящих расширений файлов
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(
      new Error("Допустимы только изображения форматов jpeg, jpg, png, webp!"),
    );
  }
};

// Экспорт инициализированного middleware с ограничением размера до 5 МБ
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
