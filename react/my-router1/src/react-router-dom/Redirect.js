import React, {useContext} from 'react'
import RouterContext from './RouterContext'
function Redirect(props) {
    let routerContext = useContext(RouterContext)
    if (!props.from || props.from === routerContext.location.pathname) {
        routerContext.history.push(props.to)
    }
    return (
        null
    )
}
export default Redirect