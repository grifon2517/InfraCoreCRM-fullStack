const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  type: {
    type: String,
    enum: ["Purchase", "Rent"],
  },
  contactEmail: {
    type: String,
    required: true,
  },
  comment: String,
  status: {
    type: String,
    enum: ["new", "in_progress", "done", "rejected"],
    default: "new",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
