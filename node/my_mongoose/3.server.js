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
function plugin(schema, options) {
    UserSchema.virtual('usernameAndPassword').get(function() {
        return this.username + ':' + this.password
    });
    UserSchema.pre(/^find/, function (next) {
        console.log('开始查询')
        next()
        console.log('结束查询')
    });
}
// 谁调用这个插件，默认第一个参数就是当前的骨架
UserSchema.plugin(plugin, {c: 1})
let User = conn.model('User', UserSchema);
// 通过骨架可以创建模型 模型可以用来操作数据库

(async () => {
    let r = await User.findOne({
        username: 'zf'
    })
    console.log(r.usernameAndPassword)
    conn.close()
})()