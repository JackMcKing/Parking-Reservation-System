var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root123',
    port: '3306',
    database: 'prs_alpha',
});

connection.connect();

var temp = 0;

if (temp == 0){ //查找执行中预定记录
    var runningSql = "SELECT * FROM reserve_record WhERE RESERVE_INTIME < now() AND RESERVE_OUTTIME > now()";
    connection.query(runningSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        return result;
    });
} else if (temp == 1){ //查找未开始预定
    var notStartSql = "SELECT * FROM reserve_record WhERE RESERVE_INTIME < now() AND RESERVE_OUTTIME < now()";
    connection.query(notStartSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        return result;
    });
} else if (temp == 2){ //查找已结束预定
    var endSql = "SELECT * FROM reserve_record WhERE RESERVE_INTIME > now() AND RESERVE_OUTTIME > now()";
    connection.query(endSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        return result;
    });
} else {
    return "error"
}

connection.end();