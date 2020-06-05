// 测试文件默认一般以.test.js 结尾 .spec.js结尾
import { parser, stringigy } from './src/1.parser'
// describe 套件 => it 一堆用例
// 默认jest只支持node语法
describe('测试parser', () => {
    it('测试parser是否正常解析2', () => {
        expect(parser('a=1&b=2&c=3')).toEqual({
            a: '1',
            b: '2',
            c: '3'
        }) 
    })
})
describe('测试stringift', () => {
    it('测试stringigy是否正常解析2', () => {
        expect(stringigy({a: 1, b: 2})).toEqual('a=1&b=2')
    })
})