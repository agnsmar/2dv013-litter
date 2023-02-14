import { useState } from 'react'
import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { useParams } from 'react-router-dom'

const litter = '../../public/litter.png'

// TODO: hämta user
const getUser = (id: string) => {
  // Get the user info
  return {
    username: 'testuser',
    id: id,
    profile_img: litter,
    lits: [{
      id: 1,
      text: 'test1'
    }, {
      id: 2,
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!'
    }],
    followers: ['1', '2', '3'],
    following: ['1', '2', '3'],
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!'
  }
} 

// TODO: hämta inloggad user
const onlineUser = {
  username: 'testuser',
  id: '1',
  profile_img: litter,
  lits: [{
    id: 1,
    text: 'test1'
  }, {
    id: 2,
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!'
  }],
  followers: ['1', '2', '3'],
  following: ['1', '2', '3'],
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!'
}

export const Profile = () => {
  let { id } = useParams() 
  if (id === undefined) {
    id = ''
  }
  const user = getUser(id)
  let [isFollowing, setIsFollowing] = useState(onlineUser.following.includes(user.id))

  const handleFollow = () => {
    // TODO: ändra followers i DB
    isFollowing ? setIsFollowing(false) : setIsFollowing(true)
  }

  return ( 
    <div className="home-container">
      <Navigation />
      <div className="profile-container">
        <div className="info-container">
          <div className="profile-image">
            <img src={user.profile_img} alt="profile"/>
          </div>
          <div className="profile-info-container">
            <p className="username">{user.username}</p>
            <div className="follow">
              {onlineUser.id === user.id ? '' : 
                <button 
                  className="follow-button"
                  onClick={() => handleFollow()}
                > 
                {isFollowing ? 'following' : 'follow' }
                </button>}
            </div>
            <div className="profile-info">
              <div className="lits-nmr">
                <p>{user.lits.length} lits</p>
              </div>
              <div className="followers">
                <p>{user.followers} followers</p>
              </div>
              <div className="following">
                <p>{user.following} following</p>
              </div>
            </div>
            <div className="text-container">{user.description}</div>
          </div>
        </div>
        <div className="lits-container">
          {user.lits.map(lit => 
            <Lit 
              isLiked={false}
              image={user.profile_img}
              username={user.username}
              text={lit.text}
              key={lit.id}
            />)}
        </div>
      </div>
    </div>
    
  )
}
