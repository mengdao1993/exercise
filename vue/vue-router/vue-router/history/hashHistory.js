import History from './base'
const ensureSlash = () => {
    // 不兼容，如果要处理可以使用href.slice('#)
    if (window.location.hash) {
        return
    }
    window.location.hash = '/'
}
export default class HashHistory extends History {
    constructor(router) {
        super(router)
        this.router = router
        // 如果使用hashHistory 默认如果没有hash 应该跳转到首页 #/
        ensureSlash()
    }
    getCurrentLocation() {
        return window.location.hash.slice(1)
    }
    setupListener() {
        window.addEventListener('hashchange', () => {
            // 再次执行匹配操作 
            this.transitionTo(this.getCurrentLocation())
        } )
    }
}