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


// 商品列表
app.get('/goods/list',(req,res)=>{
    let sql = `select goods_id,goods_name,shop_price,number from p_cart limit 5`
    connection.query(sql, function (error, results, fields) {
        res.send(results)
    });
})

// 修改购物车商品数量 +1
app.put('/cart/number',(req,res)=>{
    //接收 商品信息  商品id, number
    let id = req.body.id
    let sql = `update p_cart set number=number+1 where goods_id=${id}`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        //判断 sql语句 是否执行成功
        console.log(error)
        console.log(results)
        if(results.affectedRows > 0){       //
            let response_data = {
                errno : 0,
                msg: "ok"
            }
            res.send(response_data)
        }else{          //失败
            let response_data = {
                errno : 40001,
                msg: "更新失败"
            }
            res.send(response_data)
        }
    });
})

//用户注册接口
app.post('/user/regist',(req,res)=>{
    //接收 前台发送来的数据
    console.log("接收到的注册信息：",req.body)
    let sql = `insert into p_users (user_name,email,mobile,password) values ('${req.body.name}','${req.body.email}','${req.body.mobile}','${req.body.pass}')`
    console.log(sql)
    connection.query(sql, function (error, results, fields) {
        console.log("错误: ",error)
        console.log("insert 结果: ",results)
        console.log("insert 影响的行数：",results.affectedRows)

        if(results.affectedRows > 0){       //insert成功
            res.send()
        }else{          //失败
            res.send()
        }
    });

})

//检测用户名
app.get("/check/username",(req,res)=>{
    console.log(req.query)
    let sql = `select * from p_users where user_name='${req.query.name}'`
    console.log("sql: ",sql)
    connection.query(sql, function (error, results, fields) {

        console.log("数据库记录： ",results)

       if(results.length>0){        //已被占用
           let response_data = {
               errno: 40005,
               msg: "用户名已被占用"
           }
           res.send(response_data)
       }else{           // 可以使用
           let response_data = {
               errno: 0,
               msg: "ok"
           }
           res.send(response_data)
       }

    });
})

//检查Email
app.get("/check/email",(req,res)=>{
    console.log(req.query)
    let sql = `select * from p_users where email='${req.query.email}'`
    connection.query(sql, function (error, results, fields) {
        if(results.length>0){        //已被占用
            let response_data = {
                errno: 40006,
                msg: "Email已被占用"
            }
            res.send(response_data)
        }else{           // 可以使用
            let response_data = {
                errno: 0,
                msg: "ok"
            }
            res.send(response_data)
        }
    });
})

//检查手机号
app.get("/check/mobile",(req,res)=>{
    let sql = `select * from p_users where email='${req.query.mobile}'`
    connection.query(sql, function (error, results, fields) {
        if(results.length>0){        //已被占用
            let response_data = {
                errno: 40007,
                msg: "手机号已被占用"
            }
            res.send(response_data)
        }else{           // 可以使用
            let response_data = {
                errno: 0,
                msg: "ok"
            }
            res.send(response_data)
        }
    });
})

//用户注册
app.post('/user/reg',(req,res)=>{
    console.log(req.body)
    //用户信息入库

})

//监听端口
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})