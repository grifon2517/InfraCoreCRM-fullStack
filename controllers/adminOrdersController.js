const mongoose = require("mongoose");
const Order = require("../models/Order");
const ApiError = require("../utils/api-error");

// Получить ВСЕ заявки (для админа)
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("productId")
      .populate("userId", "login")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

// Изменить статус заявки
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // проверка id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Invalid order id"));
    }

    // допустимые статусы
    const allowedStatuses = ["new", "in_progress", "done", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return next(ApiError.badRequest("Invalid status value"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return next(ApiError.notFound("Order not found"));
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Статус обновлен",
      order,
    });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

// Удалить заявку
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Invalid order id"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return next(ApiError.notFound("Order not found"));
    }

    await order.deleteOne();

    res.json({ message: "Заявка удалена" });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
