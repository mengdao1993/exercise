const mongoose = require('mongoose')
// 创建node 链接mongo
const conn = mongoose.createConnection('mongodb://localhost:27017/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// mongo nosql 存储的数据可以是随机的，希望存储时有一个结构
// 1.创建骨架
let ProducSchema = new mongoose.Schema({
    productName: String,
    productPrice: Number,
    createAt: {
        type: Date,
        default: Date.now // 这里经常写成 Date.now()当前运行时间
    }
},{collection: 'p'}) // 默认当前集合名小写 + s
// 2.操作集合 “模型”去操作集合
let Product = conn.model('Product', ProducSchema)
Product.create({productName: '衣服', a: 1}).then(r => {
    console.log(r)
})

// conn.on('open', function () {
//     console.log('链接成功')
// })
// conn.on('error', function () {
//     console.log('出错')
// })