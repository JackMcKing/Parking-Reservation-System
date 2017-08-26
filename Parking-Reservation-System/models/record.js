var mysql = require('mysql');

var pool = mysql.createPool({
    host: '60.205.221.162',
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


    var getRecordByUserName_Sql = "SELECT * FROM reserve_record WHERE USER_NAME = ? AND RESERVE_INTIME > now（）";//sql中now()函数用于获取当前datetime

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