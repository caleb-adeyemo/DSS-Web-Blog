import React from 'react'
import './style.css'

const Button = ({title, clickFun}) => {
  return (
    <div className='buttonWrapper'> 
        <button  className="button" onClick={clickFun}>{title}</button>
    </div>
  )
}

export default Button
