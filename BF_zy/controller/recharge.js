// 引入数据库
const mysql = require('../db/db')

// 设置表名
const user = 'cz_user';
const order = "cz_order"



// // 查询所有会员
module.exports.inquirerechargeAll = (req, res) => {
    
mysql.query(`SELECT a.id,a.username,a.phone,a.head_img,a.sex,b.order_num,b.start_time,b.end_time FROM ${user} a INNER JOIN ${order} b ON a.id = b.user_id `,(err,result)=>{
    if(err)return console.log(err)
    if (results.length == 0) {
              res.json({
                code: '400',
                msg: '没有查到任何信息',
              })
            } else {
              res.json({
                code: '200',
                data: results
              })
            }
})
}

// // 查询多个会员(根据关键字搜索)
// module.exports.inquirerecharges = (req, res) => {
//   let page = req.query.page || 1
//   let per_page = req.query.per_page - 0 || 30
//   let fistPer = (page - 1) * per_page - 0
//   let sortWhere = req.query.sorty || 'id'
//   let sortRule = req.query.sortway || 'asc'
//   let keyWords = req.query.keywords == undefined ? '' : req.query.keywords
//   let keyWords1 = keyWords.length == 0 ? null : `%${keyWords}%`;
//   mysql.query(`SELECT * FROM ${recharge} WHERE recharge_name LIKE ? OR star LIKE ? OR director LIKE ? ORDER BY ? ? LIMIT ?, ?`,
//     [keyWords1, keyWords1, keyWords1, sortWhere, sortRule, fistPer, per_page], (err, results) => {
//       if (err) return console.log(err)
//       if (results.length == 0) {
//         res.json({
//           code: '400',
//           msg: '没有查到任何信息',
//         })
//       } else {
//         res.json({
//           code: '200',
//           data: results
//         })
//       }
//     })
// }



// 添加会员
// module.exports.addrecharge = (req, res) => {
//   let myDate = new Date()
//   // 获取前端数据
//   let data = {
//     user_id: req.body.user_id,
//     order_id: req.body.order_id,
//     start_time: req.body.start_time-0 || myDate.getTime(),
//     end_time: req.body.start_time-0 + 43200,
//   }
//   console.log(data)
  // 插入数据库的语句
//   mysql.query(`INSERT INTO ${recharge} SET ?`, data, (err, results) => {
//     if (err) return console.log(err)
//     // console.log(results)
//     if (results.affectedRows == 0) {
//         res.json({
//             code: '400'
//           })
//     } else if (results.affectedRows == 1) {
//         mysql.query(`UPDATE ${user} SET state = 0 WHERE id = ?`,data.user_id,(error,result)=>{
//             if(error) return console.log(error);
//             // 1常规用户   0会员
//             res.json({
//              code: '200'
//            })
//         })
//     } else {
//       res.json({
//         code: '10000',
//         msg: '未知错误,请自己检查'
//       })
//     }
//   })
// }

// // 删除会员
// module.exports.deleterecharge = (req, res) => {

//   let idArr = req.query.idArr
//   let a = idArr.length
//   let add = '?'
//   for (let i = 2; i <= a; i++) {
//     add = add + ',?'
//   }
//   let adds = (add)
//   // 删除会员的sql语句
//   mysql.query(`DELETE FROM ${recharge} WHERE id in (${adds})`, idArr, (err, results) => {
//     // 错误
//     if (err) return console.log(err)
//     // 返回值
//     if (results.affectedRows == 0) {
//       res.json({
//         code: '400',
//         msg: '删除的会员不存在'
//       })
//     } else if (results.affectedRows == 1) {
//       res.json({
//         code: '200',
//         msg: '成功删除一个'
//       })
//     } else {
//       res.json({
//         code: '10000',
//         msg: '成功删除多个'
//       })
//     }
//   })
// }

// // 查询单个/回显会员
// module.exports.inquirerecharge = (req, res) => {
//   // 查询单个/回显会员的sql语句
//   mysql.query(`SELECT * FROM ${recharge} WHERE id = ?`, req.params.id, (err, results) => {
//     if (err) return console.log(err)
//     // console.log(results)
//     if (results.length === 0) {
//       res.json({
//         code: '400',
//         msg: '查询的会员不存在'
//       })
//     } else if (results.length == 1) {
//       res.json({
//         code: '200',
//         data: results[0]
//       })
//     } else {
//       res.json({
//         code: '10000',
//         msg: '未知错误,请自己检查'
//       })
//     }
//   })
// }

// // 修改会员
// module.exports.uprecharge = (req, res) => {
//   let myDate = new Date()
//   // 获取前端数据
// let data = {
//     user_id: req.body.user_id,
//     order_id: req.body.order_id,
//     start_time: req.body.start_time-0 || myDate.getTime(),
//     end_time: req.body.start_time-0 + 43200,
//   }
//   // 修改数据库的语句
//   mysql.query(`UPDATE ${recharge} SET ? WHERE id = ?`, [data, req.params.id], (err, results) => {
//     if (err) return console.log(err)
//     if (results.affectedRows == 0) {
//       res.json({
//         code: '400'
//       })
//     } else if (results.affectedRows == 1) {
//       res.json({
//         code: '200'
//       })
//     } else {
//       res.json({
//         code: '10000',
//         msg: '未知错误,请自己检查'
//       })
//     }
//   })
// }



// module.exports.inquirerecharges = (req, res) => {
//   let page = req.query.page || 1
//   let per_page = req.query.per_page - 0 || 30
//   let fistPer = (page - 1) * per_page - 0
//   let sortWhere = req.query.sorty || 'id'
//   let sortRule = req.query.sortway || 'asc'
//   let name1 = req.query.recharge_name == undefined ?  '' : req.query.recharge_name
//   let name = name1.length == 0 ? null : `%${req.query.recharge_name}%`;
//   let star1 = req.query.star ? req.query.star : ''
//   let star = star1.length == 0 ? null : `%${req.query.star}%`;
//   let director1 = req.query.director == undefined ? '' : req.query.director
//   let director = director1.length == 0 ? null : `%${req.query.director}%`;
//   console.log(name,star,director)
//   if (name1.length == 0 && star1.length == 0 && director1.length == 0) {
//     mysql.query(`SELECT * FROM ${recharge} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, per_page], (err, results) => {
//       if (err) return console.log(err)
//       res.json({
//         code: '200',
//         data: results,
//         total: results.length
//       })
//     })
//   } else {
//     mysql.query(`SELECT * FROM ${recharge} WHERE recharge_name like ? or star like ? or director like ? order by ? ? limit ?, ?`,
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