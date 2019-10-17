// 引入数据库
const mysql = require('../db/db')

// 设置表名
const history = 'cz_history'

// 添加history
module.exports.addHistory = (req, res) => {
  let myDate = new Date()
  let data = {
    user_id: req.body.user_id,
    film_id: req.body.film_id,
    add_time: req.body.add_time || myDate.getTime(),
  }
  // 插入数据库的语句
  mysql.query(`INSERT INTO ${history} SET ?`, data, (err, results) => {
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

// 删除history
module.exports.deleteHistory = (req, res) => {
  let idArr = req.query.idArr
  let a = idArr.length
  let add = '?'
  for (let i = 2; i <= a; i++) {
    add = add + ',?'
  }
  let adds = (add)
  // 删除history的sql语句
  mysql.query(`DELETE FROM ${history} WHERE in (${adds})`, idArr, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: 'history不存在'
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

// 查询单个ID/回显history
module.exports.inquireHistory = (req, res) => {
  // 查询单个ID/回显history的sql语句
  console.log(req.params.id)
  mysql.query(`SELECT * FROM ${history} WHERE user_id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    if (results.length == 0) {
      res.json({
        code: '400',
        msg: '查询的history不存在'
      })
    } else {
      res.json({
        code: '200',
        data: results
      })
    }
  })
}

// // 查询多个history
// module.exports.inquireHistorys = (req, res) => {
//   let page = req.query.page || 1
//   let pagenum = req.query.pagenum - 0 || 5
//   let fistPer = (page - 1) * pagenum - 0
//   let sortWhere = req.query.sorty || 'add_time'
//   let sortRule = req.query.sortway || 'asc'
//   if (req.query.historyname.length == 0) {
//     mysql.query(`SELECT * FROM ${history} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, pagenum], (err, results) => {
//       if (err) return console.log(err)
//       res.json({
//         code: '200',
//         data: results,
//         total: results.length
//       })
//     })
//   } else {
//     mysql.query(`SELECT * FROM ${history} WHERE historyname like ? or phone like ? order by ? ? limit ?, ?`,
//       [req.query.historyname.length == 0 ? null : `%${req.query.historyname}%`, req.query.phone.length == 0 ? null : `%${req.query.phone}%`, sortWhere, sortRule, fistPer, pagenum], (err, results) => {
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