var mysql = require('mysql');

var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root123',
    database: 'prs_alpha',
port: 3306
});

pool.on('connection', function (connection) {

    console.log("pool on");
    connection.query("SET SESSION auto_increment_increment=1");

});

function User(user){
    this.username = user.username;
    this.userpass = user.userpass;
}


//save data
User.prototype.save = function save(callback) {
    var user = {
        username: this.username,
        userpass: this.userpass
    };

    var insertUser_Sql = "INSERT INTO user_info (USER_NAME, USER_PW) VALUES (?, ?)";

    pool.getConnection(function (err, connection) {

        connection.query(insertUser_Sql, [user.username, user.userpass], function (err, result) {

            if (err) {
                console.log('insertUser_Sql Error: ' + err.message);
                return;
            }

            connection.release();
            callback(err, result);

        });
    });
};

//get user number
User.getUserNumByName = function getUserNumByName(username, callback) {

    pool.getConnection(function (err, connection) {

        if (err) throw err;

        console.log("getConnection");
        console.log("getUserNumByName");

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM user_info WHERE USER_NAME = ?";
        connection.query(getUserNumByName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getUserNumByName_Sql Error: " + err.message);
                return;
            }

            connection.release();
            callback(err, result);

        });
    });
};

//get user info
User.getUserByUserName = function getUserNumByName(username, callback) {

        var getUserByUserName_Sql = "SELECT * FROM user_info WHERE USER_NAME = ?";

        pool.getConnection(function (err, connection) {

        if (err) throw err;
        connection.query(getUserByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return
            }

            connection.release();
            callback(err, result);

        });

    });

};

//get user permission
User.getUserpermissionByUserName = function getUserpermissionByUserName(username, callback) {


    var getUserpermissionByUserName_Sql = "SELECT * FROM user_info WHERE USER_NAME = ?";

    pool.getConnection(function (err, connection) {

        if (err) throw err;
        connection.query(getUserpermissionByUserName_Sql, [username], function (err, result) {

            if (err) {
                console.log("getUserpermissionByUserName Error: " + err.message);
                return
            }
            //console.log(result);


            connection.release();
            callback(err, result);

        });

    });

};

module.exports = User;
