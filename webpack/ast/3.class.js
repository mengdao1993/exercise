// cnpm i @babel/core babel-types babel-traverse -D
// @babel/core esprima 可以把源代码转成语法树
// babel-traverse 可以用来遍历语法树或者修改语法树
// babel-types 生产AST语法的节点，或者验证一个节点是不是某种类型
const babel = require('@babel/core')
const t = require('babel-types')
const traverse = require('babel-traverse')
const code = `
class Person {
    constructor (name) {
        this.name = name
    }
    getName () {
        return this.name
    }
}
`
// 这是一种访问者模式，就是可以访问语法树中的所有的节点，在里面可以对节点进行转换
let ClassPlugin = {
    visitor: {
        ClassDeclaration: (path) => {
            let node = path.node
            let id = node.id
            let classMethods = node.body.body // 类的所有的方法，包含构造函数
            let statements = []
            classMethods.forEach(method => {
                if (method.kind === 'constructor') {
                   let constrcutorFunction = t.functionDeclaration(id, method.params, method.body, false, false)
                   statements.push(constrcutorFunction)
                } else {
                    let functionDeclaration = t.functionExpression(null, method.params, method.body, false, false)
                    let assignmentExpression = t.assignmentExpression('=', 
                    t.memberExpression(t.memberExpression(id, t.identifier('prototype'), false), method.key, false)
                    , functionDeclaration)
                    statements.push(assignmentExpression)
                }
            })
            // 只能替换成一个节点，但是replaceWithMultiple可以替换多节点
            path.replaceWithMultiple(statements)
        }
    }
}
// babel只是一个转换引擎，默认什么都不做，他要做的工作需要我们通过插件来提供
let result = babel.transform(code, {
    plugins: [ClassPlugin]
})
console.log(result.code)
