// 引入数据库
const mysql = require('../db/db')

// 设置表名
const filminfo = 'ca_filminfo'

// 添加影片
module.exports.addFilm = (req, res) => {
  let myDate = new Date()
  // 获取前端数据
  let data = {
    film_name: req.body.film_name,
    image_url: req.body.image_url,
    url: req.body.url,
    url_hash: req.body.url_hash,
    score: req.body.score,
    star: req.body.star,
    director: req.body.director,
    channel: req.body.channel,
    type_name: req.body.type_name,
    type_id: req.body.type_id,
    year: req.body.year,
    describe: req.body.describe,
    address: req.body.address,
    add_time: req.body.add_time || myDate.getTime(),
    is_download: req.body.is_download,
    recommend: req.body.recommend,
    hot: req.body.hot,
  }
  // 插入数据库的语句
  mysql.query(`INSERT INTO ${filminfo} set ?`, data, (err, results) => {
    if (err) return console.log(err)
    if (results.affectedRows == 0) {
      res.json({
        code: '400'
      })
    } else if (results.affectedRows == 1) {
      res.json({
        code: '200'
      })
    } else {
      res.json({
        code: '10000',
        msg: '未知错误,请自己检查'
      })
    }
  })
}

// 删除影片
module.exports.deleteFilm = (req, res) => {
  mysql.query(`DELETE FROM ${filminfo} WHERE id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    console.log(results)
    if (results.affectedRows == 0) {
      res.json({
        code: '400'
      })
    } else if (results.affectedRows == 1) {
      res.json({
        code: '200'
      })
    } else {
      res.json({
        code: '10000',
        msg: '未知错误,请自己检查'
      })
    }
  })
}