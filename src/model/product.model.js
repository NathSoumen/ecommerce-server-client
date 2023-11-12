const mongoose = require("mongoose");

// Define the User schema
const productSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
    },
    image: {
      type: String,
    },
    category: String,
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

// Create the User model
const product = mongoose.model("product", productSchema);

module.exports = product;
