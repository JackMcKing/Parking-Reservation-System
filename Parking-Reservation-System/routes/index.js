var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var PKinfo = require('../models/parking.js');
var Record = require('../models/record.js');

router.get('/', function (req, res) {

    var pkinfo = new PKinfo();
    var username = req.session.username;

    if(req.cookies.islogin){

        console.log('cookies: ' + req.cookies.islogin);
        req.session.username = req.cookies.islogin;

    }

    if (req.session.username){

        console.log('session: ' + req.session.username);
        res.locals.username = req.session.username;

    }else{

        res.redirect('/login');
        return;
    }


    pkinfo.query(function (err, result) {

        if (err) {
            res.status(404).end(err);
        }else {
            res.render('index', {
                title: "没车位停车场预约系统",
                items: result
            });
        }

    });

    Record.getRecordByUserName(username, function (err, result) {

        if (err) {
            res.status(404).end(err);
        }else {
            res.render('index',{
                rows: result
            });
        }

    });

});


module.exports = router;
