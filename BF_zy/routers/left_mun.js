// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/left_mun')

// 设置接口地址
const left_mun = '/search'

// 查询多个order
router.get(left_mun, controller.inquireLeft_mun)


// 暴露路由
module.exports = router