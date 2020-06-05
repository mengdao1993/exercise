import React from 'react'
import {pathToRegexp} from 'path-to-regexp'
import RouterContext from './RouterContext'
// Route 代表一条路由规则
// path 代表此规则的路径
// component 代表要渲染的组件
export default class Route extends React.Component {
    static contextType = RouterContext // this.context.location.pathname
    render () {
        let {path, component: RouteComponent, exact = false} = this.props
        let pathname = this.context.location.pathname
        let paramNames = []
        let regexp = pathToRegexp(path, paramNames, {end: exact})
        paramNames = paramNames.map(item => item.name)
        let matched = pathname.match(regexp)
        if (matched) {
            let [url, ...values] = matched
            let params = values.reduce((memo, value, index) => {
                memo[paramNames[index]] = value
                return memo
            }, {})
            let match = {
                url,
                path,
                isExact: pathname === url,
                params
            }
            let routeProps = {
                location: this.context.location,
                history: this.context.history,
                match
            }
            return <RouteComponent {...routeProps} />
        }
        // if ((exact && path === pathname) || (!exact && pathname.startsWith(path))) {
        //     return <RouteComponent />
        // }
        // if (regexp.test(pathname)) {
        //     return <RouteComponent history={this.context.history} />
        // }
        return null
    }
}
// 如果一个组件是通过路由渲染出来的话，那么它有三个属性 location history match
// match url 这个是path属性匹配到的路径的部分， /user/detail/myid/10
// path Route 里的path属性 /user/detail/:id/:age  pathname=/ user/detail/1/xx
// isExact 是精确匹配，或者说是 pathname === url 是否完全相等 false
// params {id: 'myid', age: 10}