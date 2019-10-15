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

// 配置路由
app.use(v1, require('./routers/film'))

// 启动服务
app.listen(serve.prot, () => {
  console.log(`http://${serve.ip}`)
})