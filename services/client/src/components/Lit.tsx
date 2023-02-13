import React from 'react'

// TODO: länk till user
const link = ""

interface LitProps {
  image: string
  username: string
  text: string
}

export const Lit: React.FC<LitProps> = (props) => {
  return (
    <div className="lit-container">
      <div className="lit-image">
        <img src={props.image} alt="profile image" />
      </div>
      <div className="lit-text-container">
        <a href={link} className="username">{props.username}</a>
        <div className="lit-text">{props.text}</div>
        <div className="action-container">
            <div className="like">like</div>
        </div>
      </div>
      
    </div>
  )
}
