const http = require('http')
const url = require('url')
// 请求（请求行 请求头 请求体）
// 相应（相应行 相应头 相应体）
// 特定的ip 端口号来禁停请求
let server = http.createServer((request, response) => {
    let mothod = request.method.toLowerCase() //  请求方法都是大写的
    console.log('mothod', mothod)
    let {pathname, query} = url.parse(request.url, true)
    console.log(pathname, query)
    // request 是一个可读流 on('data') on('end')
    let arr = []  //  tcp是分段传输
    request.on('data', (chunk) => { // data 事件 只有传入数据时才触发
        arr.push(chunk)
    })
    // 可读流如果读取不到数据 内部会push(null)
    request.on('end', () => { //end 事件肯定会触发
        console.log(Buffer.concat(arr).toString()) 
    })
})

let port = 3000
server.listen(port, () => {
    console.log('server start' + port)
})
server.on('error', (err) => {
    if(err.code === 'EADDRINUSE') {
        server.listen(++port)
    }
})