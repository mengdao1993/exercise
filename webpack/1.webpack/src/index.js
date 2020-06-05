let button = document.createElement('button')
button.innerHTML = '异步额外加载的模块'
button.onclick = function () {
    // 如果不加注释，文件名位0.bundle.js 加了魔法注释后文件名为title.bundle.js
    import(/*webpackChunkName: 'title'*/'./title').then(result => {
        console.log(result.default)
    })
}
document.body.appendChild(button)