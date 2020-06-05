export const createRoute = (record, localtion) => { // 根据匹配大的记录来计算匹配到的所有的记录
    let matched = []
    if (record) {
        while (record) {
            matched.unshift(record)
            record = record.parent // 通过当前记录找到所有的父亲
        }
    }
    return {
        ...localtion,
        matched
    }
}

const runQueue = (queue, iterator, complete) => {
    function next(index) {
        if (index > queue.length) return complete()
        let hook = queue[0]
        iterator(hook, () => {
            next(index + 1)
        })
    }
    next(0)
}
export default class History {
    constructor(router) {
        this.router = router
        // 这个代表的是当前路径匹配出来的记录
        this.current = createRoute(null, {
            path: '/'
        })
    }
    transitionTo(location, complete) {
        // 获取当前路径匹配出对应的记录，当路径变化时获取对应的记录 =》 渲染页面(router-view实现的)
        // 通过路径拿到对应的记录，有了记录之后就可以找到对象的匹配
        let current = this.router.match(location)
        // 防止重复点击不需要再次渲染
        // 匹配到的个数和路径都是相同的就不需要再次跳转了
        if (location === this.current.path && this.current.matched.length === current.matched.length) {
            return
        }
        // 我们需要调用钩子函数
        let queue = this.router.beforeHooks
        const iterator = (hook, next) => {
            hook(current, this.current, next)
        }
        runQueue(queue, iterator, () => {
            // 用最新的匹配到的结果，去更新视图
            this.current = current  // 这个current只是响应式的 他的变化不会更新_route
            this.cb && this.cb(current)
            // 当路径变化后 current属性会进程更新操作
            complete && complete()
        })
    }
    listen(cb) {
        this.cb = cb
    }
}