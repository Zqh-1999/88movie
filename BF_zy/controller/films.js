// 引入数据库
const mysql = require('../db/db')

// 设置表名
const filminfo = 'ca_filminfo'

// 添加影片
module.exports.addFilm = (req, res) => {
  mysql.query(`SELECT * FROM ${filminfo} WHERE film_name = ?`, req.body.film_name, (err, results) => {
    if (err) return console.log(err)
    console.log(results)
    // res.json({

    // })
  })
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
  mysql.query(`INSERT INTO ${filminfo} SET ?`, data, (err, results) => {
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
  // 删除影片的sql语句
  mysql.query(`DELETE FROM ${filminfo} WHERE id = ?`, req.params.id, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: '删除的影片不存在'
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

// 查询单个/回显影片
module.exports.inquireFilm = (req, res) => {
  // 查询单个/回显影片的sql语句
  mysql.query(`SELECT * FROM ${filminfo} WHERE id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    // console.log(results)
    if (results.length === 0) {
      res.json({
        code: '400',
        msg: '查询的影片不存在'
      })
    } else if (results.length == 1) {
      res.json({
        code: '200',
        data: results[0]
      })
    } else {
      res.json({
        code: '10000',
        msg: '未知错误,请自己检查'
      })
    }
  })
}

// 修改影片
module.exports.upFilm = (req, res) => {
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
  // 修改数据库的语句
  mysql.query(`UPDATE ${filminfo} SET ? WHERE id = ?`, [data, req.params.id], (err, results) => {
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

// 查询多个影片
module.exports.inquireFilms = (req, res) => {
  let page = req.query.page || 1
  let per_page = req.query.per_page - 0 || 30
  let fistPer = (page - 1) * per_page - 0
  let sortWhere = req.query.sorty || 'id'
  let sortRule = req.query.sortway || 'asc'
  const name = req.query.film_name;
  const star = req.query.star;
  const director = req.query.director;
  if (name.length == 0 && star.length == 0 && director == 0) {
    mysql.query(`SELECT * FROM ${filminfo} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, per_page], (err, results) => {
      if (err) return console.log(err)
      res.json({
        code: '200',
        data: results,
        total: results.length
      })
    })
  } else {
    mysql.query(`SELECT * FROM ${filminfo} WHERE film_name like ? or star like ? or director like ? order by ? ? limit ?, ?`,
      [req.query.film_name.length == 0 ? null : `%${req.query.film_name}%`, req.query.star.length == 0 ? null : `%${req.query.star}%`, req.query.director.length == 0 ? null : `%${req.query.director}%`, sortWhere, sortRule, fistPer, per_page], (err, results) => {
        if (err) return console.log(err)
        if (results.length == 0) {
          res.json({
            code: '400',
            data: '抱歉,没有此信息'
          })
        } else {
          res.json({
            code: '200',
            data: results,
            total: results.length
          })
        }
      })
  }
}