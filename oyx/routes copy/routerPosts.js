// 1.引入express包
const express = require('express');
// 2.使用Router来创建路由
const router = express.Router();
// 3.引入控制器模块
const CtrlPosts = require('../controllers/CtrlPosts');

// 4.1 显示文章管理页
router.get('/admin/posts', CtrlPosts.posts)
// 4.2 显示文字管理页 文章列表
router.get('/admin/postsShow', CtrlPosts.postsShow);


module.exports = router;