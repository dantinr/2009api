var mysql      = require('mysql');      //引入 mysql 类库

var connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : '123456abc',            // 数据库密码
    database : 'api2009'              // 数据库名
});

//建立连接
connection.connect();

//拼装sql语句
let sql = "select * from p_users order by user_id desc limit 10"

connection.query(sql, function (error, results, fields) {
    ///console.log(error)
    console.log(results[0])

    //console.log(fields)
});

connection.end();