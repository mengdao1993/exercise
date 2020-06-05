const redis = require('redis')
let conn = redis.createClient({port: 6379})
let conn2 = redis.createClient({port: 6379})
// conn.set('name', 'zf', redis.print)
// conn.get('name', redis.print)
// conn.hkeys()
// 发布订阅
// 通过第一个客户端监听消息
conn.on('message', function(channel, message) {
    console.log(message)
})
conn.subscribe('channel')
conn2.publish('channel', 'hello')