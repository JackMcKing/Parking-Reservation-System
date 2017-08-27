var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var PKinfo = require('../models/parking.js');
var bodyParser = require('body-parser');
var Record = require('../models/record.js');

router.get('/', function (req, res, next) {

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
        title: "没车位停车场预约系统",

    });
   next();



});

router.post('/userBooking', function (req, res) {

    var username = req.session.username;
    var psid = Math.floor(Math.random()*192);
    var reservenow = Date.now();
    var reserveintime = req.body.strReserveintime;
    var reserveouttime =req.body.strReserveouttime;
    var newRecord = new Record({
        username: username,
        psid : psid,
        resrvenow: reservenow,
        reserveintime: reserveintime,
        reserveouttime: reserveouttime
    });

    console.log('req.session.username: ' + username);
    console.log('psid: ' + psid);
    console.log('reservenow: ' + reservenow);
    console.log('req.body strReserveintime: ' + reserveintime);
    console.log('req.body strReserveouttime: ' + reserveouttime);

    Record.save(function (err, result) {

        if (err) {
            res.local.error = err;
            res.render('userBooking', {
                title: "没车位停车场预约系统"
            });

        }

    })

})
// router.get('/',function (req,res) {
//     res.render('userBooking');
// });

module.exports = router;
