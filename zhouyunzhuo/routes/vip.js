const express=require('express');

// 2.使用Router来创建路由
const router = express.Router();

const controllerVip=require('../controller/vip');

router.get('/', controllerVip.vip);
module.exports = router;