const express = require("express");
const router = express.Router();
const {getAllUsers,login,register} = require('../controller/users.controller')
/* GET users listing. */
router.get("/", getAllUsers);
router.post("/login", login);
router.post("/register", register);

module.exports = router;
