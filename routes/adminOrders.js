const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/adminOrdersController");

// позже сюда вставим middleware admin
router.get("/", getAllOrders);

router.patch("/:id", updateOrderStatus);

router.delete("/:id", deleteOrder);

module.exports = router;
