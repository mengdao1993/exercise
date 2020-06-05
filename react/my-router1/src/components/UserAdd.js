import React, {useRef} from 'react'
// 只要一个组件是route渲染出来的，就能获取一些属性
// location history match
export default function (props) {
    let usernameRef = useRef()
    function handleSubmit (event) {
        event.preventDefault()
        let username = usernameRef.current.value
        let usersStr = localStorage.getItem('users')
        let users = usersStr ? JSON.parse(usersStr) : []
        users.push({id: Date.now() + '', username})
        localStorage.setItem('users', JSON.stringify(users))
        props.history.push('/user/list')
    }
    return (
        <form onSubmit={handleSubmit}>
            用户名<input type='text' className='form-control' ref={usernameRef} />
            <button type='submit' className='btn btn-primary'>提交</button>
        </form>
    )
}