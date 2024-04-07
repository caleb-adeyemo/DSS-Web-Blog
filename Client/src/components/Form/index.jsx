import React from 'react'
import './style.css'
import Button from '../Buttons'
function PostForm({dp}) {
  return (
    <form className='postForm'>
      <div className='form_message_area'>
        <img className='userDp' src={dp}  alt='dp'/>
        <textarea autoFocus={true} placeholder="What's Happening?!"></textarea>
      </div>
      <div className='form_submit_area'>
        <Button id='form_submit_button' title={'Submit'}/>
      </div>
    </form>
  )
}

export default PostForm
