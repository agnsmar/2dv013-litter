import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

interface LitProps {
  image: string
  username: string
  text: string
  createdAt: string
  userid: string
}

export const Lit: React.FC<LitProps> = (props) => {
  return (
    <div className='lit-container'>
      <div className='lit-image'>
        <Link
          to={`/profile/${props.userid}`}
          className='username'
        >
          <img
            src={props.image}
            alt='profile image'
          />
        </Link>
      </div>
      <div className='lit-text-container'>
        <Link
          to={`/profile/${props.userid}`}
          className='username'
        >
          {props.username}
        </Link>
        <div className='lit-text'>{props.text}</div>
      </div>
      <span className='timestamp'>{moment(props.createdAt).fromNow()}</span>
    </div>
  )
}
