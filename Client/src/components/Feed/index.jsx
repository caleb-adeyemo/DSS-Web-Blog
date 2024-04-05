import React from 'react'
import Post from '../Post'
import './style.css'
import post from '../../assests/Images/post.jpg'
// import emoji from '../../assests/Images/emoji.jpg'

function Feed({posts}) {
  return (
    <div className='feed'>
      <h1>Twitter</h1>
      {posts?.map((el, index) =>(
        <Post message={el.post_msg} userName={el.c_name} userTag={el.c_tag} media={post} key={index}/>
      ))}
      {/* <Post message="Hello, i'm under the water!!!" userName='Kaleb' userTag='@kaleb_ade' media={post}/>
      <Post message="The One piece is real!!!" userName='White_beard' userTag='@white_beard' media={emoji}/>
      <Post message="MAMA!!! MAMA!!!" userName='Olin' userTag='@big_mom' media={post}/> */}

    </div>
  )
}

export default Feed
