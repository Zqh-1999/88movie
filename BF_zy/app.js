// 引入express
const express = require('express')

// 引入配置文件
const {serve} = require('./config')

// 引入bd-parser
const bdParser = require('body-parser')

// 设置接口地址
const v1 = '/api/v1'

// 创建服务
const app = express()

// 配置bdParser
app.use(bdParser.urlencoded({extends:true}))

// 跨域
// var cors = require('cors')
// app.use(cors())

// var corsOptions = {
//     origin: 'http://127.0.0.1',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.get('/products/:id', cors(corsOptions), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for only example.com.' })
// })

// 配置影片路由
app.use(v1, require('./routers/films'))
// 配置管理员路由
app.use(v1, require('./routers/supUsers'))
// 配置用户路由
app.use(v1, require('./routers/user'))
// 配置历史纪录路由
app.use(v1, require('./routers/history'))

// 启动服务
app.listen(serve.prot, () => {
  console.log(`http://${serve.ip}`)
})