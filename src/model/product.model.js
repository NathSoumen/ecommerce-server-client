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
  {
    timestamps: true,
    virtuals: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);
productSchema.virtual("price", {
  ref: "productPrice",
  localField: "_id",
  foreignField: "product",
});
// productSchema.virtual("user", {
//   ref: "Users",
//   localField: "sellerId",
//   foreignField: "_id",
// });
// Create the User model
const product = mongoose.model("product", productSchema);

module.exports = product;
