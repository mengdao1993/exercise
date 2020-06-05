import React from 'react'
import RouterContext from './RouterContext'
function Link(props) {
    return (
        <RouterContext.Consumer>
            {
                routerValue => (
                    <a href={`#${(typeof props.to === 'string') ? props.to : props.to.pathname}`} onClick={() => routerValue.history.push(props.to)}>{props.children}</a>
                )
            }
        </RouterContext.Consumer>
    )
}
export default Link