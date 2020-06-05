let mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'studb'
})
connection.connect()
// 开启事务
connection.beginTransaction(function (err) {
    if (err) throw err
    connection.query('update account set balance=balance-10 where id=1', function (err) {
        if (err) {
            connection.rollback();
            throw err
        } else {
            connection.query('update account set balance=balance+10 where id=2', function (err) {
                if (err) {
                    connection.rollback()
                    throw err
                } else {
                    connection.commit()
                }
            })
        }
    })
})