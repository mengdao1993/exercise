// 对url参数进行解析
const parser = (str) => {
    const obj = {}
    str.replace(/([^&=]+)=([^&=]+)/g, function () {
        obj[arguments[1]] = arguments[2]
    })
    return obj
}

const stringigy = (obj) => {
    const arr = []
    for (let key in obj) {
        arr.push(`${key}=${obj[key]}`)
    }
    return arr.join('&')
}
// export 导出的是接口 供别人使用的接口 要通过解构才能去获取
// export default 导出的是具体的值
export {
    parser,
    stringigy
}
// console.log(parser('a=1&b=2&c=3'))
// console.log(stringigy({
//     a: 1,
//     b: 2,
//     c: 3
// }))

// 1. 会污染源代码 2.无法保留测试 3. 最后我们希望对代码进行模块化操作