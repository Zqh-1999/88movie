//获取express创建服务器
const express = require('express');
const app = express();

//设置静态资源目录
app.use(express.static('./public'));

//设置post请求
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
// vip路由
const routerVip=require('./routes/vip')
app.use(routerVip)
//登录路由
const routerLogon=require('./routes/logon')
app.use(routerLogon)
// 注册路由
const routerRegiste=require('./routes/registe')
app.use(routerRegiste)


//下载ejs包
const ejs=require('ejs')
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.listen(8000, () => {
    console.log('http://127.0.0.1');
})