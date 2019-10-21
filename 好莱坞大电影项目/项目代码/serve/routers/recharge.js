// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/recharge')

// 设置接口地址
const recharges = '/recharge'

// 添加会员
router.post(recharges, controller.addrecharge)

// // 查询所有会员
router.get(`${recharges}/all`, controller.inquirerechargeAll)


// 暴露路由
module.exports = router