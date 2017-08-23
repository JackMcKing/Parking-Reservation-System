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

function Record(record){
    this.reserveid = record.reserveid;
    this.username = record.username;
    this.psid= record.psid;
    this.reservenow=record.reservenow;
    this.reservedate=record.reservedate;
    this.reserveintime=record.reserveintime;
    this.reserveouttime=record.reserveouttime;
}

//get user 's reserve record by username
Record.getRecordByUserName = function getRecordByName(username, callback) {

    var getRecordByUserName_Sql = "SELECT * FROM RESERVE_RECORD WHERE USER_NAME = ?";

    pool.getConnection(function (err, connection) {

        if (err) throw err;
        connection.query(getRecordByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getRecordByUserName Error: " + err.message);
                return
            }

            connection.release();
            callback(err, result);

        });

    });

};