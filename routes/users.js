var express = require('express');
var router = express.Router();



function routeSetup(io) {
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

  return  router
  }
  
  module.exports = routeSetup;
  