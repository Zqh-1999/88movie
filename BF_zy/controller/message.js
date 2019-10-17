// 引入数据库
const mysql = require('../db/db')

// 设置表名
const message = 'ca_message'

// 添加message
module.exports.addMessage = (req, res) => {
  mysql.query(`SELECT * FROM ${message} WHERE film_name = ?`, req.body.film_name, (err, results) => {
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
  mysql.query(`INSERT INTO ${message} SET ?`, data, (err, results) => {
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

// 删除message
module.exports.deleteMessage = (req, res) => {

  let idArr = req.query.idArr
  let a = idArr.length
  let add = '?'
  for (let i = 2; i <= a; i++) {
    add = add + ',?'
  }
  let adds = (add)
  // 删除message的sql语句
  mysql.query(`DELETE FROM ${message} WHERE id in (${adds})`, idArr, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: '删除的message不存在'
      })
    } else if (results.affectedRows == 1) {
      res.json({
        code: '200',
        msg: '成功删除一个'
      })
    } else {
      res.json({
        code: '10000',
        msg: '成功删除多个'
      })
    }
  })
}

// 查询所有message
module.exports.inquireMessageAll = (req, res) => {
  let page = req.query.page || 1
  let per_page = req.query.per_page - 0 || 30
  let fistPer = (page - 1) * per_page - 0
  let sortWhere = req.query.sorty || 'id' // 以什么排序
  let sortRule = req.query.sortway || 'asc' // 排序规则
  let typeName = req.query.type_name // 父类型
  let subtype1 = req.query.subtype == undefined ? '' : req.query.subtype // 子类型
  let subtype = subtype1.length == 0 ? null : `%${req.query.subtype}%`; // 子类型
  let year1 = req.query.year ? req.query.year : '' // 年份
  let year = year1.length == 0 ? null : `%${req.query.year}%`; // 年份
  let address1 = req.query.address == undefined ? '' : req.query.address // 地区
  let address = address1.length == 0 ? null : `%${req.query.address}%`; // 地区
  mysql.query(`SELECT * FROM ${message} WHERE type_name = ? AND subtype = ? OR year = ? OR address = ? ORDER BY ? ? LIMTI ?, ?`,
    [typeName, subtype, year, address, sortWhere, sortRule, fistPer, per_page], (err, results) => {
      if (err) return console.log(err)
      res.json({
        code: '200',
        data: results,
        total: results.length,
        page_page
      })
    })
}







// module.exports.inquireFilms = (req, res) => {
//   let page = req.query.page || 1
//   let per_page = req.query.per_page - 0 || 30
//   let fistPer = (page - 1) * per_page - 0
//   let sortWhere = req.query.sorty || 'id'
//   let sortRule = req.query.sortway || 'asc'
//   let name1 = req.query.film_name == undefined ?  '' : req.query.film_name
//   let name = name1.length == 0 ? null : `%${req.query.film_name}%`;
//   let star1 = req.query.star ? req.query.star : ''
//   let star = star1.length == 0 ? null : `%${req.query.star}%`;
//   let director1 = req.query.director == undefined ? '' : req.query.director
//   let director = director1.length == 0 ? null : `%${req.query.director}%`;
//   console.log(name,star,director)
//   if (name1.length == 0 && star1.length == 0 && director1.length == 0) {
//     mysql.query(`SELECT * FROM ${message} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, per_page], (err, results) => {
//       if (err) return console.log(err)
//       res.json({
//         code: '200',
//         data: results,
//         total: results.length
//       })
//     })
//   } else {
//     mysql.query(`SELECT * FROM ${message} WHERE film_name like ? or star like ? or director like ? order by ? ? limit ?, ?`,
//       [name, star, director, sortWhere, sortRule, fistPer, per_page], (err, results) => {
//         if (err) return console.log(err)
//         if (results.length == 0) {
//           res.json({
//             code: '400',
//             data: '抱歉,没有此信息'
//           })
//         } else {
//           res.json({
//             code: '200',
//             data: results,
//             total: results.length
//           })
//         }
//       })
//   }
// }