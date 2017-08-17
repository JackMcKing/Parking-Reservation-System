var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "prs_alpha",
    port: 3306
});

con.connect();

exports.register = function(req,res){
    // console.log("req",req.body);
    var today = new Date();
    var users={
        "email":req.body.email,
        "password":req.body.password,
        "created":today,
        "modified":today
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
        if (error) {
            console.log("error ocurred",error);
            res.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            console.log('The solution is: ', results);
            res.send({
                "code":200,
                "success":"user registered sucessfully"
            });
        }
    });
}