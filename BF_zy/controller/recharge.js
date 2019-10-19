// 引入数据库
const mysql = require('../db/db')

// 设置表名
const user = 'cz_user';
const order = "cz_order"



// // 查询所有会员
module.exports.inquirerechargeAll = (req, res) => {
  mysql.query(`SELECT a.id,a.username,a.phone,a.head_img,a.sex,b.order_num,b.start_time,b.end_time FROM ${user} a INNER JOIN ${order} b ON a.id = b.user_id where a.state='1' `, (err, result) => {
    if (err) return console.log(err)
    if (result.length == 0) {
      res.json({
        code: '400',
        msg: '没有查到任何信息',
      })
    } else {
      res.json({
        code: '200',
        data: result
      })
    }
  })
}


// 添加会员
module.exports.addrecharge = (req, res) => {
  let myDate = new Date()
  let mouns = req.body.money / 5
  // 获取前端数据
  let data = {
    order_num: myDate.getTime() / 1000,
    add_time: myDate.getTime(),
    money: req.body.money,
    state: 1,
    user_id: req.body.user_id,
    start_time: myDate.getTime(),
    end_time: myDate.getTime() + 2592000 * mouns,
  }
  // 插入数据库的语句
  mysql.query(`SELECT * FROM ${order} WHERE user_id = ?`, data.user_id, (err, results) => {
    if (err) return console.log(err)
    if (results.length != 0) {
      mysql.query(`DELETE FROM ${order} WHERE user_id = ?`, data.user_id, (err, results) => {
        if (err) return console.log(err)
        mysql.query(`INSERT INTO ${order} SET ?`, data, (err, results) => {
          if (err) console.log(err)
          if (results.length != 0) {
            res.json({
              code: '200',
              msg: 'OK'
            })
          }
        })
      })
    } else {
      mysql.query(`INSERT INTO ${order} SET ?`, data, (err, results) => {
        if (err) console.log(err)
        if (results.length != 0) {
          res.json({
            code: '200',
            msg: 'OK'
          })
        }
      })
    }
  })
}

