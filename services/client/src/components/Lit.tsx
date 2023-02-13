import React from 'react'
import { useState } from 'react'
// TODO: länk till user
const link = ""

interface LitProps {
  image: string
  username: string
  text: string
  isLiked: boolean
}

export const Lit: React.FC<LitProps> = (props) => {
    let [isLiked, setLike] = useState(props.isLiked)

    const handleLike = () => {
        isLiked ? setLike(false) : setLike(true)
    }
    
  return (
    <div className="lit-container">
      <div className="lit-image">
        <img src={props.image} alt="profile image" />
      </div>
      <div className="lit-text-container">
        <a href={link} className="username">{props.username}</a>
        <div className="lit-text">{props.text}</div>
        <div className="action-container" onClick={() => handleLike()}>
            {isLiked ? <div className="liked">❤️</div> : <div className="like">❤️</div>}
        </div>
      </div>
      
    </div>
  )
}
