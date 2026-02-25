const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortDescription: String,
  description: String,
  image: String,
});

module.exports = mongoose.model("Product", ProductSchema);
