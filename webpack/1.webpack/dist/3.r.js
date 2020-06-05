function r (obj) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: 'Module'
    })
    Object.defineProperty(obj, '__esModule', {
        value: true
    })
}