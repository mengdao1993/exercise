const query = require('../db')
const debug = require('debug')('crawl:write:articles')
const { sendMails } = require('../mail.js')
let articles = async function (articleList) {
    debug('写入文章列表')
    // 循环文章数组的每一个元素
    for (let article of articleList) {
        let oldAtricles = await query(`SELECT * FROM articles WHERE id=? LIMIT 1`, [article.id])
        let isNew
        if (Array.isArray(oldAtricles) && oldAtricles.length > 0) {
            let oldAtricle = oldAtricles[0]
            await query(`UPDATE articles SET title=?,content=?,href=? WHERE id=?`, [article.title, article.content, article.href, article.id])
        } else {
            // 如果走到了这个分支，就意味着读取了新的文章， 再全部插入
            await query(`insert into articles(id,title,href,content) values(?,?,?,?)`, [article.id, article.title, article.href, article.content])
            isNew = true
        }
        // 处理文章和标签的关系 一般简单处理全部删除在全部插入
        await query(`delete from article_tag where article_id=?`, [article.id])
        let where = "'" + article.tagNames.join(`','`) + "'" // ['前端', '后端']
        // 按照标签的名称去查询标签的数
        const tagSQL = `select id from tags where name in (${where})`
        let tagIds = await query(tagSQL) // [{id: 1}, {id: 2}]
        for (let row of tagIds) {
            await query(`insert into article_tag(article_id,tag_id) values(?,?)`, [article.id, row.id])
        }
        let tagIdsString = tagIds.map(item => item.id).join(',')
        if (isNew) {
            // 在此我们要向所有订阅了此标签的用户发送邮件
            const emailSQL = `SELECT DISTINCT users.email FROM user_tag  INNER JOIN users ON user_tag.user_id = users.id WHERE tag_id in(${tagIdsString})`
            const emails = await query(emailSQL)
            for (let i = 0; i < emails.length; i++) {
                debug('开始发送邮件')
                sendMails('15712964604@163.com', '你订阅的内容更新了', `<a href="http://localhost:3000/detail/${article.id}">${article.title}邮件</a>`)
            }
        }
    }
}
module.exports = {
    articles
}