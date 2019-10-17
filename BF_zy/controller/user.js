// 引入数据库
const mysql = require('../db/db')

// 设置表名
const user = 'cz_user'

// 添加user
module.exports.addUser = (req, res) => {
  let myDate = new Date()
  // 填入数据库的数据
  let data = {
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    head_img: req.body.head_img,
    sex: req.body.sex,
    state: req.body.state,
    add_time: req.body.add_time || myDate.getTime(),
  }
  // 查看有没有重复的用户
  mysql.query(`SELECT * FROM ${user} WHERE username = ?`, data.username, (err, results) => {
    if (err) return console.log(err)
    if (results.length == 1) {
      res.json({
        code: '400',
        msg: '用户已存在'
      })
    } else {
      // 没有重复的就把用户插入数据库
      mysql.query(`INSERT INTO ${user} SET ?`, data, (err, results) => {
        if (err) return console.log(err)
        if (results.affectedRows == 0) {
          res.json({
            code: '400',
            msg: '注册失败'
          })
        } else if (results.affectedRows == 1) {
          res.json({
            code: '200',
            msg: '注册成功'
          })
        } else {
          res.json({
            code: '10000',
            msg: '未知错误,请自己检查'
          })
        }
      })
    }
  })
}

// 删除user
module.exports.deleteUser = (req, res) => {
  let idArr = req.query.idArr
  let a = idArr.length
  let add = '?'
  for (let i = 2; i <= a; i++) {
    add = add + ',?'
  }
  let adds = (add)
  // 删除user的sql语句
  mysql.query(`DELETE FROM ${user} WHERE id in (${adds})`, idArr, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: 'user不存在'
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

// 查询单个/回显user
module.exports.inquireUser = (req, res) => {
  // 查询单个/回显user的sql语句
  mysql.query(`SELECT * FROM ${user} WHERE id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    if (results.length == 0) {
      res.json({
        code: '400',
        msg: '查询的user不存在'
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

// 修改user
module.exports.upUser = (req, res) => {
  // 获取前端修改的数据
  let data = {
    username: req.body.username,
    password: req.body.password,
    phone: req.body.phone,
    head_img: req.body.head_img,
    sex: req.body.sex,
    state: req.body.state,
    add_time: req.body.add_time,
  }
  // 修改数据库的语句
  mysql.query(`UPDATE ${user} SET ? WHERE id = ?`, [data, req.params.id], (err, results) => {
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

// 查询多个user
module.exports.inquireUsers = (req, res) => {
  let page = req.query.page || 1
  let pagenum = req.query.pagenum - 0 || 5
  let fistPer = (page - 1) * pagenum - 0
  let sortWhere = req.query.sorty || 'add_time'
  let sortRule = req.query.sortway || 'asc'
  let name1 = req.query.username == undefined ?  '' : req.query.username
  let name = name1.length == 0 ?  null : `%${req.query.username}%`
  if (name == null) {
    mysql.query(`SELECT * FROM ${user} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, pagenum], (err, results) => {
      if (err) return console.log(err)
      res.json({
        code: '200',
        data: results,
        total: results.length
      })
    })
  } else {
    mysql.query(`SELECT * FROM ${user} WHERE username like ? order by ? ? limit ?, ?`,
      [name, sortWhere, sortRule, fistPer, pagenum], (err, results) => {
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