const express = require("express")
const mysql = require("mysql")
const bodyParser = require('body-parser')


const app = express()
const port = 3001

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//处理跨域
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    next();
});



const connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : '123456abc',            // 数据库密码
    database : 'api2009'              // 数据库名
});

connection.connect()

app.get('/',(req,res)=>{
    console.log(req.query)
    res.send("API 接口11111")
})

app.get('/user/list',(req,res)=>{
    //拼装sql语句
    let sql = "select user_id,user_name,email,password from p_users order by user_id desc limit 10"

    connection.query(sql, function (error, results, fields) {
        res.send(results)           //将数据库查询结果返回给接口
    });
})

//用户添加
app.post('/user/add',(req,res)=>{
    //接收 post数据
    console.log(req.body)
    let user_id = req.body.user_id
    let user_name = req.body.user_name

    //入库  insert into
    let sql = `insert into p_users (user_id,user_name) values (${user_id},"${user_name}")`
    connection.query(sql, function (error, results, fields) {
        res.send("添加成功")
    });
})

//监听端口
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})