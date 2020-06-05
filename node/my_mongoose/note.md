## 安装及启动
- brew install redis
- brew services start redis
- redis-server /usr/local/etc/redis.conf 手动配置
- 启动 redis-server  服务端  redis-cli客户端
## 支持的格式(如果存储复杂的数据，一般会使用字符串格式 JSON.Stringigy())
- 字符串 get set expire incr decr del
- 哈希 对象 hset hget hgetall hdel
- 链表 lpush rpush lrange lpop rpop lindex
- 集合、有序集合 sadd zcard