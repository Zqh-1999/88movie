const express = require('express');

// 创建服务器
const app = express();

const router = express.Router()
const iCtrl = require('../controllers/iCtrl')
router.get('/', iCtrl.Index)
// router.get("/download", iCtrl.Download)

module.exports = router