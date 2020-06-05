import createRouteMap from './create-route-map'
import {createRoute} from './history/base'
export default function createMatcher(routes) {
    // routes 是用户配置的，但是使用起来不方便
    // pathList会把所有的路由组成一个数组['/', '/about', '/about/a', '/about/b']
    // pathMap {/: {}, /about: {}}
    let {pathList, pathMap} = createRouteMap(routes)
    // 创建历史管理（路由有两种模式 hash 浏览器api）
    function match(location) { // 等会通过用户输入的路径 获取对应的匹配记录
        let record = pathMap[location] // 获取对应的记录
        return createRoute(record, {
            path: location
        })
    }
    function addRoutes(routes) { // routes动态添加的路由
        createRouteMap(routes, pathList, pathMap)
    }
    return {
        match,
        addRoutes
    }
}