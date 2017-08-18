var mysql = require('mysql');
var dbname = "prs_alpha";

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root1234"
});

pool.on('connection', function (connection) {

    connection.query('SET SESSION auto_increment_increment=1');

});

function User(user){
    this.username = user.username;
    this.userpass = user.userpass;
}

module.exports = User;

pool.getConnection(function (err, connection) {

    var useDbSql = 'USE ' + dbname;
    connection.query(useDbSql, function (err) {

        if (err) {
            console.log('USE Error: ' + err.message);
            return;
        }

        console.log('USE SUCCEED');

    });

//save data
    User.prototype.save = function save(callback) {
        var user = {
            username: this.username,
            userpass: this.userpass
        };

        var insertUser_Sql = "INSERT INTO userinfo(id, username, userpass) VALUES(0, ?, ?)";

        connection.query(insertUser_Sql, [user.username, user.userpass], function (err, result) {

            if (err) {
                console.log('insertUser_Sql Error: ' + err.message);
                return;
            }

            //connection.release();

            console.log('invoked[save]');
            callback(err, result);

        });

    };
//get user number
    User.getUserNumByName = function getUserNumByName(username, callback) {

        var getUserNumByName_Sql = 'SELECT COUNT(1) AS num FROM userinfo WHERE username = ?';

        connection.query(getUserNumByName_Sql, [username], function (err, result) {

            if (err) {
                console.log('getUserNumByName_Sql Error: ' + err.message);
                return;
            }

           // connection.release();

            console.log('invoked[getUserNumByName]');
            callback(err, result);

        });

    };
//get user info
    User.getUserByUserName = function getUserNumByName(username, callback) {

        var getUserByUserName_Sql = 'SELECT * FROM userinfo WHERE username = ?';

        connection.query(getUserByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log('getUserByUserName Error: ' + err.message);
                return
            }

           // connection.release();

            console.log('invoke[getUserByUserName]');
            callback(err, result);

        });

    };

});
