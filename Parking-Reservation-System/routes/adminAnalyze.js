var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root123',
    port: '3306',
    database: 'prs_alpha',
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});

var reserveInTimeSql = "SELECT count(RESERVE_ID) FROM reserve_record\n" +
    "WHERE RESERVE_NOW LIKE Convert(varchar,RESERVE_INTIME,120) LIKE '2017-' ";//未完成

connection.end();