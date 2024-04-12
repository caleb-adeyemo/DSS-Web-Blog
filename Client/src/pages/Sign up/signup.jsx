import React from 'react'
import SignUpForm from '../../components/Form/SignUp/signUpForm'

import './style.css'
    
function Signup() {    
    return (
        <div className='loginBackground'>
          <div className='loginWrapper'><SignUpForm /></div>
        </div>
      )
}

export default Signup
