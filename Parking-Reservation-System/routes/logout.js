var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


router.get('/', function (req, res) {

    req.session.destroy();
    res.redirect('/login');

});

module.exports = router;