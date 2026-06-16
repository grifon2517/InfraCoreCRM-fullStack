const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/Product");
const ApiError = require("../utils/api-error");

const createOrder = async (req, res, next) => {
  try {
    const { productId, contactEmail, type, comment } = req.body;

    if (!req.user || !req.user.userId) {
      return next(ApiError.unauthorized("Пользователь не авторизован"));
    }

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return next(
        ApiError.badRequest("Некорректный или отсутствующий ID товара"),
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return next(ApiError.notFound("Оборудование не найдено в каталоге"));
    }

    const allowedTypes = ["Purchase", "Rent"];
    if (!allowedTypes.includes(type)) {
      return next(ApiError.badRequest("Недопустимый тип услуги"));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!contactEmail || !emailRegex.test(contactEmail)) {
      return next(ApiError.badRequest("Укажите корректный контактный email"));
    }

    const order = new Order({
      userId: req.user.userId,
      productId,
      type,
      contactEmail,
      comment: comment || "",
    });

    await order.save();
    res.status(201).json({ message: "Заявка успешно создана", order });
  } catch (e) {
    next(ApiError.internal(e.message));
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    if (!req.user || !req.user.userId) {
      return next(ApiError.unauthorized("Пользователь не авторизован"));
    }

    const orders = await Order.find({ userId: req.user.userId })
      .populate("productId", "title description")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};
