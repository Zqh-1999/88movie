const express=require('express');
//创建服务器
const app=express()
// 2.使用Router来创建路由
const router = express.Router();

const controllerVip=require('../controller/vip');

router.get('/', controllerVip.vip);
module.exports = router;