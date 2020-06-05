let fs = require('fs')
let Eventmitter = require('events')
let LinkList = require('./LinkList')
class Queue {
    constructor () {
        this.LinkedList = new LinkList()
    }
    enQueue (data) {
        this.LinkedList.add(data)
    }
    deQueue () {
        let node = this.LinkedList.remove(0)
        return node
    }
}
class WriteStream extends Eventmitter {
    constructor (path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.encoding = options.encoding || 'utf8'
        this.highWaterMark = options.highWaterMark || 16 * 1024
        this.open()
        this.needDrain = false // 是否需要触发偏移量
        this.offset = this.start // 写入的偏移量
        // 缓存结构可以使用链表结构
        this.catch = new Queue()
        this.len = 0 // 维护正在写入的个数
        this.writing = false // 默认不是正在写入，调用write 时会向文件中写入
    }
    open () {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err)
            } else {
                this.fd = fd
                this.emit('open', fd)
            }
        })
    }
    write (chunk, encoding='utf8', cb = () => {}) {
        // 这里是拿不到fd的
        // chunk 可能是一个汉字，需要转换成buffer
        chunk = Buffer.isBuffer(chunk) ? chunk: Buffer.from(chunk)
        this.len += chunk.length
        // 当前写入的个数小于预期的数量
        let flag = this.len < this.highWaterMark
        this.needDrain = !flag // 当到达或者超过预期时，需要触发darin
        if (this.writing) {
            // 增加到链表中 先存起来
            this.catch.enQueue({
                chunk,
                encoding,
                cb
            })
        } else {
            // 要真的像文件写入
            this.writing = true
            this._write(chunk, encoding, () => {
                // 这里可以添加一些自身的逻辑
                cb()
                this.clearBuffer() // 清空缓存中的数据
            })
        }
        return flag // 标识可以继续写入，没有到达预期的值
    }
    clearBuffer () {
        let data = this.catch.deQueue()
        if (data) {
            // 清空缓存
            data = data.element
            this._write(data.chunk, data.encoding, () => {
                data.cb && data.cb()
                this.clearBuffer() // 继续清空缓存
            })
        } else {
            this.write = false // 已经完成写入
            if (this.needDrain) { // 并且需要触发 drain 事件
                this.needDrain = false
                this.emit('drain') // 触发 drain 事件
            }

        }
    }
    _write (chunk, encoding, cb) {
        if (typeof this.fd !== 'number') {
            return this.once('open', () => this._write(chunk, encoding, cb))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.offset, (err, written) => {
            if (err) {
                this.emit('error', err)
            } 
            this.offset += written
            this.len -= written
            cb() // 当第一次写完之后需要清空缓存中的数据
        })
    }

}
module.exports = WriteStream