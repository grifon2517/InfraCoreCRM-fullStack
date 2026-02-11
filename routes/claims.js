const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getClaims } = require("../controllers/orderController");

router.get("/", authMiddleware, roleMiddleware(["client"]), getClaims);

module.exports = router;
