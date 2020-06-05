(function (modules) {
    // 存放模块的缓存对象 
    // {"./src/title.js": {i:"./src/title.js", l: true, exports:"title" },
    // "./src/index.js": {i:"./src/index.js", l: true, exports:{} }
    //}
    var installedModules = {}
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports
        }
        // 声明了一个新的模块
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        module.l = true
        return module.exports
    }
    return __webpack_require__('./src/index.js')
})({
    // 模块ID就是此模块相对于项目根路径的相对路径，值都是一个函数
    "./src/index.js":
        (function (module, exports, __webpack_require__) {

            var title = __webpack_require__(/*! ./title */ "./src/title.js");

            console.log(title);

        }),

    "./src/title.js":
        (function (module, exports) {

            module.exports = {
                name: 'title'
            };

        })
})