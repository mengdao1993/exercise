import React from 'react'
import {Route, Link} from '../react-router-dom'
import userList from './UserList'
import userAdd from './UserAdd'
import userDetail from './UserDetails'
export default function (props) {
    return (
        <div className='row'>
            <div className='col-md-2'>
                <ul className='nav nav-stack'>
                    <li><Link to='/user/list'>用户列表</Link></li>
                    <li><Link to='/user/add'>新增用户</Link></li>
                </ul>
            </div>
            <div className='col-md-10'>
                <Route path='/user/list' component={userList}></Route>
                <Route path='/user/add' component={userAdd}></Route>
                <Route path='/user/detail/:id' component={userDetail}></Route>
            </div>
        </div>
    )
}