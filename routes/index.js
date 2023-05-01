var express = require('express');
var router = express.Router();



function routeSetup(io) {
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
return  router
}

module.exports = routeSetup;
