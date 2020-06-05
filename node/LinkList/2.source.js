// 可读流 和 可写流包含文件的流的
// Readable read() 实例可以调用read 方法 调用read方法时会调用子类实现的_read() push()
// createReadStream extends Readable   
// createReadStream 需要实现 _read() 
// createWeiteStream extends Writeable

// 默认当我们创建可读流后，会打开文件，内部会调用Readable中的read方法，这个read方法会调用子类实现的_read方法，由于内部createReadStream是一个文件流，需要用fs.read方法来读取内容，读取到的内容需要调用父类的push方法，将读取的数据传入进去，最终就会触发data事件

// 可写流：
// 默认打开创建可写流后，会打开文件，内部什么都不会做，如果用户调用了write方法，这个方法是Writeable提供的，内部会调用WriteStream里的_write方法，这个方法里调用的就是fs.write方法
let {Readable, Writable, Duplex, Transform} = require('stream')
class MyReadable extends Readable {
    _read() {// 子类需要提供一个方法，只需要将数据放到push方法中即可
        this.push('123')
        this.push(null)
    }
}
// let my = new MyReadable()
// my.on('data', function (data) {
//     console.log(data)
// })
// my.on('end', function () {
//     console.log('end')
// })

// 自定义可写流
class myWriteStream extends Writable {
    _write (chunk, encoding, cb) { // 可写流自己实现的，在完成后必须要调用cb = clearBuffer
        console.log(chunk)
        cb() // 清空缓存
    }
}
let ws = new myWriteStream()
ws.write('ok')
ws.write('ok')

// 双工流
class MyDuplex extends Duplex {
    _write () {
        //自己实现的write
    }
    _read () {
        // 自己实现的read
    }
}
// 转换流 压缩 读取完毕后，要压缩，在写入到文件中
class MyTransfrom extends Transform {
    _transform () {

    }
}

let fs = require('fs')
// pipe 拷贝
let r = fs.createReadStream('./name.txt', {
    highWaterMark: 4 // 每次读取4个  64K
})
let w = fs.createWriteStream('./name1.txt', {
    highWaterMark: 1 // 16K 
})
r.on('data', function (data) {
    console.log(data)
    let flag = w.write(data)
    if (!flag) {
        r.pause() // 如果已经超过写入的预估了，等待一会就先别读了
    }
})
w.on('drain', () => {
    r.resume()
})
// 异步的拷贝，缺点就是这样的写法看不到读取的过程
// 如果希望获取结果（拿到拷贝的结果）需要等待pipe完成后才可以
r.pipe(w)