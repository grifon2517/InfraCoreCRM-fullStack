const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getOrders } = require("../controllers/orderController");

router.get("/", authMiddleware, roleMiddleware(["admin"]), getOrders);

module.exports = router;
