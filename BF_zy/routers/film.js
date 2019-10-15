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

// 删除影片
router.delete(`${films}/:id(\\d+)`, controller.deleteFilm)

// 查询单个/回显影片
router.get(`${films}/:id(\\d+)`, controller.inquireFilm)

// 修改影片
router.put(`${films}/:id(\\d+)`, controller.upFilm)

// 查询多个影片
router.get(films, controller.inquireFilms)


// 暴露路由
module.exports = router