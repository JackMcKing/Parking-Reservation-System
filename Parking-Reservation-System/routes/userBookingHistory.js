var express = require('express');
var router = express.Router();
var sd = require('silly-datetime');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var PKinfo = require('../models/parking.js');
var bodyParser = require('body-parser');
var Record = require('../models/record.js');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '60.205.221.162',
    user     : 'root',
    password : 'root123',
    port: '3306',
    database: 'prs_alpha',
});

connection.connect();


router.get('/', function (req, res) {

    if(req.cookies.islogin){

        console.log('cookies: ' + req.cookies.islogin);
        req.session.username = req.cookies.islogin;

    }

    if (req.session.username){

        console.log('session: ' + req.session.username);
        // res.locals.username = req.session.username;

    }else{
        res.redirect('/login');
        //return;
    }

    // res.render('userBookingHistory', {
    //     title: "没车位停车场预约系统"
    // });

    var getRecordByUserName_Sql = "SELECT * FROM reserve_record WHERE USER_NAME = ?";
    var username = req.session.username;
    var data = 0;

    connection.query(getRecordByUserName_Sql,[username],function (err,result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log("search success");
        data = result;
        // res.json(data);
        // req.data = result
        // if(req.data){
        //     res.end(JSON.stringify(data));
        // }
    });

    // res.json(data);
    res.render('userBookingHistory',data);
    // res.json(data);
    console.log("发送成功");
    // var result = Record.getRecordByUserName(username);
    // console.log(result);

});

connection.end();


// router.get('/',function (req,res) {
//     var getRecordByUserName_Sql = "SELECT * FROM reserve_record WHERE USER_NAME = ?";
//     connection.query()
//
// });
/*
var data = {
    data: {
        Id: '20170113',
        Name: 'hgdqstudio'
    }
};
router.post('/userBookingHistory',function (req, res) {
    // 打印post请求的数据内容
        res.end(JSON.stringify(data));

});
*/




/*

function json(req, res) {
    var data = { "a": ["1"],
        "b": ["2"],
        "c": ["3"] };
    JSON.parse(data);
    res.render('userBookingHistory', {
        title: "没车位停车场预约系统",
        itm: req.Slots,
        citm: req.UserRes

    });

}*/


// router.get('/', function (req, res) {
//
//     var username = req.session.username;
//
//
//     var psid = Math.floor(Math.random()*192);
//     var reservenow = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
//     var reservedate = req.body.pickdate;
//     var rreserveintime = req.body.in_time;
//     var rreserveouttime =req.body.out_time;
//     var reserveintime =  reservedate +" "+ rreserveintime;
//     var reserveouttime = reservedate +" "+rreserveouttime;
//
//     var newRecord = new Record({
//         username: username,
//         psid : psid,
//         reservedate: reservedate,
//         reservenow: reservenow,
//         reserveintime: reserveintime,
//         reserveouttime: reserveouttime
//     });
//
//     console.log('req.session.username: ' + username + ' userBooking');
//     console.log('psid: ' + psid);
//     console.log('reservedate:' + reservedate);
//     console.log('reservenow: ' + reservenow);
//     console.log('req.body strReserveintime: ' + reserveintime);
//     console.log('req.body strReserveouttime: ' + reserveouttime);
//
//     newRecord.save(function (err, result) {
//
//         if (err) {
//             res.local.error = err;
//             res.render('userBooking', {
//                 title: "没车位停车场预约系统"
//
//             });
//
//             return
//
//         }
//
//     });
//
// });

module.exports = router;
