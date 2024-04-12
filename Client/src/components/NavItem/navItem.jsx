import React from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'

function NavItem({svg, text, address}) {
  // Navigator
  let navigate = useNavigate();

  const callNavigate = () => {
    navigate(address)
  }

  return (
    <div className='nav_item' onClick={callNavigate}>
        <img src={svg} alt='svg'/>
        <p>{text}</p>
    </div>
  )
}

export default NavItem
