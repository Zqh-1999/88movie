// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/supUsers')

// 设置接口地址
const admin = '/admin'

// 添加admin
router.post(admin, controller.addAdmin)

// 删除admin
router.delete(admin, controller.deleteAdmin)

// 查询单个/回显admin
router.get(`${admin}/:id(\\d+)`, controller.inquireAdmin)

// 修改admin
router.put(`${admin}/:id(\\d+)`, controller.upAdmin)

// 查询多个admin
router.get(admin, controller.inquireAdmins)

// 登录
router.post(`${admin}/login`, controller.loginAdmin)


// 暴露路由
module.exports = router