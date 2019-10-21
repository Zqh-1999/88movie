const express = require('express');

// 创建服务器
const app = express();

const router = express.Router()
const IndexCtrl = require('../controllers/IndexCtrl')
router.get('/', IndexCtrl.Index)

module.exports = router