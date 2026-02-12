const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
  try {
    const { productId, type, comment } = req.body;

    const order = new Order({
      userId: req.user.userId,
      productId,
      type,
      comment,
    });

    await order.save();

    res.status(201).json({
      message: "Order created",
      order,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId }).populate(
      "productId",
      "title description",
    );

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
