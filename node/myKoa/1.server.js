const Koa = require('koa')
const app = new Koa()
// 请求到来时会执行此方法
app.use((ctx) => {
    ctx.body = 'hello'
})
app.listen(3000)
// listen
// use 方法
// ctx 上下文对象
// 监控错误

//目录结构
// application 应用文件 默认引用的
// req/res（node中默认的 req, res）
// request response(这个属于是koa自己封装的)
// context 上下文整合req\res\request\response