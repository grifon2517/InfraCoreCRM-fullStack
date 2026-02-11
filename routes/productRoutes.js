const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
} = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getProducts);
router.get("/:id", authMiddleware, getProductById);

module.exports = router;
