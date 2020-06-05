let mysql = require('mysql')
const pool = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'studb'
})
pool.query('SELECT 1+1 AS solution', (err, result, fields) => {
    console.log(result)
    console.log(fields)
})