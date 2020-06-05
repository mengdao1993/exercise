import React, {useContext} from 'react'
import RouterContext from './RouterContext'
import {pathToRegexp} from 'path-to-regexp'
// 负责进行子组件的匹配，只会渲染第一个匹配上的字符
// useContext 是获取上下文对象的第三种方式
// static contextType Consumer 还可以useContext
function Switch(props) {
    let routerContext = useContext(RouterContext)
    let children = props.children
    children = Array.isArray(children) ? children : [children]
    let pathname = routerContext.location.pathname
    for (let i = 0; i < children.length; i++) {
        let child = children[i] // react元素
        let {path = '/', component, exact = false} = child.props
        let regexp = pathToRegexp(path, [], {end: exact})
        let matched = pathname.match(regexp)
        if (matched) {
            return child
        }
    }
    return (
        null
        // <RouterContext.Consumer>
        //     {
        //         contextValue => {
        //             // 目前来说我们的children是一个数组，每个元素都是一个React元素
        //             let children = props.children
        //         }
        //     }
        // </RouterContext.Consumer>
    )
}
export default Switch