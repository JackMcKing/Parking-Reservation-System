var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'parkspace_info'
});

pool.on('acquire', function (connection) {

    console.log("Connection %d acquired", connection.threadId);

});


//query free park slots
pool.getConnection(function (err, connection) {

    if (err) throw err;
    connection.query("SELECT * FROM parkspace_info WHERE PS_STATUS = 1", function (err, result) {

        if (err) {
            console.log("query parkspace Error" + err.message);
            return;
        }

        connection.release();

    });
    
});
