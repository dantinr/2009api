const express = require('express')
const app = express()
const port = 3000

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


    //返回json数据
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})