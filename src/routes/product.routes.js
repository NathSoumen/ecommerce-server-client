const express = require("express");
const router = express.Router();
const {
  getProducts,
  addMultipleProduct,
  productDetails,
} = require("../controller/product.controller");
/* GET users listing. */
router.get("/", getProducts);
router.get("/:pid", productDetails);
router.post("/addMulti", addMultipleProduct);

module.exports = router;
