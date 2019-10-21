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

//图片上传接口
const routFile=require('./routes/routFile');
app.use(routFile)


//下载ejs包
const ejs=require('ejs')
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.listen(8000, () => {
    console.log('http://127.0.0.1:8000');
})