const express = require("express");
const router = express.Router();
const {getCountryList} = require('../controller/fetchExternalData.controller')
/* GET users listing. */
router.get("/countryData", getCountryList);

module.exports = router;
