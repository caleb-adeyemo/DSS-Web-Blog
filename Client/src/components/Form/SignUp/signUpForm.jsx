import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './style.css';
import CustomInput from '../../Inputs/customInput';

function SignUpForm() {
  // Route to send the form data when submitted
  const apiUrl = 'http://localhost:3001/user/create_account';

  // Navigator
  let navigate = useNavigate();

  const signUpNavigation = () => {
    navigate('/')
    // toast.success('Sign Up Success');
  }

  // Object to store the form data
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // References to CustomInput components
  const usernameInputRef = useRef();
  const passwordInputRef = useRef();


  // function to send the data to the back end server
  async function submitForm() {
    // Make a POST request using Axios
    try {
        // Send data
        const response = await axios.post(apiUrl, formData, {
          withCredentials: true, // Enable sending cookies
        });

        // Check to see if the data was successfully sent
        if (response.data.success === true) {
            // toast the success of logining in
            toast.success(response.data.message);
            navigate('/home')
        } else {
            // Toast the failed log in attempt
            toast.error(response.data.message);
        }
    } catch (error) {
        // Handle the error
        // console.error('Error:', error.message);
        toast.error('Server Error');
    }
  }


  const handleSubmit = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Send data to the server
    await submitForm();

    // Clear the form fields after submission
    setFormData({ username: '', password: '' });

    // Clear the input values
    usernameInputRef.current.resetInput()
    passwordInputRef.current.resetInput();
  };

  // Handle changes in the form fields
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };



  return (
    // Entire SignUp Form
    <div className='signUpFormWrapper'>
      {/* Left Side */}
      <div className='signUpFormLeft'>
        <div className='signUpFormLeftText'>
          <p>New Here?</p>
          <p>Sign up and join the conversations about your favorite things!</p>
          <button id='SignupFormButton' className='button' onClick={signUpNavigation}>Sign Up</button>
        </div>
      </div>

      {/* Right Side */}
      <div className='signUpFormRight'>
        <div className='signUpFormRightText'>
          <p>Create Your Account</p>
        </div>
        <div className='signUpFormRightForm'>
          <form onSubmit={handleSubmit}>
            <CustomInput type={'text'} placeholder={'User-name'} name={'username'} onChange={handleChange} ref={usernameInputRef}/>
            <CustomInput type={'password'} placeholder={'Password'} name={'password'} onChange={handleChange} ref={passwordInputRef} />
            <button id='loginFormButton' className='button' type='submit'> Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
