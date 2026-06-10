const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User"); // ИСПРАВЛЕНО: правильный выход из папки config

async function seedUsers() {
  try {
    // ИСПРАВЛЕНО: Безопасное последовательное подключение к БД
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB подключена для импорта пользователей...");

    // Очищаем старых пользователей перед заполнением
    await User.deleteMany({});

    // Хешируем демонстрационный пароль
    const hashedPassword = await bcrypt.hash("123123", 10);

    // Создаем учетную запись администратора InfraCoreCRM
    await User.create({
      login: "admin",
      password: hashedPassword,
      role: "admin",
    });

    // Создаем учетную запись базового пользователя
    await User.create({
      login: "user",
      password: hashedPassword,
      role: "user",
    });

    console.log("База данных успешно наполнена дефолтными аккаунтами!");
    process.exit(0);
  } catch (err) {
    console.error("Ошибка сидирования пользователей:", err);
    process.exit(1);
  }
}

seedUsers();
