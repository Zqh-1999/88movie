const conn = require('../data');
module.exports.posts = (req, res) => {
  if (!req.session.isLogin) {
    res.redirect('/admin/login');
    return;
  }
  res.render('posts');
}


module.exports.postsShow = (req, res) => {
  // 1.声明变量 pageNum
  let pageNum = req.query.pageNum;
  let pageSize = req.query.pageSize;
  let indexStart = (pageNum - 1) * pageSize;
  // console.log(req.query);

  conn.query(`SELECT count(*) as total from po,.sts; SELECT a.posts_id, a.posts_title,b.nickname,c.cate_name, a.posts_created,a.posts_status FROM posts AS a 
  LEFT JOIN users AS b ON a.user_id = b.id 
  LEFT JOIN category AS c ON a.category_id =c.cate_id LIMIT ${indexStart},${pageSize}`, (error, results) => {
      if (error) return console.log(error);
      // console.log(results);
      res.json({
        pageNum: pageNum,
        pageSize: pageSize,
        dataTotal: results[0][0].total,
        data: results[1]
      })
    });
}





