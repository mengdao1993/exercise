let express = require('express')
let app = express()
let path = require('path')
let query = require('../db')
let debug = require('debug')('crawl:web:server')
let bodyParser = require('body-parser')
let session = require('express-session')
let {checkLogin} = require('./middleware/auth')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({}))
app.use(session({
    resave: true, // 每次都要重新保存session
    saveUninitialized: true, // 保存未初始化的session
    secret: 'zdpx' // 指定密钥
}))
app.use(function (req, res, next) {
    res.locals.user = req.session.user
    next()
})
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, 'views'))
app.engine('html', require('ejs').__express)
app.get('/', async function (req, res) {
    let tags = await query(`select * from tags`) // 查询所有的标签的对象
    let tagId = req.query.tagId // 查询标签的id
    tagId = tagId || tags[0].id
    let articles = await query(`SELECT articles.* FROM article_tag INNER JOIN articles ON article_tag.article_id=articles.id WHERE article_tag.tag_id=?`, [tagId])
    res.render('index', {
        tags,
        articles
    })
})
app.get('/detail/:id', async function (req, res) {
    let id = req.params.id
    let articles = await query(`select * from articles where id=? limit 1`, [id])
    res.render('detail', { article: articles[0] })
});
// 当客户端以get请求的时候执行回调函数
app.get('/login', async function (req, res) {
    res.render('login', { title: '登陆' })
});
app.post('/login', async function (req, res) {
    let { email } = req.body
    let oldUsers = await query(`select * from users where email=? limit 1`, [email])
    let user
    if (Array.isArray(oldUsers) && oldUsers.length > 0) {
        user = oldUsers[0]
    } else {
        let result = await query(`insert into users(email) values(?)`, [email])
        user = {
            id: result.insertId,
            email
        }
    }
    req.session.user = user
    res.redirect('/') // 如果登陆成功，则把当前的用户信息放在会话中，并且重定向到首页
})
app.get('/subscribe',checkLogin, async function (req, res) {
    let tags = await query(`select * from tags`)
    let user = req.session.user // 拿到当前会话中的user属性
    let userTags = await query(`select tag_id from user_tag where user_id=?`, [user.id])
    let userTagIds = userTags.map(ietm => ietm.tag_id)
    tags.forEach(tag => {
        tag.checked = userTagIds.indexOf(tag.id) !== -1 ? true : false
    });
    res.render('subscribe', {title: '请订阅你感兴趣的标签', tags})
})
app.post('/subscribe', async function(req, res) {
    let {tags} = req.body
    console.log(req.body)
    let user = req.session.user
    console.log(req.session.user)
    await query(`delete from user_tag where user_id=?`, [user.id])
    for (let i = 0; i<tags.length; i++) {
        await query(`insert into user_tag(user_id, tag_id) values(?,?)`, [user.id, parseInt(tags[i])])
    }
    res.redirect('back')
})
let CronJob = require('cron').CronJob
let { spawn } = require('child_process')
// 每隔30分钟执行一次
let job = new CronJob('* */30 * * * *', function () {
    debug('开始执行更新的计划任务')
    let task = spawn(process.execPath, [path.resolve(__dirname, '../main')])
    task.stdout.pipe(process.stdout) // 把子进程里的正常输出重定向到父进程里
    task.stderr.pipe(process.stderr) // 把子进程里的错误输出重定向到父进程里
    child.on('close', function () {
        console.log('更新任务完毕')
    })
})
app.listen(3000)