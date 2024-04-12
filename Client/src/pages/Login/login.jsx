import React, { useState } from 'react';
import LoginForm from '../../components/Form/LoginForm/loginForm';
import SignUpForm from '../../components/Form/SignUp/signUpForm';
import './style.css'

function LoginSignUp() {
  // State to manage which form to show
  const [showLogin, setShowLogin] = useState(true);

  // Function to toggle between Login and SignUp forms
  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className='loginBackground'>
      <div className="loginWrapper">
        {/* Render either LoginForm or SignUpForm based on the value of showLogin */}
        {showLogin ? (
          <LoginForm toggleForm={toggleForm} />
        ) : (
          <SignUpForm toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default LoginSignUp
