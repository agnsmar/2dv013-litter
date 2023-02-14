import { useState } from 'react'
import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'
import { useParams } from 'react-router-dom'

const litter = '../../public/litter.png'

// TODO: hämta lits
// const lits
// TODO: hämta user
const username = 'tesuser'

// TODO: vilken är den inloggade usern?
const onlineUser = ''
// TODO: hämta om följer user

export const Profile = () => {
  let [isFollowing, setIsFollowing] = useState(false)
  const { id } = useParams()
  console.log(id)

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
            <img src={litter} alt="profile"/>
          </div>
          <div className="profile-info-container">
            <p className="username">{username}</p>
            <div className="follow">
              {onlineUser === id ? '' : 
                <button 
                  className="follow-button"
                  onClick={() => handleFollow()}
                > 
                {isFollowing ? 'following' : 'follow' }
                </button>}
            </div>
            <div className="profile-info">
              <div className="lits-nmr">
                <p>123 lits</p>
              </div>
              <div className="followers">
                <p>123 followers</p>
              </div>
              <div className="following">
                <p>123 following</p>
              </div>
            </div>
            <div className="text-container">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!

            </div>

          </div>
        </div>
        <div className="lits-container">
          {/* TODO: lits.map */}
          <Lit isLiked={false} image={litter} username="testuser" text="text1"/>
          <Lit isLiked={true} image={litter} username="testuser" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic quas culpa officia earum veniam maiores quisquam, delectus totam. Nobis reprehenderit, quia placeat quidem vero maxime ipsa blanditiis ullam architecto atque!" />
        </div>
      </div>
    </div>
    
  )
}
