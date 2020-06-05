let fs = require('fs')
let path = require('path')
let WriteStream = require('./WriteStream')
let ws = new WriteStream(path.resolve(__dirname, 'name.txt'), {
// let ws = fs.createWriteStream(path.resolve(__dirname, 'name.txt'), {
    autoClose: true,
    flags: 'w',
    mode: 0o666,
    highWaterMark: 3,
    encoding: 'utf8'
})
ws.on('open', (fd) => {
    console.log(fd)
})
let flag = ws.write('1','utf8', function (err, data) {
    console.log('ok1')
})
ws.write('3', 'utf8', function (err, data) {
    console.log('ok2')
})
ws.write('4', 'utf8', function (err, data) {
    console.log('ok3')
})