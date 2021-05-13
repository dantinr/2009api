const express = require('express')
const mysql   = require('mysql');      //引入 mysql 类库
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())


const connection = mysql.createConnection({
    host     : 'localhost',         //数据库地址
    user     : 'root',              //数据库用户名
    password : '123456abc',            // 数据库密码
    database : 'api2009'              // 数据库名
});

//建立连接
connection.connect();

//跨域处理
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    // //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    // //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    next();
});


app.get('/', (req, res) => {

    let html = "<h2>Hello Vue</h2>"
    // 从数据库 去数据
    res.send(arr)
})

app.get('/test',(req,res)=>{
    console.log(req.query)
    res.send("访问了 /test接口")
})

//用户列表接口
app.get('/user/list',(req,res)=>{
    console.log(req.method)
    console.log(1111)
    //拼装sql语句
    let sql = "select user_id,user_name,email,password from p_users order by user_id desc limit 10"

    connection.query(sql, function (error, results, fields) {
        res.send(results)           //将数据库查询结果返回给接口
    });
})

//添加用户
app.post('/user/add',(req,res)=>{
    let uid = req.body.user_id
    let uname = req.body.user_name

    let sql = `insert into p_users (user_id,user_name) values (${uid},"${uname}")`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        res.send("添加成功")
    });
})

//删除用户
app.delete('/user/delete',(req,res)=>{
    let uid = req.query.uid
    let sql = `delete from p_users where user_id=${uid}`
    connection.query(sql, function (error, results, fields) {
        res.send("删除成功")
    });

})

//更新用户信息
app.put('/user/update',(req,res)=>{
    console.log(req.body)
    let name = req.body.user_name
    let uid = req.body.user_id
    let sql = `update p_users set user_name='${name}' where user_id=${uid}`
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
        console.log(error)
        res.send("修改成功")
    });

})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})