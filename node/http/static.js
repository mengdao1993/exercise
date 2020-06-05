// 我希望用户通过浏览器访问内容可以直接回显
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const mime = require('mime')
let server = http.createServer((req, res) => {
    let {pathname, query} = url.parse(req.url, true)
    const absPath = path.join(__dirname, pathname)
    // 我要先检测这个路径是不是目录，如果是目录默认查找index.html 如果是文件直接返回
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            res.statusCode = 404
            res.end('Not Found')
            return
        }
        if (statObj.isFile()) {
            fs.readFile(absPath, (err, data) => {
                res.setHeader('Content-Type', mime.getType(absPath) + 'charset=utf-8')
                res.end(data)
            })
        } else {
            fs.readFile(path.join(absPath, 'index.html'), (err, data) => {
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(data)
            })
        }
    })
})
server.listen(3000)
