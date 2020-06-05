const mongoose = require('mongoose')
const conn = mongoose.createConnection('mongodb://localhost:27017/db', {
    useUnifiedTopology:true,
    useNewUrlParser: true
})
let UserSchema = new mongoose.Schema({
    username: {
        require: true,
        type: String
    },
    password: String,
    age: Number
}, {collection: 'user'})
UserSchema.statics.findByName = function (username) {
    return this.findOne({username})
}
UserSchema.methods.findByName = function () {
    return this.model('User').findOne({
        username: this.username
    })
}
UserSchema.methods.savePassword = function () {
    this.password = require('crypto').createHash('md5').update(this.password).digest('base64')
    return this.save()
}
// 通过骨架可以创建模型 模型可以用来操作数据库
let User = conn.model('User', UserSchema);
// mongo 操作数据的两种方式 集合来操作（整个集合查某一条） 文档来操作（通过某一条数据来操作自己）
// console.log(conn.model('User') === User)
(async () => {
    //（1）增加数据
    // let user = await User.create({username: 'zf', password: 'zf'})
    // console.log(user)
    // conn.close()

    // (2)查询数据 find 查询所有
    // 我希望用户名来查找某条数据, 通过Schema.statics 扩展自己的方法
    // let r = await User.findOne({username: 'zf'})
    // let r = await User.findByName({username: 'zf'})
    // console.log(r)

    //（3）通过实例来进行增加公共方法（只有增加数据时，我们才会用实例，更改时）
    // 查询一般通过集合来操作
    // let r = await new User({username: 'jw', password: 'jw', age: 10}).savePassword()

    // 删除
    await User.deleteMany({})
    // (4) 其他查询
    // let arr = []
    // for(let i = 0; i < 10; i++) {
    //     arr.push({username: 'zs' + i, password: 'zs' + i, age: i})
    // }
    // let r = await User.create(arr)
    // // 每页5条 第2页
    // // find -> srot -> skip -> limit exec就是开始执行
    // let result = await User.find({}).limit(5).skip(5).sort({age: -1})
    // console.log(result)
    // conn.close()

    // (6) 更新数据 updataMany updataOne
})()