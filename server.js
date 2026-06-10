const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

// Импорт компонентов маршрутизации
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/usersRoutes");

// Импорт центрального обработчика ошибок и утилиты
const errorMiddleware = require("./middleware/errorMiddleware");
const ApiError = require("./utils/api-error");

const app = express();

// 1. Глобальные базовые middleware
app.use(cors());
app.use(express.json());

// 2. Раздача статических медиа-файлов (изображения оборудования)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 3. Тестовый корневой роут проверки жизнеспособности API (Health Check)
app.get("/", (req, res) => {
  res.send("InfraCoreCRM API работает стабильно.");
});

// 4. Подключение бизнес-маршрутов приложения
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);

// 5. Перехват несуществующих роутов API (Генерация 404 ошибки)
app.use((req, res, next) => {
  next(ApiError.notFound("Запрашиваемый эндпоинт API не существует"));
});

// 6. ЖЕЛЕЗНОЕ ПРАВИЛО EXPRESS: Центральный обработчик ошибок всегда идет ПОСЛЕДНИМ
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

// Инициализация жизненного цикла приложения (База -> Сервер)
const startServer = async () => {
  try {
    // Сервер ждет успешного подключения к СУБД, и только потом идет дальше
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Успешное подключение к базе данных MongoDB.");

    app.listen(PORT, () => {
      console.log(`Сервер InfraCoreCRM успешно запущен на порту ${PORT}`);
    });
  } catch (err) {
    console.error("Критическая ошибка при запуске бэкенда:", err);
    process.exit(1); // Экстренное завершение процесса при падении инфраструктуры
  }
};

startServer();
