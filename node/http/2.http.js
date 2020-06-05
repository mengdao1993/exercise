const http = require('http')
const url = require('url')
let server = http.createServer((req, res) => {
    let mothod = req.method.toLowerCase()
    console.log(mothod)
    let {pathname, query} = url.parse(req.url, true)
    console.log(pathname, query)
    let httpVersion = req.httpVersion
    // 直接获取请求头的信息（前部小写）
    console.log(req.headers['host'])
    // req 是可读流 on('data') on('end')
    let arr = []
    req.on('data', (chunk) => { // data 事件 只有传入数据时才会触发
        arr.push(chunk)
    })
    // 可读流如果读取不到数据 内部会push(null)
    req.on('end', () => {
        console.log(Buffer.concat(arr).toString())
        console.log(arr)
    })
    res.statusCode = 200 
    res.setHeader('Content-Type', 'text/plain; chrset=utf-8')
    // res.write('hello')
    res.end('hello') // 相当于 res.write('hello) res.end() 两行 必须写end方法，不然浏览器会一直转，不会关闭
    // 响应
    // 响应行 状态码
    // res.end('world')
})
let port = 3000
server.listen(port, () => {
    console.log('server' + port)
})
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        server.listen(++port)
    }
})