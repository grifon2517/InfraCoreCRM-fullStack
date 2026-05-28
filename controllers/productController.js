const Product = require("../models/Product");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Создание нового товара (POST)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, features } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    // Создаем новый документ для Монго
    const newProduct = new Product({
      title,
      description,
      price,
      features,
      image: imageUrl,
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Ошибка при создании товара:", err);
    res.status(500).json({ message: "Ошибка сервера при создании товара" });
  }
};

// Удаление товара (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    res.json({ message: "Товар успешно удален" });
  } catch (err) {
    console.error("Ошибка при удалении:", err);
    res.status(500).json({ message: "Ошибка сервера при удалении" });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price, features } = req.body;

    let updateData = { title, description, price, features };

    // Если прилетела новая картинка, обновляем путь
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Товар не найден" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера при обновлении товара" });
  }
};
