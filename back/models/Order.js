const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
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
      required: true,
    },
    contactEmail: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Новая", "В работе", "Выполнена", "Отклонена"],
      default: "Новая",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema);
