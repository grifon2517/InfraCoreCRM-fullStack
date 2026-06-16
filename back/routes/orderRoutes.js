const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createOrder, getMyOrders } = require("../controllers/orderController");

router.use(authMiddleware);

router.post("/", createOrder);
router.get("/my", getMyOrders);

module.exports = router;
