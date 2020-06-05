const http = require('http')
// 请求（请求行 请求头 请求体）
// 相应（响应行 响应头 响应体）

// 特定的ip 端口号来监听请求
// js是单线程的 node 也是单线程的
let server = http.createServer((req, res) => {
    res.end('hello')
})
// server.emit('request', request, response)
// server.on('request', (req, res) => {
//     console.log('请求到来时执行此方法2')
// })
// 每次更改代码后需要重新启动服务
server.listen(3000, () => {
    console.log('server' )
})