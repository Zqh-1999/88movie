const express=require('express');
// 2.使用Router来创建路由
const router = express.Router();
const controllerRegiste=require('../controller/registe');
router.get('/registe', controllerRegiste.registe);
module.exports = router;