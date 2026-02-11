const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("./models/User"); // путь к твоей модели User

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

async function seed() {
  try {
    // Удаляем всех пользователей (по желанию)
    await User.deleteMany({});

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash("123123", 10);

    // Создаем admin
    await User.create({
      login: "admin",
      password: hashedPassword,
      role: "admin",
    });

    // Создаем обычного пользователя
    await User.create({
      login: "user",
      password: hashedPassword,
      role: "user",
    });

    console.log("Seed завершён!");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

seed();
