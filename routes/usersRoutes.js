const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); // Стандартизировали middleware защиты роли
const { getUsers, deleteUser } = require("../controllers/userController");

// Управление учетными записями пользователей доступно строго администраторам
router.use(authMiddleware, adminMiddleware);

router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;
