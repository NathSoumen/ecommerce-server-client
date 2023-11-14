const asyncLib = require("async");
const productModel = require("../model/product.model");
const productPriceModel = require("../model/prododuct-price.model");

async function getProducts(req, res, next) {
  try {
    const products = await productModel
      .find({})
      .populate({
        path: "sellerId",
        select: "email username mobile _id",
      })
      .populate("price")
      .exec();
    return res.status(200).json({ success: true, data: products });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
}
async function productDetails(req, res, next) {
  try {
    const { pid } = req.params;
    if (!pid) {
      throw Error("pid is missing");
    }
    const product = await productModel
      .findOne({ _id: pid })
      .populate({
        path: "sellerId",
        select: "email username mobile _id",
      })
      .exec();
    const priceDetails = await productPriceModel.findOne({ product: pid });
    return res
      .status(200)
      .json({ success: true, data: { product, priceDetails } });
  } catch (err) {
    return res.status(500).json({ success: false, err });
  }
}
async function addMultipleProduct(req, res, next) {
  try {
    const { sellerId, products } = req.body;
    if (!sellerId || !products) {
      throw Error("fields are missing");
    }
    if (products.length > 0) {
      asyncLib.forEach(products, async (product) => {
        const obj = {
          itemName: product.itemName,
          image: product.image,
          category: product.category,
          sellerId: sellerId,
        };
        const newAddedProduct = await new productModel(obj).save();
        console.log("newAddedProduct", newAddedProduct);
        if (newAddedProduct) {
          const priceObj = {
            product: newAddedProduct._id,
            originalPrice: product.price,
            currency: product.currency,
            discount: product.discount || 0,
          };
          const newAddedProductprice = await new productPriceModel(
            priceObj
          ).save();
          console.log("newAddedProductprice", newAddedProductprice);
        }
      });
      return res.status(201).json({ success: true, msg: "data is saved" });
    } else {
      throw Error("fields are missing");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, err });
  }
}

module.exports = {
  getProducts: getProducts,
  addMultipleProduct,
  productDetails,
};
