let obj = {}
// let ageProp = 10
Object.defineProperty(obj, 'age', {
    value: 100,
    enumerable: false, // 在枚举的时候是否可以打印出来
    writable: true, // 属性是否可以修改
    configurable: true // 属性是否可以删除
})
console.log(obj)

let obj2 = {}
let ageProp = 10
Object.defineProperty(obj2, 'age', {
    set(newAge) {
        ageProp = newAge
    },
    get() {
        return ageProp
    },
    enumerable: true, // 在枚举的时候是否可以打印出来
    configurable: true // 属性是否可以删除
})
console.log(obj2.age)