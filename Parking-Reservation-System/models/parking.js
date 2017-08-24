var mysql = require('mysql');
//var express = require('express');
//var PKinfo = express.Router();

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'prs_alpha'
});

function PKinfo() {

};

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});


//query free park slots

pool.getConnection(function (err, connection) {

    PKinfo.prototype.query = function (callback) {
        pool.query("SELECT * FROM parkspace_info WHERE PS_EMPTY = 1", function (err, result) {

            if (err) {
                console.log("query parkspace Error" + err.message);
                return;
            }
            console.log("invoke");
            callback(err, result);
        });
    }
});



module.exports = PKinfo;