// 引入express
const express = require('express')

// 创建路由
const router = express.Router()

// 引入控制器
const controller = require('../controller/films')

// 设置接口地址
const films = '/films'

// 添加影片
router.post(films, controller.addFilm)

// 删除影片
router.delete(films, controller.deleteFilm)

// 查询单个/回显影片
router.get(`${films}/:id(\\d+)`, controller.inquireFilm)

// 修改影片
router.put(`${films}/:id(\\d+)`, controller.upFilm)

// 查询所有影片
router.get(`${films}/all`, controller.inquireFilmAll)

// 查询多个影片(根据关键字搜索)
router.get(films, controller.inquireFilms)

router.get(`${films}/allinfo`, controller.inquireFilmallinfo)


// 暴露路由
module.exports = router