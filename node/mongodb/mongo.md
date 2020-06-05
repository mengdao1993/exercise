## mongo 特点
- 性能高 NoSql 查询快 支持索引、集群、高扩展和伸缩性
- 存储的问题没有mysql那么稳定（可能会有丢失的情况）
- 基础的数据操作，存一些数据量比较大的东西 播放记录或者用户登陆的信息
- 语法类似与js操作

> redis + mongo + mysql
## mac版本 
- home-brew 安装mongo 
``` bash
https://github.com/mongodb/homebrew-brew
brew install mongodb-community
brew services start mongodb-community
brew services stop mongodb-community
```

## 手动启动mongo
```
mongod --dbpath="./data" --port=27018
mongo --port=27018
mongod --config mongo 配置文件
```

## 可视化工具
- https://robomongo.org/download
- navicat, robo3t(mongo 官方推荐)

## mongo 常用命令
- mysql 数据库 表 行/列
- mongo 存储的数据可以是随意的 数据库（文件的合集） -> 集合（文件）-> 文档（对象BSON）

## 命令集合
- 启动 mongo
- show dbs 显示所有数据库
- db 显示当前所在的数据库
- use <xxx> 可以切换数据库，如果后续在数据库中添加内容会自动生成数据库
- show collections 显示集合
- db.createCollection('user') 创建空集合（也可以直接插入）
- db.student.insert({name: "zf"}) 直接往集合中插入数据，集合会默认创建出来
- db.student.drop() 删除集合
- db.dropDatabase() 

## 增删改查
- use xxx 进入数据库

## 增加
- db.集合名.insert({name:'zf',age: '10'}) 创建集合插入数据
- _id 尽量用默认的可以保证唯一性，如果使用手动也可以，最好不要手动修改

## 查询
- db.集合名.find({}, 限制字段的显示)

## 修改
- db.集合名.update(查询条件, 如何修改)默认的方式是覆盖式的
- 如果希望批量的去更改默认要使用 $ 符号 还要指定 multi:true
- multi:true + $ 来使用
- $set / $unset 新增属性

## 删除
- db.集合名.remove({}, {justOne: true}) 默认全部删除 只删除一条需要增加模式


## 查询
- 模糊查询 正则查询
- 范围查询 $in $nin = $not + $in  db.user.find({age:{$in:[0,3,5]}})
db.user.find({age:{$not: {$in:[0,3,5]}}})
- 范围查询 $gt $lt $gte $lte 
db.user.find({age: {$lt:10, $gt:3}})
- 或者的关系$or
db.user.find({$or:[{age:{$lt:3}},{age:{$gt:7}}]})
- 分页查询 可以使用 sort().limit().skip()
- count 查询是紧跟find之后
```
db.user.find().limit(limit).skip((pageSize-1)*limit).sort({age:-1})
db.user.find({}, {age:1, _id: 0}).limit(limit).skip((pageSize-1)*limit).sort({age:-1})
```
- 查询时可以指定显示的字段 1 表示显示（意味着其他不限时）0 不显示（意味着其他是显示的）0和1不能一起用 _id除外
- 可以直接通过id进行查询

## 修改
- $set / $unset 新增属性（对象的属性）
- $push $pop 数组的添加 数组的删除 数组的索引修改
- $each $addToSet
- hobb.0:xxx 通过索引去改值
- inc 自增


## 数据库的备份
```
mongodump --db school --collection user --out backup
mongorestore ./backup
```
## 给数据库添加权限
- use admin 创建用户 db.createUser({user: 'xxx', pwd: 'xxx', roles:[{},{}]})
- mongod --auth

## 使用mongoose 来操作数据库