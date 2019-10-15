// 引入数据库
const mysql = require('../db/db')

// 设置表名
const filminfo = 'ca_filminfo'

// 添加影片
module.exports.addFilm = (req, res) => {
  let myDate = new Date()
  console.log(myDate.toLocaleString().toString(19,3))
  let data = {
    film_name: req.body.film_name,
    image_url: req.body.image_url,
    url: req.body.url,
    url_hash: req.body.url_hash,
    score: req.body.score,
    star: req.body.star,
    director: req.body.director,
    channel:req.body.channel,
    type_name: req.body.type_name,
    type_id: req.body.type_id,
    year: req.body.year,
    describe:req.body.describe,
    address: req.body.address,
    add_time: req.body.add_time || myDate.toLocaleString().toString(20,2),
    is_download: req.body.is_download,
    recommend: req.body.recommend,
    hot: req.body.hot,
  }
  mysql.query(`INSERT INTO ${filminfo} set ?`, data, (err, results) => {
    if (err) return console.log(err)
    res.json({
      code: '200'
    })
  } )
}