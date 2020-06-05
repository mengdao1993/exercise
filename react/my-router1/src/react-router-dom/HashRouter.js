import React from 'react'
import RouterContext from './RouterContext'
// HashRouter只是一个容器，并没有DOM结构，它渲染的就是它的子组件
// 它就是为了向下层传递 location
export default class HashRouter extends React.Component {
    state = {
        location: {
            pathname: window.location.hash.slice(1), // #user
            state: window.history.state
        }
    }
    componentDidMount () {
        window.addEventListener('hashchange', event => {
            this.setState({
                ...this.state,
                location: {
                    ...this.state.location,
                    pathname: window.location.hash.slice(1) || '/',
                    state: this.locationState
                }
                
            })
        })
        window.location.hash = window.location.hash || '/'
    }
    render (){
        let that = this
        let history = {
            location: that.state.location,
            push(to) {
                if (typeof to === 'object') { // 传递的是一个对象
                    let {pathname, state} = to
                    that.locationState = state
                    window.location.hash = pathname
                } else {
                    window.location.hash = to
                }
            }
        }
        let routerValue = {
            location: that.state.location,
            history
        }

        return (
            <RouterContext.Provider value={routerValue}>
                {this.props.children}
            </RouterContext.Provider>
        )
    }
}