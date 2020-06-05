// 中间层 可以解决跨域问题
const http = require('http')
let options = {
    port: 3001,
    hostname: 'localhost',
    pathname: '/?a=1',
    method: 'post'
}
let client = http.request(options, function(res) {
    let arr = []
    res.on('data', function (chunk) {
        arr.push(chunk)
    })
    res.on('end', function () {
        console.log(Buffer.concat(arr).toString())
    })
})
client.end('world')