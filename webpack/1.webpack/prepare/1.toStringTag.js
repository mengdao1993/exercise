let obj = {}
// 1. 参数是要定义属性的对象 2.参数是属性名 3.参数是属性描述器
Object.defineProperty(obj, Symbol.toStringTag, {
    value: 'Module' // 将会成为Object.prototype.toString.call(obj)的具体的类型
}) 
console.log(Object.prototype.toString.call(obj)) // [object Module]
console.log(Object.prototype.toString.call([]))
console.log(Object.prototype.toString.call(null))
console.log(Object.prototype.toString.call(undefined))
console.log(Object.prototype.toString.call('String'))
