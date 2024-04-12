import React from 'react'
import Post from '../Post/post'
import './style.css'
import post from '../../assests/Images/post.jpg'
// import emoji from '../../assests/Images/emoji.jpg'

function Feed({posts}) {
  return (
    <div className='feed'>
      {posts?.map((el, index) =>(
        <Post message={el.post_msg} username={el.c_name} userTag={el.c_tag} media={post} key={index}/>
      ))}

    </div>
  )
}

export default Feed
