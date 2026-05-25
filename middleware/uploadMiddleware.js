const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Шаг А: Проверяем, есть ли папка uploads в корне бэкенда. Если нет — создаем.
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Шаг Б: Настраиваем хранилище
const storage = multer.diskStorage({
  // Указываем папку назначения
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Генерируем уникальное имя: текущее время + случайное число + оригинальное расширение
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

// Шаг В: Фильтр безопасности (пускаем только картинки)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); // Всё ок, пропускаем
  } else {
    cb(new Error("Только изображения (jpeg, jpg, png, webp)!")); // Блокируем
  }
};

// Собираем всё вместе с ограничением размера файла в 5 мегабайт
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
