import React, { useState, useEffect } from 'react'
// 只要一个组件是route渲染出来的，就能获取一些属性
// location history match
export default function (props) {
    // console.log(props)
    let user = props.location.state
    if (!user) {
         let usersStr = localStorage.getItem('users')
        let users = usersStr ? JSON.parse(usersStr) : []
        user = users.find(user => user.id === props.match.params.id)
    }
    // let [user, setUser] = useState(state)
    // useEffect(() => {
        // let usersStr = localStorage.getItem('users')
        // let users = usersStr ? JSON.parse(usersStr) : []
        // setUser(users)
    // }, [])
    // console.log(user, '-----')
    return (
        <div>
            <p>ID: {user.id}</p>
            <p>用户名: {user.username}</p>
        </div>
    )
}