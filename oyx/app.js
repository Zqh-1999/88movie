
const express = require('express');

// 创建服务器
const app = express();
//#region 3.配置ejs模板引擎
// 3.1 下载ejs包
// 3.2 设置模板引擎的后缀是什么
var ejs = require('ejs')
app.set('view engine', 'ejs');
// 3.3 设置模板引擎的模板在哪个目录
app.set('views', __dirname + '/views');
//#endregion

app.get('/',(req,res)=>{
    res.render('yingpian')
})
// 1.设置静态资源目录
app.use(express.static('./public'));
// 监听端口 并启动服务
app.listen(8000, () => {
    console.log('server is running at http://localhost:8000');
})
