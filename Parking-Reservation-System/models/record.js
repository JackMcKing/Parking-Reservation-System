var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '60.205.221.162',
    user: 'root',
    password: 'root123',
    database: 'prs_alpha',
    port: 3306
});

pool.on('acquire', function (connection) {

    console.log("Connection %d acquired", connection.threadId);

});