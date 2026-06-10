const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Публичные роуты каталога (доступны клиентам и гостям платформы)
router.get("/", getProducts);
router.get("/:id", getProductById);

// Административная часть управления оборудованием ЦОД
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProduct,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct,
);
router.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

module.exports = router;
