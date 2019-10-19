// 引入数据库
const mysql = require('../db/db')

// 设置表名
const order = 'cz_order'

// 添加order
module.exports.addOrder = (req, res) => {
  let myDate = new Date()
  let data = {
    order_num: req.body.order_num,
    add_time: req.body.add_time || myDate.getTime(),
    money: req.body.money,
    state: req.body.state
  }
  // 插入数据库的语句
  mysql.query(`INSERT INTO ${order} SET ?;UPDATE ca_user SET ? where id = (SELECT user_id FORM cz_recharge WHERE order_id = (SELECT id FROM ${order} WHERE order_num = ?));`,
    [data, data.order_num], (err, results) => {
      console.log(results)
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

// 删除多个order
module.exports.deleteOrder = (req, res) => {
  let idArr = req.query.idArr
  let a = idArr.length
  let add = '?'
  for (let i = 2; i <= a; i++) {
    add = add + ',?'
  }
  let adds = (add)
  // 删除order的sql语句
  mysql.query(`DELETE FROM ${order} WHERE id in (${adds})`, idArr, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: 'order不存在'
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

// 删除多个order
module.exports.deleteOrders = (req, res) => {
  // 删除order的sql语句
  mysql.query(`DELETE FROM ${order} WHERE id in ?`, req.query.user_id, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: 'order不存在'
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

// 查询单个ID/回显order
module.exports.inquireOrder = (req, res) => {
  // 查询单个ID/回显order的sql语句
  console.log(req.params.id)
  mysql.query(`SELECT * FROM ${order} WHERE user_id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    if (results.length == 0) {
      res.json({
        code: '400',
        msg: '查询的order不存在'
      })
    } else {
      res.json({
        code: '200',
        data: results
      })
    }
  })
}

// 查询多个order
module.exports.inquireOrders = (req, res) => {
  let page = req.query.page || 1
  let pagenum = req.query.pagenum - 0 || 5
  let fistPer = (page - 1) * pagenum - 0
  let sortWhere = req.query.sorty || 'add_time'
  let sortRule = req.query.sortway || 'asc'
  if (req.query.ordername.length == 0) {
    mysql.query(`SELECT * FROM ${order} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, pagenum], (err, results) => {
      if (err) return console.log(err)
      res.json({
        code: '200',
        data: results,
      })
    })
  } else {
    mysql.query(`SELECT * FROM ${order} WHERE ordername like ? or phone like ? order by ? ? limit ?, ?`,
      [req.query.ordername.length == 0 ? null : `%${req.query.ordername}%`, req.query.phone.length == 0 ? null : `%${req.query.phone}%`, sortWhere, sortRule, fistPer, pagenum], (err, results) => {
        if (err) return console.log(err)
        if (results.length == 0) {
          res.json({
            code: '400',
          })
        } else {
          res.json({
            code: '200',
            data: results,
          })
        }
      })
  }
}