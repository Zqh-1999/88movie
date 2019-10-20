const fs=require('fs')
// #region 文章发表 图片上传
module.exports.postAddUpload = (req, res) => {
    // console.log(req);
    fs.writeFile('./public/img/' + req.file.originalname, req.file.buffer, (error) => {
      if (error) {
        return console.log(error);
      }
      res.json({
        picAddr: '/img/' + req.file.originalname
      })
    })
  }