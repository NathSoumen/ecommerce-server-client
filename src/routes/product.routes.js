const express = require("express");
const router = express.Router();
const {getProducts} = require('../controller/product.controller')
/* GET users listing. */
router.get("/", getProducts);


module.exports = router;
