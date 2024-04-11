import React from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'

import NavItem from '../NavItem/navItem'
import home from '../../assests/Svg/home.svg'
import explore from '../../assests/Svg/explore.svg'
import hashTag from '../../assests/Svg/hashTag.svg'
import Button from '../Buttons/button'



function Nav({clickFun, img, name, username}) {
  // Navigator
  let navigate = useNavigate();
  
  const callNavigate = () => {
    navigate('/myPage')
  }
  return (
    <div className='nav'>
      <div className='navTop'>
        <NavItem svg={home} text={'Home'} address={'/home'}/>
        <NavItem svg={explore} text={'Explore'} address={'/home'}/>
        <NavItem svg={hashTag} text={'Tags'} address={'/home'}/>
        <Button title={'Post'} clickFun={clickFun}/>
      </div>
      <div className='navBottom' onClick={callNavigate}>
        <img src={img} alt='dp' className='navImg'/>
        <div>
          <p>{name}</p>
          <p>{username}</p>
        </div>
        
      </div>
    </div>
  )
}

export default Nav