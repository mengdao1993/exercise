const esprima = require('esprima') // 把源代码转换成抽象语法树
const estraverse = require('estraverse')
const escodegen = require('escodegen')
let indent = 0
function padding () {
    return ' '.repeat(indent)
}
//Identifier 一般就是变量
let code = `function ast() {}`
let ast = esprima.parseModule(code)
estraverse.traverse(ast, {
    enter(node) { // 进入
        indent++
        console.log(padding() + node.type)
    },
    leave (node) { // 离开
        indent--
        console.log(padding() + node.type)
    }
})
// 把修改后的抽象语法树重新生产源代码
let result = escodegen.generate(ast)
// console.log(JSON.stringify(result, null, 2))
