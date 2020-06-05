let EventEmitter = require('events')
let fs = require('fs')
class ReadStream extends EventEmitter {
    constructor(path, options = {}) {
        super()
        // 会将用户传入的参数全部放到实例上，这样方便后续使用
        this.path = path
        this.flags = options.flags || 'r'
        this.mode = options.mode || 438
        this.autoClose = options.autoClose || true
        this.start = options.start || 0
        this.end = options.end
        this.highWaterMark = options.highWaterMark
        this.pos = this.start
        this.flowing = false // 默认非流动模式
        this.open() // 实现打开文件的操作
        this.on('newListener', (type) => {
            if (type === 'data') {
                this.flowing = true
                this.read() // 开始读取文件
            }
        })
    }
    // destroy(err) {
    //     if (this.autoClose) {
    //         if (typeof this.fd === 'number') {
    //             fs.close(this.fd, () => {
    //                 this.emit('close', err)
    //             })
    //         } 
    //         if (err) {
    //             this.emit('error')
    //         }
    //     }
    // }
    pause() {
        this.flowing = false
    }
    resume() {
        this.flowing = true
        this.read()
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err, fd) => {
            if (err) {
                return this.emit('error', err)
                // return this.destroy(err)
            }
            // 文件打开后就拥有了文件描述符
            this.fd = fd
            this.emit('open', fd)
        })
    }
    read() {
        if (typeof this.fd !== 'number') {
            return this.once('open', this.read)
        }
        // 这里可以读取文件了
        let buffer = Buffer.alloc(this.highWaterMark)
        let howMuchToRead = this.end ? Math.min(this.end - this.pos + 1, this.highWaterMark) : this.highWaterMark
        fs.read(this.fd, buffer, this.start, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead) {
                this.pos += bytesRead
                this.emit('data', buffer.slice(0, bytesRead))
                this.flowing && this.read()
            } else {
                this.emit('end')
                this.close()
            }
        })
    }
    close() {
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }
    pipe(w) {
        this.on('data', function (data) {
            let flag = w.write(data)
            if (!flag) {
                this.pause() // 如果已经超过写入的预估了，等待一会就先别读了
            }
        })
        w.on('drain', () => {
            this.resume()
        })
    }
}
module.exports = ReadStream