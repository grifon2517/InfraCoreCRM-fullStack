const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const usersRoutes = require("./routes/usersRoutes");

const errorMiddleware = require("./middleware/errorMiddleware");
const ApiError = require("./utils/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("InfraCoreCRM API работает стабильно.");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  next(ApiError.notFound("Запрашиваемый эндпоинт API не существует"));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Успешное подключение к базе данных MongoDB.");

    app.listen(PORT, () => {
      console.log(`Сервер InfraCoreCRM успешно запущен на порту ${PORT}`);
    });
  } catch (err) {
    console.error("Критическая ошибка при запуске бэкенда:", err);
    process.exit(1);
  }
};

startServer();
