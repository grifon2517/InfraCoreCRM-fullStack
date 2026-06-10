const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { register, login, getMe } = require("../controllers/authController"); // Объединили импорты в одну деструктуризацию

router.post("/register", register);
router.post("/login", login);

// Чистый эндпоинт без нарушения паттерна MVC
router.get("/me", authMiddleware, getMe);

module.exports = router;
