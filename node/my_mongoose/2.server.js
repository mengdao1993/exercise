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
let User = conn.model('User', UserSchema)
// 通过骨架可以创建模型 模型可以用来操作数据库
let AritcleSchema = new mongoose.Schema({
    title: String,
    content: String,
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        ref: 'User',
        type: mongoose.SchemaTypes.ObjectId
    }
}, {collection: 'article'})
let Aritcle = conn.model('Aritcle', AritcleSchema);
(async () => {
//    let user = await User.create({username: 'zf', password: 'zf'})
//    let article = await new Aritcle({title: 'mongodb使用', content: '如何使用', user: user._id}).save()
   
// 我知道文章的ID号，我希望查询到这个文章时谁写的
// 嵌套文档 多表可以使用ref 进行引用 
let article = await Aritcle.findById('5e9c458ce00d853bb31ece29').populate('user', {username: 1, _id: 0})
// let article = await (await Aritcle.findById('5e9c458ce00d853bb31ece29'))
console.log(article)
conn.close()
})()