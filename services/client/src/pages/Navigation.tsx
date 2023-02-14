import React from 'react'

interface NavProps {
  isOnline: boolean
}

export const Navigation: React.FC<NavProps> = (props) => {
  return ( 
    <div className="nav-container">
      <div className="header">
        <a href="/"><img
          src='/litter.png'
          alt='litter'
          className='logo'
        /> </a>
      </div>
      <div className="link-container">
        <a className="link-item" href="/">Home</a>
        <a className="link-item" href="/">Search</a>
        <a className="link-item" href="/profile">Profile</a>
        {props.isOnline ? '' :  <a className="link-item" href="/login">Login</a>}
      </div>


    </div>
  )
}
