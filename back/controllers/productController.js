const mongoose = require("mongoose");
const Product = require("../models/Product");
const ApiError = require("../utils/api-error");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(ApiError.internal(err.message));
  }
};

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

const createProduct = async (req, res, next) => {
  try {
    const { title, shortDescription, description, price, features } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

    if (!title || !description) {
      return next(
        ApiError.badRequest("Название и описание товара обязательны"),
      );
    }

    const newProduct = new Product({
      title,
      shortDescription,
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

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(ApiError.badRequest("Неверный формат ID оборудования"));
    }

    const { title, shortDescription, description, price, features } = req.body;
    let updateData = { title, shortDescription, description, price, features };

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
