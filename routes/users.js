const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getUsers } = require("../controllers/orderController");

router.get("/", authMiddleware, roleMiddleware(["admin"]), getUsers);

module.exports = router;
