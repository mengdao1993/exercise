import Vue from 'vue'
import App from './App.vue'
Vue.prototype.$dispatch = function (componentName,eventName) {
    let parent = this.$parent;
    while (parent) {
        let name = parent.$options.name;
        if (name == componentName) {
            break;
        } else {
            parent = parent.$parent;
        }
    }
    if(parent){
        if(eventName){
            parent.$emit(eventName)
        }
        return parent
    }
}
Vue.prototype.$broadcast = function (componentName, eventName) {
    let children = this.$children
    let arr =[]
    function findChildren(children) {
        children.forEach(child => {
            if (child.$options.name === componentName) {
                if (eventName) {
                    child.$emit(eventName)
                } else {
                    arr.push(child)
                }
            }
            if (child.$children) {
                findChildren(child.$children)
            }
        })
    }
    findChildren(children)
    return arr
}
new Vue({
    el:'#app',
    render: h => h(App)
})
// vue serve 帮我运行代码 默认找main.js