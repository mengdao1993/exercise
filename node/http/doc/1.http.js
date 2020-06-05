const http = require('http')
// 请求（请求行 请求头 请求体）
// 相应（相应行 相应头 相应体）
// 特定的ip 端口号来禁停请求
let server = http.createServer((request, response) => {
    console.log(request.url)
})
let port = 3000
// server.emit('request', (request, response))
// server.on('request', (request, response) => {
//     console.log('请求到来时执行的方法2')
// })
// 每次更改代码后，需要重新启动服务
server.listen(port, () => {
    console.log('server start' + port)
})
server.on('error', (err) => {
    if(err.code === 'EADDRINUSE') {
        server.listen(++port)
    }
})