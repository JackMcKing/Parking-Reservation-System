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

function Record(user){
    this.username = user.username;
    this.restime = user.restime;
}


Record.prototype.save = function save(callback) {

    var user = {
        username: this.username,
        restime: Date.now()
    };

    var insertUserReserve_Sql = "INSERT INTO reserve_record (USER_NAME, RESERVE_INTIME) VALUES (?, ?)";

    pool.getConnection(function (err, connection) {

        connection.query(insertUserReserve_Sql, [user.username, user.restime], function (err, result) {

            if (err) {
                console.log('insertUserReverse_Sql Error: ' + err.message);
                return;
            }

            connection.release();
            callback(err, result);
        });

    });

};



//get user 's reserve record by username
Record.getRecordByUserName = function getRecordByUserName(username, callback) {


    var getRecordByUserName_Sql = "SELECT * FROM reserve_record WHERE USER_NAME = ?";//sql中now()函数用于获取当前datetime

    pool.getConnection(function (err, connection) {

        if (err) throw err;
        connection.query(getRecordByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getRecordByUserName Error: " + err.message);
                return;
            }
            console.log("invoke getRecordByUserName");
            callback(err, result);
        });

    });

};

module.exports = Record;