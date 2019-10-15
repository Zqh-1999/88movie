// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/film')

// 设置接口地址
const films = '/films'

// 添加影片
router.post(films, controller.addFilm)

// 暴露路由
module.exports = router