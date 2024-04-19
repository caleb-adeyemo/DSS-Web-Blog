// PostForm.js
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
// Import Components
import Button from '../../Buttons/button';
// Style
import './style.css';


function PostForm({ dp, initialMessage , apiUrl= 'http://localhost:3001/home', edit=false}) {
  // State variable to manage the message input
  const [message, setMessage] = useState(initialMessage || '');

  // Function to handle change in message input
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // Function to submit form data
  async function submitForm(formData) {
    const postData = {
      "message": formData,
    }

    try {
      const response = await axios.post(apiUrl, postData, {
        withCredentials: true
      });

      // Display success or error message based on response status
      if (response.data.status_code === 200) {
        toast.success(response.data.message)
      } else {
        toast.error('error 403')
      }
    } catch (error) {
      console.error('Error:', error.message); // Log error message
    }
  }

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    submitForm(message); // Submit form data
    setMessage(''); // Clear message input after submission
  };

  // Render PostForm component
  return (
    <form className='postForm' onSubmit={handleSubmit}>
      {/* Input area for message */}
      <div className='form_message_area'>
        <img className='userDp' src={dp} alt='dp' />
        <textarea
          autoFocus={true}
          placeholder="What's Happening?!"
          value={message}
          onChange={handleChange}
        ></textarea>
      </div>
      {/* Submit button */}
      <div className='form_submit_area'>
        <Button id='form_submit_button' title={'Submit'} />
      </div>
    </form>
  );
}

export default PostForm;
