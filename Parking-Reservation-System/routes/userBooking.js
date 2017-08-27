var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var PKinfo = require('../models/parking.js');
var Record = require('../models/record.js');

router.get('/', function (req, res) {

    if(req.cookies.islogin){

        console.log('cookies: ' + req.cookies.islogin);
        req.session.username = req.cookies.islogin;

        res.render('userBooking');


    }

    if (req.session.username){

        console.log('session: ' + req.session.username);
        res.locals.username = req.session.username;

    }else{
        res.redirect('/login');
        return;
    }

    res.render('userBooking', {
        title: "没车位停车场预约系统"
    });

});


// router.get('/',function (req,res) {
//     res.render('userBooking');
// });

module.exports = router;
