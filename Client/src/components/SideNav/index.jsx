import React from 'react'
import './style.css'

import NavItem from '../NavItem'
import home from '../../assests/Svg/home.svg'
import explore from '../../assests/Svg/explore.svg'
import hashTag from '../../assests/Svg/hashTag.svg'



function Nav() {
  return (
    <div className='nav'>
      <NavItem svg={home} text={'Home'}/>
      <NavItem svg={explore} text={'Explore'}/>
      <NavItem svg={hashTag} text={'Tags'}/>
      
    </div>
  )
}

export default Nav
