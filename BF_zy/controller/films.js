// 引入数据库
const mysql = require('../db/db')

// 设置表名
const filminfo = 'ca_filminfo'

// 添加影视
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

// 删除影视
module.exports.deleteFilm = (req, res) => {
  // 删除影视的sql语句
  mysql.query(`DELETE FROM ${filminfo} WHERE id = ?`, req.params.id, (err, results) => {
    // 错误
    if (err) return console.log(err)
    // 返回值
    if (results.affectedRows == 0) {
      res.json({
        code: '400',
        msg: '删除的影视不存在'
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

// 查询单个/回显影视
module.exports.inquireFilm = (req, res) => {
  // 查询单个/回显影视的sql语句
  mysql.query(`SELECT * FROM ${filminfo} WHERE id = ?`, req.params.id, (err, results) => {
    if (err) return console.log(err)
    // console.log(results)
    if (results.length === 0) {
      res.json({
        code: '400',
        msg: '查询的影视不存在'
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

// 修改影视
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
    subtype: req.body.subtype,
    year: req.body.year,
    describe: req.body.describe,
    address: req.body.address,
    add_time: req.body.add_time || myDate.getTime(),
    is_download: req.body.is_download,
    recommend: req.body.recommend,
    hot: req.body.hot,
  }
  console.log(data)
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

// 查询所有影视
module.exports.inquireFilmAll = (req, res) => {
  let page = req.query.page || 1
  let per_page = req.query.per_page - 0 || 30
  let fistPer = (page - 1) * per_page - 0
  let sortWhere = req.query.sorty || 'id' // 以什么排序
  let sortRule = req.query.sortway || 'asc' // 排序规则
  let typeName = req.query.type_name // 父类型
  let subtype = req.query.subtype == undefined ? '' : `AND subtype = ?`; // 子类型
  let year = req.query.year == undefined ? '' : `AND year = ?`; // 年份
  let address = req.query.address == undefined ? '' : `AND address = ?`; // 地区
  let recommend = req.query.recommend == undefined ? '' : `AND recommend = ?`; // 推荐
  let hot = req.query.hot == undefined ? '' : `AND hot = ?`; // 热门
  let dataArr = []
  dataArr.push(typeName)
  req.query.subtype == undefined ? null : dataArr.push(req.query.subtype); // 子类型
  req.query.year == undefined ? null : dataArr.push(req.query.year); // 年份
  req.query.address == undefined ? null : dataArr.push(req.query.address); // 地区
  req.query.recommend == undefined ? null : dataArr.push(req.query.recommend); // 推荐
  req.query.hot == undefined ? null : dataArr.push(req.query.hot); // 热门
  dataArr.push(typeName)
  req.query.subtype == undefined ? null : dataArr.push(req.query.subtype); // 子类型
  req.query.year == undefined ? null : dataArr.push(req.query.year); // 年份
  req.query.address == undefined ? null : dataArr.push(req.query.address); // 地区
  req.query.recommend == undefined ? null : dataArr.push(req.query.recommend); // 推荐
  req.query.hot == undefined ? null : dataArr.push(req.query.hot); // 热门
  dataArr.push(sortWhere)
  dataArr.push(sortRule)
  dataArr.push(fistPer)
  dataArr.push(per_page)
  console.log(dataArr)
  mysql.query(`SELECT COUNT(*) AS total FROM ${filminfo} WHERE type_name = ? ${subtype} ${year} ${address} ${recommend} ${hot}; SELECT * FROM ${filminfo} WHERE type_name = ? ${subtype} ${year} ${address} ${recommend} ${hot} ORDER BY ? ? LIMIT ?, ?`,
    dataArr, (err, results) => {
      if (err) return console.log(err)
      console.log(results)
      res.json({
        code: '200',
        data: results[1],
        total: results[0][0].total,
        per_page
      })
    })

}

// 查询多个影视(根据关键字搜索)
module.exports.inquireFilms = (req, res) => {
  let page = req.query.page || 1
  let per_page = req.query.per_page - 0 || 30
  let fistPer = (page - 1) * per_page - 0
  let sortWhere = req.query.sorty || 'id'
  let sortRule = req.query.sortway || 'asc'
  let keyWords = req.query.keyWords
  // console.log(req.query)
  mysql.query(`SELECT count(*) as total FROM ${filminfo} WHERE film_name LIKE ?;SELECT * FROM ${filminfo} WHERE film_name LIKE ? ORDER BY ? ? LIMIT ?, ?`,
    [`%${keyWords}%`, `%${keyWords}%`, sortWhere, sortRule, fistPer, per_page], (err, results) => {
      console.log(results)
      if (err) return console.log(err)
      if (results.length == 0) {
        res.json({
          code: '400',
          msg: '没有查到任何信息',
        })
      } else {
        res.json({
          code: '200',
          data: results[1],
          total: results[0][0].total,
          per_page
        })
      }
    })
}




module.exports.inquireFilmallinfo = (req, res) => {
  let page = req.query.page - 0
  let per_page = req.query.per_page - 0
  let fistPage = (page - 1) * per_page
  mysql.query(`SELECT COUNT(*) total FROM ${filminfo} order by id asc; SELECT * FROM ${filminfo} order by id asc limit ?,?`, [fistPage, per_page], (err, results) => {
    if (err) console.log(err)
    res.json({
      code: 200,
      data: results[1],
      total: results[0][0].total,
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
//     mysql.query(`SELECT * FROM ${filminfo} order by ? ? limit ?, ?`, [sortWhere, sortRule, fistPer, per_page], (err, results) => {
//       if (err) return console.log(err)
//       res.json({
//         code: '200',
//         data: results,
//         total: results.length
//       })
//     })
//   } else {
//     mysql.query(`SELECT * FROM ${filminfo} WHERE film_name like ? or star like ? or director like ? order by ? ? limit ?, ?`,
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