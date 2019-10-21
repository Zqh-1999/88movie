const express = require('express');

// 创建服务器
const app = express();
// 1.设置静态资源目录
app.use(express.static('./public'));

app.use('api/v1', require('./routes/indexRouter'))
// 首页渲染
app.get('/', require('./routes/indexRouter'))

app.get('/movie/:id', (req, res) => {
    res.render('keywordsMovie')
})

app.get('/Details', (req, res) => {
    res.render('Details')
})
// 登录
app.get('/login', (req, res) => {
    res.render('dl')
})
// vip页面
app.get('/vip', (req, res) => {
    res.render('vip')
})
// 视频详情
app.get('/intro/:id', (req, res) => {
    res.render('intro')
})

//  播放视频页面
app.get('/replay', (req, res) => {
    res.render('replay')
})
app.get('/serises', (req, res) => {
    res.render('serises')
})
app.get('/Animation', (req, res) => {
    res.render('Animation')
})
app.get('/Variety', (req, res) => {
    res.render('Animation')
})

//图片上传接口
const routFile=require('./routes/routFile');
app.use(routFile)


//#region 3.配置ejs模板引擎
// 3.1 下载ejs包
// 3.2 设置模板引擎的后缀是什么
var ejs = require('ejs')
app.set('view engine', 'ejs');
// 3.3 设置模板引擎的模板在哪个目录
app.set('views', __dirname + '/views');
//#endregion




// 监听端口 并启动服务
app.listen(8000, () => {
    console.log('server is running at http://localhost:8000');
})
