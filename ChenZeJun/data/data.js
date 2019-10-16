const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '39.106.158.169',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'film'
});

module.exports = connection;