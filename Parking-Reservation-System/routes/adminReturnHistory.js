var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
    host     : '60.225.201.162',
    user     : 'root',
    password : 'root123',
    port: '3306',
    database: 'prs_alpha',
});

connection.connect();


router.get('/', function(req, res) {
    res.render('admin');
});

router.post('/', function(req, res) {
    var temp = req.body.temp;

    if (temp == 0){ //查找执行中预定记录
        var runningSql = 'SELECT user_info.USER_NAME,USER_VEHICLEID,RESERVE_ID,RESERVE_INTIME,RESERVE_OUTTIME,PS_ID FROM reserve_record INNER JOIN user_info ON reserve_record.USER_NAME=user_info.USER_NAME WHERE RESERVE_INTIME < now() AND RESERVE_OUTTIME > now()';
        connection.query(runningSql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            console.log("search success");
            res.json(result);
        });
    } else if (temp == 1){ //查找未开始预定
        var notStartSql = 'SELECT user_info.USER_NAME,USER_VEHICLEID,RESERVE_ID,RESERVE_INTIME,RESERVE_OUTTIME,PS_ID FROM reserve_record INNER JOIN user_info ON reserve_record.USER_NAME=user_info.USER_NAME WHERE RESERVE_INTIME < now() AND RESERVE_OUTTIME < now()';
        connection.query(notStartSql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            console.log("search success");
            res.json(result);
        });
    } else if (temp == 2){ //查找已结束预定
        var endSql = 'SELECT user_info.USER_NAME,USER_VEHICLEID,RESERVE_ID,RESERVE_INTIME,RESERVE_OUTTIME,PS_ID FROM reserve_record INNER JOIN user_info ON reserve_record.USER_NAME=user_info.USER_NAME WHERE RESERVE_INTIME > now() AND RESERVE_OUTTIME > now()';
        connection.query(endSql,function (err, result) {
            if(err){
                console.log('[SELECT ERROR] - ',err.message);
                return;
            }
            console.log("search success");
            res.json(result);
        });
    } else {
        console.log("search failed");
        res.send(error);
    }
});

connection.end();

module.exports = router;
