import React from 'react'
import './style.css'

function Header({name, noPosts, backImage, dp, username}) {
  return (
    <div className='headerWrapper'>
        <div className='headerTopName'>
            <p>{name}</p>
            <p>{noPosts} posts</p>
        </div>
        <div className='headerRest'>
            <div className='headerBackgroudImage'><img src={backImage} alt='Background'/></div>
            <div className='headerProfilePicture'><img src={dp} alt='dp'/></div>
            <div className='headerBottomName'>
                <p>{name}</p>
                <p>@{username}</p>
            </div>
        </div>
      
    </div>
  )
}

export default Header
