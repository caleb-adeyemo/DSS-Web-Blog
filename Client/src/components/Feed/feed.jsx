// Feed.js
import React from 'react';
import Post from '../Post/post';
import './style.css';
import post from '../../assests/Images/post.jpg';

function Feed({ posts, handleEditClick, showEdit }) {
  return (
    <div className='feed'>
      {console.log(posts)}
      {posts?.map((el, index) => (
        <Post
          postId={el.post_id}
          message={el.post_msg}
          username={el.c_name}
          userTag={el.c_tag}
          media={post}
          key={index}
          showEdit={showEdit}
          handleEditClick={handleEditClick}
        />
      ))}
    </div>
  );
}

export default Feed;
