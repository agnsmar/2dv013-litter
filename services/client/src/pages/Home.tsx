import { Navigation } from './Navigation'
import { Lit } from '../components/Lit'

const litter = '../../public/litter.png'

const getFollowing = (onlineId: string) => {
  // TODO: hämta following lits 
  return [{
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
  }]
}

export const Home = () => {
  const onlineId = '1'
  const isOnline = true // TODO: kolla om är online
  const following = getFollowing(onlineId)
  return (
    <div className="home-container">
      <Navigation isOnline={isOnline}/>
      <div className="lits-container">
        {following.map(user => user.lits.map(lit => 
          <Lit 
            isLiked={false}
            image={user.profile_img}
            username={user.username}
            text={lit.text}
            key={lit.id}
          />
        ))}
        </div>
    </div>
  )
}
