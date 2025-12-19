const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
        title: String,
        price: Number,
        quantity: { type: Number, default: 1 }
      }
    ],
    total: { type: Number, required: true },
    payment: {
      method: String, // "COD" | "ONLINE"
      status: String, // "Pending" | "Paid"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
