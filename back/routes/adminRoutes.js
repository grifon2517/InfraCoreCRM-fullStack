const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/adminOrdersController");

router.use(authMiddleware, adminMiddleware);

router.get("/orders", getAllOrders);
router.patch("/orders/:id", updateOrderStatus);
router.delete("/orders/:id", deleteOrder);

module.exports = router;
