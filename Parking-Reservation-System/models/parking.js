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

    PKinfo.prototype.query = function () {

        connection.query("SELECT * FROM reserve_record WHERE PS_EMPTY = 1", function (err, result) {

            if (err) {
                console.log("query reserve_record Error" + err.message);
                return;
            }
<<<<<<< HEAD
            console.log("invoke PKinfo");
           // callback(err, result);
=======
            console.log("invoke");
            callback(err, result);
>>>>>>> parent of 55de586... index layout change for easier understanding
        });
    }
});

//insert user reserve


module.exports = PKinfo;