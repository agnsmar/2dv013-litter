import React from 'react'

interface LitProps {
  image: string
  username: string
  text: string
  createdAt: string
  userid: string
}

export const Lit: React.FC<LitProps> = (props) => {
  return (
    <div className="lit-container">
      <div className="lit-image">
        <a href={`/profile/${props.userid}`} className="username">
            <img src={props.image} alt="profile image" />
        </a>
      </div>
      <div className="lit-text-container">
        <a href={`/profile/${props.userid}`} className="username">{props.username}</a>
        <div className="lit-text">{props.text}</div>
      </div>
      
    </div>
  )
}
