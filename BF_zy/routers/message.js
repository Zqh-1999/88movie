// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/message')

// 设置接口地址
const message = '/message'

// // 添加留言
router.post(message, controller.addMessage)

// // 删除留言
router.delete(`${message}/:id(\\d+)`, controller.deleteMessage)

// 查询所有留言（根据用户名）
router.get(message, controller.inquireMessageAll)


// 暴露路由
module.exports = router