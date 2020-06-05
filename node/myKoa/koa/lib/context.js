let context = {
    // get url () {//这里也是一个代理的机制 相当于你去 ctx.url ctx指代的并不是我们的context文件指的是我们在应用中拷贝出来的一份，拷贝的一份上 context.request.url
    //     return this.request.url
    // },
    // get path () {
    //     return this.request.path
    // }
}
function defineGetter(targe, key) {
    context.__defineGetter__(key, function () {
        return this[targe][key]
    })
}
function defineSetter(targe, key) {
    context.__defineSetter__(key, function (value) {
        this[targe][key] = value
    })
}
defineGetter('request', 'url')
defineGetter('request', 'path')
defineGetter('request', 'query')
defineGetter('response', 'body')
defineSetter('response', 'body')
module.exports = context