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

// ==========================================
// Публичные роуты (доступны покупателям и гостям)
// ==========================================
router.get("/", getProducts);
router.get("/:id", getProductById);

// ==========================================
// Админские роуты (только для админа)
// ==========================================
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

// const express = require("express");
// const router = express.Router();
// const {
//   getProducts,
//   getProductById,
// } = require("../controllers/productController");
// const authMiddleware = require("../middleware/authMiddleware");

// router.get("/", authMiddleware, getProducts);
// router.get("/:id", authMiddleware, getProductById);

// module.exports = router;
