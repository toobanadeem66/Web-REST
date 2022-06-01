import React from 'react'
import "./header.scss"

const Header = () => {
  return (
    <div className="Header_Container">  
        <img
          className="header_img"
          src="https://www.adventureconnections.co.uk/wp-content/uploads/2018/03/Restaurant-Booking-Service-header.jpg"
          alt=""
        />
        <h1 className="Header title">Welcome to restaurant </h1>
        
        </div>
  )
}

export default Header