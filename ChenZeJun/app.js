const express = require('express');

// 创建服务器
const app = express();



// 1.设置静态资源目录
app.use(express.static('./public'));
// 监听端口 并启动服务
app.listen(8000, () => {
    console.log('server is running at http://localhost');
})
