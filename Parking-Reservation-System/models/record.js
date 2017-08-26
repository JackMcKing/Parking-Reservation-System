var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'prs_alpha',
    port: 3306
});

pool.on('connection', function (connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

function Record(){
}

//get user 's reserve record by username
Record.getRecordByUserName = function getRecordByUserName(username, callback) {

    var current_time = Date.now();
    var getRecordByUserName_Sql = "SELECT * FROM parkspace_info WHERE PS_USERNAME = ? AND PS_TIME_BEGIN < current_time";

    pool.getConnection(function (err, connection) {

        if (err) throw err;
        connection.query(getRecordByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getRecordByUserName Error: " + err.message);
                return;
            }

            callback(err, result);

        });

    });

};

module.exports = Record;