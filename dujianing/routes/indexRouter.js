const express = require('express');

// 创建服务器
const app = express();

const router = express.Router()
const IndexCtrl = require('../controllers/IndexCtrl')
router.get('/', IndexCtrl.Index)
router.get("/download", IndexCtrl.Download)

module.exports = router