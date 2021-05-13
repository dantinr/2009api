const express = require('express')
const mysql   = require('mysql');      //引入 mysql 类库
const app = express()
const port = 3000


const connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : '123456abc',            // 数据库密码
    database : 'api2009'              // 数据库名
});

//建立连接
connection.connect();


app.get('/', (req, res) => {

    let html = "<h2>Hello Vue</h2>"
    // 从数据库 去数据
    res.send(arr)
})

app.get('/test',(req,res)=>{
    res.send("访问了 /test接口")
})

//用户列表接口
app.get('/user/list',(req,res)=>{
    //拼装sql语句
    let sql = "select user_id,user_name,email,password from p_users order by user_id desc limit 10"

    connection.query(sql, function (error, results, fields) {
        res.send(results)           //将数据库查询结果返回给接口
    });
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})