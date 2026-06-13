const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getUsers, deleteUser } = require("../controllers/userController");

router.use(authMiddleware, adminMiddleware);

router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;
