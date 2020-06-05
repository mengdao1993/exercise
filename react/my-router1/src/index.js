import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Link, Switch, Redirect } from './react-router-dom'
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import 'bootstrap/dist/css/bootstrap.css'
// HashRouter是路由容器，放在最外层
// 匹配的是path前缀 url是以path开头  exact 不再匹配前缀了，而是精确匹配，看是否完全相等
// router匹配有三种方式 1 手工写代码 2 约定式 3 配置式
ReactDOM.render(
  <Router>
    <>
      <div className='navbar navbar-inverse'>
        <div className="container-fluid">
          <div className="navbar-heading">
            <div className="navbar-brand">珠峰架构</div>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/user'>User</Link>
            </li>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='container'>
        <div className="row">
          <div className='col-md-12'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/user' component={User} />
              <Route path='/profile' component={Profile} />
              <Redirect to='/' />
            </Switch>
          </div>
        </div>
      </div>
    </>

  </Router>,
  document.getElementById('root')
);

