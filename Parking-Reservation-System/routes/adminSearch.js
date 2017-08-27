var mysql = require('mysql');
var express = require('express');
var router = express.Router();

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root123',
    port: '3306',
    database: 'prs_alpha',
});

connection.connect();

router.get('/',function (req,res) {
    res.render('adminSearch');
});

router.get('/',function (req,res) {
    var temp = req.body();

});


connection.end();