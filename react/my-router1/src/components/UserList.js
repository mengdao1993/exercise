import React, { useState, useEffect } from 'react'
import { Link } from '../react-router-dom'
export default function (props) {
    let [users, setUsers] = useState([])
    useEffect(() => {
        let usersStr = localStorage.getItem('users')
        let users = usersStr ? JSON.parse(usersStr) : []
        setUsers(users)
    }, [])
    return (
        <ul className='list-group'>
            {
                users.map((user) => {
                    return (
                        <li className='list-group-item' key={user.id}>
                            {/* <Link to={`/user/detail/${user.id}`}> {user.username}</Link> */}
                            <Link to={{ pathname: `/user/detail/${user.id}`, state: user }}> {user.username}</Link>
                        </li>
                    )
                })
            }
        </ul>
    )
}