import RouterLink from './components/router-link'
import RouterView from './components/router-view'
let Vue
const install = function (_Vue) {
    // install 内部一般会用他来定义一些全局的内容。例如：指令、全局组件、给原型扩展方法
    Vue = _Vue
    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
    // 用户将router 属性注册到了new Vue
    // 希望每个子组件 都可以获取到router属性
    Vue.mixin({
        beforeCreate() { // mixin可以beforeCreate这个生命周期增加合并的方法
            // 如果有router 说明你在根实例上增加了router属性，当前这个实例是根实例
            // 渲染流程先父后子， 渲染完毕是先子后父
            if (this.$options.router) { // 根
                this._routerRoot = this // 就是将当前根实例放到了 _routerRoot
                this._router = this.$options.router
                // this 当前用的root属性
                this._router.init(this) //调用插件中的init方法
                // 如果用户更改了current 是没有效果的需要把_route也进行更新
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else { // 儿子
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
            // 这里所有的组件都拥有了 this._routerRoot属性
        }
    })
    Object.defineProperty(Vue.prototype, '$route', { // 存放的都是属性
        get() {
            return this._routerRoot._route // 取current
        }
    })
    Object.defineProperty(Vue.prototype, '$router', { // 存放的都是属性
        get() {
            return this._routerRoot._router // 取current
        }
    })
    
}
export default install