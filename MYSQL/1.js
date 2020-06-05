let mysql = require('mysql')
let Promise = require('bluebird')
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'studb'
})
connection.connect()
let query = Promise.promisify(connection.query).bind(connection)
query('SELECT * FROM account').then(result => {
    console.log(result)
})
// connection.query('SELECT * FROM account', function (err, result, fileds) {
//     console.log(err)
//     console.log(result)
//     console.log(fileds)
// })