// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/history')

// 设置接口地址
const history = '/history'

// 添加history
router.post(history, controller.addHistory)

// 删除history
router.delete(history, controller.deleteHistory)

// 查询单个/回显history
router.get(`${history}/:id(\\d+)`, controller.inquireHistory)

// // 查询多个history
router.get(history, controller.inquireHistorys)


// 暴露路由
module.exports = router