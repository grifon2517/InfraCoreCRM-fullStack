const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../models/User");

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB подключена для импорта пользователей...");

    await User.deleteMany({});

    const hashedPassword = await bcrypt.hash("123123", 10);

    await User.create({
      login: "admin",
      password: hashedPassword,
      role: "admin",
    });

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
