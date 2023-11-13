const mongoose = require("mongoose");

// Define the User schema
const productPriceSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    originalPrice: {
      type: Number,
    },
    currency: {
      type: String,
    },
    discount: { type: Number },
  },
  { timestamps: true }
);

// Create the User model
const productPrice = mongoose.model("productPrice", productPriceSchema);

module.exports = productPrice;
