// referrer referer
// 代表的资源的来源（可以做安全判断）
// 可以在服务队用当前的资源的host 和 referer 做对比如果不一致 说明这个资源就被其他的网址所引用
// 如果你就想用别人的你可以把图片爬下来，在去使用
const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const whiteList = ['a.zf.cn:3000']
const server = http.createServer((req, res) => {
    const {pathname} = url.parse(req.url, true)
    const absPath = path.join(__dirname, pathname)
    fs.stat(absPath, (err, statObj) => {
        if (err) {
            res.statusCode = 404
            res.end('Not Found')
            return
        }
        if (statObj.isFile()) {
            // 只有别人引用这张图片才有 referer 直接打开是没有referer
            if (/\.(png)|(jpg)/.test(absPath)) {
                let referer = req.headers['referer'] || req.headers['referrer']
                if (referer) { // 说明这个资源被引用了
                    let hostname = req.headers.host
                    referer = url.parse(referer).host
                    if (hostname !== referer && !whiteList.includes(referer)) {
                        let errorFile = path.join(__dirname, '2.jpg')
                        fs.createReadStream(errorFile).pipe(res)
                        return
                    }
                }
            }
            fs.createReadStream(absPath).pipe(res)
        } else {
            res.statusCode = 404
            res.end('Not Found')
            return
        }
    })
})
server.listen(3000)
