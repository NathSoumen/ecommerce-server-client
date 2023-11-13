const express = require("express");
const router = express.Router();
const {
  getProducts,
  addMultipleProduct,
} = require("../controller/product.controller");
/* GET users listing. */
router.get("/", getProducts);
router.post("/addMulti", addMultipleProduct);

module.exports = router;
