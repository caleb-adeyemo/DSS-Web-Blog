import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast'


import './style.css';
import Button from '../../Buttons/button';

function PostForm({ dp }) {
  // Route to send the form data when submitted
  const apiUrl = 'http://localhost:3001/home';

  // var to set and store the tweet message in the form
  const [message, setMessage] = useState('');

  // When ever you typr int he text area, the message variable is updated
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  // function to send the data to the back end server
  async function submitForm(formData){
    // Create a JSON obj of data to send
    const postData = {
      "tweet": formData,
    }

    //Make a POST request using Axios
    try {
      // Send data
      const response = await axios.post(apiUrl, postData,{
        withCredentials: true
      });
      
      // Check to see if the data was successfully sent 
      if (response.data.status_code === 200) {
        toast.success(response.data.message)
      }
      else {
        toast.error('error 403')
      }
    } catch (error) {
      // Handle the error
      console.error('Error3:', error.message);
    }
  }

  const handleSubmit = (event) => {
    // Stop the page from reloading after submiting
    event.preventDefault();

    // Send data to the server
    submitForm(message);

    // Clear the textarea after submission
    setMessage(''); 
  };

  return (
    <form className='postForm' onSubmit={handleSubmit}>
      <div className='form_message_area'>
        <img className='userDp' src={dp} alt='dp' />
        <textarea
          autoFocus={true}
          placeholder="What's Happening?!"
          value={message}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className='form_submit_area'>
        <Button id='form_submit_button' title={'Submit'} />
      </div>
    </form>
  );
}

export default PostForm;
