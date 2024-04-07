import React from 'react'
import LoginForm from '../../components/Form/LoginForm/loginForm'

import './style.css'

function Login() {
  return (
    <div className='loginBackground'>
      <div className='loginWrapper'><LoginForm /></div>
    </div>
  )
}

export default Login
