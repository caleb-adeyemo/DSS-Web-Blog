// Post.js
import React from 'react';
import './style.css';
import dp from '../../assests/Images/emoji.jpg';
import edit from '../../assests/Svg/edit.svg';

function Post({ username, message, postId, userTag, media, showEdit, handleEditClick }) {
  return (
    <div className='post'>
      <div className='post_top'>
        <div className='post-header'>
          <img className='userDp' src={dp} alt='User DP' />
          <p className='username'>{username} <span className='userTag'>{userTag}</span></p>
          {/* Conditionally render the edit image */}
          {showEdit && <div className='edit'><img src={edit} alt='Edit' onClick={() => handleEditClick(message, postId)} /></div>}
        </div>

        <p className='post_message'>{message}</p>
      </div>

      <div className='media'>
        <img src={media} alt='post content media' />
      </div>
    </div>
  );
}

export default Post;
