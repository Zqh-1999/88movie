// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/order')

// 设置接口地址
const order = '/order'

// 添加order
router.post(order, controller.addOrder)

// 删除多个order
router.delete(order, controller.deleteOrder)

// 删除多个order
router.delete(`${order}/:id(\\d+)`, controller.deleteOrders)

// 查询单个/回显order
router.get(`${order}/:id(\\d+)`, controller.inquireOrder)

// 查询所有order(关键字)
router.get(order, controller.inquireOrders)


// 暴露路由
module.exports = router