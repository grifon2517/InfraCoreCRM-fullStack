const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getProducts } = require("../controllers/orderController");

router.get("/", authMiddleware, roleMiddleware(["client"]), getProducts);

module.exports = router;
