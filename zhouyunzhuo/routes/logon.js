const express=require('express');
// 2.使用Router来创建路由
const router = express.Router();
const controllerLogon=require('../controller/logon');
router.get('/logon', controllerLogon.logon);
module.exports = router;