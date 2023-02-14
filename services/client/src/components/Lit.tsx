// No functionalitiy for liking a lit but it is left for future work
import React from 'react'
import { useState } from 'react'
// TODO: länk till user
const link = "/profile"

interface LitProps {
  image: string
  username: string
  text: string
  isLiked: boolean
}

export const Lit: React.FC<LitProps> = (props) => {
  const params = new URLSearchParams()
  params.set("user", props.username)

  const url = `${link}?${params.toString()}`

    let [isLiked, setLike] = useState(props.isLiked)

    const handleLike = () => {
        isLiked ? setLike(false) : setLike(true)
    }

  return (
    <div className="lit-container">
      <div className="lit-image">
        <a href={url} className="username">
            <img src={props.image} alt="profile image" />
        </a>
      </div>
      <div className="lit-text-container">
        <a href={url} className="username">{props.username}</a>
        <div className="lit-text">{props.text}</div>
        <div className="action-container" onClick={() => handleLike()}>
            {isLiked ? <div className="liked">❤️</div> : <div className="like">❤️</div>}
        </div>
      </div>
      
    </div>
  )
}
