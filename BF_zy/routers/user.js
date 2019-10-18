// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/user')

// 设置接口地址
const user = '/users'

// 添加user
router.post(user, controller.addUser)

// 删除user
router.delete(`${user}/:id(\\d+)`, controller.deleteUser)

// 查询单个/回显user
router.get(`${user}/:id(\\d+)`, controller.inquireUser)

// 修改user
router.put(`${user}/:id(\\d+)`, controller.upUser)

// 查询多个user
router.get(user, controller.inquireUsers)


// 暴露路由
module.exports = router