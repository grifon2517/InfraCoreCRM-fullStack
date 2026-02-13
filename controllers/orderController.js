exports.createOrder = async (req, res) => {
  try {
    const { productId, type, comment } = req.body;

    // Проверка авторизации
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Валидация productId
    if (!productId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    // Валидация типа
    const allowedTypes = ["repair", "diagnostic"];
    if (!allowedTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid order type" });
    }

    const order = new Order({
      userId: req.user.userId,
      productId,
      type,
      comment: comment || "",
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
    const orders = await Order.find({ userId: req.user.userId })
      .populate("productId", "title description")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
