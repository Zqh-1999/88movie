// 引入数据库
const mysql = require('../db/db')

// 设置表名
const admin = 'admin'

// 添加admin
module.exports.addAdmin = (req, res) => {
  let data = {
    admin_name: req.body.admin_name,
    admin_password: req.body.admin_password,
    admin_phone: req.body.admin_phone
  }
  // 插入数据库的语句
  mysql.query(`INSERT INTO ${admin} SET ?`, data, (err, results) => {
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

// 删除admin
module.exports.deleteAdmin = (req, res) => {
  // 删除admin的sql语句
  mysql.query(`DELETE FROM ${admin} WHERE id = ?`, req.params.id, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: 'admin不存在'
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

// 查询单个/回显admin
module.exports.inquireAdmin = (req, res) => {
  // 查询单个/回显admin的sql语句
  mysql.query(`SELECT * FROM ${admin} WHERE id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    if (results.length == 0) {
      res.json({
        code: '400',
        msg: '查询的admin不存在'
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

// 修改admin
module.exports.upAdmin = (req, res) => {
  // 获取前端修改的数据
  let data = {
    admin_name: req.body.admin_name,
    admin_password: req.body.admin_password,
    admin_phone: req.body.admin_phone,
  }
  console.log(req)
  // 修改数据库的语句
  mysql.query(`UPDATE ${admin} SET ? WHERE id = ?`, [data, req.params.id], (err, results) => {
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

// 查询多个admin
module.exports.inquireAdmins = (req, res) => {
  let page = req.query.page || 1
  let per_page = req.query.per_page - 0 || 5
  // console.log(per_page)
  let fistPer = (page - 1) * per_page - 0
  let sortWhere = req.query.sorty || 'id'
  let sortRule = req.query.sortway || 'asc'
  const name = req.query.admin_name;
  if (name.length == 0) {
    mysql.query(`SELECT * FROM ${admin} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, per_page], (err, results) => {
      if (err) return console.log(err)
      res.json({
        code: '200',
        data: results,
        total: results.length
      })
    })
  } else {
    mysql.query(`SELECT * FROM ${admin} WHERE admin_name like ? order by ? ? limit ?, ?`,
      [req.query.admin_name.length == 0 ? null : `%${req.query.admin_name}%`, sortWhere, sortRule, fistPer, per_page], (err, results) => {
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

// 登录
module.exports.loginAdmin = (req, res) => {
  let admin_name = req.body.admin_name
  let admin_password = req.body.admin_password
  mysql.query(`SELECT * FROM ${admin} WHERE admin_name = ? AND admin_password =?`, [admin_name, admin_password], (err, results) => {
    if (err) return console.log(err)
    // console.log(results)
    if (results.length == 0) {
      res.json({
        code: '400',
        msg: '账号或密码错误'
      })
    } else if (results.length == 1) {
      res.json({
        code: '200',
        msg: '登陆成功'
      })
    } else {
      res.json({
        code: '10000',
        msg: '未知错误'
      })
    }
  })
}