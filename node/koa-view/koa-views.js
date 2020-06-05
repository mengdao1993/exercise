const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
// 什么叫中间件 能解决那些问题？
// 1. 可以封装属性和方法 ctx.request.body
// 2. 提前的处理请求 给koa提前处理静态资源
// 3. 权限相关 有权限就继续向下执行 没权限直接返回即可
app.use(views(path.join(__dirname, '/views'), {
    map: {
        html: 'ejs'
    }
}))
app.use(async ctx => {
    ctx.render('index', {name: 'zf'})
})
app.listen(3000)