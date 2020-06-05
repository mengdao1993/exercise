const url = require('url')
let request = {
    get url() {
        // 这里的this 值代的是 ctx.request 因为使用的时候是通过ctx.request.url来使用的
        return this.req.url
    },
    get path () {
        return url.parse(this.req.url).pathname
    },
    get query () {
        return url.parse(this.req.url).query
    }
}
// 导出 request 对象
module.exports = request