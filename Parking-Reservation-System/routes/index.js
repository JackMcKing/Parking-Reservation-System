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

    }

    if (req.session.username){

        console.log('session: ' + req.session.username);
        res.locals.username = req.session.username;

    }else{
        res.redirect('/login');
        return;
    }

});

/*
router.get('/', findSlots, findUserRes, renderResult);

function findSlots(req, res, next) {
    var pkinfo = new PKinfo();
    pkinfo.query(function (err, result) {

        if (err) {
            console.log("pkinfo index query error: " + err.message);
            res.status(404).end(err);
        }else {
            req.Slots = result;
            return next();
        }
    });
}

function findUserRes(req, res, next) {

    Record.getRecordByUserName(res.locals.username, function (err, result) {

        if (err) {
            console.log("record index query error: " + err.message);
            res.status(404).end(err);
        }else {
            req.UserRes = result;
            next();
        }

    });

}

function renderResult(req, res) {
    res.render('index', {
        title: "没车位停车场预约系统",
        itm: req.Slots,
        citm: req.UserRes

    });

}

*/
module.exports = router;
