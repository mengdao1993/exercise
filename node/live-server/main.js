const http = require('http')
const fs = require('fs').promises
const path = require('path')
const url = require('url')
const mime = require('mime')
const ejs = require('ejs')
const { promisify } = require('util')
const { createReadStream, readFile } = require('fs')
const crypto = require('crypto')
const zlib = require('zlib')
// 可以统一将异步转化成promises
let renderFile = promisify(ejs.renderFile)
const merge = (config) => {
    return {
        port: 3000,
        directory: process.cwd(),
        ...config
    }
}
class Server {
    constructor(config) {
        this.config = merge(config)
    }
    async handleRequest(req, res) {
        // 处理是文件还是文件夹
        let { pathname } = url.parse(req.url)
        pathname = decodeURIComponent(pathname) // 对路径进行解码
        let absPath = path.join(this.config.directory, pathname)
        try {
            let statObj = await fs.stat(absPath)
            if (statObj.isFile()) {
                await this.sendFile(req, res, absPath, statObj)
            } else {
                // 文件夹
                let arr = await fs.readdir(absPath)
                // 需要根据这个dirs 生产一个html字符串将它渲染到页面上
                // underscore handlebars jade ejs nunjucks
                let dirs = arr.map(item => {
                    return {
                        path: path.join(pathname, item),
                        dir: item
                    }
                })
                let r = await renderFile(path.resolve(__dirname, 'template.html'), { arr: dirs }
                )
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(r)
            }
        } catch (e) {
            this.sendError(req, res, e)
        }
    }
    async cache(req, res, absPath, statObj) {
        try {
            res.setHeader('Expires', new Date(Date.now() + 10 * 1000).toGMTString())
            res.setHeader('Cache-control', 'no-cache')
            let fileContent = await fs.readFile(absPath)
            let ifNoneMatch = req.headers['if-none-match']
            let ifModifiedSince = req.headers['if-modified-since']// 浏览器给的
            let etag = crypto.createHash('md5').update(fileContent).digest('base64')
            let ctime = statObj.ctime.toGMTString()
            // 对比缓存，服务端和浏览器的文件做一个对比，判断一下是否需要进行缓存，last-modified 不精准的问题，可以使用etag指纹（独一无二的）
            
            res.setHeader('Last-Modified', ctime)
            res.setHeader('Etag', etag)
            let flag = true
            // 先走强制缓存 再走对比缓存（比较指纹 比较最后修改时间 都符合就是说明文件没有修改）
            if (ifNoneMatch !== etag) { // 不会直接取完整的
                return false
            }
            if (ctime !== ifModifiedSince) { // 如果不一致则返回新文件，如果时间一致则找浏览器缓存
                return false
            }
            return flag
        } catch (e) {
            console.log('-----', e)
        }
    }
    gzip (req, res, absPath, statObj) {
        // 浏览器告诉服务端我能做那些压缩，服务器会根据浏览器的支持情况做对应的压缩处理
        let encoding = req.headers['accept-encoding']
        if (encoding.includes('gzip')) {
            res.setHeader('Content-Encoding', 'gzip')
            return zlib.createGzip()
        } else if (encoding.includes('deflate')) {
            res.setHeader('Content-Encoding', 'deflate')
            return zlib.createDeflate()
        }
        return false
    }
    async sendFile(req, res, absPath, statObj) {
        // 1.强制缓存服务端可以设置 当前请求发送完毕后 如果再发送请求，我可以设置再某段事件之内不会在向服务端发起请求，去浏览器中查找
        // expries 过期事件 是一个绝对的时间 Cache-control
        // res.setHeader('Expires', new Date(Date.now() + 50*1000).toGMTString())
        // no-cache 表示浏览器有缓存 但是请求时会请求服务器
        // no-store 表示浏览器没缓存
        // 首页必须发送请求，首页引用的资源可以实现强制缓存
        // 如果10秒内文件发生变化，需要返回最新的文件
        // res.setHeader('Cache-control', 'max-age=50') // 强制缓存会导致文件更新，显示可能不是最新的
        // res.setHeader('Cache-control', 'no-store') // 每次都会请求服务器
        // res.setHeader('Cache-control', 'no-cache')
        let cache = await this.cache(req, res, absPath, statObj)
        if (cache) {
            // 服务器告诉浏览器走缓存
            res.statusCode = 304
            res.end()
            return
        }
        res.setHeader('Content-Type', mime.getType(absPath) || 'text/plain' + ';charset=utf-8')
        let gzip = this.gzip(req, res, absPath, statObj) // 转化流
        if(gzip) {
            createReadStream(absPath).pipe(gzip).pipe(res)
        } else {
            createReadStream(absPath).pipe(res)
        }
        // createReadStream(absPath).pipe(res)
    }
    sendError(req, res, e) {
        res.statusCode = 404
        res.end('Not Found')
    }
    start() { // this应该指向当前实例
        // 如果不进行bing绑定，this默认是http.createServer
        let server = http.createServer(this.handleRequest.bind(this))
        server.listen(this.config.port)
    }
}
module.exports = Server