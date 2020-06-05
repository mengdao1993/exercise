let db = connect('school')
// 查询出来的结果 返回的是一个游标
let r = db.user.find()
// 游标返回的是一个空间 generator
printjson(r.next())