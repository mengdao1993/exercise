// 中间层 可以解决跨域问题
const http = require('http')
// 爬虫
let options = {
    port: 3000,
    hostname: 'localhost',
    path: '/xxx?a=1',
    method: 'post'
}
// get方法只能是get方法
// request 请求
let myServer = http.createServer((request, response) => {
    let client = http.request(options, function (res){ // res就是可读流
        let arr = []
        res.on('data', function (chunk) { // data 事件 只有传入数据时才会触发
            arr.push(chunk)
        })
        // 可读流如果读取不到数据 内部会push(null)
        res.on('end', () => {
            response.end(Buffer.concat(arr).toString() + 'world')
        })
    })
    client.end('hello')
})
myServer.listen(3001)
// console.log(client)


// {
//     _eventsCount: 2,
//     _maxListeners: undefined,
//     outputData: [],
//     outputSize: 0,
//     writable: true,
//     _last: true,
//     chunkedEncoding: false,
//     shouldKeepAlive: false,
//     useChunkedEncodingByDefault: false,
//     sendDate: false,
//     _removedConnection: false,
//     _removedContLen: false,
//     _removedTE: false,
//     _contentLength: null,
//     _hasBody: true,
//     _trailer: '',
//     finished: false,
//     _headerSent: false,
//     socket: null,
//     connection: null,
//     _header: null,
//     _onPendingData: [Function: noopPendingOutput],
//     socketPath: undefined,
//     method: 'GET',
//     insecureHTTPParser: undefined,
//     path: '/',
//     _ended: false,
//     res: null,
//     aborted: false,
//     timeoutCb: null,
//     upgradeOrConnect: false,
//     parser: null,
//     maxHeadersCount: null,
//     reusedSocket: false,
//     }
//   }