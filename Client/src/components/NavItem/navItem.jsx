import React from 'react'
import './style.css'

function NavItem({svg, text}) {
  return (
    <div className='nav_item'>
        <img src={svg} alt='svg'/>
        <p>{text}</p>
    </div>
  )
}

export default NavItem
