export default function createBrowserHistory () {
    const globalHistory = window.history
    let initialLocation = {
        pathname: window.location.pathname,
        state: globalHistory.state // 历史对象上的状态
    }
    let listeners = []
    function createHref () {
        return location.protocol + location.host + location.pathname + location.search + location.hash 
    }
    function setState (state) {
        Object.assign(history, state)
        history.length = globalHistory.length
        listeners.forEach(listener => listener())
    }
    function push (path, state) {
        const action = 'PUSH'
        const location = { path, state}
        globalHistory.pushState(state, null, path)
        setState({action, location})
    }
    function replace (path, state) {
        const action = 'REPLACE'
        const location = { path, state}
        globalHistory.replace(state, null, path)
        setState({action, location})
    }
    function listen (listener) {
        listeners.push(listener)
    }
    function go (n) {
        globalHistory.go(n)
    }
    function goBack() {
        go(-1)
    }
    function goForward () {
        go(1)
    }
    let isBlock
    function block (prompt) {
        isBlock = prompt
    }
    let history = {
        length: globalHistory.length,
        action: 'POP', // 当前路径是怎么来的
        location: initialLocation,
        createHref, // 通过location对象得到一个路径字符串
        push, // 跳转到新的路径里去，往历史里添加一个新条目
        replace, // 跳转到新的路径里去，不会添加新的条目，而是替换当前条目
        go,
        goBack,
        goForward,
        block,
        listen
    }
}