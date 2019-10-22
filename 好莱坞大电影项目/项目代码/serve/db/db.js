const mysql = require('mysql')

const create = mysql.createConnection({
  port: 3306,
  host: '39.106.158.169',
  user: 'root',
  password: '123456',
  database: 'cz_film',
  multipleStatements: true
})

module.exports = create