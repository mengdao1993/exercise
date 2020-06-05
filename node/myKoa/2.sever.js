let Koa = require('./koa')
// let Koa = require('koa')
// 创建app的应用
let app = new Koa()
app.use((ctx) => {
    // console.log(ctx.req.path) // 原生的url
    // console.log(ctx.request.path) // 自己封装的url
    // console.log(ctx.request.req.path) // 自己封装的request上有原生的req属性
    // console.log(ctx.path) // 他表示的是ctx.request.url
    ctx.body = 'hello'
}) 
app.listen(3000)
// ctx 包含了原生的请求和响应 req, res
// 包含了自己封装的请求和响应 request response