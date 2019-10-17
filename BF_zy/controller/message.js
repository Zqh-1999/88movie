// 引入数据库
const mysql = require('../db/db')

// 设置表名
const message = 'cz_message'

// 添加message
module.exports.addMessage = (req, res) => {
  let myDate = new Date()
  // 获取前端数据
  let data = {
    username: req.body.username,
    content: req.body.content,
    add_time: req.body.add_time || myDate.getTime(),
    user_id: req.body.user_id,
    film_id: req.body.film_id,
  }
  console.log(data)
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
  // let idArr = req.query.idArr
  let idArr = [9,10]
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
  let per_page = req.query.per_page - 0 || 10
  let fistPer = (page - 1) * per_page - 0
  let sortWhere = req.query.sorty || 'add_time' // 以什么排序
  let sortRule = req.query.sortway || 'desc' // 排序规则
  let filmID1 = req.query.film_id == undefined ? '' : req.query.film_id
  let filmID = filmID1.length == 0 ? null : filmID1
  mysql.query(`SELECT * FROM ${message} WHERE film_id = ? ORDER BY ? ? LIMIT ?, ?`,
    [filmID, sortWhere, sortRule, fistPer, per_page], (err, results) => {
      if (err) return console.log(err)
      res.json({
        code: '200',
        data: results,
        total: results.length,
        per_page
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