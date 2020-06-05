// module 可能是一个commonjs模块 也可能是一个es6模块
// es6模块会有一个__esModule=true,默认导出在模块的default属性上
function n (module) { 
    module.__esModule ? function () {
        return module.default
    } : function () {
        return module
    }
}