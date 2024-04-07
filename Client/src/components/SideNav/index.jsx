import React from 'react'
import './style.css'

import NavItem from '../NavItem'
import home from '../../assests/Svg/home.svg'
import explore from '../../assests/Svg/explore.svg'
import hashTag from '../../assests/Svg/hashTag.svg'
import Button from '../Buttons'



function Nav({clickFun}) {
  return (
    <div className='nav'>
      <NavItem svg={home} text={'Home'}/>
      <NavItem svg={explore} text={'Explore'}/>
      <NavItem svg={hashTag} text={'Tags'}/>
      <Button title={'Post'} clickFun={clickFun}/>
    </div>
  )
}

export default Nav