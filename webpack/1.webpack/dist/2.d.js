// d defineProperty 通过getter 的方式增加属性
function d (obj, name, get) {
    Object.defineProperty(obj, name, {
        enumerable: true,
        get
    })
}