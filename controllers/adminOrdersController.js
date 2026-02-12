const Order = require("../models/Order");

// Получить ВСЕ заявки (для админа)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("productId")
      .populate("userId", "login"); // только логин пользователя

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Ошибка получения заявок" });
  }
};

// Изменить статус заявки
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    res.json({ message: "Статус обновлен", order });
  } catch (err) {
    res.status(500).json({ message: "Ошибка обновления статуса" });
  }
};

// Удалить заявку
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await Order.findByIdAndDelete(id);

    res.json({ message: "Заявка удалена" });
  } catch (err) {
    res.status(500).json({ message: "Ошибка удаления заявки" });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
};
