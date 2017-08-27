var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root123',
    port: '3306',
    database: 'prs_alpha',
});

connection.connect();
/*测试连接用
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results[0].solution);
});
*/
var rubbish = 0;

if (rubbish == 0) {//统计每日达到的累计预约量
    var reserveNumEverydaySql = "SELECT DISTINCT(a.RESERVE_DATE) as date ,MAX(a.RESERVE_ID) as number FROM reserve_record a  GROUP BY name"
    connection.query(reserveNumEverydaySql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        return result;
    });
}else if(rubbish == 1){//统计各时段预约进入车场量
    var reserveInTimeSql = "SELECT DATE_FORMAT(RESERVE_INTIME, \"%H\" ) , COUNT( * ) FROM reserve_record GROUP BY DATE_FORMAT(RESERVE_INTIME, \"%H\")  "
    connection.query(reserveInTimeSql,function (err, result) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        return result;
    });
} else if (rubbish == 2) {//统计每日预约订单量
    var DailyreserveSql = "SELECT DATE_FORMAT(RESERVE_INTIME, \"%Y-%m-%d\" ) , COUNT( * ) FROM reserve_record GROUP BY DATE_FORMAT(RESERVE_INTIME, \"%Y-%m-%d\" ) "
    connection.query(DailyreserveSql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        return result;
    });
}else {
    return "error"
}

connection.end();
