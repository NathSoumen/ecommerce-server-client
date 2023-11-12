const productModel = require("../model/product.model");

async function getProducts(req, res, next) {
  try {
    const products = await productModel.find({});
    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
}

module.exports = {
  getProducts: getProducts,
};
