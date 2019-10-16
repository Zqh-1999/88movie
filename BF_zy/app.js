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

// 配置影片路由
app.use(v1, require('./routers/films'))
// // 配置管理员路由
// app.use(v1, require('./routers/supUsers'))
// // 配置用户路由
// app.use(v1, require('./routers/user'))
// // 配置历史纪录路由
// app.use(v1, require('./routers/history'))

// 启动服务
app.listen(serve.prot, () => {
  console.log(`http://${serve.ip}`)
})