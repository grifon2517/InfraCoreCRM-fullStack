const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/adminOrdersController");

router.get("/orders", authMiddleware, adminMiddleware, getAllOrders);
router.patch("/orders/:id", authMiddleware, adminMiddleware, updateOrderStatus);
router.delete("/orders/:id", authMiddleware, adminMiddleware, deleteOrder);

module.exports = router;
