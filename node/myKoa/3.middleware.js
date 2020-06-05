// 我们在执行koa时，方法前面都需要增加await，否则不会有等待效果
// koa 为了统一处理错误，把所有的函数都变成promise，为了方便错误处理

let Koa = require('./koa')
const fs = require('fs')
const app = new Koa()
const file = fs.createReadStream('./1.server.js')
app.use(async function (ctx, next) {
    // console.log('------', 1)
    // await next()
    // next()
    // next()
    ctx.body=file
})
app.use(async function (ctx, next) {
    console.log('----', 2)
    await next()
})
app.on('error', (err) => {
    console.log('----', err)
})
app.listen(3000)