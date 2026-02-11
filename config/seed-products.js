const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("../models/Product");

const products = [
  { title: "iPhone 13", description: "Смартфон Apple", image: "" },
  { title: "Samsung Galaxy S22", description: "Смартфон Samsung", image: "" },
  { title: "MacBook Pro", description: "Ноутбук Apple", image: "" },
  { title: "Dell XPS 13", description: "Ноутбук Dell", image: "" },
  { title: "iPad Air", description: "Планшет Apple", image: "" },
  { title: "Samsung Tab S8", description: "Планшет Samsung", image: "" },
  { title: "Apple Watch", description: "Умные часы", image: "" },
  { title: "AirPods Pro", description: "Наушники Apple", image: "" },
  { title: "Sony WH-1000XM5", description: "Наушники Sony", image: "" },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany(); // очистить старые
    await Product.insertMany(products);

    console.log("Products seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
