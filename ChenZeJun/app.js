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

//  播放视频页面
// app.get('/replay', (req, res) => {
//     res.render('replay')
// })

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
