// 引入数据库
const mysql = require('../db/db')

// 设置表名
const leftmun = 'leftmun'

// 查询leftmun
module.exports.inquireLeft_mun = (req, res) => {
  // 查询leftmun的sql语句
  console.log(req.params.id)
  mysql.query(`SELECT * FROM ${leftmun}`, (err, results) => {
    if (err) return console.log(err)
    if (results.length == 0) {
      res.json({
        code: '400',
        msg: '查询的leftmun不存在'
      })
    } else {
      res.json({
        code: '200',
        data: results
      })
    }
  })
}