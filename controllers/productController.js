const mongoose = require("mongoose");
const Product = require("../models/Product");
const ApiError = require("../utils/api-error");

// Получить список всех товаров каталога
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

// Получить детальную карточку оборудования по ID
const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Неверный формат ID оборудования"));
    }

    const product = await Product.findById(id);
    if (!product) {
      return next(ApiError.notFound("Оборудование не найдено"));
    }

    res.json(product);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

// Создать новый товар (доступно только админу)
const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, features } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    if (!title || !description) {
      return next(
        ApiError.badRequest("Название и описание товара обязательны"),
      );
    }

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
    next(ApiError.internal(err.message));
  }
};

// Изменить характеристики товара
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Неверный формат ID оборудования"));
    }

    const { title, description, price, features } = req.body;
    let updateData = { title, description, price, features };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });

    if (!updatedProduct) {
      return next(ApiError.notFound("Оборудование для обновления не найдено"));
    }

    res.json(updatedProduct);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

// Удалить товар из базы
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Неверный формат ID оборудования"));
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return next(ApiError.notFound("Оборудование для удаления не найдено"));
    }

    res.json({ message: "Товар успешно удален из каталога" });
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
