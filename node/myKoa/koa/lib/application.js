const http = require('http')
const request = require('./request')
const response = require('./response')
const context = require('./context')
const Stream = require('stream')
const EventEmitter = require('events')
// 多个人通过同一个类实例化不同的对象
module.exports = class Application extends EventEmitter {
    constructor () {
        super()
        // 默认先将 response request context 进行拷贝
        this.response = Object.create(response)
        this.request = Object.create(request)
        this.context = Object.create(context) // this.context = {}.__proto__ = context
        this.middlewares = []
    }
    use (callback) {
        // this.callback = callback
        this.middlewares.push(callback)
    }
    createContext (req, res) {
        // 每次请求上下文 都应该是独立
        let response = Object.create(this.response)
        let request = Object.create(this.request)
        let context = Object.create(this.context)
        // 处理
        context.request = request
        context.req = context.request.req = req
        context.response = response
        context.res = context.response.res = res
        context.response.req = req
        context.request.res = res
        return context
    }
    compose (ctx) {
        // 默认将middlewares里的第一个执行
        let index = -1
        const dispatch = (i) => {
            console.log(i, index)
            let middleware = this.middlewares[i]
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'))
            }
            index = i // 相当于第一次调用时，我把index 变成0
            if (i === this.middlewares.length) {
                return Promise.resolve()
            }
            // 如果执行完毕后，有可能返回的不是promise
            // 链式等待 默认先执行第一个之后如果用户调用了 await next()
            try {
                return Promise.resolve(middleware(ctx, () => dispatch(i + 1)))
            } catch (e) {
                return Promise.reject(e)
            }
        }
        return dispatch(0)
    }
    handleRequest (req, res) {
        // 请求到来时需要执行use方法
        // 通过请求和响应 + 自己封装的request 和 response 组成一个当前请求的上下文
        let ctx = this.createContext(req, res)
        // this.callback(ctx)
        
        // 组合多个函数
        res.statusCode = 404
        this.compose(ctx).then(() => {
            let body = ctx.body
            if (typeof body === 'string' || Buffer.isBuffer(body)) {
                res.end(body)
            } else if (body instanceof Stream) {
                res.setHeader('Content-Disposition', `attachment;filename=${ctx.path.slice(1)}.js`)
                body.pipe(res)
            } else if (typeof body === 'object') {
                res.end(JSON.stringify(body))
            } else if (typeof body === 'number') {
                res.end(body + '')
            } else {
                res.end('Not Found')
            }
            // res.end(ctx.body)
        }).catch(error => {
            this.emit(error)
        })
    }
    listen (...args) {
        // 通过bind 绑定这个方法
        const server = http.createServer(this.handleRequest.bind(this))
        server.listen(...args)
    }
}