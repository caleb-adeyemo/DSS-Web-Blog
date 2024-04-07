import React from 'react'
import './style.css'
function LoginForm() {
  


  return (
    // Entire Login Form
    <div className='loginFormWrapper'>

      {/* Left Side */}
      <div className='loginFormLeft'>
        <div className='loginFormLeftText'>
          <p>Login to Your Account</p>
        </div>
        <div className='loginFormLeftForm'>
        <form>
          <input placeholder='User-name'/>
          <input placeholder='Password'/>
          <button id='loginFormButton' className='button' type='submit'>Login</button>
        </form>
        </div>
      </div>

      {/* Rigth Side */}
      <div className='loginFormRight'>
        <div>
          <p>New Here?</p>
          <p>Sign up amd join the conversations about your favorite things!</p>
          <button id='SignupFormButton' className='button' type='submit'>Login</button>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
