const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const ApiError = require("../utils/api-error");

exports.createOrder = async (req, res, next) => {
  try {
    const { productId, contactEmail, type, comment } = req.body;

    // проверка авторизации
    if (!req.user || !req.user.userId) {
      return next(ApiError.unauthorized("Unauthorized"));
    }

    // проверка productId
    if (!productId) {
      return next(ApiError.badRequest("ProductId is required"));
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return next(ApiError.badRequest("Invalid productId"));
    }

    // проверка существования продукта
    const product = await Product.findById(productId);
    if (!product) {
      return next(ApiError.badRequest("Product not found"));
    }

    // проверка типа заявки
    const allowedTypes = ["Purchase", "Rent"];
    if (!allowedTypes.includes(type)) {
      return next(ApiError.badRequest("Invalid order type"));
    }

    if (!contactEmail) {
      return next(ApiError.badRequest("Email is required"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      return next(ApiError.badRequest("Invalid email"));
    }

    const order = new Order({
      userId: req.user.userId,
      productId,
      type,
      contactEmail,
      comment: comment || "",
    });

    await order.save();

    res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    next(ApiError.internal(e.message));
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return next(ApiError.unauthorized("Unauthorized"));
    }

    const orders = await Order.find({ userId: req.user.userId })
      .populate("productId", "title description")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};
