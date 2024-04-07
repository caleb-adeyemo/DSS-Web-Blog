import React from 'react'
import './style.css'
import dp from '../../assests/Images/emoji.jpg'

function Post({userName, message, userTag, media}) {
  return (
    <div className='post'>
      <div className='post_top'>
        <div className='post-header'>
          <img className='userDp' src={dp} alt='User DP'/>
          <p className='userName'>{userName} <span className='userTag'>{userTag}</span></p>
        </div>
        
        <p className='post_message'>{message}</p>
      </div>
      
      <div className='media'>
        <img src={media} alt='post content media'/>
      </div>
      
    </div>
  )
}

export default Post
