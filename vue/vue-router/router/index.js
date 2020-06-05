import Vue from 'vue'
import VueRouter from '../vue-router'
import Home from '../views/home.vue'
import About from '../views/about.vue'
// use 方法会调用 install 方法 会注册全局组件
Vue.use(VueRouter)
let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About,
        children: [
            {
                path: 'a',
                component: {
                    render: h => <h1>about a</h1>
                }
            },
            {
                path: 'b',
                component: {
                    render: h => <h1>about b</h1>
                }
            }
        ]
    }
]
let router = new VueRouter({
    mode: 'hash',
    routes
})
router.beforeEach((to, from, next) => {
    setTimeout(() => {
        console.log('1.beforeEach')
        next()
    },1000)
})
router.beforeEach((to, from, next) => {
    setTimeout(() => {
        console.log('2.beforeEach')
        next()
    },2000)
})
export default router