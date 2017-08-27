var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'prs_alpha',
    port: 3306
});

pool.on('connection', function (connection) {
    console.log("record pool on");
    connection.query('SET SESSION auto_increment_increment=1');
});

function Record(record){
    this.username = record.username;
    this.psid = record.psid;
    this.reservenow = record.reservenow;
    this.reserveintime = record.reserveintime;
    this.reserveouttime = record.reserveouttime;
}


Record.prototype.save = function save(callback) {

    var record = {
        username: this.username,
        psid : this.psid,
        reservenow : this.reservenow,
        reserveintime : this.reserveintime,
        reserveouttime : this.reserveouttime
    };

    var insertUserReserve_Sql = "INSERT INTO reserve_record (USER_NAME,PS_ID,RESERVE_NOW,RESERVE_INTIME,RESERVE_OUTTIME) VALUES (?, ?, ?, ?, ?)";

    pool.getConnection(function (err, connection) {

        connection.query(insertUserReserve_Sql, [user.username, user.psid, user.reservenow, user.reserveintime, user.reserveouttime], function (err, result) {

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


    var getRecordByUserName_Sql = "SELECT * FROM reserve_record WHERE USER_NAME = ? AND RESERVE_INTIME > NOW()";//sql中now()函数用于获取当前datetime

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