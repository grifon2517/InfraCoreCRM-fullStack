const mongoose = require("mongoose");
const Order = require("../models/Order");
const ApiError = require("../utils/api-error");

// Получить все заявки в системе (сортировка по новизне)
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

// Изменить статус текущей заявки
const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Неверный формат ID заявки"));
    }

    const allowedStatuses = ["new", "in_progress", "done", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return next(ApiError.badRequest("Передан некорректный статус заявки"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return next(ApiError.notFound("Заявка не найдена"));
    }

    order.status = status;
    await order.save();

    res.json({
      message: "Статус успешно обновлен",
      order,
    });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

// Удалить заявку из системы
const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Неверный формат ID заявки"));
    }

    const order = await Order.findById(id);
    if (!order) {
      return next(ApiError.notFound("Заявка не найдена"));
    }

    await order.deleteOne();
    res.json({ message: "Заявка успешно удалена" });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
