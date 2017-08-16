var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: '没车位停车场预约系统' });
});

module.exports = router;
